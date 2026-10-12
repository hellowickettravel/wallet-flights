// Business facts used across the site.
// Business facts, taken from the existing walletflights.com WordPress site
// (Contact and About pages) and confirmed by the owner. No street address is
// published, so only the city is shown.
export const site = {
  name: "Wallet Flights",
  url: "https://walletflights.com",
  tagline: "Compare cheap flights in one place",
  description:
    "Wallet Flights compares flight prices from airlines and travel sites in one search, sorted from cheapest to most expensive, so you can book the best deal directly with the provider.",
  phone: {
    display: "+44 7417 564704",
    href: "tel:+447417564704",
  },
  email: "info@walletflights.com",
  location: "London, United Kingdom",
  responseTime: "We reply within 24 hours",
  markets: "Travellers in the US and UK",
  social: [
    { label: "Instagram", handle: "@walletflights", href: "https://www.instagram.com/walletflights/" },
    { label: "X", handle: "@walletflights", href: "https://x.com/walletflights" },
    { label: "Facebook", handle: "Walletflights", href: "https://www.facebook.com/people/Walletflights/61565184123183/" },
  ],
} as const;

export const mainNav = [
  { label: "Flights", href: "/flights" },
  { label: "Deals", href: "/deals" },
  { label: "Destinations", href: "/destinations" },
  { label: "Travel guides", href: "/travel-guides" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  {
    title: "Search",
    links: [
      { label: "Flights", href: "/flights" },
      { label: "Flight deals", href: "/deals" },
      { label: "Destinations", href: "/destinations" },
      { label: "Airlines", href: "/airlines" },
    ],
  },
  {
    title: "Popular routes",
    links: [
      { label: "Flights to London", href: "/destinations/london" },
      { label: "Flights to Paris", href: "/destinations/paris" },
      { label: "Flights to Tokyo", href: "/destinations/tokyo" },
      { label: "Flights to Dubai", href: "/destinations/dubai" },
      { label: "Flights to Cancún", href: "/destinations/cancun" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Travel guides", href: "/travel-guides" },
      { label: "Help centre", href: "/help" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & conditions", href: "/terms-and-conditions" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Cookie policy", href: "/cookie-policy" },
    ],
  },
] as const;
