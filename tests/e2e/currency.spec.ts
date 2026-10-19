import { expect, test } from "./fixtures";
import type { Page } from "@playwright/test";

// Batch 8 (19 Oct 2026): prices in the visitor's currency, the travellers
// counts on the hero, and the fare calendar's trip switch.

const london = { code: "LON", city: "London", name: "All airports", country: "United Kingdom" };

/** Two months of London–Barcelona fares in pounds (the cheapest return is £50 + £40). */
function fixture() {
  const now = new Date();
  const months = [1, 2].map((i) => new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1)).toISOString().slice(0, 7));
  const fare = (date: string, from: string, to: string, price: number) => ({ date, time: "09:15", airline: "U2", from, to, stops: 0, mins: 130, price });
  return {
    currency: "GBP",
    months,
    out: months.map((m) => fare(`${m}-10`, "LGW", "BCN", 50)),
    back: months.map((m) => fare(`${m}-17`, "BCN", "LGW", 40)),
    alerts: true,
  };
}

async function mockCalendar(page: Page) {
  await page.route("**/api/fare-calendar?**", (r) => r.fulfill({ json: fixture() }));
  await page.route("**/api/fare-calendar/start?**", (r) => r.fulfill({ json: { from: london, currency: "GBP", destinations: [] } }));
}

async function setCurrency(page: Page, baseURL: string | undefined, value: string) {
  await page.context().addCookies([{ name: "wf_cur", value, url: baseURL! }]);
}

test("first visit: the currency comes from the visitor's country, once", async ({ playwright, baseURL }) => {
  // A new request context each time: one would keep the cookie from the last answer.
  for (const [country, currency] of [["PK", "PKR"], ["GB", "GBP"], ["US", "USD"], ["IN", "INR"], ["DE", "EUR"], ["BD", "BDT"], ["KE", "KES"], ["AQ", "USD"]]) {
    const fresh = await playwright.request.newContext({ baseURL });
    const res = await fresh.get("/about", { headers: { "x-vercel-ip-country": country } });
    expect(res.headers()["set-cookie"] ?? "", country).toContain(`wf_cur=${currency}`);
    await fresh.dispose();
  }
  const request = await playwright.request.newContext({ baseURL });
  // Not again once chosen, not on API routes, and not without a country.
  const chosen = await request.get("/about", { headers: { "x-vercel-ip-country": "PK", cookie: "wf_cur=GBP" } });
  expect(chosen.headers()["set-cookie"] ?? "").not.toContain("wf_cur");
  expect((await request.get("/about")).headers()["set-cookie"] ?? "").not.toContain("wf_cur");
  const api = await request.get("/api/fare-calendar/start", { headers: { "x-vercel-ip-country": "PK" } });
  expect(api.headers()["set-cookie"] ?? "").not.toContain("wf_cur");
  await request.dispose();
});

test("fare calendar: prices in the visitor's currency, and the picker changes them everywhere", async ({ page, baseURL }) => {
  await setCurrency(page, baseURL, "PKR");
  await mockCalendar(page);
  await page.goto("/fare-calendar?from=LON&to=BCN&trip=return&nights=7");
  const months = page.getByRole("list", { name: "Lowest fare in each month" });
  await expect(months.getByRole("button").first()).toHaveAccessibleName(/from PKR\s?[\d,]+/);
  await expect(page.locator("main")).not.toContainText("£");

  // The alert box is in rupees too, and sends rupees.
  const box = page.getByRole("region", { name: "Watch London to Barcelona" });
  await expect(box).toContainText(/PKR\s?[\d,]+/);
  const target = Number(await box.getByLabel("Email me below").inputValue());
  expect(target).toBeGreaterThan(1000);

  // The header picker (the phone menu has the same one).
  const picker = page.getByRole("banner").getByLabel("Currency for prices");
  if (await picker.isVisible()) await picker.selectOption("USD");
  else {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog", { name: "Menu" }).getByLabel("Currency for prices").selectOption("USD");
    await page.getByRole("button", { name: "Close menu" }).click();
  }
  await expect(months.getByRole("button").first()).toHaveAccessibleName(/from \$[\d,]+/);
  await expect(page.locator("main")).not.toContainText("PKR");
  expect((await page.context().cookies()).find((c) => c.name === "wf_cur")?.value).toBe("USD");

  // Pounds for a visitor who wants pounds: no conversion, exact prices.
  await page.reload();
  await expect(months.getByRole("button").first()).toHaveAccessibleName(/from \$[\d,]+/);
  await setCurrency(page, baseURL, "GBP");
  await page.reload();
  await expect(months.getByRole("button").first()).toHaveAccessibleName(/from £90/);
});

