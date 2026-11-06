import { guidesEPhotos } from "../photos/guides-e";
import type { Guide } from "./types";

// Batch E, guide 2. Primary keywords: "error fare" / "mistake fares". US rules
// from US Department of Transportation pages (2015 mistaken-fare enforcement
// policy statement, the "Buying a Ticket" consumer page, the 24-hour
// reservation guidance), found with WebSearch on 6 Nov 2026; the pages
// themselves could not be opened from the build sandbox, so only what the
// search results quoted is used. UK: we found no CAA or GOV.UK page that sets
// out a rule on honouring mistaken fares, so the guide says so and states no UK
// rule; the CAA complaints route is cited. Airline examples are the wording of
// easyJet holidays' booking conditions and British Airways' Conditions of Use.
// Not verified, so left out: how long error fares last, how often airlines
// honour them, EU rules. The booking advice is ours and labelled.
export const errorFaresExplained: Guide = {
  slug: "error-fares-explained",
  title: "Error fares explained: are mistake fares honoured, and what to do",
  seoTitle: "Error fares explained: are mistake fares honoured?",
  excerpt:
    "An error fare is a price the airline never meant to publish. What US rules say about cancelling them, what airline terms say, and how to book without risk.",
  topic: "booking",
  published: "2026-11-06",
  photo: guidesEPhotos.guideErrorFares,
  summary: [
    "An error fare, or mistake fare, is a price an airline or seller published by mistake, far below what it meant to charge.",
    "There is no promise that it will be honoured. In the US, the Department of Transportation says an airline that shows a fare was a mistake can cancel it, but must refund the ticket and reimburse out-of-pocket costs.",
    "Airline terms can let the seller cancel a booking made at an obvious pricing error. We found no UK regulator page that sets out a rule either way.",
    "Our advice: don’t pay for non-refundable hotels, tours or other flights until the ticket is confirmed, and keep every confirmation.",
  ],
  sections: [
    {
      heading: "The short answer: you may get the ticket, or you may get a refund",
      paragraphs: [
        "An error fare, also called a mistake fare, is a fare published at a price far lower than the airline or seller meant to charge. People spot them online and share them quickly. Whether you get to fly depends on the seller’s terms and the law where you book, and no one can promise the ticket will stand.",
        "That uncertainty is the main thing to understand. A confirmation email is not always the end of the story: the seller may contact you later to say the fare was a mistake. This guide covers what we could verify from official pages, what the airline terms we found say, and how to avoid being out of pocket.",
      ],
      tip: "Our advice: treat an error fare as a possible bargain, not a booking you can plan around. Book it only if you can accept getting a refund instead of a flight.",
    },
    {
      heading: "What the US Department of Transportation says",
      paragraphs: [
        "In the US, the Department of Transportation (DOT) has a rule that stops an airline raising the price of a ticket after you have bought it. In 2015 DOT’s enforcement office said it would not enforce that rule against a mistaken fare, as long as the airline or seller shows the fare was a mistake and reimburses everyone who bought it. The reimbursement covers out-of-pocket costs such as non-refundable hotels, on top of refunding the ticket price. The burden is on the airline to prove to DOT that it was a mistaken fare.",
        "DOT’s statement said this approach would stay in effect until DOT issues a final rule that specifically addresses mistaken fares. We found no final rule, and a 2025 DOT docket says it intends to address mistaken fares in future rulemaking. DOT’s consumer page on buying a ticket says that airlines may cancel reservations booked at the mistaken fare price, but are required to reimburse consumers for the full ticket price, plus optional services and reasonable out-of-pocket expenses. Check DOT’s site for the current position before relying on this.",
        "We are not giving legal advice, and we can’t say how DOT would treat your booking.",
      ],
    },
    {
      heading: "What about the UK and Europe?",
      paragraphs: [
        "We searched the UK Civil Aviation Authority’s and GOV.UK’s pages and did not find one that sets out a rule on whether an airline must honour a mistaken fare. We haven’t found an official EU page either. So we are not stating a rule for UK or EU bookings. What we can say is what the terms of two sellers we checked say.",
        "easyJet holidays’ booking conditions say it may end a contract and refund payments if it confirmed a booking that contained an obvious error, such as a wrong price. British Airways’ Executive Club Conditions of Use say that for an obvious price error it will tell the customer promptly and, where possible, offer the choice of keeping the booking at the correct price within a set period, or cancelling for a refund. Both are examples from specific products, not a universal rule, so read the terms of the airline or agent you book with.",
        "If you think a seller has treated you unfairly, the CAA’s advice is to complain to the airline first and, if that fails, refer the complaint to an alternative dispute resolution provider if the airline is a member of one, or otherwise to the CAA.",
      ],
      table: {
        caption: "What we found on cancelling bookings made at a pricing error",
        head: ["Where", "What the source says", "Source"],
        rows: [
          ["United States", "Airline may cancel a mistaken fare if it proves the mistake; must refund the ticket and reimburse out-of-pocket costs", "US Department of Transportation"],
          ["easyJet holidays (UK)", "May end the contract and refund payments if a confirmed booking contained an obvious error", "easyJet holidays booking conditions"],
          ["British Airways Executive Club", "For an obvious price error, offers the correct price or a refund", "BA Conditions of Use"],
          ["UK regulator", "No rule found on honouring mistaken fares; complaints go to the airline, then an ADR provider or the CAA", "UK Civil Aviation Authority"],
        ],
      },
    },
    {
      heading: "Before you book: what to check",
      paragraphs: [
        "These steps are our advice, not rules. They reduce what you can lose if the booking is cancelled.",
      ],
      list: [
        "Check the price on the airline’s own site or a second search. If the fare appears in several places, it is more likely to be real; if it appears only on one, be cautious.",
        "Read the fare conditions, especially refund rules, and your total including bags and seats.",
        "Use a credit or debit card in your own name, and keep a copy of the confirmation page and email.",
        "Don’t book it if you would be badly hurt by a cancellation, for example a fixed event or a trip with a non-refundable deposit already paid.",
      ],
    },
    {
      heading: "After you book: why to wait before paying for anything else",
      paragraphs: [
        "The most important rule is the one that costs nothing to follow: don’t buy anything non-refundable until the airline has confirmed the ticket and you have a booking reference you can see on the airline’s own site. Hotels, tours, trains, visas and other flights are the usual losses.",
        "In the US, DOT says the airline must reimburse reasonable out-of-pocket costs if it cancels a mistaken fare, and keeping receipts for anything you paid is sensible. Elsewhere, we found no equivalent official promise. The safest plan is to wait.",
        "In the US, the DOT’s 24-hour rule may also help in the first day. For tickets bought at least seven days before departure, airlines must either hold the fare for 24 hours without payment or let you cancel for a full refund within 24 hours, and DOT’s guidance says this does not apply to tickets bought through travel agents. Our guide to the [24-hour flight cancellation rule](/travel-guides/24-hour-flight-cancellation-rule) explains how it works.",
      ],
      tip: "Our advice: after booking, screenshot the confirmation and the fare conditions, then wait until the airline shows the ticket as issued before booking hotels or other flights. Don’t contact the airline repeatedly to “check” the fare; if there’s a problem it will contact you.",
    },
    {
      heading: "If the airline cancels",
      paragraphs: [
        "If a seller cancels an error fare, ask for the refund in writing and keep the correspondence. In the US, see DOT’s aviation consumer pages. In the UK, follow the CAA’s route above. If you booked through a travel agent or comparison site, start with them, because they hold your contract.",
        "Cancellation of an error fare is different from a flight being cancelled or delayed after the ticket is issued. If the airline cancels a flight itself, different rules apply: see [your rights when a flight is delayed or cancelled](/travel-guides/flight-cancelled-or-delayed-rights).",
      ],
    },
    {
      heading: "A better way to get a low fare",
      paragraphs: [
        "Error fares can’t be planned. Flexibility is a more reliable way to save: try the [cheapest day to fly](/travel-guides/cheapest-day-to-fly), set a [price alert](/travel-guides/flight-price-alerts), and follow our [step-by-step routine for cheap flights](/travel-guides/how-to-find-cheap-flights). The [fare calendar](/fare-calendar) shows prices across a month, and our route pages show recent fares, for example [London to New York](/routes/london-to-new-york) or [New York to Paris](/routes/new-york-to-paris).",
      ],
    },
  ],
  faqs: [
    {
      q: "What is an error fare?",
      a: "A fare published at a price far lower than the airline or seller meant to charge, because of a mistake. It is also called a mistake fare or pricing error.",
    },
    {
      q: "Do airlines have to honour mistake fares?",
      a: "Not necessarily. In the US, DOT’s enforcement policy lets an airline cancel a fare it proves was a mistake, as long as it refunds the ticket and reimburses out-of-pocket costs. We found no UK or EU official page on the point, so check the seller’s terms.",
    },
    {
      q: "Can an airline cancel my ticket after I’ve been sent a confirmation?",
      a: "Some terms allow it. easyJet holidays’ booking conditions say it may end a contract for an obvious error even after confirming, and British Airways’ Executive Club terms describe a keep-or-cancel option. Read the terms of your seller.",
    },
    {
      q: "Should I book a hotel straight after buying an error fare?",
      a: "Our advice is to wait until the airline has issued the ticket and you can see it on the airline’s own site. If you book non-refundable extras first and the fare is cancelled, you may only get the ticket money back.",
    },
    {
      q: "Where do I complain if an error fare is cancelled?",
      a: "Start with the airline or the agent you booked with. In the UK, the CAA says to complain to the airline first, then to an alternative dispute resolution provider if the airline is a member of one, or otherwise to the CAA. In the US, see DOT’s aviation consumer pages.",
    },
  ],
  sources: [
    { label: "US Department of Transportation: Mistaken fare policy statement (8 May 2015)", url: "https://www.transportation.gov/sites/dot.gov/files/docs/Mistaken_Fare_Policy_Statement_05082015_0.pdf" },
    { label: "US Department of Transportation: Buying a ticket", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/buying-ticket" },
    { label: "US Department of Transportation: Guidance on the 24-hour reservation requirement", url: "https://www.transportation.gov/airconsumer/notice-24hour-reservation" },
    { label: "easyJet holidays: Booking conditions", url: "https://www.easyjet.com/en/holidays/info/booking-conditions" },
    { label: "British Airways: Executive Club Conditions of Use", url: "https://www.britishairways.com/content/the-british-airways-club/about-the-club/conditions-of-use" },
    { label: "UK Civil Aviation Authority: What to do if your airline won’t help", url: "https://www.caa.co.uk/publication/download/15085" },
  ],
  keywords: ["error fare", "mistake fares", "mistaken fare", "are error fares honoured", "airline pricing error cancel booking", "error fare what to do", "mistake fare rights"],
};
