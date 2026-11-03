import { destinationBySlug, type Destination } from "./destinations";
import { formatMoney, moneySymbol, type DisplayCurrency } from "@/lib/currency";

// Featured routes: an editorial choice of where we show fares from each
// departure city. There are no prices here — fares come from the Aviasales
// Data API (src/lib/travelpayouts.ts) and are hidden when none was found.

export type Currency = "USD" | "GBP";
export type Origin = {
  /** Airport/city code used for searches on /flights. */
  code: string;
  /** City code for the Data API (cities aggregate all their airports). */
  apiCode: string;
  city: string;
  slug: string;
  currency: Currency;
  country: "United States" | "United Kingdom";
};

export const origins: Origin[] = [
  { code: "NYC", apiCode: "NYC", city: "New York", slug: "new-york", currency: "USD", country: "United States" },
  { code: "LON", apiCode: "LON", city: "London", slug: "london", currency: "GBP", country: "United Kingdom" },
  { code: "LAX", apiCode: "LAX", city: "Los Angeles", slug: "los-angeles", currency: "USD", country: "United States" },
  { code: "MAN", apiCode: "MAN", city: "Manchester", slug: "manchester", currency: "GBP", country: "United Kingdom" },
  { code: "ORD", apiCode: "CHI", city: "Chicago", slug: "chicago", currency: "USD", country: "United States" },
  { code: "ATL", apiCode: "ATL", city: "Atlanta", slug: "atlanta", currency: "USD", country: "United States" },
];
export const originByCode = Object.fromEntries(origins.map((o) => [o.code, o])) as Record<string, Origin>;

const table: Record<string, string[]> = {
  NYC: ["london", "lisbon", "cancun", "rome", "tokyo", "dubai", "delhi"],
  LAX: ["tokyo", "mexico-city", "sydney", "bangkok", "london", "bali"],
  ORD: ["paris", "cancun", "istanbul", "barcelona", "delhi", "tokyo"],
  LON: ["new-york", "dubai", "lisbon", "rome", "delhi", "cape-town"],
  MAN: ["barcelona", "dubai", "new-york", "istanbul", "bangkok", "cancun"],
  ATL: ["paris", "rome", "cape-town", "cancun", "cairo", "singapore"],
};

export type Route = {
  /** "london-to-lisbon" — also the /routes/[slug] path. */
  slug: string;
  origin: Origin;
  destination: Destination;
};

export const routes: Route[] = Object.entries(table).flatMap(([code, slugs]) =>
  slugs.map((s) => {
    const origin = originByCode[code];
    return { slug: `${origin.slug}-to-${s}`, origin, destination: destinationBySlug[s] };
  }),
);
export const routesByOrigin = Object.fromEntries(origins.map((o) => [o.code, routes.filter((r) => r.origin.code === o.code)])) as Record<string, Route[]>;

// Route pages (Growth proposal phase 2, pillar B, 3 Nov 2026): every pair of
// our 6 departure cities and 20 destinations gets a /routes page, published in
// waves so indexing can be checked between them. The featured routes above
// stay the ones with fares on the homepage and /deals (each fare is an API
// call); route pages are the wider set. A city never flies to itself, and
// Manchester to London is left out (it's a train journey, not a flight search).
const skipPairs = new Set(["MAN-london"]);

/**
 * Wave 1 (live 3 Nov 2026): the 27 pairs ranked by search demand in
 * docs/SEO-KEYWORD-RESEARCH.md (8.2), in that order, then 13 more with
 * strong UK/US demand (US cities to New York and London, New York long-haul).
 */
