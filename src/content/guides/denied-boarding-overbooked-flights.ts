import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, guides agent C. Primary keyword: "overbooked flight compensation".
// UK figures from the CAA denied boarding page, GOV.UK's summary of passenger
// rights and the retained Regulation 261/2004 on legislation.gov.uk; US
// figures from the DOT's Bumping & Oversales page and 14 CFR Part 250 on
// eCFR. Found on 5 to 6 Nov 2026. We describe the rules; we never promise an
// outcome.
export const deniedBoardingOverbookedFlights: Guide = {
  slug: "denied-boarding-overbooked-flights",
  title: "Bumped from an overbooked flight? Your compensation rights in the UK and US",
  seoTitle: "Overbooked flight compensation: UK and US rules",
  excerpt:
    "What happens when a flight is overbooked, what to ask for if you volunteer, and the compensation owed if you’re bumped, under UK and US rules.",
  topic: "rights",
  published: "2026-11-05",
  photo: photos.guideDeniedBoarding,
  summary: [
    "Airlines sell more seats than a plane holds, and when too many people turn up they must first ask for volunteers.",
    "If you volunteer, what you get is a deal between you and the airline, so ask what’s on offer before you agree.",
    "Bumped against your will on a UK-covered flight, you’re owed £220, £350 or £520 depending on distance, plus a refund or another flight, and meals and a hotel if needed.",
    "Bumped against your will on a flight leaving the US, you’re owed 200% or 400% of your one-way fare, up to $1,075 or $2,150, unless you arrive within an hour of your original time.",
    "You must have checked in and reached the gate on time to qualify.",
  ],
  sections: [
    {
      heading: "Why flights are overbooked",
      paragraphs: [
        "Airlines know that some passengers with tickets won’t show up, so on many flights they sell slightly more seats than the aircraft has. Usually it works out. When it doesn’t, someone has to give up their seat. The US Department of Transportation (DOT) calls this bumping; UK and EU rules call it denied boarding.",
        "Both sets of rules say the same first step: before bumping anyone, the airline must ask for volunteers. Only if too few people volunteer can it refuse boarding to passengers against their will, and then fixed compensation applies.",
      ],
    },
    {
      heading: "Which rules cover your flight?",
      paragraphs: [
        "UK rules (UK261) apply to flights departing from a UK airport on any airline, and to flights arriving in the UK on a UK or EU airline. US rules apply to flights departing from a US airport. On a transatlantic flight, that means both, one or neither may apply.",
      ],
      table: {
        caption: "Compensation for being bumped involuntarily, from the CAA, retained Regulation 261/2004 and the US DOT",
        head: ["Your flight", "Rules", "Compensation if bumped against your will"],
        rows: [
          ["Up to 1,500 km from the UK, e.g. London to Paris", "UK261", "£220 per person (£110 if rerouted to arrive within 2 hours of the original time)"],
          ["1,500 to 3,500 km from the UK, e.g. London to Lisbon", "UK261", "£350 per person (£175 if rerouted to arrive within 3 hours)"],
          ["Over 3,500 km from the UK, e.g. London to New York", "UK261 (and US rules on the way back from the US)", "£520 per person (£260 if rerouted to arrive within 4 hours)"],
          ["US domestic, arriving 1 to 2 hours late", "US DOT", "200% of the one-way fare, up to $1,075"],
          ["US domestic, arriving more than 2 hours late", "US DOT", "400% of the one-way fare, up to $2,150"],
          ["International from the US, arriving 1 to 4 hours late", "US DOT", "200% of the one-way fare, up to $1,075"],
          ["International from the US, arriving more than 4 hours late", "US DOT", "400% of the one-way fare, up to $2,150"],
        ],
      },
      tip: "Under US rules, there’s no compensation if the airline gets you to your destination within an hour of your original arrival time. The fare used for the calculation includes taxes and fees, the DOT says.",
    },
    {
      heading: "If you’re asked to volunteer",
      paragraphs: [
        "Volunteering can be worth it if your plans are flexible, but the fixed compensation above doesn’t apply to volunteers. What you get is whatever you agree with the airline, so treat it as a negotiation. Under UK261, volunteers are still entitled to a refund or another flight, and to care while they wait, on top of what they’ve agreed.",
        "Before you agree, ask:",
      ],
      list: [
        "When the next available flight leaves and arrives, and whether your seat is confirmed",
        "Whether the offer is cash or a voucher, and if it’s a voucher, how long it lasts and what restrictions apply",
        "Whether meals, a hotel and transport are included if you have to wait overnight",
        "What happens to your checked bags",
        "Whether connecting flights and the return trip on your booking stay valid",
      ],
      tip: "Our advice: don’t accept a voucher until you know when you’ll actually fly. A generous voucher for a flight that leaves tomorrow afternoon may cost you a hotel night, a missed connection or a day of your holiday.",
    },
    {
      heading: "Bumped against your will: UK rules",
      paragraphs: [
        "If you’re denied boarding against your will on a flight covered by UK261, the airline must pay compensation straight away, the CAA says, as long as you had a confirmed booking and checked in on time. The amount depends on the flight’s distance, as in the table above, and can be halved if the airline reroutes you to arrive close to your original time.",
        "You also get a choice between a refund for the unused parts of your ticket, paid within 7 days according to GOV.UK, and another flight to your destination at the earliest opportunity or at a later date that suits you. While you wait, the airline must provide care: meals and refreshments, a means to communicate and, if you have to stay overnight, a hotel and transport to it.",
        "Being refused boarding for other reasons isn’t covered. Airlines can turn you away for reasonable grounds such as health, safety, security or not having the right travel documents, and no compensation is due then. Check our guide to [passport validity rules](/travel-guides/passport-validity-rules) before you fly.",
      ],
    },
    {
      heading: "Bumped against your will: US rules",
      paragraphs: [
        "The DOT says you’re entitled to denied boarding compensation if you were bumped involuntarily from a flight departing a US airport, you had a confirmed reservation, and you checked in and reached the departure gate on time. The amount is a percentage of your one-way fare, capped as shown in the table, and you’re generally entitled to it as a check or cash, not only as a voucher.",
        "The airline must also give you a written statement of your rights and explain how it decided who was bumped. If you don’t use your original ticket, you can ask for a refund of it, and of optional fees, such as a seat you paid for, for services you didn’t get on the replacement flight.",
      ],
      list: [
        "Arrive within 1 hour of your original arrival time: no compensation",
        "Domestic, 1 to 2 hours late, or international, 1 to 4 hours late: 200% of the one-way fare, up to $1,075",
        "Domestic, over 2 hours late, or international, over 4 hours late: 400% of the one-way fare, up to $2,150",
      ],
    },
    {
      heading: "How to avoid being bumped, and how to claim",
      paragraphs: [
        "There’s no guaranteed way to avoid it. The DOT says each airline sets its own boarding priority rules, which can take into account things like when you checked in, the fare you paid and frequent flyer status, so our advice is to check in online as soon as it opens and arrive at the gate in good time.",
        "If you’re bumped, ask the gate agent for the written notice of your rights and keep your boarding pass. If the airline doesn’t pay, claim from it in writing. On UK flights, escalate to the airline’s ADR body or the CAA if it rejects your claim or doesn’t reply within eight weeks; on US flights, complain to the DOT. Our guide to [your rights when a flight is cancelled or delayed](/travel-guides/flight-cancelled-or-delayed-rights) covers related claims, and [how early to get to the airport](/travel-guides/how-early-to-get-to-the-airport) helps you avoid missing the gate cut-off. If you’re flying [London to New York](/routes/london-to-new-york) or [New York to London](/routes/new-york-to-london), check which rules apply in each direction.",
      ],
    },
  ],
  faqs: [
    {
      q: "How much compensation do you get for an overbooked flight in the UK?",
      a: "If you’re bumped against your will on a flight covered by UK261, you’re owed £220, £350 or £520 per person depending on distance. It can be halved if the airline reroutes you to arrive close to your original time. You also get a refund or another flight, and care while you wait.",
    },
    {
      q: "What do US airlines have to pay if you’re bumped?",
      a: "On flights departing the US, 200% of your one-way fare up to $1,075 if you arrive 1 to 2 hours late (1 to 4 hours on international flights), or 400% up to $2,150 if you arrive later. Nothing is due if you arrive within an hour of your original time.",
    },
    {
      q: "Is it legal for airlines to overbook flights?",
      a: "Yes, in both the UK and the US. The rules don’t stop overbooking; they require airlines to ask for volunteers first and to compensate anyone they bump against their will.",
    },
    {
      q: "Do volunteers get the same compensation?",
      a: "No. Volunteers get whatever they agree with the airline. Under UK rules they’re still entitled to a refund or another flight and care while they wait, on top of the agreed benefits.",
    },
    {
      q: "Can I insist on cash instead of a voucher?",
      a: "If you’re bumped involuntarily, yes: the DOT says you’re generally entitled to a check or cash, and UK261 compensation is a cash amount. If you volunteer, the form of payment is part of the deal you agree.",
    },
  ],
  sources: [
    { label: "UK Civil Aviation Authority: Denied boarding", url: "https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/denied-boarding/" },
    { label: "GOV.UK: Air passenger travel guide, summary of passenger rights", url: "https://www.gov.uk/government/publications/air-passenger-travel-guide/air-passenger-travel-guide-summary-of-passenger-rights" },
    { label: "legislation.gov.uk: Regulation (EC) No 261/2004 as it applies in the UK", url: "https://www.legislation.gov.uk/eur/2004/261" },
    { label: "US Department of Transportation: Bumping and oversales", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/bumping-oversales" },
    { label: "eCFR: 14 CFR Part 250, Oversales", url: "https://www.ecfr.gov/current/title-14/chapter-II/subchapter-A/part-250" },
  ],
  keywords: ["overbooked flight compensation", "denied boarding compensation", "bumped from flight compensation", "uk261 denied boarding", "dot bumping rules", "overbooked flight what to do", "volunteer to give up seat"],
};
