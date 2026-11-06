import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, Agent B, guide 4 (docs/BATCH-22-BRIEF.md). Primary keyword: "flying
// with children" / "flying with a baby". Passport rule from GOV.UK; liquids
// from GOV.UK and the TSA; child seats from the FAA; family seating from the
// UK CAA and the US DOT; ears from the CAA (found with WebSearch on 5 Nov
// 2026). The age-by-age summary combines those sources; the packing list and
// timing tips are our own advice and are labelled so.
export const flyingWithChildren: Guide = {
  slug: "flying-with-children",
  title: "Flying with children and babies: seats, security and what to pack",
  seoTitle: "Flying with children or a baby: a practical guide",
  excerpt:
    "Flying with a baby or children: passports, lap infants and car seats, baby milk at security, sitting together, and what to keep in the cabin bag.",
  topic: "flying",
  published: "2026-11-05",
  photo: photos.guideFlyingWithChildren,
  summary: [
    "Every child, including a newborn, needs their own passport to travel abroad from the UK.",
    "Under-2s can usually fly on your lap, but the FAA says the safest place for them is an approved child seat in their own seat.",
    "Baby milk and baby food are allowed through security in more than 100ml; show them separately so they can be screened.",
    "The UK CAA’s guidance is that young children sit in the same row as their adult; the US DOT lists airlines that guarantee it free.",
  ],
  sections: [
    {
      heading: "The short answer: sort documents, seats and the cabin bag early",
      paragraphs: [
        "Flying with children is mostly about doing three things in good time: getting each child the right documents, booking seats that keep you together, and packing a cabin bag that covers delays. Everything else, from snacks to screens, is easier once those are done.",
        "Rules in this guide come from GOV.UK, the UK Civil Aviation Authority, the US FAA, TSA and Department of Transportation, listed at the end. Airline policies on infants, pushchairs and seat fees differ, so check your airline’s own page before you fly. Where something is simply our advice as travellers, we say so.",
      ],
    },
    {
      heading: "Passports and travel permission",
      paragraphs: [
        "Every child needs their own passport to travel abroad; a baby can’t be added to a parent’s passport. GOV.UK says child passports are normally valid for 5 years, and that if a child’s passport has expired you must renew it before they can travel. Apply well ahead: a newborn needs a passport photo and the application takes time.",
        "Children also need any visa or travel authorisation the country asks for, just like adults. For a trip to the US or a visit to the UK, our [ESTA and UK ETA guide](/travel-guides/esta-and-uk-eta) explains what to apply for. If only one parent is travelling, or a child has a different surname, carrying a letter of consent and a birth certificate can save questions at the border; that’s our advice, not a rule.",
      ],
    },
    {
      heading: "Lap infant or their own seat?",
      paragraphs: [
        "Most airlines let a child under 2 travel on an adult’s lap, usually for a reduced fare, with one infant per adult. Delta, for example, allows a lap infant under 2 and recommends buying a seat with an approved child safety seat instead. The FAA goes further: it says the safest place for a child under 2 on a plane is an approved child restraint system, not your lap, because your arms can’t hold a child securely in unexpected turbulence.",
        "If you take a car seat on board, the FAA says it must be labelled as approved for use in aircraft, and buying a ticket for your child is the only way to make sure you can use one. A window seat is the preferred place for it, so it doesn’t block anyone getting out of the row. Booster seats and harness vests can’t be used for take-off and landing.",
      ],
      table: {
        caption: "What applies to children by age (from the sources listed; check your airline too)",
        head: ["Age", "What applies", "Source"],
        rows: [
          ["Any age", "Needs their own passport", "GOV.UK"],
          ["Under 2", "Can usually fly on an adult’s lap; an approved child seat in their own seat is safest", "Airline rules; FAA"],
          ["2 and over", "Needs their own seat on most airlines", "Airline rules"],
          ["13 and under", "Some US airlines guarantee a free seat next to an adult; see the DOT dashboard", "US DOT"],
          ["Young children (UK)", "Should sit in the same row as their adult, or no more than one row away", "UK CAA guidance"],
          ["Under 15", "Can’t sit in an exit row on US flights", "14 CFR 121.585"],
        ],
      },
    },
    {
      heading: "Sitting together",
      paragraphs: [
        "The UK CAA’s guidance is that young children and infants should ideally sit in the same row as the adult they’re travelling with, and no more than one row away where that’s not possible. It expects airlines with free seating to have procedures to keep families together on the same basis. It’s guidance rather than a legal right, so choosing seats when you book is the surest way to sit together.",
        "In the US, the Department of Transportation’s Airline Family Seating Dashboard shows which airlines guarantee that a child aged 13 or under can sit next to an accompanying adult at no extra cost, if adjacent seats are free when you book. Book the whole family on one reservation. For a baby on a long flight, ask for a bulkhead seat with a bassinet; our guide to the [best seat on a plane](/travel-guides/best-seat-on-a-plane) explains the trade-offs.",
      ],
    },
    {
      heading: "Baby milk and food at security",
      paragraphs: [
        "In the UK, GOV.UK’s hand luggage rules let you take baby milk, baby food and sterilised water in containers over 100ml when you’re travelling with a baby. They don’t need to go in the clear liquids bag, but they will be screened separately and may be tested, so pack them where you can reach them. Our guide to [UK airport liquids rules](/travel-guides/uk-airport-liquids-rules) covers the details.",
        "In the US, the TSA allows formula, breast milk, toddler drinks and baby or toddler food, including puree pouches, in more than 3.4 ounces (100ml), outside the quart-sized bag. Tell the officer at the start of screening that you have them. Ice packs and gel packs to keep them cool are allowed too, and you can ask for the items not to be X-rayed or opened, in which case expect other checks.",
      ],
      tip: "Take more milk, nappies and snacks than the flight time needs. Delays happen, and you can’t always buy what your child eats once you’re past security. That’s our advice from experience.",
    },
    {
      heading: "What to pack in the cabin bag",
      paragraphs: [
        "This is our own list for a family cabin bag. Your airline’s hand luggage allowance applies, and infants on a lap may get a smaller allowance, so check it; our guide to [hand luggage sizes](/travel-guides/hand-luggage-sizes-bag-fees) shows where to look.",
      ],
      list: [
        "Passports and boarding passes for everyone, kept together",
        "Milk, food and water for the journey plus a few hours’ delay",
        "Nappies, wipes, nappy bags and a change of clothes for the child, and a top for you",
        "Any medicines your child takes, with the prescription",
        "Headphones sized for children, a charged tablet with downloaded shows, and a couple of small new toys",
        "A light blanket or sleep bag for a long flight",
        "A dummy, bottle or drink for take-off and landing",
      ],
    },
    {
      heading: "At the airport and on board",
      paragraphs: [
        "Leave extra time. Security with children, buggies and baby milk takes longer, and our guide to [how early to get to the airport](/travel-guides/how-early-to-get-to-the-airport) suggests adding time for that. Many airlines let you take a pushchair to the aircraft door and collect it on arrival, but the rules and sizes differ, so check before you go.",
        "For ears, the CAA says swallowing, chewing or yawning during the descent helps with pressure. With a baby, we find a feed, bottle or dummy as the plane starts to come down helps them swallow; older children can sip a drink or chew. Walk the aisle with a restless toddler when the seat-belt sign is off.",
        "Timing matters too. For a first family trip, a short flight to somewhere like [Lisbon](/destinations/lisbon) or [Barcelona](/destinations/barcelona) is a gentler start than a long-haul trip. School holidays push fares up; our [half-term flights guide](/travel-guides/half-term-flights) shows when to book.",
      ],
      tip: "If your child has a long-haul flight ahead, set expectations about sleep and screens before you go, and keep the first day at your destination light. Our [jet lag tips](/travel-guides/jet-lag-tips) apply to children too.",
    },
  ],
  faqs: [
    {
      q: "Does a baby need a passport to fly?",
      a: "Yes. Every child, including a newborn, needs their own passport to travel abroad from the UK. GOV.UK says child passports are normally valid for 5 years.",
    },
    {
      q: "Can a baby sit on my lap on a plane?",
      a: "Most airlines allow a child under 2 on an adult’s lap, one per adult. The FAA says the safest option is an approved child seat in their own seat, because you can’t hold a child securely in sudden turbulence.",
    },
    {
      q: "Can I take baby milk through airport security?",
      a: "Yes. GOV.UK allows baby milk, baby food and sterilised water over 100ml when you travel with a baby, and the TSA allows formula, breast milk and baby food over 3.4 ounces. Show them separately for screening.",
    },
    {
      q: "Do I have to pay to sit next to my child on a plane?",
      a: "It depends on the airline. The UK CAA’s guidance is that young children sit in the same row as their adult, and the US DOT’s family seating dashboard lists airlines that guarantee a free adjacent seat for children aged 13 and under.",
    },
    {
      q: "Can I use a car seat on a plane?",
      a: "Yes, if it’s approved for aircraft use and your child has their own seat. The FAA says a window seat is the preferred place for it. Booster seats can’t be used for take-off and landing.",
    },
  ],
  sources: [
    { label: "GOV.UK: Get a passport for your child", url: "https://www.gov.uk/get-a-child-passport" },
    { label: "GOV.UK: Renew a child passport", url: "https://www.gov.uk/get-a-child-passport/renew-a-child-passport" },
    { label: "GOV.UK: Hand luggage restrictions at UK airports (liquids)", url: "https://www.gov.uk/hand-luggage-restrictions/liquids" },
    { label: "TSA: Traveling with children", url: "https://www.tsa.gov/travel/special-procedures/traveling-children" },
    { label: "FAA: Kids’ Corner (child restraint systems)", url: "https://www.faa.gov/travelers/kids-corner" },
    { label: "Delta: Infant air travel", url: "https://www.delta.com/us/en/children-infant-travel/infant-travel" },
    { label: "UK Civil Aviation Authority: Airline seating allocations", url: "https://www.caa.co.uk/Passengers/Before-you-fly/Making-a-booking/Airline-seating-allocations/" },
    { label: "US Department of Transportation: Airline Family Seating Dashboard", url: "https://www.transportation.gov/airconsumer/airline-family-seating-dashboard" },
    { label: "UK Civil Aviation Authority: The aircraft cabin, your health and comfort", url: "https://www.caa.co.uk/passengers-and-public/passenger-guidance/health-guidance/health-information-for-passengers/passenger-health-faqs-the-aircraft-cabin-your-health-and-comfort/" },
  ],
  keywords: [
    "flying with children",
    "flying with a baby",
    "lap infant",
    "baby milk airport security",
    "car seat on plane",
    "does a baby need a passport",
    "sitting together on a plane with children",
    "flying with a toddler",
  ],
};
