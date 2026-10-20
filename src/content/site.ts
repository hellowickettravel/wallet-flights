// Business facts used across the site.
// Business facts, taken from the existing walletflights.com WordPress site
// (Contact and About pages) and confirmed by the owner. No street address is
// published, so only the city is shown.
export const site = {
  name: "Wallet Flights",
  // The production host (owner, 16 Oct 2026): Vercel serves the apex and
  // 308-redirects www to it. Canonicals, og:url, sitemap, robots, llms.txt
  // and schema all use this, so they must match the host Vercel serves.
  url: "https://walletflights.com",
  tagline: "Compare cheap flights in one place",
  // Also the homepage meta description: keep it under 155 characters.
  description:
    "Compare flight prices from airlines and travel sites in one search, cheapest first, then book direct with the provider. Free for UK and US travellers.",
  phone: {
    display: "+44 7417 564704",
    href: "tel:+447417564704",
    /** The number on the site opens a WhatsApp chat (owner, 15 Oct 2026); calls still work from the contact page. */
    whatsapp: "https://wa.me/447417564704",
    /** The team books flights by hand on WhatsApp; hotels go through the sister company (owner, 16 Oct 2026). */
    label: "Book or ask on WhatsApp",
    note: "Our team can book a flight for you",
  },
  email: "info@walletflights.com",
  /** The site's own emails (alerts, confirmations) come from here through Resend; replies go to `email` (owner, 20 Oct 2026). */
  sendingEmail: "noreply@walletflights.com",
  location: "London, United Kingdom",
  responseTime: "We reply within 24 hours",
  markets: "Travellers in the US and UK",
  /** Google Analytics 4 property (owner, 20 Oct 2026). Loads only after the visitor allows analytics cookies. */
  googleAnalyticsId: "G-R2NBBGX7CM",
  /** Claimed Trustpilot profile (checked 15 Oct 2026: no reviews yet, so we show no score). */
  trustpilot: "https://www.trustpilot.com/review/walletflights.com",
  social: [
    { label: "Instagram", handle: "@walletflights", href: "https://www.instagram.com/walletflights/" },
    { label: "X", handle: "@walletflights", href: "https://x.com/walletflights" },
    { label: "Facebook", handle: "Walletflights", href: "https://www.facebook.com/people/Walletflights/61565184123183/" },
  ],
} as const;

/**
 * The legal entity behind the brand (owner, 16 Oct 2026; checked against the
 * Companies House register the same day). UK trading-disclosure rules ask a
 * company's website to show its registered name, number, place of
 * registration and registered office address.
 */
export const company = {
  legalName: "Wicket Travel Limited",
  number: "17001759",
  registeredIn: "England and Wales",
  type: "private limited company",
  incorporated: "2026-01-30",
  // Shown without the house number at the owner's request (17 Oct 2026).
  // TODO(confirm): trading-disclosure rules ask for the registered office
  // address as registered at Companies House.
  registeredOffice: "Lampton Avenue, Hounslow, England, TW3 4EW",
  address: { street: "Lampton Avenue", locality: "Hounslow", postalCode: "TW3 4EW", country: "GB" },
  register: "https://find-and-update.company-information.service.gov.uk/company/17001759",
  /** Sister company that takes hotel bookings; the Hotels and Car hire links go to its site. */
  sister: { name: "Wicket Travel Holidays", url: "https://www.wickettravelholidays.com/" },
} as const;

/** One line for the footer and legal pages. */
export const companyLine = `${site.name} is a trading name of ${company.legalName}, a ${company.type} registered in ${company.registeredIn} (company number ${company.number}). Registered office: ${company.registeredOffice}.`;

/**
 * Footer notices. The first two paragraphs are the owner's wording (15 Oct
 * 2026); `comparison` now says "on this website" and `manual` covers the
 * flights the team books on WhatsApp (owner, 16 Oct 2026).
 */
export const footerNotice = {
  comparison:
    "Wallet Flights is a flight comparison site and does not sell tickets on this website. When you choose a flight here, you book and pay through the selected provider, who manages your booking, changes, and refunds.",
  manual: `If you’d rather not book online, our team can book a flight for you on WhatsApp. ${company.legalName} then makes the booking with the airline or travel provider on your behalf, and we confirm the price and fare rules with you before you pay. Hotel bookings are handled by our sister company, ${company.sister.name}.`,
  prices:
    "Prices shown on our website are based on recently available fares. Final prices and availability are confirmed by the provider at the time of booking.",
  affiliate:
    "Some links to airlines, travel sites and other partners are affiliate links. If you book, we may earn a commission at no extra cost to you. It never changes the order of results, which are sorted by price.",
} as const;

export type NavLink = { label: string; href: string; description: string };
export type NavItem =
  | { label: string; href: string; external?: undefined; items?: undefined }
  | { label: string; href: string; external: string; items?: undefined }
  | { label: string; items: readonly NavLink[]; href?: undefined; external?: undefined };

/**
 * Five top-level items (owner, 17 Oct 2026): flight tools under Flights,
 * rights and help under Travel help, company pages under About.
 */
export const mainNav: readonly NavItem[] = [
  {
    label: "Flights",
    items: [
      { label: "Search flights", href: "/flights", description: "Compare live prices, cheapest first" },
      { label: "Fare calendar", href: "/fare-calendar", description: "The cheapest month and day to fly" },
      { label: "Flight deals", href: "/deals", description: "Low fares found from the US and UK" },
      { label: "Airlines", href: "/airlines", description: "The airlines we compare" },
    ],
  },
  { label: "Destinations", href: "/destinations" },
  // Hotels are booked with the sister company (owner, 16 Oct 2026): the menu
  // links straight to its site, opening in a new tab like the hero shortcut.
  { label: "Hotels", href: company.sister.url, external: `With our sister company, ${company.sister.name}` },
  {
    label: "Travel help",
    items: [
      { label: "Delay compensation", href: "/flight-delay-compensation", description: "Check what you’re owed for a late flight" },
      { label: "Travel guides", href: "/travel-guides", description: "Tips for booking and flying" },
      { label: "Help centre", href: "/help", description: "Bookings, changes and refunds" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "About us", href: "/about", description: "Who we are and how we compare" },
      { label: "Contact", href: "/contact", description: "Email, phone or WhatsApp" },
    ],
  },
];

export const footerNav = [
  {
    title: "Search",
    links: [
      { label: "Flights", href: "/flights" },
      { label: "Flight deals", href: "/deals" },
      { label: "Destinations", href: "/destinations" },
      { label: "Airlines", href: "/airlines" },
      { label: "Fare calendar", href: "/fare-calendar" },
      { label: "Delay compensation", href: "/flight-delay-compensation" },
    ],
  },
  {
    title: "Popular destinations",
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
      { label: "Editorial policy", href: "/editorial-policy" },
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
