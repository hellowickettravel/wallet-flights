import { test, expect } from "./fixtures";
import { allRoutePairs, liveRouteWaves, routePages, routeWave, routes } from "../../src/content/deals";
import { destinationDepth } from "../../src/content/destination-depth";
import { destinations } from "../../src/content/destinations";
import { guideBySlug } from "../../src/content/guides";

// Growth proposal phase 2 (3 Nov 2026): route pages for every pair of our 6
// departure cities and 20 destinations, published in waves; deeper destination
// guides; the /routes hub; click-out measurement.
const HOST = "https://walletflights.com";
const liveSlugs = new Set(routePages.map((r) => r.slug));
const jsonLd = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
    const data = JSON.parse(m[1]);
    return data["@graph"] ?? [data];
  });
const visible = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<!-- -->/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');

test.describe("route matrix", () => {
  test("covers every pair once, in the planned waves", () => {
    expect(allRoutePairs).toHaveLength(156); // 8 × 20, less the two home cities and Manchester and Birmingham to London
    expect(new Set(allRoutePairs.map((r) => r.slug)).size).toBe(156);
    expect(allRoutePairs.length - routes.length).toBeGreaterThanOrEqual(100); // the proposal's "100+ new route pages"
    // Featured routes keep their slugs and are all in the matrix.
    for (const r of routes) expect(routeWave(r.slug), r.slug).toBe(0);
    expect(allRoutePairs.filter((r) => routeWave(r.slug) === 1)).toHaveLength(40);
    expect(allRoutePairs.filter((r) => routeWave(r.slug) === 2)).toHaveLength(79);
    const live = 37 + (liveRouteWaves.includes(1) ? 40 : 0) + (liveRouteWaves.includes(2) ? 79 : 0);
    expect(routePages).toHaveLength(live);
  });

  test("published routes are in the sitemap and the hub; unpublished ones are not", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const hub = await (await request.get("/routes")).text();
    expect(sitemap).toContain(`<loc>${HOST}/routes</loc>`);
    for (const r of routePages) {
      expect(sitemap, r.slug).toContain(`<loc>${HOST}/routes/${r.slug}</loc>`);
      expect(hub, r.slug).toContain(`href="/routes/${r.slug}"`);
    }
    for (const r of allRoutePairs.filter((x) => !liveSlugs.has(x.slug))) {
      expect(sitemap, r.slug).not.toContain(`/routes/${r.slug}<`);
      expect(hub, r.slug).not.toContain(`href="/routes/${r.slug}"`);
    }
    const ld = jsonLd(hub).find((d) => d["@type"] === "CollectionPage");
    expect(ld.mainEntity.numberOfItems).toBe(routePages.length);
  });

  test("an unpublished route shows the not-found page, noindex", async ({ request }) => {
    const unpublished = allRoutePairs.find((r) => !liveSlugs.has(r.slug));
    test.skip(!unpublished, "every wave is live");
    const html = await (await request.get(`/routes/${unpublished!.slug}`)).text();
    expect(html).toContain("noindex");
    expect(html).not.toContain(`Flights from ${unpublished!.origin.city} to ${unpublished!.destination.city}</h1>`);
  });

  test("a wave 1 route answers the route questions and links to related routes", async ({ request }) => {
    const html = await (await request.get("/routes/london-to-tokyo")).text();
    const faq = jsonLd(html).find((d) => d["@type"] === "FAQPage");
    expect(faq.mainEntity[0].name).toBe("How long is the flight from London to Tokyo?");
    expect(html).toContain('href="/routes/new-york-to-tokyo"'); // same destination, another city
    expect(html).toContain('href="/routes/london-to-singapore"'); // same city, another destination
    const crumbs = jsonLd(html).find((d) => d["@type"] === "BreadcrumbList");
    expect(crumbs.itemListElement.map((c: { name: string }) => c.name)).toEqual(["Home", "Routes", "London to Tokyo"]);
  });

  test("US cities to New York use the domestic refund rule and skip the entry question", async ({ request }) => {
    const html = await (await request.get("/routes/chicago-to-new-york")).text();
    const faq = jsonLd(html).find((d) => d["@type"] === "FAQPage");
    const names: string[] = faq.mainEntity.map((q: { name: string }) => q.name);
    expect(names.some((n) => n.startsWith("What do I need to enter the country"))).toBe(false);
    expect(visible(html)).toContain("On flights within the US, leaving 3 hours or more earlier");
  });

  test("UK cities to New York link the ESTA guide", async ({ request }) => {
    const html = await (await request.get("/routes/manchester-to-new-york")).text();
    expect(html).toContain('href="/travel-guides/esta-and-uk-eta"');
  });
});

