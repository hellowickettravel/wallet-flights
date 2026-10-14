// Customer reviews for the homepage carousel.
//
// ONLY real reviews from our Trustpilot profile go here, copied word for word
// with the reviewer's name as shown on Trustpilot and a link to the review.
// Never write, edit or "mock" reviews: fake or misleading reviews are banned
// under the UK DMCC Act 2024 (fines up to 10% of turnover) and the US FTC rule,
// and break Trustpilot's terms. The carousel appears once there are 3+.
export type Review = {
  name: string;
  /** Star rating given on Trustpilot, 1–5. */
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** ISO date of the review. */
  date: string;
  /** Link to the review on Trustpilot. */
  url: string;
};

export const reviews: Review[] = [];

export const reviewsCopy = {
  title: "What travellers say",
  intro: "Reviews from people who searched with Wallet Flights, on Trustpilot.",
  emptyTitle: "Searched with us? Tell other travellers how it went.",
  emptyText: "We’re new on Trustpilot. Your review helps other travellers find a good fare, and tells us what to improve.",
  emptyCta: "Write a review",
  readAll: "Read our reviews",
} as const;
