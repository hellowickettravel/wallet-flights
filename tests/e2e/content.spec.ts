import { expect, test } from "@playwright/test";
import { guides, pageCount } from "../../src/content/guides";

// SEO and AI-search pass (Oct 2026): answer-first Q&A with FAQPage markup on
// route and destination pages, CollectionPage markup on hubs, the travel
// guides hub with pagination, and the guide template.
test.describe.configure({ mode: "parallel" });

const HOST = "https://www.walletflights.com";
const meta = (html: string, key: string) => html.match(new RegExp(`<meta name="${key}" content="([^"]*)"`))?.[1];
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

test("route pages are indexable, listed in the sitemap and answer the flight-time question", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of ["/routes/london-to-dubai", "/routes/new-york-to-london", "/routes/manchester-to-bangkok"]) {
    const html = await (await request.get(path)).text();
    expect(meta(html, "robots") ?? "", path).not.toContain("noindex");
    expect(sitemap, path).toContain(`<loc>${HOST}${path}</loc>`);
    expect(html).toMatch(/<title>[^<]+ to [^<]+ flight time(, distance and fares| and distance) \| Wallet Flights<\/title>/);
    expect((meta(html, "description") ?? "").length).toBeLessThanOrEqual(160);
    const faq = jsonLd(html).find((d) => d["@type"] === "FAQPage");
    expect(faq.mainEntity.length, path).toBeGreaterThanOrEqual(6);
    expect(faq.mainEntity[0].name).toMatch(/^How long is the flight from .+ to .+\?$/);
    for (const q of faq.mainEntity) expect(visible(html), q.name).toContain(q.acceptedAnswer.text.slice(0, 50));
  }
});

test("destination pages answer best time, airport, flight time and visa questions in FAQPage markup", async ({ request }) => {
  const html = await (await request.get("/destinations/tokyo")).text();
  const faq = jsonLd(html).find((d) => d["@type"] === "FAQPage");
  expect(faq.mainEntity.map((q: { name: string }) => q.name)).toEqual([
    "When is the best time to visit Tokyo?",
    "Which airport do I fly into for Tokyo?",
    "How long is the flight to Tokyo from the UK and US?",
    "Do I need a visa to visit Japan?",
  ]);
  for (const q of faq.mainEntity.slice(1, 3)) expect(visible(html)).toContain(q.acceptedAnswer.text.slice(0, 50));
  expect(html).toContain("<title>Tokyo flights: best time to visit and fares | Wallet Flights</title>");
});

test("hub pages describe themselves as collections of their pages", async ({ request }) => {
  for (const [path, min] of [
    ["/destinations", 20],
    ["/deals", 30],
    ["/airlines", 10],
    ["/travel-guides", guides.length],
  ] as const) {
    const page = jsonLd(await (await request.get(path)).text()).find((d) => d["@type"] === "CollectionPage");
    expect(page, path).toBeTruthy();
    expect(page.isPartOf["@id"]).toBe(`${HOST}/#website`);
    expect(page.mainEntity.itemListElement.length, path).toBeGreaterThanOrEqual(min);
  }
  expect(jsonLd(await (await request.get("/about")).text()).some((d) => d["@type"] === "AboutPage")).toBe(true);
  expect(jsonLd(await (await request.get("/contact")).text()).some((d) => d["@type"] === "ContactPage")).toBe(true);
});

