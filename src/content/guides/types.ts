import type { Photo } from "../images";

// Text in paragraphs, lists, tips, tables and FAQ answers may contain links
// written as [label](/path) or [label](https://…). Internal paths become
// client-side links; anything else opens in a new tab. Destination names are
// also linked to their pages automatically, once per guide.

export type GuideTable = {
  /** Says what the table compares; read out by screen readers. */
  caption: string;
  head: string[];
  rows: string[][];
};

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  /** Set when the list is a real sequence (steps to follow in order). */
  ordered?: boolean;
  table?: GuideTable;
  /** One practical tip, shown as a callout after the section's text. */
  tip?: string;
};

export type TopicId = "booking" | "rights" | "baggage" | "documents" | "seasons" | "flying";

export type Topic = {
  id: TopicId;
  label: string;
  /** One line for the topic index on the travel guides page. */
  blurb: string;
};

export type Guide = {
  slug: string;
  title: string;
  /** Shorter title for search results (about 45 to 60 characters, before " | Wallet Flights"). */
  seoTitle?: string;
  /** Also the meta description: 120 to 160 characters. */
  excerpt: string;
  topic: TopicId;
  published: string; // ISO date
  /** ISO date of the last real content change, when after `published`. */
  updated?: string;
  photo: Photo;
  /** Three to five short points answering the guide's main question, shown first ("The short answer"). */
  summary?: string[];
  sections: GuideSection[];
  /** Questions people also ask; shown as an FAQ and used in FAQPage markup. */
  faqs?: { q: string; a: string }[];
  /** Official pages the guide relies on for specific rules or figures (see the editorial policy). */
  sources?: { label: string; url: string }[];
  /** Search phrases the guide answers, for the Article markup's `keywords`. */
  keywords?: string[];
};
