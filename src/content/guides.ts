import { photos, type Photo } from "./images";

export type GuideSection = { heading: string; paragraphs: string[]; list?: string[] };

export type Guide = {
  slug: string;
  title: string;
  /** Shorter title for search results (about 45 characters, before " | Wallet Flights"). */
  seoTitle?: string;
  excerpt: string;
  category: string;
  published: string; // ISO date
  /** ISO date of the last real content change, when after `published`. */
  updated?: string;
  photo: Photo;
  sections: GuideSection[];
  /** Official pages the guide relies on for specific rules or figures (see the editorial policy). */
  sources?: { label: string; url: string }[];
};

// Plan item 4.5 (16 Oct 2026): each guide expanded to about 1,000+ words.
// Rules and figures come only from the official pages in `sources`, each
// opened and read on the date in the comment above it. General advice (how
// fares behave, packing habits) carries no numbers we can't source.
export const guides: Guide[] = [
  {
    slug: "when-to-book-international-flights",
    title: "When to book an international flight (and when waiting pays off)",
    seoTitle: "When to book an international flight",
    excerpt:
      "How far ahead to book long-haul and short-haul flights, why flexible dates matter more than the day you book, and the rules that protect you after you pay.",
    category: "Booking tips",
    published: "2026-09-18",
    updated: "2026-10-16",
    photo: photos.guidePlanning,
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
    // Checked 16 Oct 2026.
    sources: [
      { label: "US Department of Transportation: Refunds and the 24-hour rule", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
      { label: "UK Civil Aviation Authority: Cancellations", url: "https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/cancellations/" },
      { label: "GOV.UK: School term and holiday dates", url: "https://www.gov.uk/school-term-holiday-dates" },
    ],
  },
  {
    slug: "europe-shoulder-season",
    title: "Europe in shoulder season: better weather, lower fares",
    seoTitle: "Europe in shoulder season: cheaper flights",
    excerpt:
      "Why April, May, September and October are the sweet spot for European city breaks, which weeks to avoid, and the border rules for UK and US travellers.",
    category: "Destinations",
    published: "2026-08-30",
    updated: "2026-10-16",
    photo: photos.guideEurope,
    sections: [
      {
        heading: "What shoulder season means",
        paragraphs: [
          "Shoulder season sits between the busy summer peak and the quiet winter months. In most of Europe that means April to early June and September to October.",
          "The weather is usually mild enough for long days outdoors, attractions are less crowded, and flights and hotels are often cheaper than in July and August. Museums have shorter queues, restaurants are easier to book, and the cities feel more like the places locals live in rather than the places everyone visits at once.",
        ],
      },
      {
        heading: "Why fares are often lower",
        paragraphs: [
          "Air fares follow demand. In July and August, families across Europe and North America travel at the same time, so the cheapest seats sell first and prices climb. Once schools go back, demand falls, and airlines fill the same planes with lower fares.",
          "Shoulder season isn’t cheap every week, though. Easter, the UK half-term weeks in late May and late October, and public holidays in the country you’re visiting can push prices up for a few days. If you’re free to choose, the weeks just after a school holiday are often the best value.",
        ],
        list: [
          "Usually good value: late April after Easter, early June, mid-September, and the start of October",
          "Often busier: Easter week, the late-May and late-October half-terms, and long weekends in the destination country",
          "Worth checking: big events such as trade fairs and marathons, which can fill hotels in a city for a few days",
        ],
      },
      {
        heading: "What the weather is really like",
        paragraphs: [
          "Spring and autumn feel different. In spring, days are getting longer and gardens are in bloom, but the sea is still cool and showers are common, especially in April. In autumn, the sea has had all summer to warm up, so September is often the better month for a beach day in southern Europe, and the evenings are still light enough for dinner outside.",
          "The further south you go, the longer the season lasts. Lisbon, Seville and the Greek islands often stay warm into October, while Paris and Amsterdam can feel cool and damp by then. Check the forecast a week before you go and pack for both a sunny afternoon and a chilly evening.",
        ],
      },
      {
        heading: "Cities at their best in spring and autumn",
        paragraphs: ["A few favourites that suit walking, terraces and day trips:"],
        list: [
          "Lisbon: warm, bright days and easy trips to Sintra and the coast. The hills are much more pleasant to climb outside the summer heat",
          "Rome: comfortable temperatures for the Forum and long dinners outside. Book Colosseum and Vatican time slots in advance, even out of season",
          "Barcelona: beach weather from late May and again in September, minus the summer crowds on Las Ramblas and at the Sagrada Família",
          "Paris: gardens in bloom in spring and golden parks in autumn, with fewer queues at the big museums",
          "Istanbul: ideal for walking between the old city and the Bosphorus, with mild days for ferry rides and rooftop views",
          "Seville and Porto: smaller cities that are very hot in midsummer, and much easier to enjoy in spring or autumn",
        ],
      },
      {
        heading: "Getting the best fare",
        paragraphs: [
          "Search a whole week or two rather than fixed dates, and, when we have recent fares for your route, look at the month view on our route and destination pages to see which days tend to be cheaper. Midweek flights are often lower than Friday and Sunday ones, even out of season.",
          "Compare flying into one city and out of another, for example into Rome and home from Barcelona, using a multi-city search. Trains and short flights link most big European cities, so an open-jaw trip saves you travelling back to where you started. From the UK, check every London airport and your nearest regional airport; from the US, compare a nonstop with a one-stop route through a European hub, which can be much cheaper.",
          "Short flights within Europe are often sold as basic fares that include only a small under-seat bag. If you need a cabin case or a checked bag, add it to the price before you compare, because a fare that looked cheapest can end up costing more than a rival that includes a bag. The same goes for seat selection if you’re travelling with someone and want to sit together.",
        ],
      },
      {
        heading: "Getting around once you’re there",
        paragraphs: [
          "Most big European cities are easy to explore on foot and by public transport, so you rarely need a car for a city break. Many cities sell day or multi-day travel passes, and some have contactless payment on buses and metros. For trips between cities, compare the train with a short flight: once you add the time to get to and from airports, a fast train can be quicker door to door, and it lets you take more luggage.",
        ],
      },
      {
        heading: "Border rules for UK and US travellers",
        paragraphs: [
          "Most of the cities above are in the Schengen area, which includes France, Spain, Portugal and Italy. British and American visitors don’t need a visa for short trips, but can stay for no more than 90 days in any 180-day period across the whole area. Days from earlier trips in the previous 180 days count, so if you travel to Europe often, use the EU’s short-stay calculator before you book.",
          "British passports need to have been issued less than 10 years before the day you arrive, and must be valid for at least three months after the day you plan to leave. Check both dates before you book, especially if your passport is close to 10 years old.",
          "The EU’s Entry/Exit System (EES) is replacing passport stamps. The first time you enter, you may be asked to register at a booth, where your fingerprints and photo are taken; children aged 11 or younger have only their photo taken. Allow extra time at the border on your first trip.",
          "ETIAS, a travel authorisation for visa-free visitors, is not in operation yet and the EU isn’t taking applications. When it starts, it will cost EUR 20, and the EU says it will announce the start date several months ahead. Istanbul is outside the Schengen area and has its own entry rules, so check them separately.",
        ],
      },
      {
        heading: "What to pack",
        paragraphs: [
          "Layers are the answer to changeable weather: a light jumper, a waterproof jacket and comfortable shoes that cope with cobbles and rain. Days are shorter in October than in June, and the clocks go back at the end of October, so plan the sights you most want to see for the morning and early afternoon. Our carry-on checklist covers the rest, if you’d like to travel with just a cabin bag.",
        ],
      },
    ],
    // Checked 16 Oct 2026.
    sources: [
      { label: "GOV.UK: Spain entry requirements (passport validity, 90 days in 180, EES)", url: "https://www.gov.uk/foreign-travel-advice/spain/entry-requirements" },
      { label: "European Commission: Short-stay calculator", url: "https://home-affairs.ec.europa.eu/policies/schengen/border-crossing/short-stay-calculator_en" },
      { label: "European Union: ETIAS", url: "https://travel-europe.europa.eu/en/etias" },
      { label: "GOV.UK: Türkiye entry requirements", url: "https://www.gov.uk/foreign-travel-advice/turkey/entry-requirements" },
    ],
  },
  {
    slug: "carry-on-only-checklist",
    title: "The carry-on only checklist for a two-week trip",
    seoTitle: "Carry-on only checklist for two weeks",
    excerpt:
      "What to pack for two weeks with just a cabin bag, what to leave behind, and the liquids and battery rules at UK and US airports.",
    category: "Packing",
    published: "2026-08-12",
    updated: "2026-10-16",
    photo: photos.guideCarryOn,
    sections: [
      {
        heading: "Check the rules first",
        paragraphs: [
          "Cabin bag allowances vary a lot between airlines and fare types. Some fares include only a small under-seat bag, while others allow a full-size cabin case as well. The size and weight limits are set by your airline, not by the airport, so check them on your provider’s page before you book, so a cheap fare doesn’t become an expensive one at the gate.",
          "Measure your bag with everything packed, including the wheels and handles, and weigh it if your airline has a weight limit. If you’re flying with more than one airline, for example on separate tickets or a codeshare, follow the strictest allowance on the trip.",
        ],
      },
      {
        heading: "Choose the right bag",
        paragraphs: [
          "A soft bag or backpack squeezes into sizers and overhead lockers more easily than a hard case, and usually weighs less when empty, which matters if your airline weighs cabin bags. Hard cases protect fragile things better and are easier to roll through long airports. Whichever you choose, pick one that opens fully, so you can find things without unpacking everything at security.",
          "Your personal item, such as a small backpack or handbag, should hold everything you need during the flight and anything you can’t afford to lose: documents, medicines, keys, electronics and a change of clothes. If your cabin bag is taken to the hold at the gate, the personal item stays with you.",
        ],
      },
      {
        heading: "The checklist",
        paragraphs: ["For two weeks in mild weather, this is plenty:"],
        list: [
          "3–4 tops and 2 pairs of trousers or skirts that all mix and match",
          "1 warm layer and 1 light waterproof jacket",
          "1 pair of comfortable walking shoes worn on the plane, plus light sandals",
          "Underwear and socks for a week; plan one laundry stop",
          "Sleepwear that can double as loungewear, and swimwear if you might need it",
          "A small wash bag with travel-size toiletries (see the liquids rules below)",
          "Medicines in their original packaging, with a copy of any prescription",
          "Chargers, an adapter and a power bank, all in your cabin bag",
          "Passport, travel documents and any visas, kept in your personal item",
          "A reusable water bottle, empty through security and filled up airside",
        ],
      },
      {
        heading: "What to leave behind",
        paragraphs: [
          "Most people pack too much, not too little. Leave out the “just in case” outfit, a second pair of trainers, full-size toiletries and anything you could easily buy at your destination. A hair dryer is rarely needed, because most hotels have one. If you’re not sure about an item, leave it at home: two weeks goes quickly, and you’ll wear your favourite things on repeat anyway.",
        ],
      },
      {
        heading: "Liquids at UK airports",
        paragraphs: [
          "At most UK airports, liquids, gels, creams and pastes in your hand luggage must be in containers of 100ml or less, even if the container is only part full. Where the airport asks for them to be bagged, they go in one transparent, resealable plastic bag of no more than a litre, about 20cm by 20cm, with one bag per person. You’ll need to show the bag at security.",
          "Some UK airports now allow containers of up to 2 litres. Rules differ between airports, so check the airport you’re flying from, any airport where you change planes, and the airport you’re flying home from. When rules differ, pack for the strictest one.",
          "You can take larger containers, up to 2 litres, through security at any UK airport if they’re for essential medical purposes, special dietary requirements, or baby food or milk. Liquids bought airside, such as duty free, are fine if they stay sealed in the security bag with the receipt.",
        ],
      },
      {
        heading: "Liquids at US airports",
        paragraphs: [
          "The TSA allows liquids, aerosols, gels, creams and pastes in containers of 3.4 ounces (100 millilitres) or less, packed in one quart-sized bag. Anything larger goes in your checked bag. Medicines and food for babies and young children are exempt from the limit.",
        ],
      },
      {
        heading: "Power banks and batteries",
        paragraphs: [
          "Power banks and spare lithium batteries must travel in the cabin, never in checked luggage, because a battery fire in the cabin can be spotted and dealt with by the crew. Protect the terminals from short circuits, for example by keeping each battery in its own case or pouch.",
          "Batteries of up to 100 watt hours, which covers phones, tablets and most power banks and laptops, need no approval. Larger batteries of 101 to 160 watt hours need your airline’s approval, and you can carry no more than two of them. In the UK, the CAA also limits you to two power banks per person and says they must not be recharged on board. Airlines can set stricter limits, so check yours before you fly.",
          "If your cabin bag is taken to the hold at the gate, take the power bank and any spare batteries out and keep them with you.",
        ],
      },
      {
        heading: "At the airport",
        paragraphs: [
          "Check in online before you leave home, so you can go straight to security without queueing at a desk. Busy flights often run out of overhead space, and the crew may then take some cabin bags to the hold at the gate. Boarding early helps, and so does a bag small enough to fit under the seat in front if you need to.",
          "If your bag is taken at the gate, take out your passport, medicines, keys, valuables and any batteries first. Allow time to collect the bag at the other end, and keep your bag tag until you have it back.",
        ],
      },
      {
        heading: "Small habits that help",
        paragraphs: [
          "Roll clothes instead of folding them, use packing cubes to keep things organised, and wear your bulkiest items on the plane. Leave a little space for anything you pick up on the way.",
          "Plan a laundry stop halfway through the trip. Many hotels and apartments have a washing machine or a laundry service, and a small bar of travel soap lets you wash a few things in the sink. Clothes that dry quickly, such as merino or synthetic fabrics, make this much easier.",
          "Pack your liquids bag and electronics at the top of your bag, so you can take them out quickly if security asks. Keep a pen in your personal item for any arrival forms.",
        ],
      },
    ],
    // Checked 16 Oct 2026.
    sources: [
      { label: "GOV.UK: Hand luggage restrictions at UK airports", url: "https://www.gov.uk/hand-luggage-restrictions" },
      { label: "GOV.UK: Liquids in hand luggage", url: "https://www.gov.uk/hand-luggage-restrictions/liquids" },
      { label: "TSA: Liquids, aerosols and gels rule (US airports)", url: "https://www.tsa.gov/travel/security-screening/liquids-aerosols-gels-rule" },
      { label: "UK Civil Aviation Authority: Safety advice on what to pack", url: "https://www.caa.co.uk/air-passengers/about-your-trip/baggage/safety-advice-on-what-to-pack/" },
      { label: "FAA: PackSafe, lithium batteries", url: "https://www.faa.gov/hazmat/packsafe/lithium-batteries" },
    ],
  },
];

/** Reading time from the real word count (about 220 words a minute), never a guess. */
export function readingMinutes(g: Guide) {
  const words = [g.excerpt, ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.list ?? [])])].join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const guidesIntro = "Practical advice on when to book, where to go and what to pack.";

export const guideBySlug = Object.fromEntries(guides.map((g) => [g.slug, g])) as Record<string, Guide>;
