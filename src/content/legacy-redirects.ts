// Permanent redirects for URLs from the old WordPress site (list taken from the
// Wayback Machine, Oct 2026). Only pages with a real equivalent here are
// redirected; old tag, shop and listicle pages are left to 404, which tells
// Google they're gone. Extend this list with Search Console data
// (Pages and Links reports) when it's available. Trailing slashes are
// stripped by Next before these rules run, so sources have none.
export const legacyRedirects: { source: string; destination: string }[] = [
  // Company and policies
  { source: "/about-us", destination: "/about" },
  { source: "/our-story", destination: "/about" },
  { source: "/affiliate-disclaimer", destination: "/about" },
  { source: "/get-in-touch", destination: "/contact" },
  { source: "/cookies-policy", destination: "/cookie-policy" },
  { source: "/term-and-conditions", destination: "/terms-and-conditions" },
  { source: "/terms-conditions", destination: "/terms-and-conditions" },

  // Blog index, categories and authors
  { source: "/blog", destination: "/travel-guides" },
  { source: "/category/:path*", destination: "/travel-guides" },
  { source: "/author/:path*", destination: "/travel-guides" },
  { source: "/uncategorized", destination: "/travel-guides" },

  // Booking advice with a matching guide
  { source: "/best-time-to-book-flights", destination: "/travel-guides/when-to-book-international-flights" },
  { source: "/the-best-days-to-book-flights", destination: "/travel-guides/when-to-book-international-flights" },
  { source: "/early-bird-discounts-on-flights", destination: "/travel-guides/when-to-book-international-flights" },
  { source: "/airline-baggage-fees", destination: "/travel-guides/carry-on-only-checklist" },
  { source: "/off-season-travel-deals", destination: "/travel-guides/europe-shoulder-season" },
  { source: "/peak-season-vs-off-peak-flights", destination: "/travel-guides/europe-shoulder-season" },
  { source: "/flight-booking-tips", destination: "/travel-guides" },
  { source: "/how-to-find-the-cheapest-flights", destination: "/travel-guides" },

  // Deals
  { source: "/last-minute-flight-deals", destination: "/deals" },
  { source: "/flight-deal-tracker", destination: "/deals" },
  { source: "/round-trip-flight-specials", destination: "/deals" },

  // Refunds and changes are covered in the help centre
  { source: "/air-refunds", destination: "/help" },
  { source: "/flight-ticket-refunds", destination: "/help" },
  { source: "/refundable-flights", destination: "/help" },
  { source: "/how-to-avoid-flight-cancellation-fees", destination: "/help" },

  // Country flight pages
  { source: "/flights-to-united-kingdom", destination: "/destinations/london" },
  { source: "/flights-to-united-states", destination: "/destinations/new-york" },
  { source: "/flights-to-india", destination: "/destinations/delhi" },
  { source: "/flights-to-thailand", destination: "/destinations/bangkok" },
  { source: "/flights-to-europe", destination: "/destinations" },
  { source: "/flights-to-canada", destination: "/destinations" },
  { source: "/flights-to-nigeria", destination: "/destinations" },
];

/** Old hotel and car-hire pages now live on the owner's own travel site (temporary: they may come back here). */
export const legacyOwnerRedirects: { source: string; destination: string }[] = [
  { source: "/hotels", destination: "https://www.wickettravelholidays.com/" },
  { source: "/car-rentals", destination: "https://www.wickettravelholidays.com/" },
];
