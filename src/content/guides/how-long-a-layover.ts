import { photos } from "../images";
import type { Guide } from "./types";

// Growth proposal phase 2, month 1, guide 1 (docs/SEO-CONTENT-PLAN.md, wave 2
// "how-long-a-layover"). Primary keyword: "how long is a good layover for
// international flights". Rules and figures from Gatwick's and Heathrow's
// connections pages and CBP (checked 3 Nov 2026). The buffers in the table are
// our own advice and are labelled as such.
export const howLongALayover: Guide = {
  slug: "how-long-a-layover",
  title: "How long a layover do you need? Connection times for international flights",
  seoTitle: "How long a layover do you need for a connecting flight?",
  excerpt:
    "How much time to leave between flights: airline minimum connection times, Gatwick’s and Heathrow’s advice, US arrivals and why separate tickets need far more.",
  topic: "flying",
  published: "2026-11-03",
  photo: photos.guideLayover,
  summary: [
    "On one ticket, the airline won’t sell you a connection shorter than its minimum connection time, and it rebooks you if a delay makes you miss it.",
    "Gatwick advises at least 60 minutes in the same terminal and at least 90 minutes between terminals; your airline may ask for more.",
    "Flying into the US, you clear immigration and customs at the first US airport, so allow much longer there.",
    "On separate tickets, minimum connection times don’t apply and you carry the risk: leave several hours, or pay for one ticket.",
  ],
  sections: [
    {
      heading: "The short answer: it depends on your ticket",
      paragraphs: [
        "The most important question isn’t the airport but the booking. When both flights are on one ticket, the airline has already checked that the connection is possible: it only sells itineraries that meet the airport’s minimum connection time, the shortest time it considers enough to get you and your bags from one plane to the next. If your first flight is late and you miss the second, getting you to your destination is the airline’s problem, not yours.",
        "When the flights are on separate tickets, which travel sites often show as a “self-transfer”, nobody has checked the connection for you. Heathrow’s connections page says plainly that if you booked your flights separately, minimum connection times don’t apply. Miss the second flight and you may have to buy a new ticket. That is why the time you need is so different for the two kinds of booking.",
      ],
      tip: "Before you book a cheap connection, open the flight details and check whether it’s one ticket or a self-transfer. Our guide to [self-transfer flights](/travel-guides/self-transfer-separate-tickets) shows how to spot one.",
    },
    {
      heading: "What the airports say",
      paragraphs: [
        "Gatwick publishes simple advice: allow a connection time of at least 60 minutes if your next flight leaves from the same terminal, and at least 90 minutes if it leaves from the other one. A shuttle links the North and South terminals in about two minutes and runs around the clock. Gatwick adds that your airline may have different minimum connection times, so the airline’s figure is the one that counts.",
        "Heathrow doesn’t give one figure, because it depends on your route, your airline, whether you need to change terminal and whether you have to collect bags. Terminals are linked by free transfer services, and some connections, such as an international arrival connecting to a UK domestic flight, take you through extra checks before security. Heathrow’s advice is to rely on the minimum connection time your airline quotes when you book one ticket.",
      ],
    },
    {
      heading: "How much time to leave: our rule of thumb",
      paragraphs: [
        "Minimum connection times are minimums. They assume the first flight lands on time and nothing goes wrong. These are the buffers we’d leave ourselves, on top of the airline’s minimum, when the choice is ours. They’re our own advice, not rules.",
      ],
      table: {
        caption: "Suggested layover times by type of connection (Wallet Flights’ advice)",
        head: ["Connection", "One ticket", "Separate tickets"],
        rows: [
          ["Same terminal, no passport control", "1 to 1½ hours", "At least 3 hours"],
          ["Change of terminal", "1½ to 2 hours", "At least 3 to 4 hours"],
          ["Arriving in the US, connecting onwards", "2 to 3 hours", "At least 4 hours"],
          ["Last flight of the day, or a winter connection", "Add an hour", "Consider staying overnight"],
          ["Travelling with children or needing assistance", "Add 30 to 60 minutes", "Add an hour"],
        ],
      },
    },
    {
      heading: "Connecting through the US",
      paragraphs: [
        "If you fly into the US and connect to another flight, US Customs and Border Protection must finish your arrival processing at the first US airport you land at. That means queuing for immigration and customs there, even if the US city is only a stop on the way. Most travellers then collect their checked bags, pass them through customs and drop them again at a recheck belt before going back through security.",
        "CBP is trialling remote baggage screening on a few routes, which lets some passengers connect without rechecking bags, and some airports abroad have US preclearance, where you clear US checks before you leave. Neither covers most trips yet, so ask your airline whether your bags are checked through, and allow for the queues.",
        "You also need permission to enter the US even if you’re only changing planes: British travellers usually need an approved ESTA. Our [ESTA and UK ETA guide](/travel-guides/esta-and-uk-eta) explains how it works.",
      ],
    },
    {
      heading: "Connecting through the UK",
      paragraphs: [
        "Changing planes at a UK airport without going through border control usually keeps you airside, but if you need to collect bags, change airport or have a self-transfer, you pass through the UK border. Many travellers now need a UK Electronic Travel Authorisation (ETA) to do that, so check before you book a connection through London that takes you landside.",
      ],
    },
    {
      heading: "When a long layover is worth it",
      paragraphs: [
        "A longer connection isn’t always wasted time. A few extra hours can save money, give you a calmer trip, and on a long-haul route can turn a connection into a short stopover. Cities such as [Singapore](/destinations/singapore), [Dubai](/destinations/dubai) and [Istanbul](/destinations/istanbul) are linked to their airports by metro, so a long daytime layover can be enough for a first look, as long as you have the documents to enter the country and leave plenty of time to get back through security.",
      ],
      list: [
        "Check you can leave the airport: you’ll pass through immigration, so you may need a visa or travel authorisation",
        "Leave your bags checked through if you can, or use left-luggage",
        "Plan to be back at the airport at least two to three hours before your next flight",
      ],
    },
    {
      heading: "If you miss your connection",
      paragraphs: [
        "On one ticket, go straight to your airline’s transfer desk: it should rebook you on the next available flight. If your journey started in the UK or on a UK or EU airline, you may also be owed care and, in some cases, compensation; our guide to [your rights when a flight is delayed or cancelled](/travel-guides/flight-cancelled-or-delayed-rights) and our [delay compensation checker](/flight-delay-compensation) explain how. On separate tickets, the second airline usually has no duty to help, which is the risk you take for the lower fare.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is a 1-hour layover enough for an international flight?",
      a: "On one ticket in the same terminal, often yes, because the airline won’t sell a connection shorter than its minimum. Gatwick advises at least 60 minutes in the same terminal and 90 between terminals. For a change of terminal, passport control or a US arrival, an hour is tight.",
    },
    {
      q: "What happens if I miss my connecting flight on one ticket?",
      a: "The airline should rebook you on the next available flight to your destination. Go to its transfer desk at the airport, and keep your boarding passes and receipts in case you can claim for care or compensation.",
    },
    {
      q: "Do I have to collect my bags on a connecting flight?",
      a: "On one ticket, bags are usually checked through to your final destination. Flying into the US, you normally collect them at the first US airport for customs and drop them again. On separate tickets, you almost always collect and check them in again.",
    },
    {
      q: "Do minimum connection times apply to separate tickets?",
      a: "No. Heathrow’s connections page says minimum connection times don’t apply if you booked your flights separately, so leave far more time.",
    },
  ],
  sources: [
    { label: "Gatwick Airport: Flight connections", url: "https://www.gatwickairport.com/flights/flight-connections.html" },
    { label: "Heathrow: Connecting flights", url: "https://www.heathrow.com/connecting-flights" },
    { label: "US Customs and Border Protection: International Remote Baggage Screening", url: "https://www.cbp.gov/newsroom/national-media-release/cbp-launches-innovative-international-remote-baggage-screening" },
    { label: "US Customs and Border Protection: Preclearance", url: "https://www.cbp.gov/travel/preclearance" },
  ],
  keywords: ["how long is a good layover for international flights", "minimum connection time", "is a 1 hour layover enough", "layover time", "missed connecting flight"],
};
