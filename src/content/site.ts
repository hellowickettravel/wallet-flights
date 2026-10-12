// Business facts used across the site.
// TODO(confirm): phone, email, address and hours are placeholders until the
// owner supplies the real details. 555-01xx numbers are reserved for fiction.
export const site = {
  name: "Wallet Flights",
  url: "https://walletflights.com",
  tagline: "Flights that fit your wallet",
  description:
    "Search and book cheap flights worldwide, online or with a travel expert who helps with seats, baggage and changes.",
  phone: {
    display: "+1 (888) 555-0142",
    href: "tel:+18885550142",
  },
  email: "support@walletflights.com",
  hours: "Every day, 6am – midnight ET",
  address: "Address to be confirmed",
} as const;

export const mainNav = [
  { label: "Flights", href: "/flights" },
  { label: "Deals", href: "/deals" },
  { label: "Destinations", href: "/destinations" },
  { label: "Airlines", href: "/airlines" },
  { label: "Travel guides", href: "/travel-guides" },
  { label: "Help", href: "/help" },
] as const;

export const footerNav = [
  {
    title: "Book",
    links: [
      { label: "Flights", href: "/flights" },
      { label: "Flight deals", href: "/deals" },
      { label: "Destinations", href: "/destinations" },
      { label: "Airlines we book", href: "/airlines" },
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
