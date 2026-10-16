import { photos } from "../images";
import type { Guide } from "./types";

// Plan item 4.5 (16 Oct 2026): each guide expanded to about 1,000+ words.
// Rules and figures come only from the official pages in `sources`, each
// opened and read on the date in the comment above it. General advice (how
// fares behave, packing habits) carries no numbers we can't source.
export const whenToBook: Guide = {
  slug: "when-to-book-international-flights",
  title: "When to book an international flight (and when waiting pays off)",
  seoTitle: "Best time to book international flights",
  excerpt:
    "How far ahead to book long-haul and short-haul flights, why flexible dates matter more than the day you book, and the rules that protect you after you pay.",
  topic: "booking",
  published: "2026-09-18",
  updated: "2026-10-16",
  photo: photos.guidePlanning,
  summary: [
    "No day of the week is always cheapest: book inside a sensible window rather than chasing one magic date.",
    "Long-haul: start watching a few months ahead, and book earlier still for Christmas, summer and Easter.",
    "Short-haul in Europe or the US: a few weeks to a couple of months ahead is usually enough outside school holidays.",
    "Moving your dates by a day or two, or trying another airport, often saves more than the timing of your booking.",
    "US rules give you 24 hours to cancel or hold most bookings made a week or more before departure.",
  ],
  sections: [
    {
      heading: "There’s no magic day, but there is a sensible window",
      paragraphs: [
        "Airline prices move with demand, so no single weekday or hour is always cheapest. You’ll still see advice to “book on a Tuesday” or “search in private browsing”, but airlines change fares constantly, in response to how many seats are left and how quickly they’re selling. What helps far more is booking inside a sensible window and being flexible with dates.",
        "Airlines put flights on sale many months before departure. The first fares on sale aren’t always the cheapest, and the last few seats on a busy flight are often the most expensive. In between there’s usually a stretch where prices are reasonable and there’s still a good choice of flight times. Your aim is to book during that stretch, not to catch the single lowest price, which nobody can predict.",
      ],
    },
    {
      heading: "How far ahead to book: a rough guide",
      paragraphs: [
        "These are rules of thumb, not guarantees. Popular routes and dates fill up sooner, and quiet routes can stay cheap until close to departure.",
      ],
      list: [
        "Long-haul, such as London to New York, Tokyo or Sydney: start watching a few months ahead and book once you see a fare you’re happy with",
        "Long-haul at peak times (Christmas, summer holidays, Easter): book as early as you can, often several months ahead",
        "Short-haul within Europe or within the US: a few weeks to a couple of months ahead is usually enough outside school holidays",
        "Short breaks on budget airlines: sale fares appear early, but extras such as bags and seats can change the total, so compare the full price",
        "Trips with several people travelling together: book earlier, because the cheapest fare class may have only a few seats left",
      ],
    },
    {
      heading: "Flexible dates beat perfect timing",
      paragraphs: [
        "Moving your trip by a day or two often makes a bigger difference than when you book. Midweek departures are frequently cheaper than Fridays and Sundays, when weekend and business travellers compete for seats. Red-eye and early-morning flights can undercut midday ones, and returning on a Tuesday or Wednesday instead of a Sunday can bring the total down.",
        "When we have recent fares for a route, our destination and route pages show them month by month, so you can see which days tend to be cheaper before you choose.",
      ],
      list: [
        "Compare a few departure dates either side of your plan",
        "Check nearby airports, such as Gatwick instead of Heathrow, or Newark instead of JFK",
        "Look at one-stop routes: a connection can save a lot on long-haul fares, if you don’t mind a longer journey",
        "Try two one-way tickets: on some routes, flying out with one airline and back with another costs less than a return",
        "Leave enough time for connections on separate tickets, because the second airline doesn’t have to wait for you if the first flight is late",
      ],
    },
    {
      heading: "Book early for peak dates",
      paragraphs: [
        "Some dates fill up first every year. Cheaper seats on these dates rarely come back, so if your dates are fixed, book as soon as the price looks reasonable rather than waiting for a drop.",
        "UK school holidays are set by each council and differ across England, Scotland, Wales and Northern Ireland. If you have children at school, check your local term dates before you search, because the week a holiday starts can be much more expensive than the week before.",
      ],
      list: [
        "UK school holidays: the summer break, Easter, Christmas and the half-term weeks in February, May and October",
        "US holidays: Thanksgiving week, the Fourth of July, spring break in March and April, and Christmas to New Year",
        "Festivals and events: Carnival in Rio, cherry blossom season in Tokyo, Diwali in India, the Lunar New Year across East and Southeast Asia",
        "Big sporting events and concerts, which can fill flights and hotels in a city for a few days",
      ],
    },
    {
      heading: "When waiting can pay off",
      paragraphs: [
        "Booking late isn’t always a mistake. Outside peak dates, airlines sometimes cut prices on flights that aren’t selling, and sales can bring fares down for travel a few weeks later. Late deals are most likely on routes with lots of competition and flights at less popular times.",
        "Waiting is a gamble, though. It works best when you’re flexible about where you go as well as when, so you can take whichever route is cheap that week. Our deals page lists the cheapest fares other travellers found recently from New York, London and other cities. If you need to be somewhere on a particular day, book once the price is fair.",
      ],
    },
    {
      heading: "Watch prices without stress",
      paragraphs: [
        "If your trip is a few months away, check the same search every few days rather than every hour. Keep a note of the prices you see, so you know what “good” looks like for that route. When a fare drops back to the lower end of what you’ve seen, that’s a sensible time to book.",
        "Fares on our destination and route pages are the cheapest prices found recently, refreshed about every hour, so they show you what a good price looks like before you search your own dates. Fare alerts are coming soon. Until then, a saved search and a little patience do the same job.",
      ],
    },
    {
      heading: "The rules that protect you after you book",
      paragraphs: [
        "Knowing your rights makes it easier to book early with confidence. In the US, the Department of Transportation requires airlines to let you either cancel within 24 hours for a full refund, or hold a reservation at the quoted price for 24 hours without paying, for tickets bought at least seven days before departure. Airlines can choose which of the two they offer, so check before you buy.",
        "Also in the US, if an airline cancels or significantly changes your flight and you choose not to travel, you’re entitled to a refund, even on a non-refundable ticket. For international itineraries, a significant change includes departing 6 hours or more earlier, or arriving 6 hours or more later, than first scheduled.",
        "In the UK, if your flight is cancelled you can choose between a refund for the unused parts of your ticket or an alternative flight. If you were told less than 14 days before departure, you may also be able to claim compensation, unless the cancellation was caused by extraordinary circumstances such as extreme weather. These UK rules cover flights leaving a UK airport on any airline, and flights arriving in the UK on a UK or EU airline.",
      ],
    },
    {
      heading: "Before you pay",
      paragraphs: [
        "When you choose a deal on Wallet Flights, you book with the airline or travel site you pick, or you can message our team on WhatsApp and we can book a flight for you. Either way, check the details below before you pay. A slightly higher fare with a checked bag included can work out cheaper overall than a basic fare plus bag fees.",
      ],
      list: [
        "The final price with all taxes and fees, in the currency you’ll be charged",
        "What bags are included: a personal item only, a cabin bag, or a checked bag",
        "Change and refund rules, and the fee for each",
        "The name on the booking, exactly as it appears in your passport",
        "Connection times, and whether each flight is on the same ticket",
        "Passport validity and any visa or travel authorisation your destination needs",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the cheapest day to book a flight?",
      a: "There isn’t one. Airlines change fares constantly according to how many seats are left and how quickly they’re selling, so no weekday or hour is reliably cheaper. Flying midweek, rather than booking midweek, is what tends to save money.",
    },
    {
      q: "How far in advance should I book an international flight?",
      a: "For long-haul trips, start watching prices a few months ahead and book when you see a fare you’re happy with; for peak dates such as Christmas and the summer holidays, book as early as you can. Short-haul trips within Europe or the US usually need only a few weeks to a couple of months outside school holidays.",
    },
    {
      q: "Do flight prices go down closer to the date?",
      a: "Sometimes, on quiet routes and dates with spare seats, but the last few seats on a busy flight are often the most expensive. If your dates are fixed or fall in a school holiday, waiting is a gamble that rarely pays.",
    },
    {
      q: "Can I cancel a flight within 24 hours?",
      a: "For flights to, from or within the US booked at least seven days before departure, US rules let you cancel within 24 hours for a full refund, or hold the fare for 24 hours without paying, depending on which option the airline offers. UK rules have no equivalent, so check the fare conditions before you pay.",
    },
  ],
  keywords: ["when to book international flights", "how far in advance to book a flight", "cheapest day to book flights", "best time to book flights", "24-hour flight cancellation rule"],
  // Checked 16 Oct 2026.
  sources: [
    { label: "US Department of Transportation: Refunds and the 24-hour rule", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
    { label: "UK Civil Aviation Authority: Cancellations", url: "https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/cancellations/" },
    { label: "GOV.UK: School term and holiday dates", url: "https://www.gov.uk/school-term-holiday-dates" },
  ],
};
