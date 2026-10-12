import { destinationBySlug, type Destination } from "./destinations";

// Example fares for the homepage rail and fare board.
// Prices are illustrative round-trip economy fares per person, in the
// departure city's currency, and are labelled as examples in the UI.
// Replace with live data from the comparison feed when available.

export type Currency = "USD" | "GBP";
export type Origin = { code: string; city: string; currency: Currency };

export const origins: Origin[] = [
  { code: "NYC", city: "New York", currency: "USD" },
  { code: "LON", city: "London", currency: "GBP" },
  { code: "LAX", city: "Los Angeles", currency: "USD" },
  { code: "MAN", city: "Manchester", currency: "GBP" },
  { code: "ORD", city: "Chicago", currency: "USD" },
  { code: "ATL", city: "Atlanta", currency: "USD" },
];

export type Deal = {
  id: string;
  origin: string;
  destination: Destination;
  price: number;
  currency: Currency;
  travel: string; // travel window
  stops: 0 | 1 | 2;
};

const table: Record<string, [slug: string, price: number, travel: string, stops: 0 | 1 | 2][]> = {
  NYC: [
    ["london", 489, "Jan – Mar", 0],
    ["lisbon", 467, "Feb – Apr", 0],
    ["cancun", 289, "Jan – May", 0],
    ["rome", 548, "Mar – May", 0],
    ["tokyo", 812, "Feb – Apr", 0],
    ["dubai", 689, "Jan – Mar", 0],
    ["delhi", 812, "Jan – Mar", 0],
  ],
  LAX: [
    ["tokyo", 698, "Jan – Mar", 0],
    ["mexico-city", 268, "Feb – May", 0],
    ["sydney", 1094, "Apr – Jun", 0],
    ["bangkok", 745, "Feb – Apr", 1],
    ["london", 579, "Jan – Mar", 0],
    ["bali", 912, "Apr – Jun", 1],
  ],
  ORD: [
    ["paris", 538, "Jan – Mar", 0],
    ["cancun", 318, "Jan – Apr", 0],
    ["istanbul", 618, "Feb – Apr", 0],
    ["barcelona", 559, "Mar – May", 1],
    ["delhi", 829, "Jan – Mar", 0],
    ["tokyo", 864, "Feb – Apr", 0],
  ],
  LON: [
    ["new-york", 389, "Jan – Mar", 0],
    ["dubai", 418, "Feb – Apr", 0],
    ["lisbon", 98, "Mar – May", 0],
    ["rome", 112, "Mar – May", 0],
    ["delhi", 529, "Jan – Mar", 0],
    ["cape-town", 689, "Feb – Apr", 0],
  ],
  MAN: [
    ["barcelona", 104, "Apr – Jun", 0],
    ["dubai", 436, "Jan – Mar", 0],
    ["new-york", 412, "Mar – May", 0],
    ["istanbul", 189, "Apr – Jun", 0],
    ["bangkok", 612, "Jan – Mar", 1],
    ["cancun", 579, "Feb – Apr", 0],
  ],
  ATL: [
    ["paris", 512, "Jan – Mar", 0],
    ["rome", 598, "Mar – May", 0],
    ["cape-town", 956, "Feb – Apr", 0],
    ["cancun", 268, "Jan – May", 0],
    ["cairo", 734, "Jan – Mar", 1],
    ["singapore", 989, "Feb – Apr", 1],
  ],
};

export const dealsByOrigin: Record<string, Deal[]> = Object.fromEntries(
  Object.entries(table).map(([origin, rows]) => [
    origin,
    rows.map(([slug, price, travel, stops]) => ({
      id: `${origin}-${slug}`,
      origin,
      destination: destinationBySlug[slug],
      price,
      currency: origins.find((o) => o.code === origin)!.currency,
      travel,
      stops,
    })),
  ]),
);

// Rows for the split-flap fare board: origin airport, destination airport,
// city label (max 8 chars to fit the board), travel month and fare in the
// origin's currency.
export const fareBoard = [
  { from: "LHR", to: "JFK", city: "NEW YORK", month: "FEB", fare: 389, currency: "GBP" },
  { from: "JFK", to: "LHR", city: "LONDON", month: "FEB", fare: 489, currency: "USD" },
  { from: "MAN", to: "DXB", city: "DUBAI", month: "MAR", fare: 436, currency: "GBP" },
  { from: "LAX", to: "HND", city: "TOKYO", month: "MAR", fare: 698, currency: "USD" },
  { from: "LHR", to: "LIS", city: "LISBON", month: "APR", fare: 98, currency: "GBP" },
  { from: "ORD", to: "IST", city: "ISTANBUL", month: "APR", fare: 618, currency: "USD" },
] as const;

const symbols: Record<Currency, string> = { USD: "$", GBP: "£" };
export const currencySymbol = (c: Currency) => symbols[c];

const formatters: Record<Currency, Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
  GBP: new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }),
};
export const formatPrice = (amount: number, c: Currency) => formatters[c].format(amount);
