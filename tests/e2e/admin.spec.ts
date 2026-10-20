import AxeBuilder from "@axe-core/playwright";
import type { APIRequestContext, Page } from "@playwright/test";
import { expect, test } from "./fixtures";

// The e2e server's test-only account (playwright.config.ts).
const ADMIN = { username: "e2e-admin", password: "e2e-admin-password" };

async function signIn(page: Page) {
  await page.goto("/admin");
  await page.getByLabel("Username").fill(ADMIN.username);
  await page.getByLabel("Password").fill(ADMIN.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Subscribers and alerts");
}

/** A confirmed price alert and a confirmed fare-alert sign-up, for one fresh address. */
async function seed(request: APIRequestContext, email: string, city = "Barcelona") {
  const spec = { email, from: { code: "LON", city: "London" }, to: { code: "BCN", city }, trip: "return", nights: 7, max: 80, currency: "GBP" };
  const { link } = await (await request.post("/api/price-alerts", { data: { ...spec, startedAt: Date.now() - 5000 } })).json();
  expect((await request.post("/api/price-alerts/confirm", { data: { t: new URL(link).searchParams.get("t") } })).status()).toBe(200);
  const fare = await (await request.post("/api/fare-alerts", { data: { email, startedAt: Date.now() - 5000 } })).json();
  expect((await request.post("/api/fare-alerts/confirm", { data: { t: new URL(fare.link).searchParams.get("t") } })).status()).toBe(200);
}

const fresh = (name: string) => `${name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}@example.com`;

test("admin: signed out, it's a sign-in form with no site chrome, kept out of search", async ({ page, request }) => {
  const res = await page.goto("/admin");
  expect(res?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sign in to the dashboard");
  await expect(page.getByRole("contentinfo")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Fare calendar" })).toHaveCount(0);
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /admin");

  // A wrong password says so without saying which field was wrong.
  await page.getByLabel("Username").fill(ADMIN.username);
  await page.getByLabel("Password").fill("not-the-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.locator("#main").getByRole("alert")).toHaveText(/don’t match/);

  // Nothing is readable or deletable without a session, and sign-in is same-site JSON only.
  expect((await request.get("/api/admin/export?list=contacts")).status()).toBe(401);
  expect((await request.post("/api/admin/remove", { data: { email: "a@example.com" } })).status()).toBe(401);
  expect((await request.post("/api/admin/login", { data: { username: ADMIN.username, password: "x" } })).status()).toBe(401);
  expect((await request.post("/api/admin/login", { headers: { origin: "https://evil.example" }, data: ADMIN })).status()).toBe(403);
  expect((await request.post("/api/admin/login", { headers: { "content-type": "text/plain" }, data: JSON.stringify(ADMIN) })).status()).toBe(415);
  // A forged cookie is no session.
  expect((await request.get("/api/admin/export?list=contacts", { headers: { cookie: "wf_admin=eyJ1IjoiZTJlLWFkbWluIn0.zzz.forged" } })).status()).toBe(401);
});

test("admin: counts, a person's history, the daily check, CSV export and deleting a person", async ({ page, request }) => {
  const email = fresh("traveller");
  // A city that a spreadsheet would run as a formula if the export didn't escape it.
  await seed(request, email, "=HYPERLINK(1)");
  const check = await request.get("/api/price-alerts/check", { headers: { authorization: "Bearer e2e-cron-secret" } });
  expect(check.status()).toBe(200);

  await signIn(page);
  for (const label of ["Fare-alert subscribers", "Active price alerts", "People on any list", "Alert emails, last 30 days"]) {
    await expect(page.getByRole("term").filter({ hasText: label })).toBeVisible();
  }
  await expect(page.getByRole("region", { name: "Daily price check" })).toBeVisible();
  await expect(page.getByText("Next check", { exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: "Price alerts" })).toContainText(email);
  await expect(page.getByRole("region", { name: "Fare-alert subscribers" })).toContainText(email);

  // The person's record: what they signed up for and what happened, from a link in any table.
  await page.getByRole("region", { name: "Price alerts" }).getByRole("link", { name: email }).click();
  const record = page.getByRole("region", { name: `Record for ${email}` });
  await expect(record).toContainText("Fare alerts since");
  await expect(record).toContainText("London (LON) to =HYPERLINK(1) (BCN)");
  await expect(record).toContainText("Started a price alert");
  await expect(record).toContainText("Confirmed fare alerts");

  // Exports, with the session cookie.
  const alerts = await page.request.get("/api/admin/export?list=alerts");
  expect(alerts.status()).toBe(200);
  expect(alerts.headers()["content-type"]).toContain("text/csv");
  expect(alerts.headers()["content-disposition"]).toMatch(/attachment; filename="wallet-flights-alerts-\d{4}-\d{2}-\d{2}\.csv"/);
  const alertsCsv = await alerts.text();
  expect(alertsCsv.startsWith("﻿Email,From,")).toBe(true);
  expect(alertsCsv).toContain(`${email},London,LON,'=HYPERLINK(1),BCN,"return, 1 week",80,GBP,`);
  const contacts = await (await page.request.get("/api/admin/export?list=contacts")).text();
  expect(contacts).toContain(`${email},Fare alerts; Price alerts for the routes listed,`);
  for (const list of ["subscribers", "activity"]) expect(await (await page.request.get(`/api/admin/export?list=${list}`)).text()).toContain(email);
  expect((await page.request.get("/api/admin/export?list=passwords")).status()).toBe(400);

  // An erasure request: everything for the address goes, after a confirm.
  page.once("dialog", (d) => d.accept());
  await record.getByRole("button", { name: "Delete this person’s data" }).click();
  await expect(page.getByText(`Nothing is held for ${email}.`)).toBeVisible();
  expect(await (await page.request.get("/api/admin/export?list=contacts")).text()).not.toContain(email);
  expect(await (await page.request.get("/api/admin/export?list=activity")).text()).not.toContain(email);

  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sign in to the dashboard");
  expect((await page.request.get("/api/admin/export?list=contacts")).status()).toBe(401);
});

test("admin dashboard: no overflow on a phone, no serious a11y issues", async ({ page, request }) => {
  await seed(request, fresh("a-very-long-address-for-a-narrow-screen"));
  await signIn(page);
  for (const width of [360, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations.filter((v) => v.impact === "serious" || v.impact === "critical").map((v) => v.id)).toEqual([]);
});