const wave1 = [
  "london-to-tokyo", "london-to-singapore", "london-to-paris", "new-york-to-paris", "london-to-bangkok",
  "london-to-sydney", "london-to-barcelona", "manchester-to-rome", "london-to-istanbul", "manchester-to-paris",
  "london-to-cairo", "new-york-to-sydney", "new-york-to-barcelona", "london-to-bali", "new-york-to-singapore",
  "new-york-to-istanbul", "los-angeles-to-paris", "london-to-cancun", "manchester-to-delhi", "manchester-to-lisbon",
  "manchester-to-tokyo", "chicago-to-rome", "los-angeles-to-dubai", "chicago-to-dubai", "new-york-to-cape-town",
  "london-to-mexico-city", "london-to-rio-de-janeiro",
  "new-york-to-bangkok", "new-york-to-bali", "new-york-to-mexico-city", "new-york-to-rio-de-janeiro", "new-york-to-cairo",
  "los-angeles-to-rome", "los-angeles-to-new-york", "chicago-to-london", "chicago-to-new-york", "atlanta-to-london",
  "atlanta-to-new-york", "manchester-to-singapore", "manchester-to-cairo",
];

/**
 * Waves whose route pages are published. Wave 2 is every remaining pair (40);
 * add 2 here once at least half of wave 1 shows "URL is on Google" in Search
 * Console (planned for early December 2026, see docs/HANDOFF.md).
 */
export const liveRouteWaves: number[] = [1];

const pair = (origin: Origin, destination: Destination): Route => ({ slug: `${origin.slug}-to-${destination.slug}`, origin, destination });
const featuredSlugs = new Set(routes.map((r) => r.slug));
const allPairs = origins.flatMap((o) =>
  Object.values(destinationBySlug)
    .filter((d) => d.cityCode !== o.apiCode && !skipPairs.has(`${o.code}-${d.slug}`))
    .map((d) => pair(o, d)),
);
const wave1Set = new Set(wave1);

/** Which wave a route page belongs to: 0 for the featured routes (live since 16 Oct 2026). */
export function routeWave(slug: string) {
  return featuredSlugs.has(slug) ? 0 : wave1Set.has(slug) ? 1 : 2;
}

/** Every possible route page, published or not (for tests and planning). */
export const allRoutePairs: Route[] = allPairs;

/** Published route pages: featured first, then the live waves in their ranked order. */
export const routePages: Route[] = [
  ...routes,
  ...wave1.flatMap((s) => allPairs.filter((r) => r.slug === s)),
  ...allPairs.filter((r) => routeWave(r.slug) === 2),
].filter((r) => routeWave(r.slug) === 0 || liveRouteWaves.includes(routeWave(r.slug)));

export const routeBySlug = Object.fromEntries(routePages.map((r) => [r.slug, r])) as Record<string, Route>;
/** Published route pages from each departure city, featured ones first. */
export const routePagesByOrigin = Object.fromEntries(origins.map((o) => [o.code, routePages.filter((r) => r.origin.code === o.code)])) as Record<string, Route[]>;
/** Published route pages to each destination (by destination slug). */
export const routePagesTo = (slug: string) => routePages.filter((r) => r.destination.slug === slug);

/** Both cities in the same country (US cities to New York): domestic rules apply. */
export const isDomestic = (r: Route) => r.destination.country === r.origin.country;

/** Key used for fare lookups: "<origin api code>-<destination api code>". */
export const routeKey = (r: Pick<Route, "origin" | "destination">) => `${r.origin.apiCode}-${r.destination.cityCode}`;

// Rows for the split-flap fare board. City label max 8 characters.
export const fareBoardRoutes = [
  { route: "london-to-new-york", city: "NEW YORK" },
  { route: "new-york-to-london", city: "LONDON" },
  { route: "manchester-to-dubai", city: "DUBAI" },
  { route: "los-angeles-to-tokyo", city: "TOKYO" },
  { route: "london-to-lisbon", city: "LISBON" },
  { route: "chicago-to-istanbul", city: "ISTANBUL" },
] as const;

// Any display currency: emails and price alerts can be in the visitor's own.
export const currencySymbol = (c: DisplayCurrency) => moneySymbol(c);
export const formatPrice = (amount: number, c: DisplayCurrency) => formatMoney(amount, c);
