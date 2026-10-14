// Copy for the cookie banner and the "search needs cookies" notice on /flights.
// Category ids match src/lib/consent.ts.
export const consentCopy = {
  title: "Cookies on Wallet Flights",
  body: "We use necessary cookies to remember this choice. With your permission we’d also like to load our flight-search partner and measure how the site is used.",
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
      description: "Counts page views and site speed with Vercel Analytics, in aggregate and without identifying you.",
      locked: false,
    },
  ],
} as const;

export const searchGateCopy = {
  title: "Live prices need one cookie choice",
  body: "Our live search is run by our flight search partner, which sets its own cookies. Allow live flight search to compare prices from airlines and travel sites here on Wallet Flights.",
  allow: "Allow live search",
  settings: "Cookie settings",
} as const;
