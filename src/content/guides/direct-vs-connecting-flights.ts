import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, Agent A, guide 3 (docs/BATCH-22-BRIEF.md). Primary keyword:
// "direct vs connecting flights". Price figures from Google's published
// analyses of Google Flights data (2022 and 2026); definitions and baggage
// risk order from the US DOT's Fly Rights; one-ticket vs separate-booking
// rules from the CAA's connecting flights and missed connection pages and
// Heathrow's connections page; found with WebSearch on 6 Nov 2026. The "when
// to pay for nonstop" list and verdict are our own advice and are labelled.
export const directVsConnectingFlights: Guide = {
  slug: "direct-vs-connecting-flights",
  title: "Direct vs connecting flights: is the cheaper fare worth the stop?",
  seoTitle: "Direct vs connecting flights: which should you book?",
  excerpt:
    "Connections are often cheaper, but cost time and add risk. Direct, nonstop and connecting explained, what one ticket protects, and when the stop is worth it.",
  topic: "booking",
  published: "2026-11-05",
  photo: photos.guideDirectConnecting,
  summary: [
    "Nonstop flights usually cost more: Google’s analysis of Google Flights data found nonstop fares about 20% higher on average than flights with a stop.",
    "“Direct” and “nonstop” aren’t the same. The US Department of Transportation says a direct flight keeps one flight number but can still make stops.",
    "A connection on one ticket is far safer than separate tickets: the CAA says airlines must look after you if a delay makes you miss the next flight.",
    "Our view: pay for nonstop on short trips, tight schedules and travel with children; take a well-timed connection when the saving is worth the hours.",
  ],
  sections: [
    {
      heading: "The short answer: connections save money, nonstop saves time",
      paragraphs: [
        "A connecting flight is usually the cheaper option, and a nonstop flight is usually the quicker and simpler one. Google’s 2022 analysis of five years of Google Flights data found nonstop fares about 20% higher on average than flights with a stop, and its 2026 travel trends post gives a similar figure. Those are averages for trips from the US, so the gap on your route may be bigger, smaller or nothing at all.",
        "The real question is what the saving buys you. A connection adds at least one extra take-off and landing, a walk between gates and the chance that a delay knocks the whole trip off course. Whether that is worth it depends on how much you save, how long the stop is, and how the trip is booked.",
      ],
    },
    {
      heading: "Nonstop, direct and connecting: what the words mean",
      paragraphs: [
        "Booking sites use these words loosely, so it pays to know the difference. The US Department of Transportation’s Fly Rights guide spells it out: a nonstop flight has no stops, a direct (or “through”) flight keeps one flight number but can stop on the way, and a connection means changing planes, usually with a different flight number for each flight.",
      ],
      table: {
        caption: "Nonstop, direct and connecting flights compared",
        head: ["Type", "Change planes?", "Stops", "Bags"],
        rows: [
          ["Nonstop", "No", "None", "Stay on the same plane"],
          ["Direct (through)", "Usually no", "One or more, same flight number", "Stay on board"],
          ["Connection, one ticket", "Yes", "At least one", "Usually checked through to your final airport"],
          ["Self-transfer, separate tickets", "Yes", "At least one", "Usually collect and check in again"],
        ],
      },
      tip: "DOT advises reading the “stops” column and the flight numbers before you book: if two or more flight numbers appear, that part of the trip is a connection, even if a site calls it direct.",
    },
    {
      heading: "One ticket or separate tickets: the difference that matters most",
      paragraphs: [
        "How the trip is booked matters more than the number of stops. When all your flights are on one booking, the CAA says you’re generally entitled to be looked after by the airline if a delay makes you miss your connection, and it works out compensation on your arrival time at your final destination. Heathrow’s advice for one-ticket connections is to rely on the minimum connection time your airline quotes when you book.",
        "Separate tickets are a different deal. The CAA treats each booking as its own contract: if your first flight is late and you miss the second, you will probably have to buy a new ticket, and you have no right to care, compensation or onward travel from the second airline. Heathrow says minimum connection times don’t apply to flights booked separately. Our guide to [self-transfer flights](/travel-guides/self-transfer-separate-tickets) explains how to spot them.",
        "Bags follow the same logic. DOT lists the chance of a bag going astray from lowest to highest as nonstop, direct, connection on one airline, then connection between airlines. Each change of plane is one more chance for a bag to miss the flight.",
      ],
      tip: "Before you book a cheap connection, open the flight details and check whether it says “self-transfer” or “separate tickets”. If it does, either leave several hours between flights or pay a little more for one ticket.",
    },
    {
      heading: "When to pay for nonstop, and when to connect",
      paragraphs: [
        "There’s no rule that fits every trip. These are the situations where we think each option makes sense; they’re our own advice, not rules.",
      ],
      list: [
        "Pay for nonstop on short breaks, where a lost half-day matters, such as [London to Paris](/routes/london-to-paris) or [New York to London](/routes/new-york-to-london)",
        "Pay for nonstop when you’re flying with young children, have a tight arrival plan, or need to make an event or a cruise departure",
        "Pay for nonstop in winter on routes through airports where snow or fog can cause delays",
        "Connect when the saving is large and the total journey is only an hour or two longer",
        "Connect on long-haul trips where a stop breaks up a very long day, such as [London to Bangkok](/routes/london-to-bangkok) or [London to Sydney](/routes/london-to-sydney)",
        "Connect when it opens up a cheaper or better-timed flight from your local airport, such as [Manchester to Delhi](/routes/manchester-to-delhi)",
      ],
    },
    {
      heading: "Make a connection work",
      paragraphs: [
        "If you do book a connection, a few checks before you pay make it much less stressful.",
      ],
      ordered: true,
      list: [
        "Check it’s one ticket, not a self-transfer",
        "Check the layover length: our guide on [how long a layover you need](/travel-guides/how-long-a-layover) covers airline minimums and our own buffers",
        "Check whether you change terminals or airports, which needs more time",
        "Flying through the US, allow for immigration and customs at the first US airport, and make sure you have an ESTA or visa even if you’re only changing planes",
        "Check whether your bags are checked through to your final destination",
        "Pack essentials in your hand luggage in case your checked bag misses the connection",
      ],
      tip: "A long connection can become a bonus: [Dubai](/destinations/dubai), [Singapore](/destinations/singapore) and [Istanbul](/destinations/istanbul) are popular hubs where a daytime stop can turn into a short look around, as long as you can enter the country.",
    },
    {
      heading: "Our verdict",
      paragraphs: [
        "Compare the total cost, not just the fare. Add up what the extra hours cost you, the price of food at the connecting airport and the chance of a missed connection, then compare that with the saving. If the difference is small, take the nonstop. If it’s large and the connection is on one ticket with a sensible layover, the stop is often worth it. For more ways to bring the price down, see our guide to [how to find cheap flights](/travel-guides/how-to-find-cheap-flights).",
      ],
    },
  ],
  faqs: [
    {
      q: "Is a direct flight the same as a nonstop flight?",
      a: "Not always. The US Department of Transportation says a direct flight keeps one flight number but can make one or more stops, while a nonstop flight has no stops at all. Check the number of stops before you book.",
    },
    {
      q: "Are connecting flights cheaper than nonstop?",
      a: "Usually. Google’s analysis of Google Flights data found nonstop fares about 20% higher on average than flights with a stop. On some routes the gap is small or nonstop is cheaper, so always compare.",
    },
    {
      q: "What happens if I miss a connecting flight?",
      a: "On one booking, the airline should get you to your destination, and the CAA says you may be owed care and compensation if you arrive more than three hours late. On separate tickets, you will probably have to buy a new ticket.",
    },
    {
      q: "Do I need to collect my bags on a connecting flight?",
      a: "On one ticket, bags are usually checked through to your final airport. Flying into the US you normally collect them at the first US airport for customs. On separate tickets you usually collect and check them in again.",
    },
    {
      q: "Is a connection riskier for my luggage?",
      a: "Yes. The US Department of Transportation says the chance of a bag going astray rises from nonstop to direct to connecting flights, and is highest when you change airlines.",
    },
  ],
  sources: [
    { label: "Google: How to find the best deal on your next flight (2022)", url: "https://blog.google/products-and-platforms/products/travel/how-to-find-the-best-deal-on-your-next-flight/" },
    { label: "Google: Google Flights data to find holiday deals and trending destinations (2026)", url: "https://blog.google/products-and-platforms/products/search/holiday-travel-trends-2026/" },
    { label: "US Department of Transportation: Fly Rights", url: "https://www.transportation.gov/airconsumer/fly-rights" },
    { label: "Civil Aviation Authority: Connecting flights", url: "https://www.caa.co.uk/Passengers/Before-you-fly/Making-a-booking/Connecting-flights/" },
    { label: "Civil Aviation Authority: Your rights when you miss a connection", url: "https://www.caa.co.uk/Passengers/Resolving-travel-problems/Delays-cancellations/Your-rights/Your-rights-when-you-miss-a-connection/" },
    { label: "Heathrow: Connecting flights", url: "https://www.heathrow.com/connecting-flights" },
    { label: "US Customs and Border Protection: ESTA", url: "https://www.cbp.gov/travel/international-visitors/esta" },
  ],
  keywords: [
    "direct vs connecting flights",
    "nonstop vs direct flight",
    "is a direct flight the same as nonstop",
    "are connecting flights cheaper",
    "what happens if i miss a connecting flight",
    "is it worth paying for a direct flight",
    "connecting flight luggage",
  ],
};
