// Business facts used across the site.
// Business facts, taken from the existing walletflights.com WordPress site
// (Contact and About pages) and confirmed by the owner. No street address is
// published, so only the city is shown.
export const site = {
  name: "Wallet Flights",
  // www is the host Vercel serves (the apex redirects to it) and the one the
  // search widget is registered to. Canonicals, sitemap and schema use this.
  url: "https://www.walletflights.com",
  tagline: "Compare cheap flights in one place",
  // Also the homepage meta description: keep it under 155 characters.
  description:
    "Compare flight prices from airlines and travel sites in one search, cheapest first, then book direct with the provider. Free for UK and US travellers.",
  phone: {
    display: "+44 7417 564704",
    href: "tel:+447417564704",
    /** The number on the site opens a WhatsApp chat (owner, 15 Oct 2026); calls still work from the contact page. */
    whatsapp: "https://wa.me/447417564704",
    /** The team also books flights and hotels by hand (owner, 15 Oct 2026). */
    label: "Book or ask on WhatsApp",
    note: "Our team can book flights and hotels for you",
  },
  email: "info@walletflights.com",
  location: "London, United Kingdom",
  responseTime: "We reply within 24 hours",
  markets: "Travellers in the US and UK",
  /** Claimed Trustpilot profile (checked 15 Oct 2026: no reviews yet, so we show no score). */
  trustpilot: "https://www.trustpilot.com/review/walletflights.com",
  social: [
    { label: "Instagram", handle: "@walletflights", href: "https://www.instagram.com/walletflights/" },
    { label: "X", handle: "@walletflights", href: "https://x.com/walletflights" },
    { label: "Facebook", handle: "Walletflights", href: "https://www.facebook.com/people/Walletflights/61565184123183/" },
  ],
} as const;

/** Footer notices. The first two paragraphs are the owner's wording (15 Oct 2026). */
export const footerNotice = {
  comparison:
    "Wallet Flights is a flight comparison site and does not sell tickets directly. When you choose a flight, you book and pay through the selected provider, who manages your booking, changes, and refunds.",
  prices:
    "Prices shown on our website are based on recently available fares. Final prices and availability are confirmed by the provider at the time of booking.",
  affiliate:
    "Some links to airlines, travel sites and other partners are affiliate links. If you book, we may earn a commission at no extra cost to you. It never changes the order of results, which are sorted by price.",
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
      { label: "Photo credits", href: "/photo-credits" },
    ],
  },
] as const;
