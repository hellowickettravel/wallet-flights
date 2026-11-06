import { guidesEPhotos } from "../photos/guides-e";
import type { Guide } from "./types";

// Batch E, guide 4. Primary keyword: "one way vs round trip flights". Entry
// requirements come from GOV.UK foreign travel advice entry-requirements pages
// for the Dominican Republic, Thailand, Indonesia and Mexico, and Heathrow's
// connections page, all opened and read on 6 Nov 2026. The US State Department
// and CBP pages could not be opened from the build sandbox (403 / blocked), so
// the earlier Japan, Thailand-State-Department and CBP carrier-guide claims were
// removed. The search form's one-way, return and multi-city options were
// checked in the site code. Whether two one-ways are cheaper is not stated as a
// fact: the guide says to compare, as our how-to-find-cheap-flights guide does.
// Not verified, so left out: any price comparison, any airline's one-way
// pricing policy, UK or US entry rules on onward travel, airline boarding
// practice on onward tickets. Advice on when to book each type is ours.
export const oneWayVsReturnFlights: Guide = {
  slug: "one-way-vs-return-flights",
  title: "One-way vs return flights: when each is the better booking",
  seoTitle: "One way vs round trip flights: which to book?",
  excerpt:
    "Is a return ticket cheaper than two one-ways? When one-way or mixed-airline tickets make sense, the risks, and the onward-travel proof some countries ask for.",
  topic: "booking",
  published: "2026-11-06",
  photo: guidesEPhotos.guideOneWay,
  summary: [
    "A return (round trip) is one booking with both flights; two one-way tickets are separate bookings, so a change to one doesn’t change the other.",
    "On some routes, two one-ways, even with different airlines, cost less than a return. Compare both, because it is not true on every route.",
    "Separate tickets are separate contracts: if one flight is late, the other airline isn’t obliged to rebook you.",
    "Some countries may refuse entry if you can’t show a return or onward ticket. Check the government page for your destination.",
  ],
  sections: [
    {
      heading: "The short answer: compare both every time",
      paragraphs: [
        "A return ticket (called a round trip in the US) books your outbound and return flights together, usually with one airline. A one-way ticket covers a single journey. If you need to come back, you can buy two one-ways, and they don’t have to be with the same airline.",
        "Neither is always cheaper. Our guide to [how to find cheap flights](/travel-guides/how-to-find-cheap-flights) says that on some routes two one-way tickets, out with one airline and back with another, cost less than a return, and that both are worth checking. Because each one-way is a separate booking, a problem with one doesn’t change the other, which cuts both ways.",
      ],
      tip: "Our advice: search the return first, then search each direction as a one-way, and compare the totals including bags. Don’t compare only the headline fare.",
    },
    {
      heading: "One-way, return or multi-city: how they differ",
      paragraphs: [
        "Wallet Flights’ search form on the [home page](/) lets you choose return, one-way or multi-city before you search. Multi-city is for trips that don’t go back to where they started, such as flying into one city and home from another, so it can save a backtrack that a return would force.",
      ],
      table: {
        caption: "Return, two one-ways and multi-city compared (Wallet Flights’ advice)",
        head: ["Booking", "Best when", "Watch out for"],
        rows: [
          ["Return, one ticket", "You fly there and back from the same airports and want one booking to manage", "A change to one flight can affect the other, and the fare conditions apply to the whole ticket"],
          ["Two one-ways, same airline", "Your dates are uncertain, or the airline prices each direction separately", "Fare conditions for each ticket; two bookings to keep track of"],
          ["Two one-ways, different airlines", "Each direction is cheapest with a different airline, or timings suit you better", "Different baggage rules and different contracts; a delay on one doesn’t help you on the other"],
          ["Multi-city (open-jaw)", "You arrive in one city and leave from another", "Total price and the connection between the two cities, which you arrange yourself"],
        ],
      },
    },
    {
      heading: "When one-ways beat a return",
      paragraphs: [
        "These are situations where it is worth pricing one-ways, in our view. None guarantees a lower fare.",
      ],
      list: [
        "Your return date is uncertain, and you don’t want to be tied to a return fare’s change conditions.",
        "You want to use a different airport or airline on the way back, for example a better departure time.",
        "You are moving or travelling on, and a return would only be used for one direction.",
        "One direction is much cheaper on a particular day, which you can see on our [fare calendar](/fare-calendar) or in the [cheapest day to fly](/travel-guides/cheapest-day-to-fly) guide.",
      ],
    },
    {
      heading: "The risks of separate tickets",
      paragraphs: [
        "Each one-way is its own contract. If your outbound flight is late, cancelled or changed, only that airline is responsible for it, and the airline on your other ticket has no duty to move your return. The risk is greatest when the two tickets are connected, for example a one-way into a hub and another one out to your destination. Heathrow’s connections page says that if you booked your flights separately, minimum connection times don’t apply. Our guides to [self-transfer and separate tickets](/travel-guides/self-transfer-separate-tickets) and [how long a layover you need](/travel-guides/how-long-a-layover) explain the risk and how much time to leave.",
        "Bags are another difference. With separate bookings you normally collect your bags and check in again, and each airline applies its own allowance, so add up the cost of bags on both. See [checked baggage allowances](/travel-guides/checked-baggage-allowances) and [hand luggage sizes and bag fees](/travel-guides/hand-luggage-sizes-bag-fees).",
        "Finally, think about how you’ll manage the two bookings. If you need to change one, check the rules of that fare, because the other won’t change automatically. Our advice is to keep all confirmations together and set calendar reminders for check-in on both.",
      ],
    },
    {
      heading: "Proof of onward travel: why a one-way can be refused",
      paragraphs: [
        "The biggest practical difference is entry requirements. Some countries ask visitors to show they will leave. The details change by country and by passport, so check the official page for your destination.",
        "For example, GOV.UK’s travel advice says that in the Dominican Republic you may be refused entry if you do not have proof of onward or return travel when you arrive. For Thailand, it says immigration officials may ask for evidence of onward travel, accommodation or sufficient funds, and that British nationals have been refused entry for failing to provide evidence of onward or return travel. For Mexico, it says that at border control you may need to show a return or onward ticket, and for Indonesia that a visa on arrival requires proof of your onward or return journey. These pages are written for British passport holders, and other nationalities should check their own government’s advice.",
        "If you plan to buy only a one-way because your onward plans are open, check the entry page for your destination first, and ask your airline what it accepts. Our guides to [passport validity rules](/travel-guides/passport-validity-rules) and [EES and ETIAS for UK and US travellers](/travel-guides/ees-etias-uk-us-travellers) cover other documents to check.",
      ],
      tip: "Our advice: look up your destination’s entry requirements on your own government’s travel advice page, such as GOV.UK’s foreign travel advice, before you buy a one-way ticket. If a page mentions onward or return travel, ask your airline what it accepts.",
    },
    {
      heading: "How to search on Wallet Flights",
      paragraphs: [
        "On the [home page](/), pick Return, One-way or Multi-city, enter your airports and dates, and compare. To price two one-ways, run two one-way searches, one for each direction, and add up the fares and any bag fees. Fares on our route and destination pages, such as [London to New York](/routes/london-to-new-york) or [Manchester to Dubai](/routes/manchester-to-dubai), show recent prices so you know what a good fare looks like before you search your dates.",
        "Before you pay, check whether the two flights are on one ticket or separate ones, how much each bag costs, and, for a one-way into another country, the entry rules. Our [price alerts guide](/travel-guides/flight-price-alerts) shows how to watch a fare until it reaches a price you like.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is it cheaper to book two one-way flights than a return?",
      a: "Sometimes. On some routes two one-way tickets, even with different airlines, cost less than a return, so compare both. It isn’t true on every route.",
    },
    {
      q: "What is the difference between a one-way and a round-trip flight?",
      a: "A one-way ticket covers a single journey. A round trip, called a return in the UK, books the outbound and the return flight together. Two one-ways are two separate bookings.",
    },
    {
      q: "Can I be refused entry with a one-way ticket?",
      a: "Some countries ask for proof of return or onward travel. For example, GOV.UK says you may be refused entry to the Dominican Republic without proof of onward or return travel, and that immigration officials in Thailand may ask for evidence of it. Check the official page for your destination.",
    },
    {
      q: "What happens if one of two separate one-way flights is delayed?",
      a: "Each ticket is a separate contract. The airline on the delayed flight is responsible for that flight, but the airline on your other ticket isn’t obliged to rebook you. See our guide to self-transfer and separate tickets.",
    },
  ],
  sources: [
    { label: "GOV.UK: Dominican Republic travel advice, entry requirements", url: "https://www.gov.uk/foreign-travel-advice/dominican-republic/entry-requirements" },
    { label: "GOV.UK: Thailand travel advice, entry requirements", url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements" },
    { label: "GOV.UK: Mexico travel advice, entry requirements", url: "https://www.gov.uk/foreign-travel-advice/mexico/entry-requirements" },
    { label: "GOV.UK: Indonesia travel advice, entry requirements", url: "https://www.gov.uk/foreign-travel-advice/indonesia/entry-requirements" },
    { label: "Heathrow: Connecting flights", url: "https://www.heathrow.com/connecting-flights" },
  ],
  keywords: ["one way vs round trip flights", "one way vs return flights", "are two one way flights cheaper than a return", "proof of onward travel", "one way ticket entry requirements", "open jaw flights", "multi-city flights"],
};
