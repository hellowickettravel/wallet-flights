// Travel guides: one file per guide, collected here. Every guide follows the
// editorial policy: credited to the team, dated, and any rule or figure taken
// from the official pages listed in its `sources`.
import type { Guide, Topic, TopicId } from "./types";
import { carryOnChecklist } from "./carry-on-only-checklist";
import { europeShoulderSeason } from "./europe-shoulder-season";
import { whenToBook } from "./when-to-book-international-flights";
import { powerBankRules } from "./power-bank-rules-on-planes";
import { twentyFourHourRule } from "./24-hour-flight-cancellation-rule";
import { flightRights } from "./flight-cancelled-or-delayed-rights";
import { ukLiquidsRules } from "./uk-airport-liquids-rules";
import { selfTransfer } from "./self-transfer-separate-tickets";
import { eesEtias } from "./ees-etias-uk-us-travellers";

export type { Guide, GuideSection, GuideTable, Topic, TopicId } from "./types";

export const topics: Topic[] = [
  { id: "booking", label: "Booking tips", blurb: "When to book, how to search and how to pay less for the same seat." },
  { id: "rights", label: "Delays and refunds", blurb: "What you’re owed when a flight is cancelled, delayed or changed." },
  { id: "baggage", label: "Baggage and packing", blurb: "Bag allowances, liquids and what can go in your hand luggage." },
  { id: "documents", label: "Passports and entry", blurb: "ESTA, the UK ETA, ETIAS and the paperwork to sort before you fly." },
  { id: "seasons", label: "Where and when to go", blurb: "The best times to travel, and where the fares and weather line up." },
  { id: "flying", label: "Flying and airports", blurb: "Long-haul flights, connections, jet lag and getting through the airport." },
];
export const topicById = Object.fromEntries(topics.map((t) => [t.id, t])) as Record<TopicId, Topic>;

/** Newest first, by publish date. */
// Same-day guides keep this order (Array.prototype.sort is stable): the
// research plan's priority order, docs/SEO-CONTENT-PLAN.md.
export const guides: Guide[] = [
  powerBankRules,
  twentyFourHourRule,
  flightRights,
  ukLiquidsRules,
  selfTransfer,
  eesEtias,
  whenToBook,
  europeShoulderSeason,
  carryOnChecklist,
].sort((a, b) => b.published.localeCompare(a.published));

export const guideBySlug = Object.fromEntries(guides.map((g) => [g.slug, g])) as Record<string, Guide>;

export const guidesIntro = "Practical advice on when to book, where to go and what to pack.";

/** The travel guides page. */
export const guidesHub = {
  title: "Travel guides",
  seoTitle: "Travel guides: flight booking tips and advice",
  intro: "Plain-English advice for UK and US travellers: when to book, what you’re owed, what to pack and where to go next.",
  description:
    "Flight booking tips for UK and US travellers: when to book, delay and refund rights, baggage rules, entry requirements and the best time to go.",
  archiveTitle: "More guides",
  pageTitle: (n: number) => `Travel guides, page ${n}`,
  pageIntro: (n: number, count: number) => `Older guides, page ${n} of ${count}.`,
};

/** Fixed wording on every guide page. */
export const guideTemplate = {
  tocTitle: "In this guide",
  summaryTitle: "The short answer",
  faqTitle: "Questions people ask",
  tip: "Tip:",
  sourcesNote: "Rules change: check with your airline or the official page before you fly.",
  ctaTitle: "Ready to compare fares?",
  ctaText: "Airlines and travel sites in one search, cheapest first.",
  relatedTitle: "Keep reading",
};

/** The destination band at the bottom of the travel guides page. */
export const guidesDestinations = {
  title: "Planning a trip somewhere specific?",
  intro: "Our destination guides cover the best time to go, which airport to fly into and flight times from London and New York.",
  all: "All destinations",
  slugs: ["lisbon", "new-york", "tokyo", "dubai", "barcelona", "cancun"],
};

/** Text without the [label](href) link syntax, for word counts, markup and plain-text exports. */
export const plainText = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

/** Every word a reader sees in the guide body. */
export function guideText(g: Guide) {
  return [
    g.excerpt,
    ...(g.summary ?? []),
    ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.list ?? []), s.tip ?? "", ...(s.table ? [s.table.head, ...s.table.rows].flat() : [])]),
    ...(g.faqs ?? []).flatMap((f) => [f.q, f.a]),
  ]
    .map(plainText)
    .join(" ");
}

export const wordCount = (g: Guide) => guideText(g).split(/\s+/).filter(Boolean).length;

/** Reading time from the real word count (about 220 words a minute), never a guess. */
export const readingMinutes = (g: Guide) => Math.max(1, Math.round(wordCount(g) / 220));

/** Same topic first, then the newest of the rest. */
export function relatedGuides(g: Guide, count = 3) {
  const others = guides.filter((x) => x.slug !== g.slug);
  return [...others.filter((x) => x.topic === g.topic), ...others.filter((x) => x.topic !== g.topic)].slice(0, count);
}

// The travel guides page shows the three newest as features, then the rest in
// a grid of `perPage`, with numbered pages at /travel-guides/page/2 and up.
export const featuredCount = 3;
export const perPage = 9;
export const archive = guides.slice(featuredCount);
export const pageCount = Math.max(1, Math.ceil(archive.length / perPage));
export const archivePage = (n: number) => archive.slice((n - 1) * perPage, n * perPage);
export const pagePath = (n: number) => (n <= 1 ? "/travel-guides" : `/travel-guides/page/${n}`);
