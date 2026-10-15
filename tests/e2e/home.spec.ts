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
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("We compare hundreds of flight providers and show the cheapest fare.");
  // The fare board only appears with real fares (none without the Data API token).
  const hasBoard = (await page.locator("#board-title").count()) > 0;
  if (!hasBoard) await expect(page.getByText("No recent price")).toHaveCount(0);
  for (const name of ["Fares from your city", ...(hasBoard ? ["Departures worth a look"] : []), "Trending destinations", "How Wallet Flights works", "Travel guides", "Questions before you book", "Get fare alerts in your inbox"]) {
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
  test.skip((await page.locator("#board-title").count()) === 0, "no fares in this environment, so no board");
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
  await expect(page.getByRole("combobox", { name: "Flight 2 · from" })).toBeVisible();
  // Each leg's fields are named for screen readers, not just "Going to" again.
  await expect(page.getByRole("combobox", { name: "Flight 2, Going to" })).toBeVisible();
  await expect(page.getByLabel("Flight 2, Date")).toBeVisible();
  await page.getByRole("button", { name: "Add another flight" }).click();
  await expect(page.getByRole("combobox", { name: "Flight 3 · from" })).toBeVisible();
  await page.getByRole("button", { name: "Remove flight 3" }).click();
  await expect(page.getByRole("combobox", { name: "Flight 3 · from" })).toHaveCount(0);
});

test("airport field: Tab keeps the highlighted airport; the list isn't a Tab stop", async ({ page }) => {
  await page.goto("/");
  const to = page.getByRole("combobox", { name: "Going to" });
  await to.fill("par");
  await expect(page.getByRole("option", { name: /Paris/ }).first()).toBeVisible();
  await expect(page.getByRole("listbox")).toHaveAttribute("tabindex", "-1");
  await expect(page.locator("#search p[aria-live]").filter({ hasText: /airports? found/ })).toHaveCount(1);
  // Whichever Paris option is highlighted is the one kept.
  const code = (await to.getAttribute("aria-activedescendant"))!.split("-").pop();
  await to.press("Tab");
  await expect(to).toHaveValue(`Paris (${code})`);
  await expect(page.getByRole("listbox")).toHaveCount(0);
});

test("past dates are refused and focus moves to the first problem", async ({ page }) => {
  await page.goto("/");
  const form = page.getByRole("form", { name: "Search flights" });
  await form.getByRole("combobox", { name: "Going to" }).fill("lon");
  await page.getByRole("option", { name: /London.*Heathrow/ }).click();
  await form.getByLabel("Departing").fill("2020-03-10");
  await form.getByLabel("Returning").fill("2020-03-20");
  await form.getByRole("button", { name: "Search flights" }).click();
  await expect(form.getByText("Choose a date from today onwards")).toBeVisible();
  await expect(form.getByLabel("Departing")).toBeFocused();
  await expect(page).toHaveURL(/\/$/);
});

test("trip type and tab groups move with arrow keys, one Tab stop each", async ({ page }) => {
  await page.goto("/");
  const round = page.getByRole("radio", { name: "Round trip" });
  await expect(page.getByRole("radio", { name: "One way" })).toHaveAttribute("tabindex", "-1");
  await round.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "One way" })).toHaveAttribute("aria-checked", "true");
  await expect(page.getByRole("radio", { name: "One way" })).toBeFocused();
  await page.keyboard.press("End");
  await expect(page.getByRole("radio", { name: "Multi-city" })).toHaveAttribute("aria-checked", "true");
  await page.keyboard.press("Home");
  await expect(round).toHaveAttribute("aria-checked", "true");

  const regions = page.getByRole("tablist", { name: "Region" }).getByRole("tab");
  await regions.first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(regions.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(regions.nth(1)).toBeFocused();
});

test("cabin classes the live search doesn't have are explained", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Travellers and cabin class/ }).click();
  await page.getByText("Premium economy").click();
  await expect(page.getByText(/Live results show economy fares for premium economy/)).toBeVisible();
  await page.getByText("First", { exact: true }).click();
  await expect(page.getByText(/Live results show business fares for first class/)).toBeVisible();
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
  await expect(panel.getByRole("link", { name: /New York.*London to New York/ })).toBeVisible();
  const text = await panel.innerText();
  expect(text).not.toContain("$");
});

