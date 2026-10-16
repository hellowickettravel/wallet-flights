import { photos } from "../images";
import type { Guide } from "./types";

// Wave 1, post 2 (docs/SEO-CONTENT-PLAN.md). Primary keyword: "24 hour
// cancellation rule flights". US rules from the DOT refunds page and its
// 24-hour guidance (read in a browser, 16 Oct 2026; page last updated 7 Nov
// 2025). The UK position from the Consumer Contracts Regulations 2013,
// regulation 27(2)(c) (read 16 Oct 2026).
export const twentyFourHourRule: Guide = {
  slug: "24-hour-flight-cancellation-rule",
  title: "The 24-hour cancellation rule: who it covers, and whether it applies to UK flights",
  seoTitle: "The 24-hour flight cancellation rule",
  excerpt:
    "US rules let you cancel most flights within 24 hours of booking for a full refund. What the rule covers, when it doesn’t apply, and the UK position.",
  topic: "booking",
  published: "2026-10-16",
  photo: photos.guideBooking,
  summary: [
    "US rules require airlines to let you either cancel within 24 hours for a full refund, or hold the fare for 24 hours without paying.",
    "It only covers tickets bought at least seven days before the flight departs.",
    "The airline chooses which of the two options it offers, so check before you pay.",
    "It doesn’t apply to bookings made through travel agents or online travel sites, though some offer something similar.",
    "UK law has no equivalent: flights are excluded from the usual 14-day cooling-off period, so the fare rules decide.",
  ],
  sections: [
    {
      heading: "What the US 24-hour rule says",
      paragraphs: [
        "The US Department of Transportation (DOT) requires airlines to give you a short window to change your mind. For tickets bought at least seven days before the flight’s scheduled departure, an airline must do one of two things:",
      ],
      list: [
        "Let you cancel the booking within 24 hours and get a full refund, with no penalty, or",
        "Let you hold the reservation at the quoted price for 24 hours without paying for it",
      ],
      tip: "Airlines don’t have to offer both. If an airline takes payment when you book, it must let you cancel and get a full refund within 24 hours; if it lets you hold without paying, you can simply let the hold lapse.",
    },
    {
      heading: "Which bookings it covers",
      paragraphs: [
        "The DOT’s guidance on the 24-hour requirement is addressed to both US and foreign airlines, so it isn’t limited to American carriers. In practice, it is the rule people rely on when they book flights to or from the US directly with an airline, including transatlantic routes such as [London to New York](/routes/london-to-new-york) and [New York to London](/routes/new-york-to-london).",
        "Three conditions decide whether you can use it:",
      ],
      list: [
        "You booked directly with the airline, on its website, app or phone line",
        "You booked at least seven days before the flight’s scheduled departure",
        "You cancel (or the hold runs out) within 24 hours of making the booking",
      ],
    },
    {
      heading: "When the rule doesn’t apply",
      paragraphs: [
        "The DOT is clear that the 24-hour requirement for airlines doesn’t apply to tickets booked through online travel agencies, travel agents or other third parties. Those agents are free to offer the same or a similar window, and many do, but it’s their policy rather than a legal right. If you booked through an agent, contact the agent first, not the airline.",
        "It also doesn’t help with bookings made less than seven days before departure, and it isn’t a free change: airlines don’t have to let you change the date or correct a misspelled name free of charge within the 24 hours. The DOT points out that cancelling for a refund and rebooking can sometimes work out cheaper than paying a change fee, but fares move quickly, so check the new price before you cancel.",
      ],
    },
    {
      heading: "Is there a 24-hour rule in the UK?",
      paragraphs: [
        "No. There’s no UK law that gives you a 24-hour or 14-day window to cancel a flight. The Consumer Contracts Regulations 2013, which give you 14 days to cancel most things you buy online, specifically exclude contracts for passenger transport services, and flights are passenger transport.",
        "That means a flight booked from the UK is governed by the fare rules you agree to when you book. Some airlines and travel sites offer their own short free-cancellation window or a refundable fare option, so read the conditions before you pay, not after.",
        "If you’re flying between the UK and the US, you may still be able to use the US rule when you book directly with an airline that offers it on that route. Check the airline’s own page on cancellations before you rely on it.",
      ],
    },
    {
      heading: "How to cancel within 24 hours",
      ordered: true,
      paragraphs: ["If you’ve booked the wrong date, found a better fare or your plans have changed, move quickly."],
      list: [
        "Check the time you made the booking: the 24 hours run from then, not from midnight",
        "Open the booking on the airline’s website or app, using your booking reference and surname",
        "Choose to cancel, and make sure the option says you’ll get a refund, not a credit or voucher",
        "If the website doesn’t offer a refund, call the airline and say you’re cancelling within 24 hours of booking",
        "Keep the cancellation email, and check your card statement for the refund",
      ],
    },
    {
      heading: "After the 24 hours: what decides a refund",
      paragraphs: [
        "Once the window has passed, whether you get money back depends on two things: the type of fare you bought, and whether the airline changes the flight.",
        "If you cancel a non-refundable ticket yourself, you’re usually not entitled to a refund, though you may get a credit or be able to change it for a fee. A fully refundable ticket can be refunded when you don’t use it.",
        "It’s different when the airline is the one that changes things. Under DOT rules, if an airline cancels or significantly changes a flight to, from or within the US and you choose not to travel, you’re entitled to a refund, even on a non-refundable ticket. Under UK rules, a cancelled flight gives you the choice of a refund or another flight. Our guide to [your rights when a flight is cancelled or delayed](/travel-guides/flight-cancelled-or-delayed-rights) explains both sets of rules.",
      ],
    },
    {
      heading: "If you booked through Wallet Flights",
      paragraphs: [
        "When you choose a deal on Wallet Flights, you book with the airline or travel site you pick, and that provider holds your booking. If it’s an airline, the 24-hour rule above can apply when the conditions are met. If it’s a travel site, its own cancellation policy applies, so contact it directly.",
        "If our team booked the flight for you on WhatsApp, message us as soon as possible and we’ll check what the fare allows with the airline.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does the 24-hour rule apply to international flights?",
      a: "It applies to bookings made directly with an airline for flights to or from the US, as long as you booked at least seven days before departure. It isn’t a worldwide rule, and the UK has no equivalent.",
    },
    {
      q: "Can I cancel a flight within 24 hours in the UK?",
      a: "Not as a legal right. Flights are excluded from the UK’s 14-day cooling-off period, so it depends on your fare rules and on whether the airline or travel site offers its own free-cancellation window.",
    },
    {
      q: "Does the 24-hour rule apply if I booked through a travel site?",
      a: "No. The DOT says it doesn’t apply to tickets booked through online travel agencies or travel agents, although many offer a similar policy. Contact the agent you booked with.",
    },
    {
      q: "Will I get cash back or a travel credit?",
      a: "When the rule applies, it’s a full refund, not a credit. Make sure the cancellation option you choose says refund.",
    },
    {
      q: "Does the 24-hour rule cover basic economy fares?",
      a: "The DOT’s rules don’t list any fare-type exception: the conditions are booking directly with the airline at least seven days before departure. Check how your airline applies it, because some offer the hold option instead of a refund.",
    },
  ],
  keywords: ["24 hour cancellation rule flights", "24 hour cancellation policy international flights", "can i cancel a flight within 24 hours uk", "flight refund within 24 hours", "dot 24 hour rule"],
  sources: [
    { label: "US Department of Transportation: Refunds, including the 24-hour rule", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
    { label: "US Department of Transportation: Guidance on the 24-hour reservation requirement", url: "https://www.transportation.gov/airconsumer/notice-24hour-reservation" },
    { label: "legislation.gov.uk: Consumer Contracts Regulations 2013, regulation 27", url: "https://www.legislation.gov.uk/uksi/2013/3134/regulation/27" },
  ],
};
