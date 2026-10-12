import { photos, type Photo } from "./images";

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  minutes: number;
  photo: Photo;
};

export const guides: Guide[] = [
  {
    slug: "when-to-book-international-flights",
    title: "When to book an international flight (and when waiting pays off)",
    excerpt:
      "How far ahead to book for Europe, Asia and the Caribbean, which weekdays tend to be cheaper, and the dates to avoid.",
    category: "Booking tips",
    minutes: 7,
    photo: photos.guidePlanning,
  },
  {
    slug: "europe-shoulder-season",
    title: "Europe in shoulder season: better weather, lower fares",
    excerpt: "Eight cities that are at their best in April, May, September and October.",
    category: "Destinations",
    minutes: 5,
    photo: photos.guideAlps,
  },
  {
    slug: "carry-on-only-checklist",
    title: "The carry-on only checklist for a two-week trip",
    excerpt: "What to pack, what to skip, and the bag sizes most airlines accept.",
    category: "Packing",
    minutes: 4,
    photo: photos.guideRoad,
  },
];
