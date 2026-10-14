import { expect, test } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  "/",
  "/about",
  "/contact",
  "/deals",
  "/destinations",
  "/destinations/lisbon",
  "/destinations/tokyo",
  "/routes/london-to-lisbon",
  "/routes/new-york-to-tokyo",
  "/airlines",
  "/travel-guides",
  "/travel-guides/carry-on-only-checklist",
  "/help",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/photo-credits",
  "/flights?trip=round&cabin=economy&adults=1&from0=LHR&to0=JFK&date0=2030-03-10&return=2030-03-17",
  "/go",
];

test.beforeEach(async ({ page }) => {
  await page.route("https://images.unsplash.com/**", (r) => r.abort());
});

for (const path of PAGES) {
  test(`${path.split("?")[0]}: renders, no broken links, no overflow, no serious a11y issues`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => {
      const u = new URL(r.url());
      if (r.status() >= 400 && u.hostname === "localhost") errors.push(`${r.status()} ${u.pathname}`);
    });
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible({ timeout: 10_000 });
    await page.waitForLoadState("networkidle");
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
    }
    await page.waitForTimeout(1500);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("every internal link resolves", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const path of ["/", "/destinations", "/travel-guides", "/help", "/deals", "/destinations/lisbon", "/routes/london-to-lisbon"]) {
    await page.goto(path);
    const hrefs = await page.$$eval("a[href^='/']", (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
    hrefs.forEach((h) => seen.add(h.split("#")[0] || "/"));
  }
  for (const href of seen) {
    const res = await request.get(href);
    expect(res.status(), href).toBeLessThan(400);
  }
});

test("seo endpoints respond", async ({ request }) => {
  for (const path of ["/sitemap.xml", "/robots.txt", "/manifest.webmanifest", "/icon", "/apple-icon", "/opengraph-image"]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/destinations/lisbon");
  expect(sitemap).toContain("/travel-guides/europe-shoulder-season");
  expect(sitemap).toContain("/routes/london-to-lisbon");
});

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  expect(res.headers()["x-content-type-options"]).toBe("nosniff");
  expect(res.headers()["x-frame-options"]).toBe("DENY");
  expect(res.headers()["x-powered-by"]).toBeUndefined();
});

test.describe("live search page", () => {
  test.use({ consent: "search" });
  test("/flights with the widget: no overflow, no serious a11y issues", async ({ page }) => {
    await page.goto("/flights?trip=round&cabin=economy&adults=1&from0=LHR&to0=JFK&date0=2030-03-10&return=2030-03-17");
    await expect(page.locator("#tpwl-search")).toContainText("White Label stub");
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
    }
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.filter((v) => v.impact === "serious" || v.impact === "critical").map((v) => v.id)).toEqual([]);
  });
});

test("affiliate disclosure is on every page footer", async ({ page }) => {
  for (const path of ["/", "/deals", "/destinations/lisbon"]) {
    await page.goto(path);
    await expect(page.locator("#affiliate-disclosure")).toContainText("affiliate links");
  }
});

test("partner links are sponsored, open in a new tab and carry marker + sub_id", async ({ page }) => {
  await page.goto("/destinations/lisbon");
  const extras = page.locator("section", { has: page.getByRole("heading", { name: /Plan the rest of your trip/ }) });
  const links = extras.getByRole("link");
  expect(await links.count()).toBeGreaterThanOrEqual(4);
  for (const a of await links.all()) {
    const href = (await a.getAttribute("href"))!;
    expect(await a.getAttribute("rel")).toBe("sponsored noopener");
    expect(await a.getAttribute("target")).toBe("_blank");
    expect(href).toMatch(/^https:\/\/tp\.media\/r\?campaign_id=\d+&marker=567389&p=\d+&sub_id=destination_lisbon_[a-z]+&trs=344771&u=https%3A%2F%2F/);
  }
  expect(await extras.getByRole("link", { name: /Get an eSIM/ }).getAttribute("href")).toContain(encodeURIComponent("https://www.airalo.com/portugal-esim"));
});
