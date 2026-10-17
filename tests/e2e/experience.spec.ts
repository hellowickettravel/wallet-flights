import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

// The fare calendar suggestion, the 404 page and phone layout checks.

const london = {
  from: { code: "LON", city: "London", name: "All airports", country: "United Kingdom" },
  currency: "GBP",
  destinations: [
    { to: { code: "BCN", city: "Barcelona", name: "All airports", country: "Spain" }, price: 32 },
    { to: { code: "DUB", city: "Dublin", name: "All airports", country: "Ireland" }, price: 24 },
    { to: { code: "PAR", city: "Paris", name: "All airports", country: "France" }, price: 45 },
  ],
};

/** Opens a page with a fake clock, then lets the visit run past the 25-second mark. */
async function visit(page: Page, path: string, start: object | null) {
  await page.route("**/api/fare-calendar/start**", (r) => r.fulfill({ json: start ?? { from: null, currency: "USD", destinations: [] } }));
  await page.clock.install();
  await page.goto(path);
  await page.waitForLoadState("networkidle"); // hydrated, so the timers are set
  await page.clock.runFor(26_000);
}

test.describe("fare calendar suggestion", () => {
  test.use({ teaser: true });

  test("appears once per visit with real popular routes, and closes", async ({ page, isMobile }) => {
    await visit(page, "/about", london);
    const card = page.getByRole("complementary", { name: "Flexible dates? Fly on the cheapest day." });
    await expect(card).toBeVisible();
    await expect(card).toContainText("Popular from London, found recently:");
    await expect(card.getByRole("link", { name: "Fare calendar to Barcelona, fares from £32" })).toHaveAttribute("href", "/fare-calendar?from=LON&to=BCN");
    // Phones show two routes, so the card stays short.
    await expect(card.getByRole("link", { name: /Fare calendar to Paris/ })).toBeVisible({ visible: !isMobile });
    await expect(card.getByRole("link", { name: "Open the fare calendar" })).toHaveAttribute("href", "/fare-calendar?from=LON");
    // It never takes focus from the page.
    expect(await page.evaluate(() => document.activeElement?.closest("[data-testid=calendar-teaser]"))).toBeNull();
    expect(await card.boundingBox().then((b) => b!.x + b!.width)).toBeLessThanOrEqual(page.viewportSize()!.width);

    await card.getByRole("button", { name: "Close the fare calendar suggestion" }).click();
    await page.clock.runFor(1000);
    await expect(card).toHaveCount(0);
    expect(await page.evaluate(() => sessionStorage.getItem("wf_teaser"))).toBe("shown");

    // Not again in the same visit.
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.clock.runFor(30_000);
    await expect(page.getByTestId("calendar-teaser")).toHaveCount(0);
  });

  test("without fare data: no prices, just what the calendar does", async ({ page }) => {
    await visit(page, "/about", null);
    const card = page.getByTestId("calendar-teaser");
    await expect(card).toBeVisible();
    await expect(card).not.toContainText(/[£$]\d/);
    await expect(card).toContainText("12 months of fares");
    await expect(card.getByRole("link", { name: "Open the fare calendar" })).toHaveAttribute("href", "/fare-calendar");
  });

  test("Escape folds it away", async ({ page }) => {
    await visit(page, "/about", london);
    const close = page.getByRole("button", { name: "Close the fare calendar suggestion" });
    await close.focus();
    await page.keyboard.press("Escape");
    await page.clock.runFor(1000);
    await expect(page.getByTestId("calendar-teaser")).toHaveCount(0);
  });

  test("waits for the cookie choice", async ({ browser, baseURL }) => {
    const ctx = await browser.newContext({ baseURL });
    const page = await ctx.newPage();
    await visit(page, "/about", london);
    await expect(page.getByTestId("calendar-teaser")).toHaveCount(0);
    await ctx.close();
  });

  for (const path of ["/fare-calendar", "/flight-delay-compensation", "/flights"]) {
    test(`stays off ${path}`, async ({ page }) => {
      await visit(page, path, london);
      await expect(page.getByTestId("calendar-teaser")).toHaveCount(0);
    });
  }
});

test("404: real status, departure board, and ways back in", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res!.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "This page has already departed" })).toBeVisible();
  const next = page.getByRole("navigation", { name: "Where to next" });
  for (const [name, href] of [
    [/Search flights/, "/"],
    [/Fare calendar/, "/fare-calendar"],
    [/Destinations/, "/destinations"],
    [/Delay compensation/, "/flight-delay-compensation"],
  ] as const)
    await expect(next.getByRole("link", { name })).toHaveAttribute("href", href);
  await next.getByRole("link", { name: /Fare calendar/ }).click();
  await expect(page).toHaveURL(/\/fare-calendar$/);
});

// Phone checks across the main pages: nothing wider than the screen, controls
// big enough to tap (WCAG 2.5.8: 24 px; inline text links are exempt), and
// form fields at 16 px or more so iOS doesn't zoom in on focus.
const PAGES = ["/", "/fare-calendar", "/flight-delay-compensation", "/flights", "/deals", "/destinations", "/destinations/london", "/routes/new-york-to-london", "/airlines", "/travel-guides", "/about", "/contact", "/help", "/no-such-page"];

test.describe("phone layout", () => {
  test.skip(({ isMobile }) => !isMobile, "phone sizes only");

  for (const path of PAGES) {
    test(`fits and taps well: ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      for (const width of [320, 360, 390, 414]) {
        await page.setViewportSize({ width, height: 800 });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `${path} is ${overflow}px wider than a ${width}px screen`).toBeLessThanOrEqual(0);
      }
      await page.setViewportSize({ width: 390, height: 844 });
      const problems = await page.evaluate(() => {
        const out: string[] = [];
        const name = (el: Element) => (el.getAttribute("aria-label") || (el as HTMLElement).innerText || el.getAttribute("placeholder") || el.tagName).trim().slice(0, 40);
        for (const el of document.querySelectorAll<HTMLElement>("a[href], button, input:not([type=hidden]), select, textarea, [role=button], [role=tab], [role=option]")) {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          if (!r.width || !r.height || cs.visibility === "hidden" || el.closest("[inert], [aria-hidden=true], .sr-only")) continue;
          if (cs.display === "inline") continue; // a link in a sentence
          if (el.matches("input[type=checkbox], input[type=radio]") && el.closest("label")) continue; // the label is the target
          if (r.width < 23.5 || r.height < 23.5) out.push(`small target ${Math.round(r.width)}×${Math.round(r.height)}: ${name(el)}`);
          if (el.matches("input, select, textarea") && parseFloat(cs.fontSize) < 16) out.push(`field text ${cs.fontSize}: ${name(el)}`);
        }
        return out;
      });
      expect(problems, path).toEqual([]);
    });
  }
});
