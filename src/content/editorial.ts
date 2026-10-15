// Editorial policy (plan item 4.4). The owner has no separate policy, so this
// states only what the site actually does (how fares are found, sorted and
// hidden, how we earn, how guides are dated) plus the basic standards the
// team works to (owner, 16 Oct 2026: "write base level"). No named authors
// exist yet: content is credited to the team, never to an invented person.
import type { LegalSection } from "@/components/legal/legal-page";
import { company, site } from "./site";

export const editorialUpdated = "16 October 2026";

/** Byline on guides, linked to this page. */
export const teamAuthor = { name: `The ${site.name} team`, href: "/editorial-policy" } as const;

export const editorial: { intro: string; sections: LegalSection[] } = {
  intro: `How we write our travel guides and destination pages, where our prices come from, and how we make money. ${site.name} is a trading name of ${company.legalName}.`,
  sections: [
    {
      heading: "Who writes our content",
      body: [
        `Our travel guides, destination pages and help articles are written and checked by the ${site.name} team. We credit the team as a whole rather than individual writers.`,
        "We write for travellers in the UK and US: plain English, practical advice, and the details that change what you pay or how you travel.",
      ],
    },
    {
      heading: "Facts and sources",
      body: [
        "Practical facts such as airports, flying times, baggage and security rules come from official sources: airlines, airports and government websites. When a guide relies on a specific rule or figure, we list the source at the end of the guide.",
        "Rules change, so always check the latest baggage allowance, entry requirements and fare conditions with your airline or provider before you travel.",
      ],
    },
    {
      heading: "Where our prices come from",
      body: [
        [
          "Fares on the homepage, deals, destination and route pages are the cheapest prices other travellers found recently on our flight search partner’s network, refreshed about every hour.",
          "Live search on the Flights page asks airlines and travel sites for current prices when you search.",
          "When we have no recent price for a route, we show no price. We never estimate or make up a fare.",
          "The provider confirms the final price, including taxes and fees, before you pay.",
        ],
      ],
    },
    {
      heading: "How results are ordered",
      body: [
        "Search results are sorted by price, cheapest first, unless you choose another order. Commission never changes the order of results.",
      ],
    },
    {
      heading: "How we make money",
      body: [
        "Searching is free. Some links to airlines, travel sites and other partners are affiliate links: if you book, we may earn a commission at no extra cost to you. When our team books a flight for you on WhatsApp, we confirm the total price with you before we book.",
        `The Hotels and Car hire links go to our sister company, ${company.sister.name}. We say so wherever those links appear.`,
      ],
    },
    {
      heading: "Dates and updates",
      body: [
        "Every guide shows the date it was published, and the date it was last updated when we make a meaningful change to its content. Small fixes such as typos don’t change the date.",
      ],
    },
    {
      heading: "Corrections",
      body: [`Spotted a mistake or something out of date? Email ${site.email} with the page and what’s wrong. We’ll check it and correct the page if it needs it.`],
    },
  ],
};
