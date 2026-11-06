import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, Agent A, guide 5 (docs/BATCH-22-BRIEF.md). Primary keyword:
// "flight price alerts" / "how to track flight prices". How Google Flights'
// and Skyscanner's alerts work comes from their own help pages; booking
// window figures from Google's 2026 travel trends post; the 24-hour rule from
// the US DOT; found with WebSearch on 6 Nov 2026. How our own alerts work is
// taken from src/content/fare-calendar.ts (priceAlertCopy). The "set a target
// price" method and verdict are our own advice and are labelled so.
export const flightPriceAlerts: Guide = {
  slug: "flight-price-alerts",
  title: "Flight price alerts: how to track flight prices and know when to book",
  seoTitle: "Flight price alerts: how to track flight prices",
  excerpt:
    "How flight price alerts work, which tools to use, how to pick a target price and what to do when the email arrives, so you book a good fare without checking.",
  topic: "booking",
  published: "2026-11-05",
  photo: photos.guidePriceAlerts,
  summary: [
    "A price alert watches a route for you and emails you when the fare changes or drops below a price you set, so you don’t have to search every day.",
    "Google Flights, Skyscanner and our own fare calendar all offer free alerts; they differ in what they track and when they email.",
    "Set alerts early: Google’s 2026 analysis found average fares lowest about 39 days ahead for US domestic trips and around 89 days for international ones.",
    "When a good price arrives, book quickly. Our view: an alert tells you a fare is good, not that it will last.",
  ],
  sections: [
    {
      heading: "The short answer: let the fare come to you",
      paragraphs: [
        "A flight price alert is a saved search that keeps running after you close the page. You choose a route, and sometimes dates, and the service checks fares regularly and emails you when the price changes or falls below a figure you choose. It’s the simplest way to track flight prices without searching every day, and it costs nothing.",
        "Alerts work best when you know roughly where you want to go and have some time before you need to book. They won’t make a fare cheaper, but they make sure you see a drop when it happens, which matters because fares can change often before departure.",
      ],
    },
    {
      heading: "How the main price alert tools work",
      paragraphs: [
        "Each tool works slightly differently. This summary is based on each service’s own help pages, plus our own alerts.",
        "Our view is that the type of alert matters more than the brand. A fixed-dates alert suits a trip you’ve already planned around, such as a wedding or a school holiday. A route alert with no fixed dates, or a target price, suits a trip you can move: you hear about the cheap weeks and fit the trip around them. If you don’t mind where you go, our [deals page](/deals) is a quicker way to see what’s cheap from your city right now.",
      ],
      table: {
        caption: "How three flight price alert tools work",
        head: ["Tool", "What it watches", "When it emails"],
        rows: [
          ["Google Flights", "Your route and dates, a single flight, or the route on any dates", "When the price changes; on “any dates”, when the lowest price drops significantly, plus when prices are likely to rise"],
          ["Skyscanner", "Your route and dates, with the number of travellers and a direct-only setting", "When the price changes; you need to be logged in to set one"],
          ["Wallet Flights", "The cheapest fare on a route, for the trip type and length you choose", "Only when the fare drops below the price you set, at most once a day"],
        ],
      },
      tip: "Skyscanner’s help centre notes that alerts don’t keep most search filters, such as flight times or duration, so an alert price may be for a flight you wouldn’t choose. Check the details before you book.",
    },
    {
      heading: "How to set up a price alert that works",
      paragraphs: [
        "These steps are our own method. The aim is an alert that only emails you when the price is genuinely worth acting on.",
      ],
      ordered: true,
      list: [
        "Open the [fare calendar](/fare-calendar) for your route and look at the cheapest fares found over the coming months",
        "Pick a target price a little below the typical fare for your dates: low enough to be a real saving, not so low it never arrives",
        "Create the alert with your email address and confirm it from the link we send",
        "Set a second alert on Google Flights or Skyscanner if you want to compare, especially for exact dates",
        "When an alert arrives, check the full price with bags and the flight times before you book",
      ],
      tip: "Watching more than one airport? Set an alert for each. A fare from Gatwick or Stansted can drop when Heathrow doesn’t; our [London airports guide](/travel-guides/london-airports-guide) compares them.",
    },
    {
      heading: "When to start tracking",
      paragraphs: [
        "Start early enough to see a few price changes before you need to book. Google’s 2026 analysis of Google Flights data for US departures found the lowest average fares about 39 days before departure for domestic trips and about 89 days before for international ones. For a long-haul trip such as [London to New York](/routes/london-to-new-york) or [Los Angeles to Tokyo](/routes/los-angeles-to-tokyo), that means setting your alert several months ahead. Our guide to [when to book international flights](/travel-guides/when-to-book-international-flights) covers the booking window in more detail.",
        "For peak dates, start even earlier. Fares for school holidays and Christmas rarely fall late, as we explain in [are last-minute flights cheaper?](/travel-guides/are-last-minute-flights-cheaper).",
      ],
    },
    {
      heading: "What to do when the alert arrives",
      paragraphs: [
        "Act on it the same day if the price suits you. A low fare usually means only a few seats are left at that price, and the next email may show it has gone back up. If you’re booking from the US, the Department of Transportation’s 24-hour rule gives you a safety net: airlines must let you cancel for a full refund within 24 hours of booking, as long as you booked at least seven days before departure. That means you can book a good fare straight away and still change your mind the next day.",
        "If you’ve booked and the price then drops, don’t assume you can claim the difference. Most cheap fares can’t be changed for free; check your fare rules, and our guide to the [24-hour cancellation rule](/travel-guides/24-hour-flight-cancellation-rule) explains when cancelling and rebooking is possible.",
      ],
      list: [
        "Check the alert matches your dates, airports and number of travellers",
        "Add bags and seats to see the total, not just the fare",
        "Check entry rules and travel permits for your destination",
        "Turn the alert off once you’ve booked, using the link in the email",
      ],
    },
    {
      heading: "Our verdict",
      paragraphs: [
        "Price alerts are the easiest way to stop overpaying without spending your evenings refreshing search results. Set one as soon as you know where you want to go, pick a realistic target price, and book when it lands. Combine it with flexible dates, using our guide to the [cheapest day to fly](/travel-guides/cheapest-day-to-fly), and you’ll catch most of the savings there are. For more ways to cut the cost, see [how to find cheap flights](/travel-guides/how-to-find-cheap-flights).",
      ],
    },
  ],
  faqs: [
    {
      q: "How do flight price alerts work?",
      a: "You save a route, and sometimes dates, and the service checks fares regularly. It emails you when the price changes or falls below a price you set. Google Flights, Skyscanner and our [fare calendar](/fare-calendar) all offer them free.",
    },
    {
      q: "Are price alerts free?",
      a: "Yes. Google Flights, Skyscanner and Wallet Flights alerts are free. Ours only need an email address, and every alert email has a link to stop it.",
    },
    {
      q: "How often do Wallet Flights alerts email me?",
      a: "Only when the cheapest fare on your route drops below the price you set, and at most once a day. You confirm the alert by email first, so it only starts when you’ve said yes.",
    },
    {
      q: "Can Google Flights track prices without fixed dates?",
      a: "Yes. Google’s help pages say you can track a route on “any dates”, and you’ll be emailed when the lowest price drops significantly, or get a regular update with the best prices if it doesn’t.",
    },
    {
      q: "When should I start tracking flight prices?",
      a: "A few months before you travel for long-haul, and earlier for school holidays. Google’s 2026 analysis found the lowest average fares about 89 days before departure for international trips from the US.",
    },
  ],
  sources: [
    { label: "Google Travel Help: Track flights and prices", url: "https://support.google.com/travel/answer/6235879?hl=en&co=GENIE.Platform%3DDesktop" },
    { label: "Skyscanner Help Centre: How do I set up or cancel email price alerts?", url: "https://help.skyscanner.net/hc/en-gb/articles/115002499829-How-do-I-set-up-or-cancel-email-price-alerts" },
    { label: "Skyscanner Help Centre: Why do price alerts not use the filters from my search?", url: "https://help.skyscanner.net/hc/en-gb/articles/202502942-Why-do-price-alerts-not-use-the-filters-from-my-search" },
    { label: "Google: Google Flights data to find holiday deals and trending destinations (2026)", url: "https://blog.google/products-and-platforms/products/search/holiday-travel-trends-2026/" },
    { label: "US Department of Transportation: Refunds", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
  ],
  keywords: [
    "flight price alerts",
    "how to track flight prices",
    "flight price tracker",
    "google flights price tracking",
    "skyscanner price alerts",
    "best flight price alert app",
    "when should i start tracking flight prices",
  ],
};
