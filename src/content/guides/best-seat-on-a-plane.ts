import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, Agent B, guide 3 (docs/BATCH-22-BRIEF.md). Primary keyword: "best
// seat on a plane". Exit-row rules from British Airways and the US eCFR
// (14 CFR 121.585); family seating from the UK CAA and the US DOT; child seat
// placement from the FAA (found with WebSearch on 5 Nov 2026). The seat-by-seat
// comparison is our own advice and is labelled so.
export const bestSeatOnAPlane: Guide = {
  slug: "best-seat-on-a-plane",
  title: "The best seat on a plane: window, aisle, exit row or bulkhead?",
  seoTitle: "Best seat on a plane: window, aisle or exit row?",
  excerpt:
    "Which seat on a plane is best for sleep, legroom, getting off quickly or flying with children, plus the exit-row rules and how to sit together for free.",
  topic: "flying",
  published: "2026-11-05",
  photo: photos.guideBestSeat,
  summary: [
    "There’s no single best seat: a window suits sleepers, an aisle suits anyone who wants to get up, and seats near the front get you off first.",
    "Exit rows give more legroom, but you must be able and willing to help in an evacuation; US rules bar anyone under 15 from them.",
    "In the UK, the CAA’s guidance is that young children sit in the same row as their adult, or no more than one row away.",
    "Check the seat map for your exact aircraft before you pay for a seat, and compare the fee with the fare difference.",
  ],
  sections: [
    {
      heading: "The short answer: it depends what you want from the flight",
      paragraphs: [
        "The best seat on a plane is the one that fits what matters most to you on that flight. Want to sleep? Take a window, so nobody climbs over you and you have a wall to lean on. Want to stretch and walk about, or need the toilet often? Take an aisle. Want the most legroom in economy? Look at exit rows and bulkhead rows, and read the conditions. Tight connection or a long immigration queue ahead? Sit as near the front as you can.",
        "What follows is our own comparison, based on how seats are laid out on most airliners. Exact layouts vary by aircraft, so check the seat map in your booking before you choose. Where we quote a rule, the source is listed at the end.",
      ],
    },
    {
      heading: "Seat by seat",
      paragraphs: [
        "This table is our own advice. It assumes a standard economy cabin; premium cabins have their own layouts.",
      ],
      table: {
        caption: "Economy seat types compared (Wallet Flights’ advice)",
        head: ["Seat", "Best for", "Watch out for"],
        rows: [
          ["Window", "Sleeping, views, not being disturbed", "Climbing past others to get out"],
          ["Aisle", "Leg stretching, getting up often, quick exit", "Trolleys, elbows and being woken by your row"],
          ["Middle", "Sitting next to your travel companion", "Least space; usually the last seats to go"],
          ["Exit row", "Legroom", "Eligibility rules, may cost extra, armrests may not lift"],
          ["Bulkhead", "Legroom with no seat reclining into you; often where baby bassinets fit", "No under-seat storage for take-off and landing; may be near families"],
          ["Front of the cabin", "Getting off first, tight connections", "Often sold at a premium"],
          ["Back rows", "Sometimes empty seats nearby on quiet flights", "Near toilets and galleys; last off the plane; last row may not recline"],
        ],
      },
      tip: "On a long-haul flight, the choice between window and aisle matters far more than on a short one. Our [first long-haul flight tips](/travel-guides/first-long-haul-flight-tips) cover the rest of the journey.",
    },
    {
      heading: "Exit rows: more legroom, with conditions",
      paragraphs: [
        "Exit rows are next to or just behind an emergency exit, so there’s usually more space in front of you. That space has a purpose. British Airways says that if you choose an exit seat, you’ll be expected to help open the emergency door, that you must meet the UK Civil Aviation Authority’s safety requirements, and that you’ll be asked to confirm this before you can reserve the seat. BA says passengers travelling with someone who would need their help in an emergency can’t be given an exit seat, and that it has the final say on who qualifies.",
        "In the US, federal rules (14 CFR 121.585) require airlines to check that people in exit seats are able and willing to help. The rule excludes anyone under 15, anyone responsible for caring for small children, and anyone who can’t do the physical tasks involved in opening an exit. Expect the crew to brief you and to move you if you don’t meet the conditions.",
        "In practice, that means (our summary):",
      ],
      list: [
        "You must be able to open a heavy door or hatch quickly",
        "You must be willing to help if asked, and able to understand the crew’s instructions",
        "Bags usually go in the overhead locker for take-off and landing, not at your feet",
        "Some exit rows don’t recline, so the row in front of an exit is worth checking on the seat map",
      ],
    },
    {
      heading: "Bulkhead seats and bassinets",
      paragraphs: [
        "Bulkhead seats face a wall or divider at the front of a cabin section. Nobody reclines into you, and on long-haul aircraft this is where airlines often fit the clip-on bassinets used for babies, so these rows are frequently kept for families. If you’re travelling with an infant, ask the airline for a bassinet seat when you book.",
        "The trade-off, in our experience, is storage and space for your feet. With no seat in front, your bag goes in the overhead locker for take-off and landing, the tray table usually folds out of the armrest, and the armrests may not lift. Some bulkhead rows have less legroom than an exit row, so check the seat map rather than assuming.",
      ],
    },
    {
      heading: "Sitting together, and children’s seats",
      paragraphs: [
        "If you don’t pay to choose a seat, many airlines assign one at check-in, and you may not sit with your group. For children, there is guidance. The UK CAA says young children and infants should ideally be seated in the same row as the adult they’re travelling with, and where that’s not possible, no more than one row away. It says airlines with free seating should have procedures to keep families together on the same basis. This is guidance, not a legal right.",
        "In the US, the Department of Transportation runs an Airline Family Seating Dashboard showing which airlines guarantee that a child aged 13 or under can sit next to an accompanying adult at no extra charge, if adjacent seats are available when you book. Check it before you book a US flight.",
        "If you bring an approved child car seat on board, the FAA says a window seat is the preferred place for it, so it doesn’t block anyone getting out of the row. Our guide to [flying with children](/travel-guides/flying-with-children) has more.",
      ],
      tip: "Book everyone on one reservation. It makes it easier for the airline to seat a family together, and the US DOT dashboard lists it as a common condition.",
    },
    {
      heading: "Is it worth paying to choose a seat?",
      paragraphs: [
        "On a short flight on your own, usually not, in our view: you’ll be off the plane within a couple of hours. On a long-haul flight, or when you need to sit with someone, a seat fee can be worth it. Compare it with the price difference between fare types, because a slightly dearer fare sometimes includes seat selection, bags or both. Our guides to [hand luggage and bag fees](/travel-guides/hand-luggage-sizes-bag-fees) and [how to find cheap flights](/travel-guides/how-to-find-cheap-flights) explain how the extras add up.",
        "Whatever you pay, look at the seat map for your exact aircraft first. Two flights on the same route, such as [London to New York](/routes/london-to-new-york) or [London to Singapore](/routes/london-to-singapore), can use different planes with different layouts, and the seat you liked last time may be in a different place.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the best seat on a plane for legroom?",
      a: "Usually an exit row, followed by some bulkhead rows. Exit rows come with conditions: you must be able and willing to help in an emergency, and US rules exclude anyone under 15. Check the seat map for your aircraft.",
    },
    {
      q: "Is a window or aisle seat better on a long flight?",
      a: "A window is better for sleeping and not being disturbed; an aisle is better if you want to walk about or get up often. That’s our view; on a long-haul flight, choose based on whether you plan to sleep.",
    },
    {
      q: "Can children sit in an exit row?",
      a: "No. In the US, 14 CFR 121.585 excludes anyone under 15 and anyone caring for small children. British Airways says passengers travelling with someone who would need their help in an emergency can’t have an exit seat.",
    },
    {
      q: "Will my family be seated together if we don’t pay for seats?",
      a: "Not always. The UK CAA’s guidance is that young children sit in the same row as their adult, or no more than one row away. In the US, the DOT’s family seating dashboard shows which airlines guarantee adjacent seats for children aged 13 and under at no charge.",
    },
    {
      q: "Where should I sit to get off the plane fastest?",
      a: "As near the front as you can, on the aisle. It helps most with a tight connection or a long immigration queue.",
    },
  ],
  sources: [
    { label: "British Airways: Can I sit in an emergency exit row?", url: "https://www.britishairways.com/content/information/help/faq/seating/seat-in-emergency-exit-row" },
    { label: "eCFR: 14 CFR 121.585, Exit seating", url: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-G/part-121/subpart-T/section-121.585" },
    { label: "UK Civil Aviation Authority: Airline seating allocations", url: "https://www.caa.co.uk/Passengers/Before-you-fly/Making-a-booking/Airline-seating-allocations/" },
    { label: "US Department of Transportation: Airline Family Seating Dashboard", url: "https://www.transportation.gov/airconsumer/airline-family-seating-dashboard" },
    { label: "FAA: Kids’ Corner (child restraint systems)", url: "https://www.faa.gov/travelers/kids-corner" },
  ],
  keywords: [
    "best seat on a plane",
    "best seat on a plane for legroom",
    "window or aisle seat",
    "exit row seat rules",
    "bulkhead seat",
    "best seat on a long haul flight",
    "can children sit in exit row",
    "family seating on flights",
  ],
};
