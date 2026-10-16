import { photos } from "../images";
import type { Guide } from "./types";

// Plan item 4.5 (16 Oct 2026): each guide expanded to about 1,000+ words.
// Rules and figures come only from the official pages in `sources`, each
// opened and read on the date in the comment above it. General advice (how
// fares behave, packing habits) carries no numbers we can't source.
export const carryOnChecklist: Guide = {
  slug: "carry-on-only-checklist",
  title: "The carry-on only checklist for a two-week trip",
  seoTitle: "Carry-on packing list for 2 weeks",
  excerpt:
    "What to pack for two weeks with just a cabin bag, what to leave behind, and the liquids and battery rules at UK and US airports.",
  topic: "baggage",
  published: "2026-08-12",
  updated: "2026-10-16",
  photo: photos.guideCarryOn,
  summary: [
    "Two weeks with only a cabin bag works if you pack for one week and plan a laundry stop.",
    "Check your airline’s size and weight limits first: they differ, and basic fares may include only an under-seat bag.",
    "At most UK and US airports, liquids go in containers of 100ml (3.4oz) or less; some UK airports now allow up to 2 litres.",
    "Power banks and spare lithium batteries must go in your cabin bag, never in checked luggage.",
    "If your bag is taken to the hold at the gate, take out your passport, medicines, valuables and batteries first.",
  ],
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
  faqs: [
    {
      q: "Can I travel for two weeks with just carry-on?",
      a: "Yes. Pack clothes for about a week that mix and match, wear your bulkiest items on the plane, and plan one laundry stop halfway through. Leave out “just in case” outfits and anything you could buy at your destination.",
    },
    {
      q: "What is the liquid limit for hand luggage?",
      a: "At most UK airports and at US airports, each container of liquid, gel, cream or paste must hold 100ml (3.4 ounces) or less, packed in one small clear bag. Some UK airports now allow containers of up to 2 litres, so check every airport on your trip and pack for the strictest one.",
    },
    {
      q: "Can I take a power bank on a plane?",
      a: "Yes, but only in your cabin bag. Power banks up to 100 watt hours need no approval; 101 to 160 watt hours need your airline’s approval, with a limit of two. The UK CAA also limits you to two power banks per person and says they mustn’t be recharged on board.",
    },
    {
      q: "What happens if my cabin bag is taken at the gate?",
      a: "On busy flights the crew may put some cabin bags in the hold. Take out your passport, medicines, keys, valuables and any batteries first, keep the bag tag, and allow time to collect the bag on arrival.",
    },
  ],
  keywords: ["carry-on only packing list", "two weeks carry-on only", "hand luggage liquid rules", "power bank on plane rules", "what to pack in hand luggage"],
  // Checked 16 Oct 2026.
  sources: [
    { label: "GOV.UK: Hand luggage restrictions at UK airports", url: "https://www.gov.uk/hand-luggage-restrictions" },
    { label: "GOV.UK: Liquids in hand luggage", url: "https://www.gov.uk/hand-luggage-restrictions/liquids" },
    { label: "TSA: Liquids, aerosols and gels rule (US airports)", url: "https://www.tsa.gov/travel/security-screening/liquids-aerosols-gels-rule" },
    { label: "UK Civil Aviation Authority: Safety advice on what to pack", url: "https://www.caa.co.uk/air-passengers/about-your-trip/baggage/safety-advice-on-what-to-pack/" },
    { label: "FAA: PackSafe, lithium batteries", url: "https://www.faa.gov/hazmat/packsafe/lithium-batteries" },
  ],
};
