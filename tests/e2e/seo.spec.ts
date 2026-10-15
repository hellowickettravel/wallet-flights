import { expect, test } from "@playwright/test";
import { legacyOwnerRedirects, legacyRedirects } from "../../src/content/legacy-redirects";

// Phase 1 of docs/IMPROVEMENT-PLAN.md: indexing foundations. Plain HTTP checks.
test.describe.configure({ mode: "parallel" });

const HOST = "https://www.walletflights.com";

const meta = (html: string, attr: "name" | "property", key: string) =>
  html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1];
const canonical = (html: string) => html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];

test("Search Console verification file is served", async ({ request }) => {
  const res = await request.get("/google4df2a790d730b8df.html");
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain("google-site-verification: google4df2a790d730b8df.html");
});

const pages = [
  "/",
  "/deals",
  "/destinations",
  "/destinations/london",
  "/routes/new-york-to-london",
  "/travel-guides",
  "/travel-guides/when-to-book-international-flights",
  "/airlines",
  "/about",
  "/contact",
  "/help",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/editorial-policy",
];

for (const path of pages) {
  test(`${path}: canonical and og:url agree, on www, with full share tags`, async ({ request }) => {
    const html = await (await request.get(path)).text();
    const url = path === "/" ? HOST : `${HOST}${path}`;
    expect(canonical(html)).toBe(url);
    expect(meta(html, "property", "og:url")).toBe(url);
    expect(meta(html, "property", "og:site_name")).toBe("Wallet Flights");
    expect(meta(html, "property", "og:title")).toBeTruthy();
    expect(meta(html, "property", "og:image")).toBeTruthy();
    expect(meta(html, "name", "twitter:image")).toBeTruthy();
    const description = meta(html, "name", "description") ?? "";
    expect(description.length).toBeGreaterThan(50);
    expect(description.length).toBeLessThanOrEqual(160);
    // Nothing points at the apex any more.
    expect(html).not.toMatch(/https:\/\/walletflights\.com/);
  });
}

test("destination share image is the city photo on both Open Graph and Twitter", async ({ request }) => {
  const html = await (await request.get("/destinations/london")).text();
  const og = meta(html, "property", "og:image");
  expect(og).toContain("images.unsplash.com");
  expect(meta(html, "name", "twitter:image")).toBe(og);
  expect(meta(html, "name", "description")).not.toContain("from New York and London");
});

test("404 and hand-off pages: own title, noindex, no canonical", async ({ request }) => {
  const missing = await request.get("/no-such-page");
  expect(missing.status()).toBe(404);
  const html = await missing.text();
  expect(html).toContain("<title>Page not found | Wallet Flights</title>");
  expect(meta(html, "name", "robots")).toContain("noindex");
  expect(canonical(html)).toBeUndefined();

  const go = await (await request.get("/go?to=x")).text();
  expect(meta(go, "name", "robots")).toContain("noindex");
  expect(canonical(go)).toBeUndefined();
});

test("robots.txt: www sitemap, exact /go block, /flights crawlable, AI crawlers named", async ({ request }) => {
  const txt = await (await request.get("/robots.txt")).text();
  expect(txt).toContain(`Sitemap: ${HOST}/sitemap.xml`);
  expect(txt).toContain("Disallow: /go$");
  expect(txt).toContain("Disallow: /api/");
  expect(txt).not.toContain("/flights");
  for (const bot of ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"]) expect(txt).toContain(bot);
});

test("sitemap: every URL on www with a lastmod date", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  // 35 core pages, plus route pages while they have fares.
  expect(urls.length).toBeGreaterThanOrEqual(35);
  for (const u of urls) {
    expect(u).toMatch(new RegExp(`<loc>${HOST.replace(/\./g, "\\.")}`));
    expect(u).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}/);
  }
});

test("old WordPress URLs redirect permanently to their new pages", async ({ request }) => {
  for (const { source, destination } of legacyRedirects) {
    const from = source.replace("/:path*", "/travel-guide");
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(res.headers().location, from).toBe(destination);
  }
  // With the old trailing slash: slash removed first, then the redirect.
  const slash = await request.get("/about-us/");
  expect(new URL(slash.url()).pathname).toBe("/about");
  for (const { source, destination } of legacyOwnerRedirects) {
    const res = await request.get(source, { maxRedirects: 0 });
    expect(res.status()).toBe(307);
    expect(res.headers().location).toBe(destination);
  }
});

test("the .vercel.app address redirects to the real domain", async ({ request }) => {
  const res = await request.get("/about", { headers: { host: "wallet-flights.vercel.app" }, maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers().location).toBe(`${HOST}/about`);
});

test("favicon and install icons are served", async ({ request }) => {
  for (const path of ["/favicon.ico", "/icon-192.png", "/icon-512.png", "/icon-maskable-512.png"]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  const manifest = await (await request.get("/manifest.webmanifest")).json();
  expect(manifest.icons.map((i: { sizes: string }) => i.sizes)).toEqual(expect.arrayContaining(["192x192", "512x512"]));
});

// Phase 2: structured data, AI search and on-page SEO.
const jsonLd = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
    const data = JSON.parse(m[1]);
    return data["@graph"] ?? [data];
  });

