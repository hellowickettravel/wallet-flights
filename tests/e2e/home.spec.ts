import { expect, test } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  // Photo CDN may be unreachable in CI sandboxes; tiles fall back to tone colours.
  await page.route("https://images.unsplash.com/**", (r) => r.abort());
});

// Routes that exist but may 404 on prefetch in tests. All pages now exist.
export const PENDING_ROUTES: string[] = [];

test("renders every homepage section without errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    const url = new URL(r.url());
    if (r.status() < 400 || url.hostname === "images.unsplash.com") return;
    if (PENDING_ROUTES.some((p) => url.pathname === p || url.pathname.startsWith(p + "/"))) return;
    errors.push(`${r.status()} ${r.url()}`);
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Where to next? We’ll find the fare.");
  for (const name of ["Fares from your city", "Departures worth a look", "Trending destinations", "How Wallet Flights works", "Travel guides", "Questions before you book", "Get fare alerts in your inbox"]) {
    await expect(page.getByRole("heading", { name, level: 2 })).toBeVisible();
  }
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

test("has no horizontal scroll at common widths", async ({ page }) => {
  await page.goto("/");
  for (const width of [360, 375, 414, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});

test("fare board fits its panel", async ({ page }) => {
  await page.goto("/");
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const spill = await page.evaluate(() => {
      const table = document.querySelector("#board-title")!.closest("section")!.querySelector("table")!;
      return table.scrollWidth - table.parentElement!.clientWidth;
    });
    expect(spill, `fare board spill at ${width}px`).toBeLessThanOrEqual(0);
  }
});

test("search validates, then builds a results URL", async ({ page }) => {
  await page.goto("/");
  const form = page.getByRole("form", { name: "Search flights" });
  await form.getByRole("button", { name: "Search flights" }).click();
  await expect(form.getByText("Choose where you're going")).toBeVisible();
  await expect(form.getByText("Add a departure date")).toBeVisible();

  const to = form.getByRole("combobox", { name: "Going to" });
  await to.fill("lon");
  await page.getByRole("option", { name: /London.*Heathrow/ }).click();
  await expect(to).toHaveValue("London (LHR)");

  await form.getByLabel("Departing").fill("2030-03-10");
  await form.getByLabel("Returning").fill("2030-03-20");
  await form.getByRole("button", { name: "Search flights" }).click();
  await expect(page).toHaveURL(/\/flights\?trip=round.*from0=NYC.*to0=LHR.*date0=2030-03-10.*return=2030-03-20/);
});

test("airport combobox works from the keyboard", async ({ page }) => {
  await page.goto("/");
  const to = page.getByRole("combobox", { name: "Going to" });
  await to.fill("tok");
  await to.press("ArrowDown");
  await to.press("ArrowUp");
  await to.press("Enter");
  await expect(to).toHaveValue("Tokyo (HND)");
});

test("trip type tabs change the form", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: "One way" }).click();
  await expect(page.getByLabel("Returning")).toHaveCount(0);
  await page.getByRole("radio", { name: "Multi-city" }).click();
  await expect(page.getByRole("combobox", { name: /Flight 2/ })).toBeVisible();
  await page.getByRole("button", { name: "Add another flight" }).click();
  await expect(page.getByRole("combobox", { name: /Flight 3/ })).toBeVisible();
  await page.getByRole("button", { name: "Remove flight 3" }).click();
  await expect(page.getByRole("combobox", { name: /Flight 3/ })).toHaveCount(0);
});

test("travellers popover enforces limits", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /1 traveller, Economy/ }).click();
  const dialog = page.getByRole("dialog", { name: "Travellers and cabin class" });
  await expect(dialog.getByRole("button", { name: "Remove one adult" })).toBeDisabled();
  await expect(dialog.getByRole("button", { name: "Add one infant" })).toBeEnabled();
  await dialog.getByRole("button", { name: "Add one infant" }).click();
  await expect(dialog.getByRole("button", { name: "Add one infant" })).toBeDisabled(); // one lap infant per adult
  await dialog.getByRole("button", { name: "Add one child" }).click();
  await dialog.getByText("Business", { exact: true }).click();
  await dialog.getByRole("button", { name: "Done" }).click();
  await expect(page.getByRole("button", { name: /3 travellers, Business/ })).toBeVisible();
});

// Fares come from the Data API (hidden when there is none), so these checks hold
// with or without TRAVELPAYOUTS_TOKEN at build time.
test("UK departure cities price in pounds; no invented prices", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "London" }).click();
  const panel = page.locator("#deals-panel");
  await expect(panel.getByRole("link", { name: /New York.*London → New York/ })).toBeVisible();
  const text = await panel.innerText();
  expect(text).not.toContain("$");
});

