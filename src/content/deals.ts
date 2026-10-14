import { destinationBySlug, type Destination } from "./destinations";

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
};

export const origins: Origin[] = [
  { code: "NYC", apiCode: "NYC", city: "New York", slug: "new-york", currency: "USD" },
  { code: "LON", apiCode: "LON", city: "London", slug: "london", currency: "GBP" },
  { code: "LAX", apiCode: "LAX", city: "Los Angeles", slug: "los-angeles", currency: "USD" },
  { code: "MAN", apiCode: "MAN", city: "Manchester", slug: "manchester", currency: "GBP" },
  { code: "ORD", apiCode: "CHI", city: "Chicago", slug: "chicago", currency: "USD" },
  { code: "ATL", apiCode: "ATL", city: "Atlanta", slug: "atlanta", currency: "USD" },
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
export const routeBySlug = Object.fromEntries(routes.map((r) => [r.slug, r])) as Record<string, Route>;

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

const symbols: Record<Currency, string> = { USD: "$", GBP: "£" };
export const currencySymbol = (c: Currency) => symbols[c];

const formatters: Record<Currency, Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
  GBP: new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }),
};
export const formatPrice = (amount: number, c: Currency) => formatters[c].format(amount);
