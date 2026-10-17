import { expect, test } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

// Travel tools: /fare-calendar and /flight-delay-compensation (Batch 5).

test.beforeEach(async ({ page }) => {
  await page.route("https://images.unsplash.com/**", (r) => r.abort());
});

/** A year of fares for the calendar: two departure days a month, one direct and one connecting fare each. */
function calendarFixture() {
  const now = new Date();
  const months = Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i + 1, 1)).toISOString().slice(0, 7));
  const fare = (date: string, from: string, to: string, price: number, stops: number, airline: string) => ({ date, time: "09:15", airline, from, to, stops, mins: 130, price });
  const out = months.flatMap((m, i) => [
    fare(`${m}-10`, "LGW", "BCN", 60 + i * 5, 0, "U2"),
    fare(`${m}-10`, "STN", "BCN", 50 + i * 5, 1, "FR"),
    fare(`${m}-12`, "LGW", "BCN", 140 + i * 5, 0, "BA"),
  ]);
  const back = months.flatMap((m) => [fare(`${m}-17`, "BCN", "LGW", 40, 0, "U2"), fare(`${m}-19`, "BCN", "LGW", 45, 0, "U2")]);
  // alerts: the server says route price alerts can be sent.
  return { currency: "GBP", months, out, back, alerts: true };
}

const london = { code: "LON", city: "London", name: "All airports", country: "United Kingdom" };
const barcelona = { code: "BCN", city: "Barcelona", name: "El Prat", country: "Spain" };
const dubai = { code: "DXB", city: "Dubai", name: "Dubai Intl", country: "United Arab Emirates" };
/** Where the calendar starts: a city near the visitor and popular routes from it. */
const startNearLondon = { from: london, currency: "GBP", destinations: [{ to: barcelona, price: 45 }, { to: dubai, price: 199 }] };

async function mockCalendar(page: Page, body: object, start: object = startNearLondon) {
  await page.route("**/api/fare-calendar?**", (r) => r.fulfill({ json: body }));
  await page.route("**/api/fare-calendar/start?**", (r) => r.fulfill({ json: start }));
}

