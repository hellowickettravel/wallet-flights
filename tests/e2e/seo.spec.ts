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
  expect(urls.length).toBeGreaterThan(60);
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
