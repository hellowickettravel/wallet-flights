import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  "/",
  "/about",
  "/contact",
  "/deals",
  "/destinations",
  "/destinations/lisbon",
  "/destinations/tokyo",
  "/airlines",
  "/travel-guides",
  "/travel-guides/carry-on-only-checklist",
  "/help",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/photo-credits",
  "/flights?trip=round&cabin=economy&adults=1&from0=LHR&to0=JFK&date0=2030-03-10&return=2030-03-17",
  "/go?provider=Tripnest&airline=British%20Airways&price=412&currency=GBP&from=LHR&to=JFK",
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
  for (const path of ["/", "/destinations", "/travel-guides", "/help", "/deals"]) {
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
});

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  expect(res.headers()["x-content-type-options"]).toBe("nosniff");
  expect(res.headers()["x-frame-options"]).toBe("DENY");
  expect(res.headers()["x-powered-by"]).toBeUndefined();
});