async function noSeriousA11yIssues(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`)).toEqual([]);
}

for (const path of ["/fare-calendar", "/flight-delay-compensation"]) {
  test(`${path}: no errors, no overflow, no serious a11y issues, partner unnamed`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    if (path === "/fare-calendar") await mockCalendar(page, calendarFixture());
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
    }
    // The owner asked us never to name the flight-search partner on the site.
    await expect(page.locator("body")).not.toContainText(/travelpayouts|aviasales/i);
    await page.waitForTimeout(600);
    await noSeriousA11yIssues(page);
    expect(errors).toEqual([]);
  });
}

test("fare calendar: months, days, fares and a Select link into live search", async ({ page }) => {
  await mockCalendar(page, calendarFixture());
  await page.goto("/fare-calendar?from=LON&to=BCN&trip=return&nights=7");
  const months = page.getByRole("list", { name: "Lowest fare in each month" });
  await expect(months.getByRole("button")).toHaveCount(12);
  // Cheapest month: the first (out £50 + back £40). It opens in the calendar.
  await expect(months.getByRole("button", { name: /£90, cheapest month/ })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: /10 \w+: from £90, cheapest day this month/ })).toBeVisible();

  const fares = page.getByRole("region", { name: /day,? 10 \w+$/ });
  await expect(fares.getByRole("listitem")).toHaveCount(2);
  const select = fares.getByRole("link", { name: /^Select/ }).first();
  const href = await select.getAttribute("href");
  expect(href).toContain("/flights?");
  expect(href).toContain("sub=calendar");
  expect(href).toContain("trip=round");
  expect(href).toMatch(/return=\d{4}-\d{2}-17/);

  // Direct only drops the connecting fare and raises the month low.
  if (await page.getByRole("button", { name: "Filters" }).isVisible()) await page.getByRole("button", { name: "Filters" }).click();
  await page.getByRole("switch", { name: "Direct flights only" }).check({ force: true });
  await expect(months.getByRole("button", { name: /£100, cheapest month/ })).toBeVisible();

  // Return trips get the flexible-dates grid.
  await expect(page.getByRole("heading", { name: "Flexible by a few days?" })).toBeVisible();

  // Each trip length shows the cheapest return total the fares allow (7 nights: £50 out + £40 back).
  await expect(page.getByLabel("Trip length").locator("option", { hasText: "1 week" })).toHaveText("1 week · from £90");
});

test("fare calendar: a price alert for the route on screen, only when alerts can be sent", async ({ page }) => {
  await mockCalendar(page, calendarFixture());
  await page.goto("/fare-calendar?from=LON&to=BCN&trip=return&nights=7");
  const box = page.getByRole("region", { name: "Watch London to Barcelona" });
  await expect(box).toContainText("return, 1 week");
  // Today's cheapest (£50 out + £40 back), and a target a little under it.
  await expect(box).toContainText("£90");
  await expect(box.getByLabel("Email me below")).toHaveValue("85");

  await box.getByRole("button", { name: "Create alert" }).click();
  await expect(box.getByRole("alert")).toHaveText(/Enter an email address/);
  await box.getByLabel("Email address").fill("traveller@example.com");
  await box.getByLabel("Email me below").fill("0");
  await box.getByRole("button", { name: "Create alert" }).click();
  await expect(box.getByRole("alert")).toHaveText(/most you’d pay/);
  await box.getByLabel("Email me below").fill("80");
  await page.waitForTimeout(1600); // the API ignores sign-ups faster than a person could type
  await box.getByRole("button", { name: "Create alert" }).click();
  await expect(box.getByRole("status")).toContainText("Check your inbox");

  // Without a way to send alerts, the box isn't offered at all.
  await page.unrouteAll({ behavior: "ignoreErrors" });
  await mockCalendar(page, { ...calendarFixture(), alerts: false });
  await page.reload();
  await expect(page.getByRole("list", { name: "Lowest fare in each month" })).toBeVisible();
  await expect(page.getByTestId("route-alert")).toHaveCount(0);
});

test("price alerts: double opt-in, stop link, one-click unsubscribe and a locked daily check", async ({ page, request }) => {
  const spec = {
    email: "traveller@example.com",
    from: { code: "LON", city: "London" },
    to: { code: "BCN", city: "Barcelona" },
    trip: "return",
    nights: 7,
    max: 80,
    currency: "GBP",
  };
  for (const bad of [{ ...spec, max: 0 }, { ...spec, to: spec.from }, { ...spec, email: "nope" }]) {
    expect((await request.post("/api/price-alerts", { data: { ...bad, startedAt: Date.now() - 5000 } })).status()).toBe(400);
  }
  const res = await request.post("/api/price-alerts", { data: { ...spec, startedAt: Date.now() - 5000 } });
  expect(res.status()).toBe(202);
  const { link } = await res.json();
  expect(link).toMatch(/\/price-alerts\/confirm\?t=/);

  await page.goto(link);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Confirm your price alert");
  await page.getByRole("button", { name: "Start my alert" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Your alert is on");
  await expect(page.getByRole("status")).toContainText("London to Barcelona drops below £80");
  await expect(page.getByRole("link", { name: "Open the fare calendar" })).toHaveAttribute("href", "/fare-calendar?from=LON&to=BCN&trip=return&nights=7");

  // A forged or edited link is refused; a homepage fare-alert link doesn't work here either.
  await page.goto(`${link}x`);
  await page.getByRole("button", { name: "Start my alert" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This link has expired");
  const fareAlert = (await (await request.post("/api/fare-alerts", { data: { email: spec.email, startedAt: Date.now() - 5000 } })).json()).link as string;
  const crossed = await request.post("/api/price-alerts/confirm", { data: { t: new URL(fareAlert).searchParams.get("t") } });
  expect(crossed.status()).toBe(400);

  // The stop link every alert email carries.
  const t = new URL(link).searchParams.get("t");
  const { stop } = await (await request.post("/api/price-alerts/confirm", { data: { t } })).json();
  await page.goto(stop);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Stop this price alert?");
  await page.getByRole("button", { name: "Stop my alert" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Alert stopped");

  // A mail app's one-click unsubscribe: a form post from its servers, no Origin.
  // An old stop link can't stop a newer alert for the same route: each gets its own key.
  const again = await (await request.post("/api/price-alerts/confirm", { data: { t } })).json();
  const stale = await request.post(`/api/price-alerts/stop?t=${new URL(stop).searchParams.get("t")}`, { form: { "List-Unsubscribe": "One-Click" } });
  expect(stale.status()).toBe(400);
  const oneClick = await request.post(`/api/price-alerts/stop?t=${new URL(again.stop).searchParams.get("t")}`, { form: { "List-Unsubscribe": "One-Click" } });
  expect(oneClick.status()).toBe(200);
  expect((await oneClick.json()).route).toBe("London to Barcelona");
  expect((await request.post("/api/price-alerts/stop?t=forged", { form: { "List-Unsubscribe": "One-Click" } })).status()).toBe(400);

  // The daily check only runs with the cron secret.
  expect((await request.get("/api/price-alerts/check")).status()).toBe(401);
  const check = await request.get("/api/price-alerts/check", { headers: { authorization: "Bearer e2e-cron-secret" } });
  expect(check.status()).toBe(200);
  expect(await check.json()).toMatchObject({ sent: expect.any(Number), failed: 0 });
});

test("fare calendar: starts near the visitor with a popular route, never a fixed one", async ({ page }) => {
  await mockCalendar(page, calendarFixture());
  await page.goto("/fare-calendar");
  await expect(page.getByRole("combobox", { name: "Leaving from" })).toHaveValue("London (LON)");
  await expect(page.getByRole("combobox", { name: "Going to" })).toHaveValue("Barcelona (BCN)");
  const popular = page.getByRole("button", { name: /^Dubai/ });
  await expect(popular).toContainText("£199");
  await popular.click();
  await expect(page).toHaveURL(/from=LON&to=DXB/);
  await expect(page.getByRole("combobox", { name: "Going to" })).toHaveValue("Dubai (DXB)");
  await expect(popular).toHaveAttribute("aria-pressed", "true");
});

test("fare calendar: with no location or popular routes, the visitor picks", async ({ page }) => {
  await mockCalendar(page, calendarFixture(), { from: null, currency: "USD", destinations: [] });
  await page.goto("/fare-calendar");
  await expect(page.getByRole("heading", { name: "Where do you want to go?" })).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Leaving from" })).toHaveValue("");
  await expect(page.getByRole("combobox", { name: "Going to" })).toHaveValue("");
  await expect(page.getByText(/£\d/)).toHaveCount(0);
});

test("fare calendar: one way hides the trip length and the flexible grid", async ({ page }) => {
  await mockCalendar(page, calendarFixture());
  await page.goto("/fare-calendar?from=LON&to=BCN&trip=oneway");
  await expect(page.getByRole("radio", { name: "One way" })).toHaveAttribute("aria-checked", "true");
  await expect(page.getByLabel("Trip length")).toBeDisabled();
  await expect(page.getByRole("heading", { name: "Flexible by a few days?" })).toHaveCount(0);
});

test("fare calendar: no fares shows the empty state, never made-up prices", async ({ page }) => {
  await mockCalendar(page, { currency: "GBP", months: [], out: [] });
  await page.goto("/fare-calendar");
  await expect(page.getByRole("heading", { name: "No recent fares on this route" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Search live prices" })).toHaveAttribute("href", /sub=calendar/);
  await expect(page.getByRole("list", { name: "Lowest fare in each month" })).toHaveCount(0);
});

test("delay compensation: nothing is pre-filled and no result shows until it's answered", async ({ page }) => {
  await page.goto("/flight-delay-compensation");
  for (const name of ["Flew from", "Flew to", "Airline"]) await expect(page.getByRole("combobox", { name })).toHaveValue("");
  await expect(page.getByLabel("Flight date")).toHaveValue("");
  await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
  const result = page.locator("#result");
  await expect(result).toContainText("5 more answers and we’ll work it out.");
  await expect(result).not.toContainText("You’re likely owed");
  await expect(page.getByRole("link", { name: /Claim with Compensair/ })).toHaveCount(0);
  await expect(page).toHaveURL(/\/flight-delay-compensation$/);
});

test("delay compensation: an airline we don't know asks where it's licensed, only when that matters", async ({ page }) => {
  await page.route("**/api/airlines?code=G9", (r) => r.fulfill({ json: { code: "G9", name: "Air Arabia" } }));
  await page.goto("/flight-delay-compensation?from=DXB&to=LHR&air=G9&what=denied&date=2026-10-01");
  const base = page.getByRole("radiogroup", { name: "Where is Air Arabia licensed?" });
  await expect(base).toBeVisible();
  await expect(page.locator("#result")).toContainText("One more answer");
  await base.getByRole("radio", { name: "Somewhere else" }).click();
  await expect(page.locator("#result")).toContainText("Not covered by UK or EU rules");
  await base.getByRole("radio", { name: "In the UK" }).click();
  await expect(page.locator("#result")).toContainText("£520");
  // Leaving the UK, the airline's licence doesn't matter, so it isn't asked.
  await page.goto("/flight-delay-compensation?from=LHR&to=DXB&air=G9&what=denied&date=2026-10-01");
  await expect(page.locator("#result")).toContainText("£520");
  await expect(page.getByRole("radiogroup", { name: /licensed/ })).toHaveCount(0);
});

test("delay compensation: live result follows the answers", async ({ page }) => {
  await page.goto("/flight-delay-compensation?from=LGW&to=FAO&air=U2&what=delayed&delay=3to4&why=tech&pax=2&date=2026-10-08");
  const result = page.locator("#result");
  await expect(result).toContainText("You’re likely owed");
  await expect(result).toContainText("£350");
  await expect(result).toContainText("£700");

  await page.getByRole("radio", { name: /Cancelled/ }).click();
  await page.getByRole("radio", { name: "More than 14 days before" }).click();
  await expect(result).toContainText("Probably no compensation");
  await expect(page).toHaveURL(/what=cancelled/);
  await expect(page).toHaveURL(/notice=gt14/);

  await page.getByRole("radio", { name: "Less than 7 days before" }).click();
  await page.getByRole("radio", { name: "Bad weather" }).click();
  await expect(result).toContainText("outside the airline’s control");
});

test("delay compensation: long flight 3 to 4 hours late is halved; EU flights pay in euros", async ({ page }) => {
  await page.goto("/flight-delay-compensation?from=LHR&to=JFK&air=BA&what=delayed&delay=3to4&why=tech&pax=1&date=2026-10-08");
  await expect(page.locator("#result")).toContainText("£260");
  await page.goto("/flight-delay-compensation?from=CDG&to=LHR&air=AF&what=delayed&delay=4p&why=crew&pax=1&date=2026-10-08");
  await expect(page.locator("#result")).toContainText("€250");
});

test("delay compensation: claim letter and partners", async ({ page }) => {
  await page.goto("/flight-delay-compensation?from=LGW&to=FAO&air=U2&what=delayed&delay=4p&why=tech&pax=1&date=2026-10-08");
  await page.getByRole("button", { name: "Write my claim letter" }).click();
  const dialog = page.getByRole("dialog", { name: "Your claim letter" });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Flight number").fill("EZY8123");
  await expect(dialog.getByLabel("Letter text")).toHaveValue(/flight EZY8123/);
  await expect(dialog.getByLabel("Letter text")).toHaveValue(/UK261/);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  // Compensair goes through our tracked affiliate link; AirHelp isn't open to us yet, so it isn't shown.
  const compensair = page.getByRole("link", { name: /Claim with Compensair/ });
  await expect(compensair).toHaveAttribute("target", "_blank");
  await expect(compensair).toHaveAttribute("rel", /sponsored/);
  const href = (await compensair.getAttribute("href")) ?? "";
  expect(href).toMatch(/^https:\/\/tp\.media\/r\?campaign_id=86&marker=567389&p=4129&sub_id=compensation_compensair&trs=344771&u=/);
  expect(decodeURIComponent(href.split("u=")[1])).toBe("https://www.compensair.com/");
  await expect(page.getByText("No win, no fee")).toBeVisible();
  await expect(page.getByRole("link", { name: /Claim with AirHelp/ })).toHaveCount(0);
});
