import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, Agent A, guide 2 (docs/BATCH-22-BRIEF.md). Primary keyword:
// "cheapest day to fly". Day-of-week figures from Google's own published
// analyses of Google Flights data (2022 five-year study and the 2026 holiday
// trends post, both US departures); school holiday rule from GOV.UK; found
// with WebSearch on 6 Nov 2026. The "day by day" table's last column and the
// checklist are our own advice and are labelled so.
export const cheapestDayToFly: Guide = {
  slug: "cheapest-day-to-fly",
  title: "What is the cheapest day to fly? Midweek, weekends and the day you book",
  seoTitle: "Cheapest day to fly: what the fare data actually shows",
  excerpt:
    "Midweek flights are usually cheaper than weekend ones, but the day you book barely matters. What Google’s fare data shows and how to find your cheapest day.",
  topic: "booking",
  published: "2026-11-05",
  photo: photos.guideCheapestDay,
  summary: [
    "Flying midweek is usually cheaper. Google’s five-year analysis of Google Flights data found Monday to Wednesday departures about 12% cheaper on average than weekend ones.",
    "The day you book matters far less. The same analysis put the saving from booking midweek at under 2%, so “book on a Tuesday” is mostly a myth.",
    "In our experience Sunday is often the dearest day to fly home, because it’s when most weekend and holiday trips end.",
    "Averages hide a lot: check the fare calendar for your own route, because school holidays and events beat the day of the week.",
  ],
  sections: [
    {
      heading: "The short answer: fly midweek, book whenever",
      paragraphs: [
        "If you can choose your travel days, leaving on a Monday, Tuesday or Wednesday is usually cheaper than leaving at the weekend. In 2022 Google published an analysis of five years of Google Flights prices and found that flights departing Monday to Wednesday had been about 12% cheaper on average than weekend departures. Its 2026 holiday travel post makes the same point: leaving on a Monday and coming back on a Tuesday or Wednesday saved about 14% compared with weekend flights.",
        "The reason is simple demand. Leisure travellers want to leave on Friday or Saturday and come home on Sunday, so those flights fill first and the cheaper seats go early. Midweek flights rely more on business travel, and on many leisure routes they have spare seats to sell.",
        "Both of Google’s figures are averages for trips from the US. They’re a good guide to how fares behave, but your route and dates can differ, so always check the actual prices.",
      ],
      tip: "Our [fare calendar](/fare-calendar) shows the cheapest fare found for each day on a route over the next 12 months, so you can see which days are cheap for your trip rather than relying on an average.",
    },
    {
      heading: "Does the day you book matter?",
      paragraphs: [
        "Hardly. The old advice to buy flights on a Tuesday doesn’t hold up in the data. Google’s five-year study found that booking on Tuesday to Thursday rather than at the weekend saved only about 1.9% on average, and its 2026 post found Wednesday narrowly ahead as the cheapest day to book, at around 1.4% below Sunday, the dearest. On most fares that is a few pounds or dollars at best.",
        "What matters much more is how far ahead you book and which days you fly. Our guide to [when to book international flights](/travel-guides/when-to-book-international-flights) covers the booking window, and [are last-minute flights cheaper?](/travel-guides/are-last-minute-flights-cheaper) explains why waiting rarely pays.",
      ],
      tip: "Don’t hold off on a good fare until a particular weekday. If the price suits you, book it; a better weekday to buy is worth far less than the risk of the fare rising.",
    },
    {
      heading: "Day by day: when fares tend to be higher or lower",
      paragraphs: [
        "This table sums up the pattern. The middle column is what Google’s published data shows; the last column is our own reading of why, based on who usually travels on each day.",
      ],
      table: {
        caption: "How the day of departure tends to affect fares (Google’s data and Wallet Flights’ advice)",
        head: ["Day you fly", "What Google’s data shows", "Our view"],
        rows: [
          ["Monday", "Among the cheaper days to depart", "Good for leaving; Monday mornings can be busy with business travel"],
          ["Tuesday", "Among the cheaper days to depart and to return", "Often one of the quietest days on leisure routes"],
          ["Wednesday", "Among the cheaper days to depart and to return", "A strong choice for the way home"],
          ["Thursday", "Not singled out", "Prices start to climb as weekend trips begin"],
          ["Friday", "Weekend departures cost more on average", "Popular for city breaks; book early"],
          ["Saturday", "Weekend departures cost more on average", "Can be cheaper than Friday on some routes, so compare both"],
          ["Sunday", "Weekend departures cost more on average", "The usual day home from a weekend away; often the dearest return"],
        ],
      },
    },
    {
      heading: "Bigger than the weekday: holidays, events and the season",
      paragraphs: [
        "The day of the week is a small lever next to the time of year. A Tuesday in the school summer holidays will usually cost more than a Saturday in a quiet week of November. In England, GOV.UK says schools set their own term and holiday dates, so check your local council’s calendar, and see our guide to [half-term flights](/travel-guides/half-term-flights) for ways round peak pricing.",
        "Big events, bank holidays and the start and end of the Christmas period all push fares up on the days around them, whatever day of the week they fall on. The cheapest day to fly in practice is a midweek day in a quiet week.",
      ],
      list: [
        "Shift a weekend city break to a Tuesday-to-Friday trip, such as [London to Paris](/routes/london-to-paris) or [London to Barcelona](/routes/london-to-barcelona)",
        "On long-haul, compare leaving a day or two either side; on [New York to London](/routes/new-york-to-london) the cheapest day can move from week to week",
        "Look at the return day as well as the outbound: a cheap Tuesday out with a Sunday back can cost more than a Saturday out and Wednesday back",
        "Search one-way fares each way too, as the cheapest pair of days isn’t always on the same airline",
      ],
    },
    {
      heading: "How to find the cheapest day on your route",
      paragraphs: [
        "This is our own checklist. It takes a few minutes and works better than any rule of thumb.",
      ],
      ordered: true,
      list: [
        "Open the [fare calendar](/fare-calendar) for your route and look at the whole month you want to travel, not just your first-choice dates",
        "Note the two or three cheapest outbound days and the cheapest return days that fit your trip length",
        "Run a search for those dates and compare the total price with bags, because a cheap day on a basic fare can end up dearer",
        "Check nearby airports; our [London airports guide](/travel-guides/london-airports-guide) compares Heathrow, Gatwick, Stansted and Luton",
        "If nothing fits your budget yet, set a price alert from the fare calendar and we’ll email you when the fare drops below your price",
      ],
      tip: "If you’re flexible, start from where you can go cheaply rather than when: our [deals page](/deals) lists the lowest fares travellers found recently from each departure city.",
    },
    {
      heading: "Our verdict",
      paragraphs: [
        "Pick your days before you worry about anything else. Flying out and back midweek is the most reliable way to save, and Google’s data backs that up. The day you press “book” makes so little difference that it isn’t worth waiting for. Check the real prices on your route, avoid school holidays if you can, and book once you see a fare you’re happy with. For more ways to save, see our guide to [how to find cheap flights](/travel-guides/how-to-find-cheap-flights).",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the cheapest day of the week to fly?",
      a: "Usually Tuesday or Wednesday, with Monday close behind. Google’s analysis of five years of Google Flights data found Monday to Wednesday departures about 12% cheaper on average than weekend ones. Check your own route, as some differ.",
    },
    {
      q: "Is it cheaper to book flights on a Tuesday?",
      a: "Not by much. Google found booking midweek rather than at the weekend saved only about 1.9% on average, and its 2026 analysis put Wednesday slightly ahead of Tuesday. Book when the price is right, whatever the day.",
    },
    {
      q: "What is the most expensive day to fly?",
      a: "Usually the weekend. Google’s data found weekend departures cost more on average than midweek ones. In our experience, Friday out and Sunday back is the dearest pattern for short breaks.",
    },
    {
      q: "Is it cheaper to fly early in the morning?",
      a: "Sometimes, but there’s no reliable rule and we haven’t found published data to back one up. Compare the different departure times on the same day; the cheapest flight often depends on the airline and route.",
    },
    {
      q: "How can I see the cheapest days for my route?",
      a: "Use our [fare calendar](/fare-calendar). It shows the cheapest fare found for each day over the next 12 months, and you can set an alert to be emailed if the price drops.",
    },
  ],
  sources: [
    { label: "Google: How to find the best deal on your next flight (2022)", url: "https://blog.google/products-and-platforms/products/travel/how-to-find-the-best-deal-on-your-next-flight/" },
    { label: "Google: Google Flights data to find holiday deals and trending destinations (2026)", url: "https://blog.google/products-and-platforms/products/search/holiday-travel-trends-2026/" },
    { label: "GOV.UK: School term and holiday dates", url: "https://www.gov.uk/school-term-holiday-dates" },
  ],
  keywords: [
    "cheapest day to fly",
    "cheapest day of the week to fly",
    "cheapest day to book flights",
    "is it cheaper to book flights on a tuesday",
    "most expensive day to fly",
    "is it cheaper to fly midweek",
    "best day to fly internationally",
    "cheapest days to fly in the uk",
  ],
};
