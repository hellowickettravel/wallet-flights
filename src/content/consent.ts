// Copy for the cookie banner and the "search needs cookies" notice on /flights.
// Category ids match src/lib/consent.ts.
export const consentCopy = {
  title: "Cookies on Wallet Flights",
  body: "We use necessary cookies to remember this choice. With your permission we’d also like to load our flight-search partner and measure how the site is used.",
  /** Outside the UK, EU/EEA and Switzerland, where live search is on until switched off. */
  bodySearchOn: "We use necessary cookies to remember this choice. Live search from our flight-search partner is on, and you can switch it off here. With your permission we’d also like to measure how the site is used.",
  accept: "Accept all",
  reject: "Reject all",
  manage: "Manage choices",
  save: "Save choices",
  policyLabel: "Cookie policy",
  categories: [
    {
      id: "necessary",
      label: "Necessary",
      description: "Remembers your cookie choice. Always on.",
      locked: true,
    },
    {
      id: "search",
      label: "Live flight search",
      description:
        "Loads the live search on our Flights page, run by our flight search partner, which sets cookies to remember your currency and language and to measure searches and bookings it sends to travel sites.",
      locked: false,
    },
    {
      id: "analytics",
      label: "Analytics",
      description:
        "Shows us how people find and use the site, and how fast pages load, with Google Analytics and Vercel Analytics. Google Analytics sets cookies to tell visits apart. We don’t use it for advertising.",
      locked: false,
    },
  ],
} as const;

export const searchGateCopy = {
  title: "Live prices need one cookie choice",
  body: "Our live search is run by our flight search partner, which sets its own cookies. Allow live flight search to compare prices from airlines and travel sites here on Wallet Flights.",
  allow: "Allow live search",
  settings: "Cookie settings",
  /** Fallback that needs no cookies on our site: the same search on our partner's own site, through our affiliate link. */
  partner: "See prices on our partner’s site",
  partnerNote: "Opens our partner’s site in a new tab. We may earn a commission if you book; it doesn’t change your price.",
} as const;
