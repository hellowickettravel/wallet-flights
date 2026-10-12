import { destinationBySlug, type Destination } from "./destinations";

// Example fares for the homepage rail and fare board.
// Prices are illustrative round-trip economy fares per person in USD and are
// labelled as examples in the UI. Replace with live data when available.

export type Origin = { code: string; city: string };

export const origins: Origin[] = [
  { code: "NYC", city: "New York" },
  { code: "LAX", city: "Los Angeles" },
  { code: "ORD", city: "Chicago" },
  { code: "IAH", city: "Houston" },
  { code: "ATL", city: "Atlanta" },
];

export type Deal = {
  id: string;
  origin: string;
  destination: Destination;
  price: number;
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
  IAH: [
    ["cancun", 248, "Jan – May", 0],
    ["mexico-city", 238, "Feb – May", 0],
    ["london", 547, "Jan – Mar", 0],
    ["cusco", 684, "Apr – Jun", 1],
    ["dubai", 712, "Jan – Mar", 0],
    ["rio-de-janeiro", 712, "Mar – May", 1],
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
      travel,
      stops,
    })),
  ]),
);

// Rows for the split-flap fare board: origin airport, destination airport,
// city label (max 12 chars to fit the board), travel month and fare.
export const fareBoard = [
  { from: "JFK", to: "LHR", city: "LONDON", month: "FEB", fare: 489 },
  { from: "LAX", to: "HND", city: "TOKYO", month: "MAR", fare: 698 },
  { from: "IAH", to: "CUN", city: "CANCUN", month: "JAN", fare: 248 },
  { from: "ORD", to: "IST", city: "ISTANBUL", month: "APR", fare: 618 },
  { from: "ATL", to: "CDG", city: "PARIS", month: "FEB", fare: 512 },
  { from: "JFK", to: "LIS", city: "LISBON", month: "MAR", fare: 467 },
] as const;
