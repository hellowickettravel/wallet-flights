import { guidesGPhotos } from "../photos/guides-g";
import type { Guide } from "./types";

// Batch G (6 Nov 2026). Primary keyword: "change or cancel a flight". Sourcing
// notes: UK CAA pages (tickets, fares and schedule changes; cancellations;
// review of airline contract terms CAP 1815), US DOT refunds pages (24-hour
// rule, refunds, ticket agents / merchant of record), British Airways' changes
// and cancellations pages and United's refund page, all found through search on
// 6 Nov 2026 (the sites could not be opened directly from the build sandbox, so
// only statements that the search extracts showed are used). No change-fee
// amounts are quoted. Our own advice is labelled as such.
export const changeOrCancelAFlightBooking: Guide = {
  slug: "change-or-cancel-a-flight-booking",
  title: "How to change or cancel a flight booking: fare rules, refunds and who to ask",
  seoTitle: "Change or cancel a flight: fare rules and refunds",
  excerpt:
    "What your fare allows when you change or cancel a flight: refundable and flexible fares, the 24-hour rule, taxes, airline changes and who to contact.",
  topic: "rights",
  published: "2026-11-06",
  photo: guidesGPhotos.guideChangeCancel,
  summary: [
    "What you can do depends on the fare you bought. Flexible fares allow changes without a fee; the cheapest fares are often non-refundable and sometimes cannot be changed at all.",
    "In the US, airlines must let you cancel within 24 hours of booking for a full refund if you booked at least seven days before departure, or hold the fare for 24 hours. The UK has no equivalent rule.",
    "If the airline cancels or significantly changes your flight, you are entitled to a refund even on a non-refundable fare.",
    "If you booked through a travel site, contact the site first. It is usually the company that has to refund you.",
  ],
  sections: [
    {
      heading: "The short answer: your fare decides",
      paragraphs: [
        "There is no single rule for changing or cancelling a flight, because the answer sits in the fare conditions of the ticket you bought. Before you do anything, open your booking confirmation and find the fare name and its conditions, which the airline usually shows on its website or in your confirmation email.",
        "There is one big exception. If the airline cancels your flight or changes it significantly, the rules in the next sections apply whatever fare you bought. Whether the change was your choice or the airline’s is the first question to answer.",
      ],
    },
    {
      heading: "Refundable, flexible and non-refundable fares",
      paragraphs: [
        "The UK Civil Aviation Authority says a flexible fare costs more up front, but after you buy it you will not have to pay extra to make changes. It also says changes to other tickets can carry charges. At the other end, a CAA review of airline contract terms found that the majority of basic economy fares tend to be both non-refundable and non-transferable, so a passenger who cannot travel may lose the whole ticket price.",
        "United’s refund page gives a concrete example from the US. It says Basic Economy tickets are not eligible for changes, though they can be refunded in full within 24 hours of booking if you bought them a week or more before departure. It adds that most of its other fares are non-refundable and are not eligible for voluntary refunds, although the value of the ticket may be applied to a new ticket for a fee.",
      ],
      table: {
        caption: "What official and airline pages say about each kind of fare",
        head: ["Fare type", "Changes", "Refund if you cancel", "Source"],
        rows: [
          ["Flexible", "No extra charge to change after purchase", "Depends on the airline’s fare rules", "UK CAA, Tickets, fares and schedule changes"],
          ["Standard fixed-price", "Changes can carry charges", "Depends on the fare rules; many are non-refundable", "UK CAA; United refund page"],
          ["Basic economy", "At United, not eligible for changes", "Full refund within 24 hours if bought a week or more ahead; otherwise generally non-refundable", "United refund page; UK CAA CAP 1815"],
        ],
      },
      tip: "Our advice: before you buy a cheap fare, read the sentence on changes and refunds as if you will need it. If your plans are uncertain, compare the price of the next fare up, as our [basic economy guide](/travel-guides/basic-economy-explained) explains.",
    },
    {
      heading: "Cancelling within 24 hours",
      paragraphs: [
        "In the US, the Department of Transportation requires airlines to either let you cancel for a full refund within 24 hours of booking, or hold the fare unpaid for 24 hours. It applies to tickets bought at least seven days before departure, and the airline chooses which option it offers. British Airways applies a similar window to direct bookings: its page says you can cancel and claim a full refund without penalty up to 24 hours after booking, provided you travel a week or more after the purchase date.",
        "The DOT is clear that the requirement does not apply to tickets booked through online travel agencies or other third-party agents, although they are free to offer something similar. Our guide to the [24-hour flight cancellation rule](/travel-guides/24-hour-flight-cancellation-rule) explains who is covered, including the position for UK bookings.",
      ],
    },
    {
      heading: "Taxes and fees on a ticket you do not use",
      paragraphs: [
        "If you cancel a non-refundable ticket yourself, you may still be able to recover part of what you paid. In the UK, the CAA says there is no legal authority obliging airlines to refund taxes, fees and charges when passengers cancel their tickets. Many airlines do offer a refund, but some charge an administration fee that can sometimes exceed the amount being claimed. British Airways’ conditions of carriage say a voluntary refund of an unused ticket is the fare, surcharges, taxes, fees and charges you paid, less any cancellation and reasonable service charge. BA’s trade policy for non-refundable tickets says only government and airport taxes will be refunded.",
        "The US rule is different when the airline is the one that cancels. The DOT’s 2024 final rule says refunds must cover the full ticket price minus the value of any flight segments already used, including government-imposed taxes and fees and airline-imposed fees, and they must be in the original form of payment. Before you confirm a cancellation, ask the airline which taxes and charges it will return.",
      ],
    },
    {
      heading: "When the airline cancels or changes your flight",
      paragraphs: [
        "If the airline cancels, the CAA says you must be offered a choice of a refund, re-routing at the earliest opportunity, or re-routing at a later date subject to availability. For flights departing the UK, it says a refund should arrive within seven days. If you booked a return and the outbound leg is cancelled, you can recover the full cost of the return ticket.",
        "A schedule change is different from a cancellation. The CAA says schedule changes should be notified at least 14 days in advance and should alter only the date or time, not the flight number. If the time changes significantly, you may be entitled to a refund or a more suitable alternative, but the airline is not responsible for consequential costs such as a hotel you cannot use.",
        "In the US, the DOT says you are entitled to a refund if the airline cancels or significantly changes your flight and you decline the alternative offered, even on a non-refundable fare. Our guide to [your rights when a flight is cancelled or delayed](/travel-guides/flight-cancelled-or-delayed-rights) covers care, compensation and how to claim.",
      ],
    },
    {
      heading: "If you booked through a travel site",
      paragraphs: [
        "The DOT says the company named on your card statement, the merchant of record, is the one that must issue the refund, and that you should contact the travel agent before the airline. Under its interpretation, an agent must refund when the airline has cancelled or significantly changed the flight, the airline acknowledges you are entitled to a refund, and the agent holds your money. British Airways says the same in practice: for tickets bought from a travel agent, contact the agent directly.",
        "Wallet Flights compares fares; when you book online, the airline or travel site you choose holds your booking, so ask them about changes and refunds. If our team booked the flight for you on WhatsApp, message us and we will take it up with the airline.",
      ],
      tip: "Our advice: check your card statement for the merchant name before you phone anyone. It tells you whether to start with the airline or the travel site.",
    },
    {
      heading: "Keep a paper trail",
      paragraphs: [
        "Refund disputes are won on records. These are the things we would keep, as our own advice rather than an official checklist.",
      ],
      list: [
        "The booking confirmation and the fare conditions as they were when you bought",
        "Emails, chat transcripts and the name of anyone you spoke to on the phone",
        "Receipts for anything you paid for because of a cancellation, in case you can claim them back",
        "The card statement line showing who took the payment, and the date any refund should reach you",
      ],
    },
    {
      heading: "Before you buy: compare fares you can change",
      paragraphs: [
        "If your plans might change, the cheapest fare is not always the cheapest outcome. For popular routes such as [London to Lisbon](/routes/london-to-lisbon) or [London to Dubai](/routes/london-to-dubai), price the flexible fare next to the basic one and decide whether the difference is worth the freedom to change.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I get a refund if I cancel a non-refundable flight?",
      a: "Usually not the fare, unless the airline cancelled or changed the flight, or you cancel within the 24-hour window. You may be able to recover some taxes and fees: in the UK the CAA says many airlines refund them although they do not have to, and some charge a processing fee.",
    },
    {
      q: "Can I change a flight booking for free?",
      a: "Only if your fare allows it. The CAA says flexible fares do not charge extra for changes, and other tickets may. Check your fare conditions or ask the airline before you change anything.",
    },
    {
      q: "Does the 24-hour rule apply to a booking I made through a travel site?",
      a: "Not under the DOT rule, which covers tickets booked directly with an airline. Travel agents may offer a similar window, so check their policy and contact them first.",
    },
    {
      q: "How long does a flight refund take?",
      a: "The CAA says refunds for flights departing the UK should arrive within seven days when the airline cancels. The DOT says airlines and ticket agents must refund within seven business days for credit card payments and 20 calendar days for other methods, once a refund is due.",
    },
  ],
  sources: [
    { label: "UK Civil Aviation Authority: Tickets, fares and schedule changes", url: "https://www.caa.co.uk/passengers-and-public/before-you-fly/making-a-booking/tickets-fares-and-schedule-changes/" },
    { label: "UK Civil Aviation Authority: Cancellations", url: "https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/cancellations/" },
    { label: "UK Civil Aviation Authority: Review of airline contract terms (CAP 1815)", url: "https://www.caa.co.uk/publication/download/17375" },
    { label: "US Department of Transportation: Refunds", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
    { label: "US Department of Transportation: What airline passengers need to know about DOT’s automatic refund rule", url: "https://www.transportation.gov/briefing-room/what-airline-passengers-need-know-about-dots-automatic-refund-rule" },
    { label: "US Department of Transportation: Buying a ticket", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/buying-ticket" },
    { label: "British Airways: Changes and cancellations FAQs", url: "https://www.britishairways.com/content/information/help/faqs/changes-cancellations" },
    { label: "British Airways: Delays, cancellations and refunds", url: "https://www.britishairways.com/content/information/delayed-or-cancelled-flights" },
    { label: "British Airways: General Conditions of Carriage", url: "https://www.britishairways.com/content/information/legal/conditions-of-carriage/general-conditions-of-carriage" },
    { label: "United: Refunds", url: "https://www.united.com/ual/en/IL/customer/refund" },
  ],
  keywords: [
    "change or cancel a flight",
    "cancel a flight booking",
    "change a flight booking",
    "flight refund non-refundable ticket",
    "flexible fare",
    "refund taxes unused ticket",
    "cancelled flight booked through travel agent",
  ],
};