test("travel guides hub: features, topics, and crawlable page links", async ({ page }) => {
  await page.goto("/travel-guides");
  await expect(page.getByRole("heading", { level: 1, name: "Travel guides" })).toBeVisible();
  // Every guide is linked from the hub's first page (features, grid or topic board).
  for (const g of guides) await expect(page.locator(`main a[href="/travel-guides/${g.slug}"]`).first(), g.slug).toBeAttached();
  await expect(page.getByRole("heading", { level: 2, name: "Browse by topic" })).toBeVisible();
  const target = await page.getByRole("navigation", { name: "Guide topics" }).getByRole("link").first().getAttribute("href");
  await expect(page.locator(target!)).toBeAttached();
  if (pageCount > 1) {
    const pages = page.getByRole("navigation", { name: "Guide pages" });
    await expect(pages.getByRole("link", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
    await pages.getByRole("link", { name: "Older" }).click();
    await expect(page).toHaveURL(/\/travel-guides\/page\/2$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Travel guides, page 2");
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute("href", `${HOST}/travel-guides/page/2`);
  }
});

// Unknown params render the not-found page with noindex. Like every dynamic
// route here (/routes/x, /destinations/x), the status is 200 once streaming has
// started; page 2 is a real 404 because it's prerendered.
test("travel guide list pages that don't exist show the not-found page, noindex", async ({ request }) => {
  for (const path of ["/travel-guides/page/1", `/travel-guides/page/${pageCount + 1}`, "/travel-guides/page/02"]) {
    const res = await request.get(path);
    const html = await res.text();
    // Prerendered misses are real 404s; streamed ones show the not-found page.
    if (res.status() !== 404) expect(html, path).toContain("<title>Page not found | Wallet Flights</title>");
    expect(meta(html, "robots") ?? "", path).toContain("noindex");
  }
});

test("guide template: short answer, FAQ, share links, related guides and BlogPosting markup", async ({ page, request }) => {
  const slug = "carry-on-only-checklist";
  await page.goto(`/travel-guides/${slug}`);
  await expect(page.getByRole("heading", { level: 2, name: "The short answer" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Questions people ask" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Share on WhatsApp (opens in a new tab)" })).toHaveAttribute("href", /^https:\/\/wa\.me\/\?text=/);
  await expect(page.getByRole("heading", { level: 2, name: "Keep reading" })).toBeVisible();

  const data = jsonLd(await (await request.get(`/travel-guides/${slug}`)).text());
  const post = data.find((d) => d["@type"] === "BlogPosting");
  expect(post.isPartOf["@id"]).toBe(`${HOST}/travel-guides#blog`);
  expect(post.wordCount).toBeGreaterThan(900);
  expect(post.articleSection).toBe("Baggage and packing");
  expect(data.find((d) => d["@type"] === "FAQPage").mainEntity.length).toBeGreaterThanOrEqual(3);
  expect(data.find((d) => d["@type"] === "BreadcrumbList").itemListElement).toHaveLength(3);
});

test("every guide: meta description and title fit, sources listed, FAQ questions on the page", async ({ request }) => {
  for (const g of guides) {
    expect(g.excerpt.length, g.slug).toBeGreaterThanOrEqual(110);
    expect(g.excerpt.length, g.slug).toBeLessThanOrEqual(160);
    expect((g.seoTitle ?? g.title).length, g.slug).toBeLessThanOrEqual(62);
    expect(g.sources?.length ?? 0, g.slug).toBeGreaterThanOrEqual(2);
    const html = visible(await (await request.get(`/travel-guides/${g.slug}`)).text());
    for (const f of g.faqs ?? []) expect(html, f.q).toContain(f.q);
  }
});

// Wave 1 posts (docs/SEO-CONTENT-PLAN.md).
const wave1 = [
  "power-bank-rules-on-planes",
  "24-hour-flight-cancellation-rule",
  "flight-cancelled-or-delayed-rights",
  "uk-airport-liquids-rules",
  "self-transfer-separate-tickets",
  "ees-etias-uk-us-travellers",
];

test("wave 1 guides: live, in the sitemap, with a short answer, an FAQ and official sources", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const slug of wave1) {
    const g = guides.find((x) => x.slug === slug);
    expect(g, slug).toBeTruthy();
    expect(g!.summary?.length ?? 0, slug).toBeGreaterThanOrEqual(3);
    expect(g!.faqs?.length ?? 0, slug).toBeGreaterThanOrEqual(4);
    for (const s of g!.sources ?? []) expect(s.url, slug).toMatch(/^https:\/\/(www\.)?(gov\.uk|caa\.co\.uk|tsa\.gov|faa\.gov|transportation\.gov|legislation\.gov\.uk|esta\.cbp\.dhs\.gov|travel-europe\.europa\.eu|home-affairs\.ec\.europa\.eu|heathrow\.com|gatwickairport\.com|birminghamairport\.co\.uk|edinburghairport\.com|manchesterairport\.co\.uk|stanstedairport\.com)\//);
    expect(sitemap, slug).toContain(`<loc>${HOST}/travel-guides/${slug}</loc>`);
    const res = await request.get(`/travel-guides/${slug}`);
    expect(res.status(), slug).toBe(200);
    // Internal links inside the text all point at pages that exist.
    for (const href of new Set([...(await res.text()).matchAll(/href="(\/(?:travel-guides|routes|destinations)\/[^"#]+)"/g)].map((m) => m[1]))) {
      expect((await request.get(href)).status(), `${slug} → ${href}`).toBe(200);
    }
  }
});

test("route pages link the guides that matter before you fly", async ({ page }) => {
  await page.goto("/routes/london-to-lisbon");
  const uk = page.locator("section", { has: page.getByRole("heading", { name: "Before you fly" }) });
  await expect(uk.getByRole("link", { name: "Liquids rules at UK airports in 2026" })).toHaveAttribute("href", "/travel-guides/uk-airport-liquids-rules");
  await expect(uk.getByRole("link", { name: "EES and ETIAS for UK and US travellers" })).toBeVisible();
  await page.goto("/routes/new-york-to-tokyo");
  await expect(page.getByRole("link", { name: "The 24-hour flight cancellation rule" })).toHaveAttribute("href", "/travel-guides/24-hour-flight-cancellation-rule");
});
