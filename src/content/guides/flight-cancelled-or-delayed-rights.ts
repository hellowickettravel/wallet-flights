import { photos } from "../images";
import type { Guide } from "./types";

// Wave 1, post 3, and the owner's proposed guide 1 (docs/GUIDE-PROPOSALS.md).
// Primary keywords: "cancelled flight rights", "delayed flight rights".
// UK figures from the CAA delays and cancellations pages and the GOV.UK
// summary of passenger rights; US rules from the DOT refunds page (read in a
// browser; last updated 7 Nov 2025). All read on 16 Oct 2026. We describe the
// rules and point to the regulators; we never promise an outcome.
export const flightRights: Guide = {
  slug: "flight-cancelled-or-delayed-rights",
  title: "Flight cancelled or delayed? Your refund and compensation rights in the UK and US",
  seoTitle: "Cancelled or delayed flight? Your rights",
  excerpt:
    "Which rules cover your flight, when you’re owed a refund, care or compensation, and how to claim, for UK and US travellers. With the regulators’ figures.",
  topic: "rights",
  published: "2026-10-16",
  photo: photos.guideDepartures,
  summary: [
    "UK rules cover flights leaving a UK airport on any airline, and flights into the UK or the EU on a UK or EU airline.",
    "Under UK rules, a cancelled flight means a refund or another flight; if you were told less than 14 days before, you may also get compensation.",
    "Arrive more than three hours late on a UK-covered flight and you may be owed £220, £350 or £520 per person, depending on distance, unless the cause was extraordinary.",
    "US rules give you a refund if the airline cancels or significantly changes your flight and you choose not to travel, even on a non-refundable ticket.",
    "US law doesn’t set fixed cash compensation for delays; what you get depends on the airline’s own commitments.",
  ],
  sections: [
    {
      heading: "Which rules cover your flight?",
      paragraphs: [
        "Start here, because it decides everything else. UK passenger rights, often called UK261, apply to flights that depart from a UK airport on any airline, flights that arrive at a UK airport on a UK or EU airline, and flights that arrive at an EU airport on a UK airline. US refund rules from the Department of Transportation (DOT) apply to flights to, from and within the United States.",
        "For transatlantic trips, that means both sets of rules can apply to the same flight, while some flights are covered by only one.",
      ],
      table: {
        caption: "Which passenger rights rules apply to common UK and US routes",
        head: ["Your flight", "UK rules (UK261)?", "US refund rules?"],
        rows: [
          ["London to New York, any airline", "Yes: it departs from the UK", "Yes: it flies to the US"],
          ["New York to London on a UK or EU airline", "Yes: it arrives in the UK on a UK or EU airline", "Yes: it flies from the US"],
          ["New York to London on a US airline", "No", "Yes"],
          ["Manchester to Dubai, any airline", "Yes: it departs from the UK", "No"],
          ["Dubai to Manchester on a non-UK, non-EU airline", "No", "No"],
          ["Within the US, e.g. Atlanta to Los Angeles", "No", "Yes"],
        ],
      },
      tip: "On a booking with connections, UK rules look at the whole journey: the CAA says your right to care and compensation is based on the distance between the first and last airport in your booking.",
    },
    {
      heading: "Cancelled flight: your rights under UK rules",
      paragraphs: [
        "If your flight is cancelled, the airline must offer you a choice between a refund for the parts of the ticket you haven’t used and an alternative flight to your destination, as soon as possible or at a later date that suits you. GOV.UK says a refund should be paid within 7 days.",
        "While you wait for a replacement flight, the airline must look after you: reasonable food and drink, a way to communicate, and a hotel with transport to it if you’re rerouted the next day. The CAA says this applies however long the delay and whatever caused it. If the airline doesn’t arrange it, you can pay for reasonable care yourself and claim it back, so keep every receipt.",
        "If you were told about the cancellation less than 14 days before departure, you may also be able to claim compensation. The fixed amounts are £220, £350 or £520 per person, for short, medium and long flights. They can be halved (£110, £175 or £260) when the replacement flight gets you there close to your original time, and nothing is due if the replacement departs no more than an hour early and arrives less than two hours late.",
      ],
    },
    {
      heading: "Delayed flight: care, compensation and refunds under UK rules",
      paragraphs: [
        "Your rights grow with the length of the delay and the distance of the flight.",
      ],
      table: {
        caption: "UK rules for delayed flights, from the Civil Aviation Authority",
        head: ["Flight distance", "Example", "Care from (delay at departure)", "Compensation if you arrive 3+ hours late"],
        rows: [
          ["Under 1,500 km", "Glasgow to Amsterdam", "2 hours", "£220 per person"],
          ["1,500 to 3,500 km", "East Midlands to Marrakesh", "3 hours", "£350 per person"],
          ["Over 3,500 km", "London to New York", "4 hours", "£260 if 3 to 4 hours late; £520 if more than 4 hours late"],
        ],
      },
      list: [
        "Compensation depends on how late you arrive at your final destination, not how late you leave",
        "If the delay reaches at least five hours, you can choose not to travel and get a refund for the flights you haven’t taken",
        "Airlines don’t have to pay compensation when the delay was caused by extraordinary circumstances, such as extreme weather or air traffic control strikes",
      ],
    },
    {
      heading: "Missed connections and separate tickets",
      paragraphs: [
        "If all your flights are on one booking and a delay makes you miss a connection, the CAA looks at the whole journey, from the first airport to the last, when working out care and compensation.",
        "Self-transfer trips are different. When you book separate flights yourself, the CAA says you don’t have a statutory right to care, compensation or transport to your final destination if the first flight is late and you miss the second; each flight only carries its own rights. Our guide to [self-transfer flights and separate tickets](/travel-guides/self-transfer-separate-tickets) explains how to spot one before you book.",
      ],
    },
    {
      heading: "US rules: refunds for cancellations and significant changes",
      paragraphs: [
        "US rules are about refunds rather than fixed compensation. The DOT says you’re entitled to a refund if the airline cancels your flight, for any reason, or significantly delays or changes it, and you choose not to travel or accept a credit, voucher or other offer. That applies to non-refundable tickets too.",
        "A significant change includes:",
      ],
      list: [
        "Departing 3 hours or more earlier, or arriving 3 hours or more later, on a domestic trip; 6 hours or more on an international one",
        "Leaving from or arriving at a different airport",
        "More connections than your original booking",
        "Being moved to a lower class of travel",
      ],
    },
    {
      heading: "How US refunds work, and what about vouchers?",
      paragraphs: [
        "Airlines must tell you that you’re entitled to a refund when they cancel or significantly change a flight. If you turn down the rebooking or don’t respond, the DOT says the refund should be made automatically, to your original payment method: within 7 business days for card payments, and within 20 days for other payment types.",
        "Airlines can offer travel credits or vouchers instead, but they must also tell you that you can have a refund. Any credit they give you must be valid for at least five years.",
        "If you booked through a travel agent or online travel site that took your payment (the merchant of record on your card statement), that agent is responsible for refunding the fare.",
        "Bag fees can be refunded too: the DOT says a checked bag is significantly delayed if it isn’t delivered within 12 hours of a domestic flight, or 15 hours (30 hours for flights over 12 hours) of an international one.",
        "For delays, there’s no federal rule setting cash compensation. Many US airlines publish customer service commitments for delays within their control, such as meal vouchers or hotels, and the DOT points travellers to those plans and its airline customer service dashboard.",
      ],
    },
    {
      heading: "How to claim",
      ordered: true,
      paragraphs: ["Claim from the airline that operated the flight, not from a comparison site, and keep the paperwork."],
      list: [
        "Write down your booking reference, flight number, scheduled and actual times, and what the airline told you about the cause",
        "Keep receipts for meals, hotels and transport you paid for while waiting",
        "Claim from the airline using its own form. You don’t need a claims company",
        "UK flights: if the airline rejects your claim or hasn’t replied within eight weeks, escalate to its alternative dispute resolution (ADR) body or, if it doesn’t have one, the CAA’s Passenger Advice and Complaints Team",
        "US flights: if you’re owed a refund and don’t get one, file a complaint with the US Department of Transportation",
      ],
    },
    {
      heading: "If you booked through Wallet Flights",
      paragraphs: [
        "Wallet Flights compares fares; when you book online, the airline or travel site you choose holds your booking, so contact them about refunds and changes. If our team booked your flight on WhatsApp, message us and we’ll take it up with the airline for you. Our [help centre](/help) has more on who to contact.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is a 3-hour flight delay eligible for compensation?",
      a: "Under UK rules, you may be owed compensation if you arrive at your final destination more than three hours late and the cause wasn’t extraordinary. The amount depends on the flight’s distance: £220, £350 or £520 per person, or £260 for a 3 to 4 hour delay on flights over 3,500 km.",
    },
    {
      q: "Does UK261 apply to American Airlines and other US airlines?",
      a: "On flights leaving the UK, yes: UK rules cover every airline departing from a UK airport. On flights from the US to the UK, they only apply if the airline is a UK or EU airline.",
    },
    {
      q: "Do US airlines have to pay compensation for delays?",
      a: "There’s no federal rule setting cash compensation for delays. You’re entitled to a refund if the delay is significant and you choose not to travel, and many airlines publish what they offer for delays within their control.",
    },
    {
      q: "What counts as extraordinary circumstances?",
      a: "Events outside the airline’s control. The CAA gives extreme weather and airport or air traffic control strikes as examples. Airlines don’t have to pay compensation in those cases, but they still have to look after you while you wait.",
    },
    {
      q: "How long does an airline have to refund me?",
      a: "GOV.UK says refunds for cancelled flights under UK rules should be paid within 7 days. Under US rules, automatic refunds are due within 7 business days for card payments and within 20 days for other payment types.",
    },
  ],
  keywords: ["cancelled flight rights", "delayed flight rights uk", "delayed flight rights usa", "flight delay compensation uk", "uk261 compensation", "dot refund rules"],
  sources: [
    { label: "UK Civil Aviation Authority: Delays", url: "https://www.caa.co.uk/air-passengers/resolving-travel-problems/delays-and-cancellations/delays/" },
    { label: "UK Civil Aviation Authority: Cancellations", url: "https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/cancellations/" },
    { label: "GOV.UK: Air passenger travel guide, summary of passenger rights", url: "https://www.gov.uk/government/publications/air-passenger-travel-guide/air-passenger-travel-guide-summary-of-passenger-rights" },
    { label: "US Department of Transportation: Refunds", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
  ],
};
