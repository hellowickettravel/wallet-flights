import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, Agent B, guide 5 (docs/BATCH-22-BRIEF.md). Primary keyword:
// "airport lounge access without business class". Priority Pass plans and
// prices from its UK join page, Gatwick's No1 Lounge and Clubrooms pages,
// oneworld's lounge access page and the American Express UK lounge page (found
// with WebSearch on 5 Nov 2026). Prices change often and are labelled "at the
// time of writing"; the "is it worth it" arithmetic is our own advice. Star
// Alliance's own page could not be retrieved, so its rules are not quoted.
export const airportLoungeAccess: Guide = {
  slug: "airport-lounge-access",
  title: "Airport lounge access without flying business class: every way in",
  seoTitle: "Airport lounge access without business class",
  excerpt:
    "Five ways into an airport lounge without a business class ticket: paying at the door, day passes, Priority Pass, airline status and credit cards.",
  topic: "flying",
  published: "2026-11-05",
  photo: photos.guideLoungeAccess,
  summary: [
    "You can pay for one visit: Gatwick, for example, sells No1 Lounge entry from £32 online for up to three hours before departure.",
    "Priority Pass has three UK plans, from £69 a year with £24 per visit to £419 a year with unlimited member visits (prices at the time of writing).",
    "Airline status can open lounges in any cabin: oneworld Sapphire members can use business lounges on the day of a oneworld flight.",
    "Some credit cards include lounge access, but visit allowances and conditions change, so read the issuer’s current terms.",
    "Do the sums first: a lounge only pays for itself if you would otherwise spend similar money on food and drink, and have time to use it.",
  ],
  sections: [
    {
      heading: "The short answer: five routes, and the cheapest is often one visit",
      paragraphs: [
        "You don’t need a business class ticket to use an airport lounge. The main routes are paying for a single visit, buying a day pass in advance, joining a lounge programme such as Priority Pass, using airline frequent-flyer status, or holding a credit or charge card that includes access. Which is best depends on how often you fly and which airports you use.",
        "Prices, hours and conditions change often, so the figures here are those published on the operators’ own pages when we checked on 5 November 2026. Always confirm on the lounge’s or programme’s page before you pay.",
      ],
    },
    {
      heading: "Option 1: pay for a single visit",
      paragraphs: [
        "Many airport lounges sell entry directly. Gatwick’s website sells the No1 Lounge in both terminals, with prices starting at £32 when bought online and £38 for an adult at the door (children aged 2 to 11 are priced separately). Entry covers up to three hours before your flight, with food, drinks other than champagne, Wi-Fi and charging, and you can buy extra time. Gatwick also sells Clubrooms, a table-service lounge with an à la carte menu, from around £42 to £44 per adult; its pages give both figures, so check the booking page.",
        "Booking online ahead is cheaper than paying on the day at Gatwick, and it guarantees a space at busy times. If you booked through Gatwick’s website you can change the booking up to 24 hours before your entry time.",
      ],
      tip: "Work out the value before you book. If you would spend £15 to £20 on a meal and a drink in the terminal anyway, a £32 lounge visit with food, drink and a quiet seat may cost you little extra. That’s our rule of thumb, not a promise: the more you use it, the better the deal.",
    },
    {
      heading: "Option 2: join Priority Pass",
      paragraphs: [
        "Priority Pass is a membership that gives access to a network of independent lounges. Its UK site lists three plans. At the time of writing, Standard costs £69 a year and each member visit costs £24; Standard Plus costs £229 a year, with the first 10 member visits free and then £24 each; and Prestige costs £419 a year with free member visits. Guest visits cost £24 on every plan. Prices differ by country and may have changed, so check the join page.",
        "Lounges in the network set their own conditions, and some limit access at busy times or don’t take online bookings from members. Gatwick says its No1 Lounge accepts Priority Pass and DragonPass. Our advice is to check the lounge page for your airport and terminal before you rely on membership.",
      ],
      table: {
        caption: "Priority Pass UK plans at the time of writing (prioritypass.com, en-GB)",
        head: ["Plan", "Annual fee", "Member visits", "Guest visits"],
        rows: [
          ["Standard", "£69", "£24 each", "£24 each"],
          ["Standard Plus", "£229", "First 10 free, then £24 each", "£24 each"],
          ["Prestige", "£419", "Free", "£24 each"],
        ],
      },
    },
    {
      heading: "Option 3: airline frequent-flyer status",
      paragraphs: [
        "Status with an airline or alliance can get you into lounges whatever cabin you fly in. oneworld’s lounge access page describes access for Emerald and Sapphire members on the day of a oneworld flight, or before 6am the next day, at the airport where that flight departs. Sapphire covers business class lounges and Emerald covers first and business class lounges. British Airways Executive Club maps its Silver tier to oneworld Sapphire and Gold to Emerald, according to BA’s own tier comparison page.",
        "The rules have exclusions: some lounges, such as the Chelsea lounge at JFK Terminal 8, are not covered, and some fares don’t qualify. Rules also differ by the airline that earned your status and by the market you fly from, so use the lounge finder on oneworld’s site before you plan around it. Star Alliance has an equivalent Gold level; we couldn’t retrieve its official policy page, so check staralliance.com for the current rules.",
      ],
    },
    {
      heading: "Option 4: credit and charge cards",
      paragraphs: [
        "Some cards include lounge access as a benefit. American Express UK’s page says Platinum Card members, with up to two guests, get access as part of its Global Lounge Collection, and that the current lounge list and access rules are in its Lounge Finder in the Amex app or on its website. To get in you show your valid card, a boarding pass with a confirmed same-day reservation, and your passport.",
        "Amex’s page also describes a limited number of complimentary pre-booking entitlements per year for certain lounges. Card benefits, annual fees and entitlements change, so we haven’t listed them. Read the issuer’s current terms, and compare the annual fee with what you would spend on visits yourself. This is not financial advice, and a card fee is often only worth paying if you would pay for the card anyway.",
      ],
    },
    {
      heading: "Which option fits you?",
      paragraphs: [
        "This is our own comparison, based on the prices and rules above.",
      ],
      table: {
        caption: "Ways into a lounge compared (Wallet Flights’ advice)",
        head: ["If you…", "Consider", "Why"],
        rows: [
          ["Fly once or twice a year", "Pay per visit, booked online", "No fee to recover; you only pay on the trips you want it"],
          ["Fly several times a year from different airports", "Priority Pass Standard or Standard Plus", "A low annual fee, then £24 per visit at the time of writing"],
          ["Fly most months and travel with a partner", "Priority Pass Prestige, or a card that includes it", "Free member visits, but guests still cost £24 each"],
          ["Already hold airline status", "Check the alliance’s lounge finder first", "You may already have access"],
          ["Have a tight connection", "None of them", "Skip it; see [how long a layover you need](/travel-guides/how-long-a-layover)"],
        ],
      },
      tip: "Arrive early enough to use the lounge. Our [airport arrival guide](/travel-guides/how-early-to-get-to-the-airport) explains how long security takes; a lounge doesn’t help if you only reach it as boarding opens.",
    },
    {
      heading: "What you get, and what to check",
      paragraphs: [
        "A lounge usually offers seating, food and drink, charging points and Wi-Fi, but the standard varies a lot, from a small room with snacks to a full table-service restaurant. Look at the lounge’s own page for its opening hours, whether alcohol is included, and whether children are admitted; Gatwick’s Clubrooms, for instance, lists a group limit of eight if booked online as one group. Hours also change: Gatwick’s own pages show different opening times for the same lounge, so check before you travel.",
        "Many lounges close their doors early or restrict entry to a window before departure. Gatwick’s No1 Lounge gives three hours before departure. If you have a long layover at a big hub such as [Dubai](/destinations/dubai) or [London](/destinations/london), a lounge can be a quiet place to wait. Check how your connection works first in our guide to [how long a layover you need](/travel-guides/how-long-a-layover), and see our [long-haul flight tips](/travel-guides/first-long-haul-flight-tips) for making the most of a long journey.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I pay to go into an airport lounge?",
      a: "Often yes. Gatwick sells entry to its No1 Lounge from £32 when bought online (£38 for an adult), for up to three hours before departure. Prices change, so check the lounge page.",
    },
    {
      q: "Is Priority Pass worth it?",
      a: "It depends how often you fly. At the time of writing the UK plans are £69, £229 and £419 a year, with member visits at £24 each, 10 free then £24, or free. Work out how many visits you would make and compare with paying per visit.",
    },
    {
      q: "Can I use a lounge with airline status in economy?",
      a: "Often, but not always. oneworld Sapphire members can use business lounges on the day of a oneworld flight, with exclusions, and rules vary by airline and market. Check the alliance’s lounge finder.",
    },
    {
      q: "Do credit cards give lounge access?",
      a: "Some do. American Express UK’s page says Platinum Card members and up to two guests can use its Global Lounge Collection. Check the issuer’s current terms, as benefits change.",
    },
    {
      q: "Can I bring a guest into a lounge?",
      a: "Usually, at a cost or within limits. Priority Pass guest visits are £24 on each UK plan, and Amex Platinum includes up to two guests. Each programme sets its own rules.",
    },
  ],
  sources: [
    { label: "Priority Pass: Membership plans (UK)", url: "https://www.prioritypass.com/en-GB/join-prioritypass" },
    { label: "Gatwick Airport: Lounges", url: "https://www.gatwickairport.com/premium-services/lounge-airport.html" },
    { label: "Gatwick Airport: No1 Lounges", url: "https://www.gatwickairport.com/premium-services/lounge-airport/lounge-no1.html" },
    { label: "Gatwick Airport: Clubrooms", url: "https://www.gatwickairport.com/premium-services/lounge-airport/lounge-clubrooms.html" },
    { label: "oneworld: Lounge access", url: "https://www.oneworld.com/ffp/lounge-access" },
    { label: "British Airways: Compare the tiers", url: "https://www.britishairways.com/en-us/executive-club/tiers-and-benefits/compare-the-tiers" },
    { label: "American Express UK: Airport lounge access", url: "https://www.americanexpress.com/en-gb/life-with-amex/travel-and-lifestyle/amex-lounge-access/" },
  ],
  keywords: [
    "airport lounge access without business class",
    "how to get into an airport lounge",
    "pay for airport lounge",
    "is priority pass worth it",
    "airport lounge day pass",
    "lounge access with status",
    "gatwick lounge",
  ],
};