test.describe("destination guides, phase 2", () => {
  test("every destination has its depth content, and the guides it links exist", () => {
    for (const d of destinations) {
      const depth = destinationDepth[d.slug];
      expect(depth, d.slug).toBeTruthy();
      expect(depth.weather, d.slug).toMatch(/^[BGM]{12}$/);
      expect(depth.itinerary.length, d.slug).toBeGreaterThanOrEqual(3);
      expect(depth.neighbourhoods.length, d.slug).toBeGreaterThanOrEqual(3);
      expect(depth.airports.length, d.slug).toBeGreaterThanOrEqual(1);
      expect(depth.faqs.length, d.slug).toBeGreaterThanOrEqual(2);
      for (const g of depth.guides) expect(guideBySlug[g], `${d.slug} → ${g}`).toBeTruthy();
      // A fare is never shown without the page it came from.
      for (const t of depth.airports.flatMap((a) => a.transfers)) if (t.fare) expect(t.fare.source.url, `${d.slug} ${t.name}`).toMatch(/^https:\/\//);
    }
  });

  for (const slug of ["london", "tokyo", "cusco"]) {
    test(`${slug}: 10+ visible FAQs in FAQPage markup, a 3-day plan, and routes from every city`, async ({ request }) => {
      const html = await (await request.get(`/destinations/${slug}`)).text();
      const graph = jsonLd(html);
      const faq = graph.find((d) => d["@type"] === "FAQPage");
      expect(faq.mainEntity.length).toBeGreaterThanOrEqual(10);
      for (const q of faq.mainEntity) expect(visible(html), q.name).toContain(q.acceptedAnswer.text.slice(0, 40));
      const trip = graph.find((d) => d["@type"] === "TouristTrip");
      expect(trip.itinerary.itemListElement).toHaveLength(3);
      expect(graph.find((d) => d["@type"] === "TouristDestination")).toBeTruthy();
      // Eight departure cities, less the city itself (and the UK cities for London).
      const city = destinations.find((d) => d.slug === slug)!;
      const links = [...html.matchAll(/href="(\/routes\/[^"]+-to-[^"]+)"/g)].map((m) => m[1]).filter((h) => h.endsWith(`-to-${slug}`));
      const search = (html.match(new RegExp(`destination_${slug}_from_`, "g")) ?? []).length;
      expect(new Set(links).size + search, city.city).toBeGreaterThanOrEqual(slug === "london" ? 5 : 8);
    });
  }

  test("London shows its airport transfers with sourced fares", async ({ page }) => {
    await page.goto("/destinations/london");
    const section = page.getByRole("region", { name: "Getting from the airport to London" });
    await expect(section.getByRole("heading", { name: /Heathrow/ })).toBeVisible();
    await expect(section.getByText(/^Train: Heathrow Express$/)).toBeAttached();
    await expect(section.getByRole("link", { name: /^Source\s*: Heathrow Express/ })).toHaveAttribute("href", /heathrowexpress\.com/);
    await expect(page.getByRole("region", { name: "London month by month" }).locator("ol").first().locator("> li")).toHaveCount(12);
  });
});

test.describe("click-out measurement", () => {
  test.use({ consent: "analytics" });

  test("links into the fare search send a fare_search event with the placement", async ({ page }) => {
    await page.goto("/destinations/cusco");
    await expect.poll(() => page.evaluate(() => typeof (window as unknown as { gtag?: unknown }).gtag)).toBe("function");
    const link = page.locator('a[href*="destination_cusco_from_"]').first();
    await link.evaluate((a) => a.addEventListener("click", (e) => e.preventDefault()));
    await link.click();
    const events = await page.evaluate(() =>
      ((window as unknown as { dataLayer: IArguments[] }).dataLayer ?? []).map((a) => Array.from(a)).filter((a) => a[0] === "event"),
    );
    expect(events).toContainEqual(["event", "fare_search", expect.objectContaining({ placement: expect.stringContaining("destination_cusco_from_"), page_path: "/destinations/cusco" })]);
  });

  test("no events without analytics consent", async ({ browser, baseURL }) => {
    const ctx = await browser.newContext();
    await ctx.addCookies([{ name: "wf_consent", value: `s0.a0.${Date.now()}`, url: baseURL! }]);
    const page = await ctx.newPage();
    await page.goto("/destinations/cusco");
    expect(await page.evaluate(() => typeof (window as unknown as { gtag?: unknown }).gtag)).toBe("undefined");
    await ctx.close();
  });
});