test("price alerts accept the visitor's currency", async ({ request }) => {
  const spec = {
    email: "rupees@example.com",
    from: { code: "LON", city: "London" },
    to: { code: "BCN", city: "Barcelona" },
    trip: "return",
    nights: 7,
    max: 25_000,
    currency: "PKR",
    company: "",
    startedAt: Date.now() - 5000,
  };
  const res = await request.post("/api/price-alerts", { data: spec });
  expect(res.status()).toBe(202);
  expect(await res.json()).toMatchObject({ ok: true });
});

test("hero: the travellers counts are visible on the white panel", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#search");
  await hero.getByRole("button", { name: /traveller/ }).first().click();
  const panel = page.getByRole("dialog", { name: "Travellers and cabin class" });
  const adults = panel.getByRole("group", { name: "Adults" }).locator("output");
  await expect(adults).toHaveText("1");
  // The hero form's text is white; the count used to inherit it.
  expect(await adults.evaluate((el) => getComputedStyle(el).color)).not.toBe("rgb(255, 255, 255)");
  await panel.getByRole("button", { name: "Add one adult" }).click();
  await expect(adults).toHaveText("2");
});

test("fare calendar: the chosen trip type is filled blue", async ({ page }) => {
  await mockCalendar(page);
  await page.goto("/fare-calendar");
  const trips = page.getByRole("radiogroup", { name: /trip/i });
  const fill = (name: string) =>
    trips.getByRole("radio", { name }).evaluate((el) => {
      const pill = el.querySelector("span.absolute");
      return pill ? getComputedStyle(pill).backgroundColor : "none";
    });
  await expect.poll(() => fill("Return")).toBe("rgb(31, 91, 216)");
  await trips.getByRole("radio", { name: "One way" }).click();
  await expect.poll(() => fill("One way")).toBe("rgb(31, 91, 216)");
  await expect.poll(() => fill("Return")).toBe("none");
});

test("the currency list is every currency today's rates cover, the visitor's first", async ({ page, baseURL }) => {
  await setCurrency(page, baseURL, "PKR");
  await page.goto("/about");
  const menuButton = page.getByRole("button", { name: "Open menu" });
  const scope = (await menuButton.isVisible()) ? (await menuButton.click(), page.getByRole("dialog", { name: "Menu" })) : page.getByRole("banner");
  const select = scope.getByLabel("Currency for prices");
  await expect(select).toHaveValue("PKR");
  const groups = await select.evaluate((el: HTMLSelectElement) =>
    [...el.querySelectorAll("optgroup")].map((g) => ({ label: g.label, codes: [...g.querySelectorAll("option")].map((o) => o.value) })),
  );
  expect(groups[0]).toEqual({ label: "Your currency", codes: ["PKR"] });
  // Not a hand-picked list: well over a hundred currencies, including ones no list of "popular" ones would have.
  expect(groups[1].codes.length).toBeGreaterThan(100);
  for (const code of ["USD", "GBP", "EUR", "BDT", "KES", "LKR", "QAR"]) expect(groups[1].codes).toContain(code);
  expect(groups[1].codes).not.toContain("PKR");
  expect(groups[1].codes).not.toContain("XAU");
  // Choosing one saves it and updates the pill.
  await select.selectOption("BDT");
  await expect(select).toHaveValue("BDT");
  expect((await page.context().cookies()).find((c) => c.name === "wf_cur")?.value).toBe("BDT");
});

test("an unknown currency in the cookie falls back to dollars", async ({ page, baseURL }) => {
  await setCurrency(page, baseURL, "ZZZ");
  await mockCalendar(page);
  await page.goto("/fare-calendar?from=LON&to=BCN&trip=return&nights=7");
  await expect(page.getByRole("list", { name: "Lowest fare in each month" }).getByRole("button").first()).toHaveAccessibleName(/from \$[\d,]+/);
});
