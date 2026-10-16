import { photos } from "../images";
import type { Guide } from "./types";

// Wave 1, post 5 (docs/SEO-CONTENT-PLAN.md). Primary keyword: "self transfer
// flight"; also "separate tickets booked together meaning". Rules from the CAA
// delays page, GOV.UK ETA and the official ESTA FAQ (read 16 Oct 2026). Time
// buffers are our own advice and are labelled as such.
export const selfTransfer: Guide = {
  slug: "self-transfer-separate-tickets",
  title: "Self-transfer flights: what “separate tickets” means and when the saving is worth it",
  seoTitle: "Self-transfer flights and separate tickets",
  excerpt:
    "A self-transfer can be much cheaper, but you’re on your own if the first flight is late. How to spot one, what you give up and how much time to leave.",
  topic: "booking",
  published: "2026-10-16",
  photo: photos.guideConnection,
  summary: [
    "A self-transfer, or “separate tickets booked together”, is two or more flights that aren’t on one booking, even if you bought them at the same time.",
    "If the first flight is late and you miss the next one, the second airline doesn’t have to rebook you, and the CAA says you have no statutory right to care, compensation or onward travel.",
    "You usually collect your bags, check in again and go back through security at the connecting airport.",
    "Connecting through the UK or the US can need an ETA or ESTA, because you pass through border control.",
    "Leave far more time than for a normal connection, or pay the difference for one ticket.",
  ],
  sections: [
    {
      heading: "One ticket or separate tickets: what changes",
      paragraphs: [
        "When you book a connecting trip on one ticket, for example London to Bangkok via Doha with one airline or its partners, the airlines are responsible for getting you to your final destination. If the first flight is late and you miss the connection, they put you on the next available flight, and your bags are checked through to the end.",
        "A self-transfer combines flights that aren’t on one ticket. Comparison sites and travel sites often show these as “self-transfer”, “separate tickets” or “separate tickets booked together”, because the combination is cheaper than any single ticket. You may pay once, but you hold two separate contracts with two airlines, and each airline is only responsible for its own flight.",
      ],
      table: {
        caption: "Connecting on one ticket compared with a self-transfer",
        head: ["", "One ticket", "Self-transfer (separate tickets)"],
        rows: [
          ["Miss the connection because of a delay", "The airline rebooks you on the next flight", "Your second ticket may be lost; you may need to buy a new one"],
          ["Checked bags", "Usually checked through to your destination", "Usually collect them and check in again"],
          ["Security and passport control", "Often stay airside", "Often go landside, through border control and security again"],
          ["Rights when the first flight is late", "Based on the whole journey (UK rules)", "Each flight only has its own rights"],
          ["Price", "Can be higher", "Often lower"],
        ],
      },
    },
    {
      heading: "How to spot a self-transfer when you compare fares",
      paragraphs: [
        "Look before you click through. The signs are usually on the result itself or in the flight details:",
      ],
      list: [
        "Words such as “self-transfer”, “separate tickets”, “not protected” or “you must collect and re-check your bags”",
        "Two different airlines that don’t usually work together, especially a low-cost airline on one leg",
        "Two booking references after you pay, or a price broken into two parts",
        "A connection at a different airport in the same city, such as arriving at Gatwick and leaving from Heathrow",
        "Unusually short or unusually long gaps between the flights",
      ],
      tip: "When you compare on Wallet Flights, open the flight details before you choose a provider. If the provider’s page says the flights are on separate tickets, read its terms on missed connections before you pay.",
    },
    {
      heading: "If the first flight is late: what the CAA says",
      paragraphs: [
        "On a single booking under UK rules, the CAA says your right to care and compensation is based on the distance between the first and last airport in your booking, so a missed connection counts as a delay to your whole journey.",
        "Self-transfers are treated differently. The CAA says that if you book separate flights yourself, you don’t have a statutory right to care, compensation or transport to your final destination when you miss the onward flight. Each flight keeps its own rights, so if the first flight was delayed long enough, you may be able to claim for that flight, but the second airline can treat you as a no-show.",
        "Some travel sites sell their own connection guarantee with self-transfer itineraries. That’s a promise from the travel site, not a legal right, so read what it covers, how you claim and what it pays before you rely on it. Our guide to [your rights when a flight is cancelled or delayed](/travel-guides/flight-cancelled-or-delayed-rights) covers the rules for each flight.",
      ],
    },
    {
      heading: "Bags, check-in and security at the transfer airport",
      paragraphs: [
        "On most self-transfers, you’ll do all of this between flights:",
      ],
      list: [
        "Go through passport control into the arrivals hall",
        "Collect any checked bags from the carousel",
        "Go to departures and check in for the second flight, or drop your bag if you checked in online",
        "Go through security again, with the liquids rules of that airport",
        "Walk or take the train to the gate, which at big airports can take a while",
      ],
      tip: "Travelling with only a cabin bag removes the slowest step. Check the second airline’s cabin bag size, which may be smaller than the first’s.",
    },
    {
      heading: "Transit through the UK or the US: ETA and ESTA",
      paragraphs: [
        "Because a self-transfer usually takes you through border control, you may need permission to enter the country even though you’re only changing planes.",
        "In the UK, GOV.UK says you need an electronic travel authorisation (ETA) if you’re passing through border control at a UK airport before continuing your journey. An ETA costs £20 and each traveller needs their own, including children. British and Irish citizens don’t need one.",
        "In the US, the official ESTA site says citizens of Visa Waiver Program countries need either an ESTA or a visa to transit the United States, and should answer yes to the question about travelling in transit. The ESTA fee is $40.62 for applications completed from 16 October 2026. Apply only through the official GOV.UK and ESTA websites; others charge more for the same thing.",
      ],
    },
    {
      heading: "How much time to leave",
      paragraphs: [
        "There’s no official minimum for a self-transfer, because the airlines don’t know you’re connecting. This is our own rule of thumb, not a regulation: leave enough time to absorb a realistic delay to the first flight, plus everything you have to do on the ground.",
      ],
      list: [
        "Within Europe, with only a cabin bag at the same airport: at least 3 hours",
        "With checked bags, or a long-haul second flight: 4 to 6 hours or more",
        "Changing airports in the same city: allow for the journey between them on top",
        "Last flight of the day on a route: consider a hotel night between flights",
      ],
    },
    {
      heading: "When the saving is worth it",
      paragraphs: [
        "A self-transfer can make sense when the saving is large, your dates are flexible, you’re travelling light and you have enough time between flights, ideally with a later flight the same day as a fallback. It’s a riskier choice for a wedding, a cruise departure, a tight return to work, or a trip with children and lots of luggage.",
        "Before you book, price the cheapest one-ticket option for the same journey. If the gap is small, the one ticket is usually the better buy. Our guide on [when to book an international flight](/travel-guides/when-to-book-international-flights) has more ways to bring the fare down without giving up protection.",
      ],
    },
  ],
  faqs: [
    {
      q: "What does “separate tickets booked together” mean?",
      a: "It means the flights were bought in one go but are separate contracts with each airline. If the first flight is late and you miss the second, the second airline doesn’t have to rebook you.",
    },
    {
      q: "Is a self-transfer flight risky?",
      a: "It carries more risk than one ticket, because a delay on the first flight can leave you to buy a new onward ticket. Leaving plenty of time between flights and travelling light reduces the risk.",
    },
    {
      q: "Do I have to collect my bags on a self-transfer?",
      a: "Usually, yes. You collect checked bags at the connecting airport, check in again for the next flight and go back through security.",
    },
    {
      q: "Do I need an ETA or ESTA for a self-transfer?",
      a: "If you pass through UK border control, GOV.UK says you need an ETA unless you’re British or Irish. To transit the US, Visa Waiver Program travellers need an ESTA or a visa.",
    },
    {
      q: "Am I covered if my first flight is delayed on a self-transfer?",
      a: "Each flight has its own rights, so you may be able to claim for the delayed flight. The CAA says you have no statutory right to care, compensation or onward transport for the missed connection.",
    },
  ],
  keywords: ["self transfer flight", "self transfer flights meaning", "separate tickets booked together meaning", "what does separate tickets mean when booking a flight", "missed connecting flight separate tickets"],
  sources: [
    { label: "UK Civil Aviation Authority: Delays (connecting flights and self-transfers)", url: "https://www.caa.co.uk/air-passengers/resolving-travel-problems/delays-and-cancellations/delays/" },
    { label: "GOV.UK: Get an electronic travel authorisation (ETA)", url: "https://www.gov.uk/eta" },
    { label: "Official ESTA website: Frequently asked questions", url: "https://esta.cbp.dhs.gov/faq?lang=en" },
  ],
};