test("deal cards: priced → Aviasales affiliate link, unpriced → live search with sub_id", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator("#deals-panel a[data-sub]");
  // Every card also links its route page, for crawlers and readers.
  await expect(page.locator('#deals-panel a[href^="/routes/new-york-to-"]').first()).toBeVisible();
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
  await expect(panel.getByRole("link", { name: /London.*New York to London/ })).toBeVisible();
  await page.getByRole("tab", { name: "Los Angeles" }).click();
  await expect(panel.getByRole("link", { name: /Tokyo.*Los Angeles to Tokyo/ })).toBeVisible();
  await expect(panel.getByRole("link", { name: /London.*New York to London/ })).toHaveCount(0);
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

test("hero offers manual bookings on WhatsApp, real from-prices only, the sister company and Trustpilot", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#search");
  // No unqualified "as little as" claim: from-prices come from fare data, with route and trip type.
  await expect(hero).not.toContainText("as little as");
  const from = hero.getByTestId("hero-from-prices");
  if ((await from.count()) > 0) await expect(from).toHaveText(/^Round trips found recently: .+ to .+ from [£$][\d,]+(, .+ to .+ from [£$][\d,]+)?\.$/);
  await expect(hero).toContainText("Prefer not to book online? Our team can book a flight for you.");
  await expect(hero).toContainText("Hotels and car hire are booked with our sister company, Wicket Travel Holidays.");
  const wa = hero.getByRole("link", { name: /Call or WhatsApp \+44 7417 564704/ });
  await expect(wa).toHaveAttribute("href", "https://wa.me/447417564704");
  await expect(wa).toHaveAttribute("target", "_blank");
  await expect(hero.getByRole("link", { name: /Review us on Trustpilot/ })).toHaveAttribute("href", "https://www.trustpilot.com/review/walletflights.com");
});

test("headline sits on one line on desktop", async ({ page, isMobile }) => {
  test.skip(isMobile, "wraps on phones by design");
  await page.goto("/");
  const h1 = page.getByRole("heading", { level: 1 });
  const { lines, overflow } = await h1.evaluate((el) => ({
    lines: Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)),
    overflow: el.scrollWidth - el.clientWidth,
  }));
  expect(lines).toBe(1);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("airport suggestions span regions, and any airport in the world can be searched", async ({ page }) => {
  await page.goto("/");
  const to = page.getByRole("combobox", { name: "Going to" });
  await to.focus();
  await expect(page.getByRole("option", { name: /Dubai/ })).toBeVisible();
  await expect(page.getByRole("option", { name: /London/ })).toBeVisible();
  // Not in the built-in list: comes from /api/places (stubbed in fixtures.ts).
  await to.fill("karachi");
  await page.getByRole("option", { name: /Karachi.*Pakistan/ }).click();
  await expect(to).toHaveValue("Karachi (KHI)");
  const form = page.getByRole("form", { name: "Search flights" });
  await form.getByLabel("Departing").fill("2030-05-01");
  await form.getByLabel("Returning").fill("2030-05-09");
  await form.getByRole("button", { name: "Search flights" }).click();
  await expect(page).toHaveURL(/to0=KHI.*to0label=Karachi%7CAll\+airports%7CPakistan/);
});

test("places API returns airports worldwide", async ({ request }) => {
  const res = await request.get("/api/places?q=karachi");
  expect(res.ok()).toBe(true);
  const list = (await res.json()) as { code: string; country: string }[];
  // Live upstream: when it's unavailable the answer is empty and must not be cached.
  if (list.length === 0) expect(res.headers()["cache-control"]).toBe("no-store");
  else expect(list[0]).toMatchObject({ code: "KHI", country: "Pakistan" });
  expect(await (await request.get("/api/places?q=k")).json()).toEqual([]);
});

test("back to top button appears after scrolling and returns to the top", async ({ page }) => {
  await page.goto("/");
  const btn = page.getByRole("button", { name: "Back to top" });
  await expect(btn).toBeHidden();
  await page.evaluate(() => window.scrollTo({ top: 3000, behavior: "instant" }));
  await expect(btn).toBeVisible();
  await btn.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(btn).toBeHidden();
  // A mouse click doesn't bring up the skip link (owner's report, 16 Oct 2026).
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect.poll(() => skip.evaluate((el) => el.getBoundingClientRect().width)).toBeLessThanOrEqual(1);
});

test("back to top from the keyboard moves focus to the top, where the skip link shows", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard flow");
  await page.goto("/");
  await page.evaluate(() => window.scrollTo({ top: 3000, behavior: "instant" }));
  const btn = page.getByRole("button", { name: "Back to top" });
  await expect(btn).toBeVisible();
  await btn.focus();
  await page.keyboard.press("Enter");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect.poll(() => skip.evaluate((el) => el.getBoundingClientRect().width)).toBeGreaterThan(50);
});

