import { photos, type Photo } from "./images";

export type GuideSection = { heading: string; paragraphs: string[]; list?: string[] };

export type Guide = {
  slug: string;
  title: string;
  /** Shorter title for search results (about 45 characters, before " | Wallet Flights"). */
  seoTitle?: string;
  excerpt: string;
  category: string;
  published: string; // ISO date
  /** ISO date of the last real content change, when after `published`. */
  updated?: string;
  photo: Photo;
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "when-to-book-international-flights",
    title: "When to book an international flight (and when waiting pays off)",
    seoTitle: "When to book an international flight",
    excerpt:
      "How far ahead to book for long-haul and short-haul trips, why flexible dates matter more than the day you book, and the dates to avoid.",
    category: "Booking tips",
    published: "2026-09-18",
    photo: photos.guidePlanning,
    sections: [
      {
        heading: "There’s no magic day, but there is a sensible window",
        paragraphs: [
          "Airline prices move with demand, so no single weekday or hour is always cheapest. What helps far more is booking inside a sensible window and being flexible with dates.",
          "For long-haul trips, start watching prices a few months ahead and book once you see a fare you’re happy with. For short flights within Europe or the US, a few weeks to a couple of months ahead is usually enough outside school holidays.",
        ],
      },
      {
        heading: "Flexible dates beat perfect timing",
        paragraphs: [
          "Moving your trip by a day or two often makes a bigger difference than when you book. Midweek departures are frequently cheaper than Fridays and Sundays, and red-eye or early-morning flights can undercut midday ones.",
        ],
        list: [
          "Compare a few departure dates either side of your plan",
          "Check nearby airports, such as Gatwick instead of Heathrow, or Newark instead of JFK",
          "Look at one-stop routes: a connection can save a lot on long-haul fares",
        ],
      },
      {
        heading: "Book early for peak dates",
        paragraphs: [
          "School holidays, Christmas, Easter, Thanksgiving and big events such as Carnival fill up first. Cheaper seats on popular dates rarely come back, so if your dates are fixed, book as soon as the price looks reasonable.",
        ],
      },
      {
        heading: "Before you pay",
        paragraphs: [
          "When you choose a deal on Wallet Flights, you book with the provider. Check the baggage allowance, change and refund rules, and the final price with taxes on their page before paying. A slightly higher fare with a checked bag included can work out cheaper overall.",
        ],
      },
    ],
  },
  {
    slug: "europe-shoulder-season",
    title: "Europe in shoulder season: better weather, lower fares",
    seoTitle: "Europe in shoulder season: cheaper flights",
    excerpt: "Why April, May, September and October are the sweet spot for city breaks, and where to go.",
    category: "Destinations",
    published: "2026-08-30",
    photo: photos.guideEurope,
    sections: [
      {
        heading: "What shoulder season means",
        paragraphs: [
          "Shoulder season sits between the busy summer peak and the quiet winter months. In most of Europe that means April to early June and September to October.",
          "The weather is usually mild enough for long days outdoors, attractions are less crowded, and flights and hotels are often cheaper than in July and August.",
        ],
      },
      {
        heading: "Cities at their best in spring and autumn",
        paragraphs: ["A few favourites that suit walking, terraces and day trips:"],
        list: [
          "Lisbon: warm, bright days and easy trips to Sintra and the coast",
          "Rome: comfortable temperatures for the Forum and long dinners outside",
          "Barcelona: beach weather from late May, minus the summer crowds",
          "Paris: gardens in bloom in spring and golden parks in autumn",
          "Istanbul: ideal for walking between the old city and the Bosphorus",
        ],
      },
      {
        heading: "Getting the best fare",
        paragraphs: [
          "Search a whole week or two rather than fixed dates, and compare flying into one city and out of another, for example into Rome and home from Barcelona, using a multi-city search.",
        ],
      },
    ],
  },
  {
    slug: "carry-on-only-checklist",
    title: "The carry-on only checklist for a two-week trip",
    seoTitle: "Carry-on only checklist for two weeks",
    excerpt: "What to pack, what to leave behind, and how to check your airline’s cabin bag rules before you fly.",
    category: "Packing",
    published: "2026-08-12",
    photo: photos.guideCarryOn,
    sections: [
      {
        heading: "Check the rules first",
        paragraphs: [
          "Cabin bag allowances vary a lot between airlines and fare types. Some fares include only a small under-seat bag, while others allow a full-size cabin case. Check the size and weight limits on your provider’s page before you book, so a cheap fare doesn’t become an expensive one at the gate.",
        ],
      },
      {
        heading: "The checklist",
        paragraphs: ["For two weeks in mild weather, this is plenty:"],
        list: [
          "3–4 tops and 2 pairs of trousers or skirts that all mix and match",
          "1 warm layer and 1 light waterproof jacket",
          "1 pair of comfortable walking shoes worn on the plane, plus light sandals",
          "Underwear and socks for a week; plan one laundry stop",
          "Liquids in containers within your departure airport’s limits, in a clear bag",
          "Chargers, an adapter and a power bank",
          "Passport, travel documents and any visas, kept in your personal item",
        ],
      },
      {
        heading: "Small habits that help",
        paragraphs: [
          "Roll clothes instead of folding them, use packing cubes to keep things organised, and wear your bulkiest items on the plane. Leave a little space for anything you pick up on the way.",
        ],
      },
    ],
  },
];

/** Reading time from the real word count (about 220 words a minute), never a guess. */
export function readingMinutes(g: Guide) {
  const words = [g.excerpt, ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.list ?? [])])].join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const guidesIntro = "Practical advice on when to book, where to go and what to pack.";

export const guideBySlug = Object.fromEntries(guides.map((g) => [g.slug, g])) as Record<string, Guide>;
