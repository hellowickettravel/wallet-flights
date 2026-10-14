import { expect, test } from "./fixtures";

// The custom results UI + demo engine only ship when the build sets
// NEXT_PUBLIC_DEMO_RESULTS=true (see src/lib/flags.ts). Run with:
//   NEXT_PUBLIC_DEMO_RESULTS=true npm run build && NEXT_PUBLIC_DEMO_RESULTS=true npm run test:e2e
test.skip(process.env.NEXT_PUBLIC_DEMO_RESULTS !== "true", "demo results are behind NEXT_PUBLIC_DEMO_RESULTS");

const URL = "/flights?trip=round&cabin=economy&adults=2&from0=LHR&to0=JFK&date0=2030-03-10&return=2030-03-17";

async function waitForResults(page: import("@playwright/test").Page) {
  await expect(page.getByRole("status").filter({ hasText: "Comparing prices" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Results" }).or(page.locator("section[aria-label='Results']"))).toBeVisible({ timeout: 5000 });
}

test("search from the homepage lands on results", async ({ page }) => {
  await page.goto("/");
  const form = page.getByRole("form", { name: "Search flights" });
  await form.getByRole("combobox", { name: "Going to" }).fill("dub");
  await page.getByRole("option", { name: /Dubai/ }).click();
  await form.getByLabel("Departing").fill("2030-05-01");
  await form.getByLabel("Returning").fill("2030-05-09");
  await form.getByRole("button", { name: "Search flights" }).click();
  await expect(page).toHaveURL(/\/flights\?/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("New York");
  await waitForResults(page);
  await expect(page.locator("article").first()).toBeVisible();
});

test("results are sorted cheapest first and show demo notice", async ({ page }) => {
  await page.goto(URL);
  await waitForResults(page);
  await expect(page.getByText("Demo results.")).toBeVisible();
  const prices = await page.locator("article").evaluateAll((els) =>
    els.map((e) => Number((e.getAttribute("aria-label") ?? "").replace(/[^\d]/g, ""))),
  );
  expect(prices.length).toBeGreaterThan(3);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
  await expect(page.locator("article").first().getByText("Cheapest")).toBeVisible();
  await expect(page.locator("article").first()).toContainText("£");
});

test("fastest sort reorders by duration", async ({ page }) => {
  await page.goto(URL);
  await waitForResults(page);
  await page.getByRole("tab", { name: /Fastest/ }).click();
  await expect(page.getByRole("tab", { name: /Fastest/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("article").first()).toContainText("Nonstop");
});

test("filters narrow results and can be reset", async ({ page, isMobile }) => {
  await page.goto(URL);
  await waitForResults(page);
  const count = async () => Number((await page.getByText(/ of \d+ flights/).innerText()).split(" ")[0]);
  const before = await count();
  if (isMobile) await page.getByRole("button", { name: /^Filters/ }).click();
  const scope = isMobile ? page.getByRole("dialog", { name: "Filters" }) : page.locator("aside[aria-label='Filters']");
  await scope.getByLabel("Nonstop").check();
  if (isMobile) await page.getByRole("button", { name: /Show \d+ flight/ }).click();
  // Retrying assertions: filtered-out cards animate away before they leave the DOM.
  await expect(page.locator("article").filter({ hasNotText: "Nonstop" })).toHaveCount(0);
  await expect(page.locator("article").first()).toBeVisible();
  expect(await count()).toBeLessThan(before);
  if (isMobile) await page.getByRole("button", { name: /^Filters/ }).click();
  await scope.getByRole("button", { name: /Reset/ }).click();
  if (isMobile) await page.getByRole("button", { name: /Show \d+ flight/ }).click();
  expect(await count()).toBe(before);
});

test("airline strip filters to one airline", async ({ page }) => {
  await page.goto(URL);
  await waitForResults(page);
  const first = page.getByRole("list", { name: "Cheapest price by airline" }).getByRole("button").first();
  const name = (await first.locator("span span").first().innerText()).trim();
  await first.click();
  await expect(page.locator("article").filter({ hasNotText: name })).toHaveCount(0);
  await expect(page.locator("article").first()).toContainText(name);
});

test("details expand and a deal hands off to the provider page", async ({ page }) => {
  await page.goto(URL);
  await waitForResults(page);
  const card = page.locator("article").first();
  await card.getByRole("button", { name: /Details|Flight details/ }).click();
  await expect(card.getByText("Compare deals for this flight")).toBeVisible();
  await card.getByRole("link", { name: /View deal/ }).first().click();
  // /go turns the hand-off into a real Aviasales affiliate link and forwards to it.
  await page.waitForURL(/^https:\/\/tp\.media\/r\?campaign_id=100&marker=567389&p=4114&sub_id=demo_results&trs=344771&u=https%3A%2F%2Fwww\.aviasales\.com%2Fsearch%2F/);
});

test("table view lists the same results", async ({ page }) => {
  await page.goto(URL);
  await waitForResults(page);
  await page.getByRole("button", { name: "Table view" }).click();
  await expect(page.getByRole("table", { name: "Flight results" })).toBeVisible();
  await expect(page.getByRole("table", { name: "Flight results" }).locator("tbody tr")).toHaveCount(10);
});

test("modify search is prefilled", async ({ page }) => {
  await page.goto(URL);
  await waitForResults(page);
  await page.getByRole("button", { name: /Modify search|Edit/ }).click();
  const form = page.getByRole("form", { name: "Search flights" });
  await expect(form.getByRole("combobox", { name: "Leaving from" })).toHaveValue("London (LHR)");
  await expect(form.getByRole("combobox", { name: "Going to" })).toHaveValue("New York (JFK)");
  await expect(form.getByRole("button", { name: /2 travellers, Economy/ })).toBeVisible();
});

test("results page without a search shows the search form", async ({ page }) => {
  await page.goto("/flights");
  await expect(page.getByRole("heading", { level: 1, name: "Search flights" })).toBeVisible();
  await expect(page.getByRole("form", { name: "Search flights" })).toBeVisible();
});

test("fare-board deep links work without dates", async ({ page }) => {
  await page.goto("/flights?trip=round&from0=MAN&to0=DXB");
  await waitForResults(page);
  await expect(page.locator("article").first()).toContainText("£");
});

test("mobile filter sheet: every control is tappable", async ({ page, isMobile }) => {
  test.skip(!isMobile, "sheet is mobile only");
  await page.goto(URL);
  await waitForResults(page);
  await page.getByRole("button", { name: /^Filters/ }).click();
  const sheet = page.getByRole("dialog", { name: "Filters" });
  await sheet.getByLabel("Nonstop").check();
  // Regression: the close button used to sit on top of Reset.
  await sheet.getByRole("button", { name: /Reset/ }).click({ trial: true });
  await sheet.getByRole("button", { name: "Close filters" }).click();
  await expect(sheet).toHaveCount(0);
});