test("desktop search is one joined bar with travellers inside", async ({ page, isMobile }) => {
  test.skip(isMobile, "joined bar is desktop only");
  await page.goto("/");
  // Measure once the hero has finished sliding in, all boxes in one frame.
  await page.evaluate(() => Promise.all(document.getAnimations().filter((a) => a.effect?.getComputedTiming().iterations !== Infinity).map((a) => a.finished)));
  const boxes = await page.evaluate(() => {
    const f = document.querySelector('form[aria-label="Search flights"]')!;
    const box = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { top: r.top, height: r.height, x: r.x };
    };
    return {
      from: box(f.querySelector('[role="combobox"]')!.closest(".h-16")!),
      travellers: box([...f.querySelectorAll("button")].find((b) => /1 traveller, Economy/.test(b.textContent ?? ""))!),
      search: box(f.querySelector('button[type="submit"]')!),
    };
  });
  // Same row, same height: the fields and the button line up exactly (client feedback).
  for (const k of ["from", "travellers"] as const) {
    expect(Math.abs(boxes[k].top - boxes.search.top), k).toBeLessThanOrEqual(1);
    expect(Math.abs(boxes[k].height - boxes.search.height), k).toBeLessThanOrEqual(1);
  }
  expect(boxes.travellers.x).toBeLessThan(boxes.search.x);
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

test("fare alert form validates and asks for confirmation (no weekly-email promise)", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.getByRole("heading", { name: "Get fare alerts in your inbox" }) });
  await expect(section).toContainText("coming soon");
  await expect(section).not.toContainText(/a week/);
  await section.getByRole("button", { name: "Sign up" }).click();
  await expect(section.getByRole("alert")).toHaveText(/Enter an email address/);
  await section.getByLabel("Email address").fill("traveller@example.com");
  await page.waitForTimeout(1600); // the API ignores sign-ups faster than a person could type
  await section.getByRole("button", { name: "Sign up" }).click();
  await expect(section.getByRole("status")).toContainText("Check your inbox");
});

test("fare alerts are double opt-in, and bots get nothing", async ({ page, request }) => {
  const res = await request.post("/api/fare-alerts", { data: { email: "traveller@example.com", startedAt: Date.now() - 5000 } });
  expect(res.status()).toBe(202);
  const { link } = await res.json();
  expect(link).toMatch(/\/fare-alerts\/confirm\?t=/);
  await page.goto(link);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Confirm your fare alerts");
  await page.getByRole("button", { name: "Confirm my email" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("You’re on the list");

  // A forged or edited link is refused.
  await page.goto(`${link}x`);
  await page.getByRole("button", { name: "Confirm my email" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This link has expired");

  // Honeypot filled, or submitted instantly: looks fine to the bot, but no email goes out.
  for (const data of [{ email: "bot@example.com", company: "Acme", startedAt: Date.now() - 5000 }, { email: "bot@example.com", startedAt: Date.now() }]) {
    const bot = await request.post("/api/fare-alerts", { data });
    expect(bot.status()).toBe(202);
    expect((await bot.json()).link).toBeUndefined();
  }
});

test("mobile menu opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "drawer is mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const drawer = page.getByRole("dialog", { name: "Menu" });
  await expect(drawer.getByRole("link", { name: "Deals" })).toBeVisible();
  // The page behind the drawer is out of reach while it's open.
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await expect(page.locator("footer")).toHaveAttribute("inert", "");
  await page.keyboard.press("Escape");
  await expect(drawer).toHaveCount(0);
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  if (await page.locator("#board-title").count()) {
    await page.locator("#board-title").scrollIntoViewIfNeeded();
    await page.waitForTimeout(3200); // let the fare board settle
  }
  // Let entrance animations finish, so contrast is measured on final colours.
  await page.evaluate(() => Promise.all(document.getAnimations().filter((a) => a.effect?.getComputedTiming().iterations !== Infinity).map((a) => a.finished)));
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`)).toEqual([]);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("fare board shows final fares immediately", async ({ page }) => {
    await page.goto("/");
    test.skip((await page.locator("#board-title").count()) === 0, "no fares in this environment, so no board");
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

test("airline logos drift left to right, each named once for screen readers", async ({ page }) => {
  await page.goto("/");
  const strip = page.getByRole("region", { name: "Airlines we compare" });
  await expect(strip.getByRole("img", { name: "Emirates" })).toHaveCount(1);
  await expect(strip.getByRole("img", { name: "British Airways" })).toHaveAttribute("src", "https://pics.avs.io/240/80/BA@2x.png");
  await expect(page.getByText("Compare fares from these airlines and hundreds more")).toBeVisible();
  const track = strip.locator(".marquee-track");
  const x = async () => (await track.boundingBox())!.x;
  const before = await x();
  await page.waitForTimeout(600);
  expect(await x()).toBeGreaterThan(before);

  // Keyboard and touch users can stop it (WCAG 2.2.2).
  await page.getByRole("button", { name: "Pause airlines we compare" }).click();
  await expect(page.getByRole("button", { name: "Play airlines we compare" })).toBeVisible();
  await page.mouse.move(0, 0); // hover pauses it too; take that out of the picture
  const stopped = await x();
  await page.waitForTimeout(600);
  expect(await x()).toBe(stopped);
});

test("reviews show only real Trustpilot reviews, otherwise invite one", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.getByRole("heading", { name: "What travellers say" }) });
  // No reviews yet: no stars or score anywhere, just links to the profile.
  await expect(section.getByRole("img", { name: /Rated/ })).toHaveCount(0);
  await expect(section.getByRole("link", { name: /Write a review on Trustpilot/ })).toHaveAttribute("href", "https://www.trustpilot.com/review/walletflights.com");
  // Nothing to read yet, so the header link doesn't promise reviews.
  await expect(section.getByRole("link", { name: /Find us on Trustpilot/ })).toBeVisible();
  await expect(section.getByText("Read our reviews")).toHaveCount(0);
});
