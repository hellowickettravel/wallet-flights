// About page copy. Facts come from the existing walletflights.com About page
// and the owner: comparison site, affiliate links, London-based, US + UK
// travellers, results sorted by price, indirect routes considered. Flights
// can also be booked by the team on WhatsApp, and the company details are the
// owner's (16 Oct 2026), checked against Companies House.
import { company, site } from "./site";

export const aboutIntro = {
  title: "Every flight price, side by side",
  paragraphs: [
    "Wallet Flights is a travel comparison site. We search airlines and travel sites for you and show what they offer in one list, sorted from the cheapest price to the most expensive.",
    "We also look beyond the obvious nonstop. Indirect routes are often cheaper, and a well-timed connection can become a short stopover somewhere new.",
    "We don’t sell tickets on this website. When you find the deal you want, we send you to that provider to book it directly, so your booking, payment and any changes stay with them.",
    "Prefer not to book online? Message our team on WhatsApp and we can book a flight for you. We confirm the price and fare rules with you before you pay.",
  ],
  facts: [
    { label: "Based in", value: "London, UK" },
    { label: "For travellers in", value: "the US and UK" },
    { label: "Results sorted by", value: "price, cheapest first" },
    { label: "Cost to search", value: "Free" },
  ],
};

// "Who runs Wallet Flights". The third paragraph is the owner's description
// of the company (16 Oct 2026).
export const aboutCompany = {
  title: `Who runs ${site.name}`,
  paragraphs: [
    `${site.name} is the trading brand of ${company.legalName}, a UK-registered ${company.type} incorporated in ${company.registeredIn} under company number ${company.number}.`,
    `Our sister company, ${company.sister.name}, looks after hotel bookings. The Hotels and Car hire links on our site go to its website.`,
    "We specialise in a wide range of travel services for people exploring destinations around the world. From relaxing holidays and city breaks to flights, cruises and hotel stays, our aim is to make planning and booking your next trip simple and stress-free.",
  ],
  facts: [
    { label: "Company", value: company.legalName },
    { label: "Company number", value: company.number },
    { label: "Registered in", value: company.registeredIn },
    { label: "Registered office", value: company.registeredOffice },
  ],
  registerLink: { label: "View on the Companies House register", href: company.register },
  sisterLink: { label: `Visit ${company.sister.name}`, href: company.sister.url },
};

export const aboutEarn = {
  title: "How we make money",
  paragraphs: [
    "Wallet Flights is free to use. Some of the providers we list pay us a commission when you book through our links. That’s how we run the site.",
    "You pay the provider’s own price, and results are sorted by price, not by who pays us.",
  ],
};

// Illustration for the "price ladder": results for one route, listed out of
// order so the animation can sort them. No prices — `rank` (1 = cheapest)
// orders the rows and sets the length of each price bar.
export const ladderExample = {
  route: "London to New York",
  dates: "Illustration, round trip",
  rows: [
    { id: "c", label: "Travel site", detail: "1 stop · 10h 40m", rank: 3 },
    { id: "a", label: "Airline website", detail: "Nonstop · 8h 05m", rank: 1 },
    { id: "e", label: "Travel site", detail: "Nonstop · 7h 55m", rank: 5 },
    { id: "b", label: "Travel site", detail: "Nonstop · 8h 20m", rank: 2 },
    { id: "d", label: "Airline website", detail: "1 stop · 11h 15m", rank: 4 },
  ],
};
