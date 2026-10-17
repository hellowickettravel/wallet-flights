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
  return { currency: "GBP", sample: false, months, out, back };
}

async function mockCalendar(page: Page, body: object) {
  await page.route("**/api/fare-calendar?**", (r) => r.fulfill({ json: body }));
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
});

test("fare calendar: one way hides the trip length and the flexible grid", async ({ page }) => {
  await mockCalendar(page, calendarFixture());
  await page.goto("/fare-calendar?from=LON&to=BCN&trip=oneway");
  await expect(page.getByRole("radio", { name: "One way" })).toHaveAttribute("aria-checked", "true");
  await expect(page.getByLabel("Trip length")).toBeDisabled();
  await expect(page.getByRole("heading", { name: "Flexible by a few days?" })).toHaveCount(0);
});

test("fare calendar: no fares shows the empty state, never sample prices", async ({ page }) => {
  await mockCalendar(page, { currency: "GBP", sample: false, months: [], out: [] });
  await page.goto("/fare-calendar");
  await expect(page.getByRole("heading", { name: "No recent fares on this route" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Search live prices" })).toHaveAttribute("href", /sub=calendar/);
  await expect(page.getByText("Sample prices")).toHaveCount(0);
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
