import { photos } from "../images";
import type { Guide } from "./types";

// Growth proposal phase 2, month 1, guide 3 (docs/SEO-CONTENT-PLAN.md, wave 2
// "how-to-find-cheap-flights"; replaces legacy /how-to-find-the-cheapest-flights
// and /flight-booking-tips). A method, not a list of "secret" tricks: no claims
// about the cheapest weekday or hour, which nobody can show holds for every
// route. The only rule quoted is the DOT 24-hour requirement (checked 3 Nov 2026).
export const cheapFlights: Guide = {
  slug: "how-to-find-cheap-flights",
  title: "How to find cheap flights: a step-by-step search routine",
  seoTitle: "How to find cheap flights: a step-by-step routine",
  excerpt:
    "A search routine that works on any route: flexible dates, nearby airports, one-way tickets, bag fees and price alerts, without the myths about magic booking days.",
  topic: "booking",
  published: "2026-11-03",
  photo: photos.guideCheapFlights,
  summary: [
    "Be flexible on dates first: the same route can cost very different amounts a few days apart, so look at a whole month before choosing.",
    "Compare every airport near you and near your destination, and add the cost of getting to each one.",
    "Compare the total price, including bags and seats, not the headline fare.",
    "Set a price alert and book when a fare you’re happy with appears, rather than waiting for a perfect moment that may not come.",
  ],
  sections: [
    {
      heading: "Step 1: start with a month, not a date",
      paragraphs: [
        "The single biggest saving usually comes from moving your dates. Fares on the same route change from day to day with demand, school holidays, events and how full the plane already is. Before you choose dates, look at a whole month, or a whole year, to see where the cheap days fall.",
        "Our [fare calendar](/fare-calendar) shows the lowest recent fare for every day and month on a route, so you can see at a glance whether moving your trip by a few days or weeks makes a difference. Each of our [route pages](/routes) also shows the cheapest month to fly where we have recent fares.",
      ],
      tip: "If your dates are fixed by school holidays, look at the first and last days of the break, which are often the busiest, and compare leaving a day earlier or coming back a day later. Our [half-term flights guide](/travel-guides/half-term-flights) goes into more detail.",
    },
    {
      heading: "Step 2: compare every airport, then add the journey",
      paragraphs: [
        "Big cities have several airports, and the cheapest fare is often from, or to, the one you didn’t think of. Search by city rather than by airport where you can: London, New York, Paris and Tokyo, for example, each have more than one airport with international flights.",
        "Then add the cost and time of getting to each airport. A cheaper fare into an airport an hour or more from the centre can cost more once you’ve paid for the train or a taxi. Our [London airports guide](/travel-guides/london-airports-guide) compares the trains from each London airport, and every destination guide lists the ways into town.",
      ],
    },
    {
      heading: "Step 3: compare like for like",
      paragraphs: [
        "A headline fare isn’t the price you pay. Low-cost and basic economy fares often leave out a cabin bag, a checked bag or seat selection, and adding them later can cost more than a fuller fare would have. Before you compare two results, work out the total for what you actually need.",
      ],
      list: [
        "How many bags you need, and whether the fare includes them",
        "Whether you need to sit together, and what seats cost",
        "Whether you can change or cancel, and at what cost",
        "The time and cost of getting to and from each airport",
      ],
      tip: "Our guide to [hand luggage sizes and bag fees](/travel-guides/hand-luggage-sizes-bag-fees) shows what the main UK and US airlines include.",
    },
    {
      heading: "Step 4: try one-ways and connections, carefully",
      paragraphs: [
        "On some routes, two one-way tickets, out with one airline and back with another, cost less than a return. On long-haul trips, a connection can be much cheaper than flying nonstop. Both are worth checking.",
        "Be careful with combinations that aren’t on one ticket. A “self-transfer” connects flights you’ve booked separately, so if the first one is late and you miss the second, the second airline doesn’t have to help. Our [self-transfer guide](/travel-guides/self-transfer-separate-tickets) and [layover guide](/travel-guides/how-long-a-layover) explain the risk and how much time to leave.",
      ],
    },
    {
      heading: "Step 5: set a price alert, then book",
      paragraphs: [
        "Nobody can promise that a fare will fall, and claims that one weekday or hour is always cheapest don’t hold for every route. What you can do is know what a good price looks like for your trip and act when you see it.",
        "Search a few times over a week or two to learn the usual range, set a price alert for your route on our fare calendar, and book when a fare you’re happy with appears. For when to start looking, our guide to [the best time to book international flights](/travel-guides/when-to-book-international-flights) sets out what to expect.",
      ],
    },
    {
      heading: "Step 6: check what happens if your plans change",
      paragraphs: [
        "Booking from the US, the Department of Transportation requires airlines to let you either hold a reservation without paying, or cancel without penalty, for at least 24 hours after booking, as long as you book at least seven days before departure. That gives you a day to keep looking after you book. Our guide to [the 24-hour cancellation rule](/travel-guides/24-hour-flight-cancellation-rule) explains who it covers. In the UK there’s no equivalent general right for flights, so check the fare rules before you pay.",
      ],
    },
    {
      heading: "A routine you can repeat",
      paragraphs: ["Put together, the routine takes ten minutes for any trip:"],
      ordered: true,
      list: [
        "Look at a month or a year on the fare calendar and pick your cheapest workable dates",
        "Search by city, so every airport at both ends is included",
        "Work out the total price for the bags and seats you need",
        "Check one-way and connecting options, and whether they’re on one ticket",
        "Set a price alert, and book when a fare you’re happy with appears",
      ],
    },
  ],
  faqs: [
    {
      q: "What day of the week is cheapest to book flights?",
      a: "There’s no day that’s cheapest on every route. Fares change with demand and how full the flight is, so it’s more useful to compare dates on a fare calendar and set a price alert than to wait for a particular day.",
    },
    {
      q: "Is it cheaper to book two one-way flights?",
      a: "Sometimes. On some routes two one-way tickets with different airlines cost less than a return, so compare both. Each one-way is a separate booking, so a problem with one doesn’t change the other.",
    },
    {
      q: "Are flights cheaper from smaller airports?",
      a: "They can be, but add the cost and time of getting to the airport. A cheaper fare from an airport far from home can end up costing more overall.",
    },
    {
      q: "Can I cancel a flight within 24 hours?",
      a: "Booking from the US, the Department of Transportation requires airlines to allow either a free 24-hour hold or a free cancellation within 24 hours, if you book at least seven days before departure. In the UK there’s no general 24-hour right for flights.",
    },
  ],
  sources: [
    { label: "US Department of Transportation: Refunds, including the 24-hour rule", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
    { label: "US Department of Transportation: Guidance on the 24-hour reservation requirement", url: "https://www.transportation.gov/airconsumer/notice-24hour-reservation" },
  ],
  keywords: ["how to find cheap flights", "cheap flights tips", "cheapest day to book flights", "how to find the cheapest flights", "flight booking tips"],
};