test("every FAQ and help answer is in the server HTML", async ({ request }) => {
  const help = await (await request.get("/help")).text();
  const helpFaq = jsonLd(help).find((d) => d["@type"] === "FAQPage");
  expect(helpFaq.mainEntity.length).toBeGreaterThan(10);
  const visible = help.replace(/<script[\s\S]*?<\/script>/g, "").replace(/&#x27;|&apos;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
  for (const q of helpFaq.mainEntity) expect(visible, q.name).toContain(q.acceptedAnswer.text.slice(0, 40));

  const home = await (await request.get("/")).text();
  const homeFaq = jsonLd(home).find((d) => d["@type"] === "FAQPage");
  const homeVisible = home.replace(/<script[\s\S]*?<\/script>/g, "").replace(/&#x27;|&apos;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
  for (const q of homeFaq.mainEntity) expect(homeVisible, q.name).toContain(q.acceptedAnswer.text.slice(0, 40));
});

test("one organisation entity, referenced by the website and articles", async ({ request }) => {
  const home = jsonLd(await (await request.get("/")).text());
  const org = home.find((d) => d["@type"] === "Organization");
  expect(org["@id"]).toBe(`${HOST}/#organization`);
  expect(org.logo.url).toBe(`${HOST}/icon-512.png`);
  expect(org.contactPoint.telephone).toBe("+447417564704");
  expect(org.sameAs).toContain("https://www.trustpilot.com/review/walletflights.com");
  expect(org.legalName).toBe("Wicket Travel Limited");
  expect(org.identifier.value).toBe("17001759");
  expect(org.sameAs).toContain("https://find-and-update.company-information.service.gov.uk/company/17001759");
  expect(org.publishingPrinciples).toBe(`${HOST}/editorial-policy`);
  expect(home.find((d) => d["@type"] === "WebSite").publisher["@id"]).toBe(org["@id"]);

  const guide = jsonLd(await (await request.get("/travel-guides/when-to-book-international-flights")).text()).find((d) => d["@type"] === "Article");
  expect(guide.author["@id"]).toBe(org["@id"]);
  expect(guide.publisher["@id"]).toBe(org["@id"]);
  expect(guide.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}T/);

  const dest = jsonLd(await (await request.get("/destinations/london")).text());
  const crumbs = dest.find((d) => d["@type"] === "BreadcrumbList");
  expect(crumbs.itemListElement.map((i: { name: string }) => i.name)).toEqual(["Home", "Destinations", "London"]);
});

test("llms.txt and llms-full.txt describe the site in plain text", async ({ request }) => {
  const short = await request.get("/llms.txt");
  expect(short.status()).toBe(200);
  expect(short.headers()["content-type"]).toContain("text/plain");
  const txt = await short.text();
  expect(txt).toMatch(/^# Wallet Flights\n\n> /);
  expect(txt).toContain(`(${HOST}/destinations/london)`);
  expect(txt).toContain(`(${HOST}/llms-full.txt)`);
  expect(txt).not.toMatch(/travelpayouts|aviasales/i);
  const full = await (await request.get("/llms-full.txt")).text();
  expect(full).toContain("## Help centre");
  expect(full).toContain("Best time to visit:");
});

test("destination pages: keyword H1, region-mates, approximate flying time", async ({ page }) => {
  await page.goto("/destinations/london");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Flights to London");
  await expect(page.getByText("Approx. flying time")).toBeVisible();
  await page.goto("/destinations/delhi");
  await expect(page.getByRole("heading", { name: "More in Asia & Pacific" })).toBeVisible();
});

test("route pages: linked from /deals, indexable only when they appear in the sitemap", async ({ request }) => {
  const deals = await (await request.get("/deals")).text();
  const routeLinks = new Set([...deals.matchAll(/href="(\/routes\/[^"]+)"/g)].map((m) => m[1]));
  expect(routeLinks.size).toBeGreaterThanOrEqual(30);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of ["/routes/new-york-to-london", "/routes/london-to-lisbon"]) {
    const html = await (await request.get(path)).text();
    const noindex = (meta(html, "name", "robots") ?? "").includes("noindex");
    expect(sitemap.includes(`${HOST}${path}<`), path).toBe(!noindex);
  }
});

test("guides link the destinations they mention", async ({ request }) => {
  const html = await (await request.get("/travel-guides/europe-shoulder-season")).text();
  expect(html).toContain('href="/destinations/lisbon"');
  expect(html).toMatch(/\d+ min read/);
});