test("deal cards: priced → Aviasales affiliate link, unpriced → live search with sub_id", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator("#deals-panel").getByRole("link");
  await expect(cards.first()).toBeVisible();
  for (const card of await cards.all()) {
    const href = (await card.getAttribute("href"))!;
    const sub = (await card.getAttribute("data-sub"))!;
    expect(sub).toMatch(/^home_deals_new-york-to-[a-z-]+$/);
    if (href.startsWith("https://")) {
      expect(href).toMatch(new RegExp(`^https://tp\.media/r\?campaign_id=100&marker=567389&p=4114&sub_id=${sub}&trs=344771&u=https%3A%2F%2Fwww\.aviasales\.com%2Fsearch%2F`));
      expect(await card.getAttribute("rel")).toBe("sponsored noopener");
      await expect(card).toContainText("$");
    } else {
      expect(href).toBe(`/flights?trip=round&cabin=economy&adults=1&from0=NYC&to0=${href.match(/to0=([A-Z]{3})/)![1]}&sub=${sub}`);
      await expect(card).not.toContainText("$");
      await expect(card).toContainText("Search dates");
    }
  }
});

test("origin chips filter the deals rail", async ({ page }) => {
  await page.goto("/");
  const panel = page.locator("#deals-panel");
  await expect(panel.getByRole("link", { name: /London.*New York → London/ })).toBeVisible();
  await page.getByRole("tab", { name: "Los Angeles" }).click();
  await expect(panel.getByRole("link", { name: /Tokyo.*Los Angeles → Tokyo/ })).toBeVisible();
  await expect(panel.getByRole("link", { name: /New York → London/ })).toHaveCount(0);
});

test("hero shortcuts reach deals, destinations and the owner's hotels / car hire site", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "More ways to plan" });
  await expect(nav.getByRole("link", { name: "Flight deals" })).toHaveAttribute("href", "/deals");
  await expect(nav.getByRole("link", { name: "Destinations" })).toHaveAttribute("href", "/destinations");
  for (const name of [/Hotels/, /Car hire/]) {
    const a = nav.getByRole("link", { name });
    await expect(a).toHaveAttribute("href", "https://www.wickettravelholidays.com/");
    await expect(a).toHaveAttribute("rel", "noopener");
    await expect(a).toHaveAttribute("target", "_blank");
  }
});

test("hero offers phone bookings and the low-fare line", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#search");
  await expect(hero).toContainText("as little as $18");
  await expect(hero.getByRole("link", { name: "Call +44 7417 564704" })).toHaveAttribute("href", "tel:+447417564704");
});

test("desktop search is one joined bar with travellers inside", async ({ page, isMobile }) => {
  test.skip(isMobile, "joined bar is desktop only");
  await page.goto("/");
  const form = page.getByRole("form", { name: "Search flights" });
  const from = await form.getByRole("combobox", { name: "Leaving from" }).boundingBox();
  const travellers = await form.getByRole("button", { name: /1 traveller, Economy/ }).boundingBox();
  const search = await form.getByRole("button", { name: "Search flights" }).boundingBox();
  // Same row: the vertical centres line up within a few pixels.
  expect(Math.abs(from!.y + from!.height / 2 - (search!.y + search!.height / 2))).toBeLessThan(12);
  expect(Math.abs(travellers!.y + travellers!.height / 2 - (search!.y + search!.height / 2))).toBeLessThan(12);
  expect(travellers!.x).toBeLessThan(search!.x);
});

test("region tabs swap destinations", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Asia & Pacific" }).click();
  await expect(page.locator("#region-panel").getByRole("link", { name: /Tokyo/ })).toBeVisible();
});

test("faq accordion toggles", async ({ page }) => {
  await page.goto("/");
  const q = page.getByRole("button", { name: "Are the prices final?" });
  await expect(q).toHaveAttribute("aria-expanded", "false");
  await q.click();
  await expect(q).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/Prices come from the providers/)).toBeVisible();
});

test("fare alert form validates and confirms", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.getByRole("heading", { name: "Get fare alerts in your inbox" }) });
  await section.getByRole("button", { name: "Sign up" }).click();
  await expect(section.getByRole("alert")).toHaveText(/Enter an email address/);
  await section.getByLabel("Email address").fill("traveller@example.com");
  await section.getByRole("button", { name: "Sign up" }).click();
  await expect(section.getByRole("status")).toContainText("You’re signed up");
});

test("mobile menu opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "drawer is mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const drawer = page.getByRole("dialog", { name: "Menu" });
  await expect(drawer.getByRole("link", { name: "Deals" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(drawer).toHaveCount(0);
});

test("no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  await page.locator("#board-title").scrollIntoViewIfNeeded();
  await page.waitForTimeout(3200); // let the fare board settle
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`)).toEqual([]);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("fare board shows final fares immediately", async ({ page }) => {
    await page.goto("/");
    await page.locator("#board-title").scrollIntoViewIfNeeded();
    const board = page.locator("table", { has: page.locator("caption", { hasText: "Recent cheapest round-trip fares" }) });
    const tiles = await board.locator("tbody tr").first().locator("td:nth-child(3) [aria-hidden] > span").allTextContents();
    expect(tiles.join("").replace(/\u00a0/g, " ").trim()).toBe("NEW YORK");
  });
});

test("header height stays fixed while scrolling (no scroll-anchoring loop)", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header").first();
  const before = (await header.boundingBox())!.height;
  for (const y of [4, 9, 12, 300]) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(150);
    expect((await header.boundingBox())!.height).toBe(before);
  }
});
