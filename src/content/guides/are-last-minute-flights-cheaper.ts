import { guidesAPhotos } from "../photos/guides-a";
import type { Guide } from "./types";

// Batch 22, Agent A, guide 1 (docs/BATCH-22-BRIEF.md). Primary keyword: "are
// last minute flights cheaper". Figures from Google's own published analysis
// of Google Flights data (US departures), the DOT 24-hour rule, CBP's ESTA
// timing and GOV.UK's ETA timing, found with WebSearch on 5 Nov 2026. The
// "when late booking can work" table is our own advice and is labelled so.
export const areLastMinuteFlightsCheaper: Guide = {
  slug: "are-last-minute-flights-cheaper",
  title: "Are last-minute flights cheaper? When waiting pays off and when it costs you",
  seoTitle: "Are last-minute flights cheaper? What the data shows",
  excerpt:
    "Usually not: fares tend to climb in the final weeks. When late deals do appear, which trips suit them, and the rules that make booking late riskier.",
  topic: "booking",
  published: "2026-11-05",
  photo: guidesAPhotos.guideLastMinute,
  summary: [
    "Usually not. Google’s analysis of its own flight data finds the lowest average fares weeks or months before departure, not in the last few days.",
    "Late bargains do exist, mostly on busy, competitive routes at quiet times, and they suit travellers who are flexible about where they go.",
    "Booking within a week of departure loses the US 24-hour free cancellation, which only covers bookings made at least seven days ahead.",
    "Leave time for paperwork: CBP advises applying for an ESTA at least 72 hours before you fly, and GOV.UK says a UK ETA can take up to 3 working days.",
  ],
  sections: [
    {
      heading: "The short answer: last-minute is usually dearer",
      paragraphs: [
        "For most trips, waiting until the last minute costs more, not less. Airlines sell seats on each flight at several price levels, and as the cheaper ones sell, the seats left cost more. Travellers who book late are often people who have to travel, such as business travellers or families with an emergency, and airlines know they will pay. That is how fares generally behave, not a rule any airline publishes, and individual flights can break the pattern.",
        "The data that is published points the same way. Google’s 2026 travel trends post, based on several years of Google Flights prices for trips from the US, found the lowest average fares about 39 days before departure for domestic flights and about 89 days before for international ones. It adds that for Europe, waiting rarely pays off, so booking early is the safer choice. Those are averages for US departures, so treat them as a guide, not a promise for your route.",
      ],
      tip: "If your dates are fixed, book once you see a fare you’re happy with. Our guide to [when to book international flights](/travel-guides/when-to-book-international-flights) explains the sensible booking window.",
    },
    {
      heading: "When a last-minute deal can happen",
      paragraphs: [
        "Late bargains are real, just not reliable. They are most likely when an airline has empty seats on a flight that isn’t selling, on a route where several airlines compete. Short-haul city breaks in Europe outside school holidays, and midweek flights between big cities, are the kind of trips where you sometimes see this. Peak dates almost never get cheaper late, because the seats sell anyway.",
        "This table is our own rule of thumb for when it’s worth waiting, not a guarantee.",
      ],
      table: {
        caption: "When booking late can work, and when it rarely does (Wallet Flights’ advice)",
        head: ["Trip", "Worth waiting?", "Why"],
        rows: [
          ["Flexible short break, any of several cities", "Sometimes", "You can take whichever route is cheap that week"],
          ["Midweek, outside school holidays, busy route", "Sometimes", "Competition and spare seats can push fares down"],
          ["Long-haul on fixed dates", "Rarely", "Fewer flights and steadier demand; Google’s data favours booking months ahead"],
          ["Christmas, Easter, summer or half-term", "No", "Seats on peak dates sell regardless"],
          ["Several people travelling together", "No", "The cheapest fares may only have a few seats left"],
          ["A trip you have to make on a given day", "No", "You can’t switch dates if the price jumps"],
        ],
      },
    },
    {
      heading: "How to find a late deal if you do wait",
      paragraphs: [
        "If you can be flexible, the trick is to let the fare choose the trip rather than the other way round. Start with a departure airport and a range of dates, then look at where is cheap.",
      ],
      ordered: true,
      list: [
        "Check our [deals page](/deals) for the cheapest fares travellers found recently from London, New York, Manchester and other cities",
        "Open the [fare calendar](/fare-calendar) for a route to see the lowest fare for each day over the next 12 months, so you can see whether next week really is cheaper",
        "Try nearby airports: Gatwick or Stansted instead of Heathrow, Newark instead of JFK. Our [London airports guide](/travel-guides/london-airports-guide) compares them",
        "Compare the total price with bags, because a cheap late fare is often the most basic fare",
        "Book as soon as the price is right: late fares can disappear within hours",
      ],
      tip: "Not ready to book? Set a price alert in the [fare calendar](/fare-calendar) and we’ll email you if the route drops below the price you choose.",
    },
    {
      heading: "What you give up by booking late",
      paragraphs: [
        "Price isn’t the only cost. In the US, the Department of Transportation requires airlines to let you hold a fare or cancel for a full refund within 24 hours of booking, but only for reservations made at least seven days before departure. Book inside that week and the safety net goes. Our guide to the [24-hour cancellation rule](/travel-guides/24-hour-flight-cancellation-rule) has the details.",
        "Choice suffers too. The best flight times, seats together and cheaper fare types with a bag included are usually the first to go, so a late booking can mean an awkward connection or paying extra to sit with your family.",
      ],
    },
    {
      heading: "Don’t forget travel permits",
      paragraphs: [
        "A last-minute trip abroad can fall at the border rather than the fare. US Customs and Border Protection advises applying for an ESTA as early as possible and no less than 72 hours before you fly; without an approved ESTA, travellers on the Visa Waiver Programme won’t be allowed to board. For visitors to the UK who need an Electronic Travel Authorisation, GOV.UK says you’ll usually get a decision within a day, but it can take up to 3 working days, and you must wait for it before you travel.",
        "Check these before you pay for a late fare. Our [ESTA and UK ETA guide](/travel-guides/esta-and-uk-eta) explains who needs which.",
      ],
    },
    {
      heading: "Our verdict",
      paragraphs: [
        "Treat last-minute deals as a bonus for flexible trips, not a strategy. If you know where and when you’re going, book inside the normal window and watch the price beforehand. If you only know you want a few days away, look at what is cheap from your airport this week, such as [London to Lisbon](/routes/london-to-lisbon) or [New York to Cancún](/routes/new-york-to-cancun), and be ready to book the moment you see a good fare.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do flights get cheaper closer to the date?",
      a: "Usually not. Google’s analysis of Google Flights data for US departures found the lowest average fares about 39 days before departure for domestic trips and about 89 days for international trips. Some quiet flights do drop late, but you can’t count on it.",
    },
    {
      q: "Are flights cheaper the day before?",
      a: "Rarely. The day before departure is when many travellers who must fly book, and the cheaper seats have often sold. Exceptions happen on quiet, competitive routes, so check, but have a plan B.",
    },
    {
      q: "Can I cancel a last-minute booking for free?",
      a: "Often not. The US 24-hour rule only covers bookings made at least seven days before departure. Otherwise it depends on your fare rules, and the cheapest fares are usually non-refundable.",
    },
    {
      q: "How late can I apply for an ESTA?",
      a: "CBP advises applying no less than 72 hours before you fly, and earlier if you can. Without an approved ESTA you won’t be allowed to board a flight to the US under the Visa Waiver Programme.",
    },
    {
      q: "Where can I find last-minute flight deals?",
      a: "Our [deals page](/deals) lists the cheapest fares travellers found recently from each departure city, and the [fare calendar](/fare-calendar) shows the cheapest days on a route for the next 12 months.",
    },
  ],
  sources: [
    { label: "Google: Google Flights data to find holiday deals and trending destinations (2026)", url: "https://blog.google/products-and-platforms/products/search/holiday-travel-trends-2026/" },
    { label: "US Department of Transportation: Notice on the 24-hour reservation requirement", url: "https://www.transportation.gov/sites/dot.gov/files/docs/Notice_24hour_hold_final20130530_0.pdf" },
    { label: "US Department of Transportation: Refunds", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
    { label: "US Customs and Border Protection: Allow 72 hours for ESTA", url: "https://www.cbp.gov/newsroom/national-media-release/cbp-reminds-travelers-allow-72-hours-esta" },
    { label: "GOV.UK: Apply for an electronic travel authorisation (ETA)", url: "https://www.gov.uk/eta/apply" },
  ],
  keywords: [
    "are last minute flights cheaper",
    "do flights get cheaper closer to the date",
    "do flights get cheaper the day before",
    "last minute flight deals",
    "last minute flights from london",
    "is it cheaper to book flights last minute",
    "when do flight prices drop",
  ],
};
