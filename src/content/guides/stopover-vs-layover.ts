import { guidesDPhotos } from "../photos/guides-d";
import type { Guide } from "./types";

// Batch 22, Agent D, guide 4 (docs/BATCH-22-BRIEF.md). Primary keyword:
// "stopover vs layover" / "free stopover programmes". Programmes are listed only
// where the airline's own page confirms the offer (Icelandair, TAP, Etihad,
// Turkish Airlines, Emirates, Qatar Airways), found with WebSearch on 5 Nov
// 2026. Terms change often, so the guide gives the shape of each offer and
// sends readers to the airline's page for current conditions. The "is it worth
// it" advice is ours and is labelled so.
export const stopoverVsLayover: Guide = {
  slug: "stopover-vs-layover",
  title: "Stopover vs layover: the difference, and the airlines that offer free stopovers",
  seoTitle: "Stopover vs layover: free stopover programmes",
  excerpt:
    "A layover is a short connection; a stopover lets you stay a day or more. Which airlines add a stopover at no extra airfare, and what to check first.",
  topic: "flying",
  published: "2026-11-05",
  photo: guidesDPhotos.guideStopover,
  summary: [
    "A layover is a short connection between flights; a stopover is a planned break of a day or more in the connecting city, on the same ticket.",
    "Icelandair and TAP Air Portugal let you add a stopover on eligible flights at no additional airfare; you pay for your own hotel.",
    "Etihad offers eligible passengers up to two free hotel nights in Abu Dhabi, and Turkish Airlines runs free Touristanbul tours on long Istanbul layovers.",
    "Emirates and Qatar Airways offer hotel help or discounted packages with conditions, not a free stopover for everyone.",
    "You enter the stopover country, so its entry rules apply: check visas and travel authorisations before you book.",
  ],
  sections: [
    {
      heading: "The difference in one minute",
      paragraphs: [
        "A layover is the time you spend at an airport between two flights on the same journey. It might be 50 minutes or eight hours, and you usually stay airside, in the departure area, until your next flight.",
        "A stopover is a deliberate break in the connecting city, usually of 24 hours or more, booked on the same ticket. Airlines draw the line in slightly different places: TAP describes its stopovers as 24 to 240 hours, and Etihad’s Abu Dhabi stopover needs a connection of between 24 hours and four days. The practical difference is that on a stopover you leave the airport, sleep in the city and carry on a day or more later.",
      ],
      table: {
        caption: "Layover and stopover compared",
        head: ["", "Layover", "Stopover"],
        rows: [
          ["Typical length", "Under 24 hours", "24 hours or more"],
          ["Leave the airport?", "Usually not", "Yes"],
          ["Entry rules of that country", "Only if you go landside", "Always apply"],
          ["Checked bags", "Usually checked through", "Depends on the airline and length of stay"],
          ["Extra airfare", "None", "None on some programmes; otherwise the fare may change"],
        ],
      },
    },
    {
      heading: "Airlines that add a stopover at no extra airfare",
      paragraphs: [
        "These programmes are confirmed on each airline’s own website. In each case the flights cost no more for adding the stop, but your hotel, food and activities are on you, and not every fare or route qualifies.",
      ],
      list: [
        "Icelandair: on flights between Europe and North America, you can add a stopover in Iceland at no additional airfare. Icelandair says the stopover includes flights only, and that flying your second leg on a different day can change the overall price",
        "TAP Air Portugal: the Portugal Stopover lets you stay in Lisbon or Porto for up to 10 days at no extra cost on the ticket, on eligible medium and long-haul trips, on the way out or back. TAP adds partner discounts for stopover passengers",
      ],
      tip: "Book the stopover as part of the ticket, through the airline’s stopover option or a multi-city search. Two separate tickets aren’t a stopover, and the airline won’t protect your connection. Our [self-transfer guide](/travel-guides/self-transfer-separate-tickets) explains the risks.",
    },
    {
      heading: "Free hotels and free tours on longer connections",
      paragraphs: [
        "Some Gulf and Turkish carriers take a different approach: rather than an open-ended stopover, they add a free hotel or tour when your connection is long enough. The conditions matter, so read the airline’s terms for your booking.",
      ],
      list: [
        "Etihad (Abu Dhabi): eligible passengers can stop over in Abu Dhabi or Al Ain with up to two free hotel nights at selected hotels. Etihad says it needs a connection of 24 hours to four days on a return ticket, on Etihad-operated flights, booked on etihad.com rather than through a travel agent",
        "Turkish Airlines (Istanbul): Touristanbul is a free city tour for passengers connecting between two international flights with a layover of 6 to 24 hours at Istanbul Airport, on one reservation. You register at the Touristanbul desk in the arrivals hall",
        "Emirates (Dubai): Dubai Connect can include a hotel, transfers, meals and a UAE visa for eligible passengers with a long connection, when the booking is the shortest available connection. Emirates says the offer depends on hotel availability",
        "Qatar Airways (Doha): Qatar Stopover packages are discounted hotel stays of up to four nights for passengers with at least 12 hours in Doha. They’re paid packages, not a free stopover",
      ],
    },
    {
      heading: "Is a stopover worth it?",
      paragraphs: [
        "Our view: a stopover is worth it when the extra city is somewhere you’d like to see anyway, and the flights you’d book are already competitive. Adding three days in [Lisbon](/destinations/lisbon) to a trip from New York to Rome, or a couple of nights in [Istanbul](/destinations/istanbul) on the way to Asia, can turn one holiday into two for the cost of a hotel.",
        "It’s less useful if the stopover airline’s fare is higher than a rival’s nonstop, or if the hotel in the stopover city costs more than you save. It also adds a day or more of travel, so on a short trip it can take time you’d rather spend at your destination. Compare the full cost, including hotels and transfers, before choosing.",
      ],
      tip: "A long layover isn’t always wasted. If you have six to ten hours in a city with a fast rail or metro link, you may have time for a quick look. Our [layover guide](/travel-guides/how-long-a-layover) explains how much time to leave to get back through security.",
    },
    {
      heading: "Entry rules apply on a stopover",
      paragraphs: [
        "On a stopover you pass through immigration, so you need whatever that country asks of visitors. Iceland and Portugal are in the Schengen area, where British and American visitors can stay up to 90 days in any 180 without a visa; our [EES and ETIAS guide](/travel-guides/ees-etias-uk-us-travellers) covers the new border checks.",
        "For Türkiye, the UAE and Qatar, check GOV.UK’s foreign travel advice or the US State Department’s country page before you book. Our [Dubai travel rules guide](/travel-guides/dubai-travel-rules) covers entry and customs for a stopover in Dubai. And if a stopover takes you through the US or UK, you may need an ESTA or a UK ETA even for a short stay; see our [ESTA and UK ETA guide](/travel-guides/esta-and-uk-eta).",
      ],
    },
    {
      heading: "How to book one",
      paragraphs: ["The steps are similar for most programmes:"],
      list: [
        "Start on the airline’s own stopover page, which links to the right booking tool",
        "Or use a multi-city search on the airline’s site, with the stopover city as an extra stop",
        "Check the fare before and after adding the stop: it should match on a no-extra-airfare programme",
        "Book the hotel through the airline’s offer if one is included, within the airline’s deadline",
        "Check whether your bags are checked through or need collecting at the stopover city",
      ],
      ordered: true,
    },
    {
      heading: "Where to start",
      paragraphs: [
        "Our route pages show flight times to the main stopover hubs: try [New York to Lisbon](/routes/new-york-to-lisbon), [London to Istanbul](/routes/london-to-istanbul), [London to Dubai](/routes/london-to-dubai) and [New York to Dubai](/routes/new-york-to-dubai). Our destination guides for [Dubai](/destinations/dubai) and [Abu Dhabi](/destinations/abu-dhabi) cover what to see if you stay a night or two.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the difference between a stopover and a layover?",
      a: "A layover is a short connection, usually under 24 hours, often spent in the airport. A stopover is a planned break of a day or more in the connecting city, on the same ticket.",
    },
    {
      q: "Which airlines offer free stopovers?",
      a: "Icelandair and TAP Air Portugal let you add a stopover on eligible flights at no additional airfare. Etihad offers eligible passengers up to two free hotel nights in Abu Dhabi. Check each airline’s page for current conditions.",
    },
    {
      q: "Do I need a visa for a stopover?",
      a: "You need whatever the stopover country asks of visitors, because you go through immigration. Check GOV.UK or the US State Department’s country page before you book.",
    },
    {
      q: "Is Touristanbul free?",
      a: "Turkish Airlines describes Touristanbul as free for passengers connecting between two international flights with a 6 to 24 hour layover at Istanbul Airport, on one reservation.",
    },
    {
      q: "Does a stopover make my ticket more expensive?",
      a: "Not on a no-extra-airfare programme such as Icelandair’s or TAP’s, though flying on a different day can change the price. Otherwise, a multi-city ticket with a stop may cost more or less than a simple return.",
    },
  ],
  keywords: [
    "stopover vs layover",
    "difference between stopover and layover",
    "free stopover programmes",
    "icelandair stopover",
    "tap portugal stopover",
    "etihad abu dhabi stopover",
    "touristanbul",
    "airlines with free stopovers",
  ],
  // Found with WebSearch on 5 Nov 2026; airline pages only for programme terms.
  sources: [
    { label: "Icelandair: Stopover in Iceland", url: "https://www.icelandair.com/flights/stopover/" },
    { label: "TAP Air Portugal: Portugal Stopover", url: "https://www.flytap.com/en-us/stopover" },
    { label: "Etihad: Abu Dhabi Stopover", url: "https://www.etihad.com/en-us/abu-dhabi/stopover" },
    { label: "Turkish Airlines: Touristanbul", url: "https://www.turkishairlines.com/en-us/flights/fly-different/touristanbul/" },
    { label: "Emirates: Dubai Connect", url: "https://www.emirates.com/english/before-you-fly/dubai-international-airport/dubai-connect/" },
    { label: "Qatar Airways: Qatar Stopover", url: "https://www.qatarairways.com/en-us/offers/qatar-stopover.html" },
    { label: "GOV.UK: Portugal entry requirements (90 days in 180)", url: "https://www.gov.uk/foreign-travel-advice/portugal/entry-requirements" },
  ],
};
