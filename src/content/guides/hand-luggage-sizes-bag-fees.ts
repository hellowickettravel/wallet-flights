import { photos } from "../images";
import type { Guide } from "./types";

// Wave 2, post 1 (docs/SEO-CONTENT-PLAN.md). Primary keyword: "airline
// baggage fees comparison". Only figures read on the airline's own page on
// 16 Oct 2026 are quoted (United and American in a browser; Delta and
// Frontier by fetch). UK airline pages (BA, easyJet, Ryanair, Jet2) blocked
// automated reading or sit behind an interactive calculator, so the guide
// tells readers to check them instead of quoting unchecked sizes. Bag fees
// change often, so no fee amounts are given.
export const bagFees: Guide = {
  slug: "hand-luggage-sizes-bag-fees",
  title: "Hand luggage sizes and bag fees: how to stop the extras costing more than the fare",
  seoTitle: "Hand luggage sizes and bag fees by airline",
  excerpt:
    "Personal item, cabin bag or checked bag: what cheap fares include, carry-on sizes for major US airlines, and how to avoid paying more at the airport.",
  topic: "baggage",
  published: "2026-10-16",
  photo: photos.guideBagFees,
  summary: [
    "Many cheap fares include only a small personal item that fits under the seat; a full-size cabin bag or a checked bag costs extra.",
    "The UK Civil Aviation Authority warns that bag fees may be charged per flight rather than per return trip, and usually cost more at the airport than when you book.",
    "United, American and Delta allow a carry-on of up to 22 x 14 x 9 inches (about 56 x 35 x 23 cm) on standard fares.",
    "United’s Basic Economy includes only a personal item on most trips, but a carry-on is allowed across the Atlantic.",
    "Compare the total price with the bags you need, not the headline fare.",
  ],
  sections: [
    {
      heading: "Personal item, cabin bag, checked bag: the three sizes",
      paragraphs: [
        "Airlines sort luggage into three groups, and each airline uses different names for them, which is half the confusion. Once you know which group your bag falls into, comparing fares gets much easier.",
      ],
      table: {
        caption: "The three kinds of bag airlines charge for",
        head: ["Type", "Also called", "Where it goes", "Usually included?"],
        rows: [
          ["Personal item", "Under-seat bag, small bag", "Under the seat in front of you", "Yes, on almost every fare"],
          ["Cabin bag", "Carry-on, hand luggage, large cabin bag", "The overhead locker", "On standard fares; often extra on basic and low-cost fares"],
          ["Checked bag", "Hold luggage, hold bag", "The aircraft hold", "Often extra in economy, especially on short flights"],
        ],
      },
    },
    {
      heading: "Why the cheapest fare often isn’t the cheapest trip",
      paragraphs: [
        "Many airlines now sell economy in tiers, often called basic, standard and flexible, or light, classic and plus. The lowest tier usually includes only a personal item, and sometimes no seat choice or changes. The headline price in a search is usually that lowest tier.",
        "The UK Civil Aviation Authority (CAA) puts it simply: your fare may not include hold luggage, the airline doesn’t automatically add it, and allowances vary across airlines and even destinations on the same airline. Its example is one airline giving 15kg on flights to Tenerife but 23kg to Florida.",
        "So a fare that looks £30 cheaper can end up costing more than a rival that already includes a bag. Before you compare, decide what you’re taking, then compare the total.",
      ],
      tip: "Bag fees may be charged per flight, not per trip. The CAA says paid add-ons can be charged for each sector, so a return trip with one connection each way can mean paying for the same bag four times.",
    },
    {
      heading: "Carry-on sizes for major US airlines",
      paragraphs: [
        "These are the limits each airline publishes on its own website, checked on 16 October 2026. Sizes include wheels and handles.",
      ],
      table: {
        caption: "Carry-on and personal item limits from each airline’s own page, checked 16 October 2026",
        head: ["Airline", "Carry-on (overhead)", "Personal item (under seat)", "Notes"],
        rows: [
          ["[United](https://www.united.com/en/us/fly/baggage/carry-on-bags.html)", "22 x 14 x 9 in (56 x 35 x 23 cm)", "17 x 10 x 9 in (43 x 25 x 22 cm)", "Basic Economy: personal item only on most trips; a carry-on is allowed to South America and across the Atlantic or Pacific"],
          ["[American](https://www.aa.com/i18n/travel-info/baggage/carry-on-baggage.jsp)", "22 x 14 x 9 in (56 x 36 x 23 cm)", "18 x 14 x 8 in (45 x 35 x 20 cm)", "One carry-on plus one personal item"],
          ["[Delta](https://www.delta.com/us/en/baggage/carry-on-baggage)", "22 x 14 x 9 in (56 x 35 x 23 cm), 45 linear inches", "Must fit under the seat", "One carry-on and one personal item free"],
          ["[Frontier](https://www.flyfrontier.com/travel/travel-info/bag-options/)", "24 x 16 x 10 in, up to 35 lb; costs extra", "18 x 14 x 8 in, up to 35 lb; included", "Checked bags up to 40 lb"],
        ],
      },
    },
    {
      heading: "UK and European airlines: where to check",
      paragraphs: [
        "UK and European low-cost airlines change their bag sizes and prices often, and their pages either sit behind an interactive calculator or don’t allow automated checking, so we don’t quote figures we haven’t been able to confirm. Use the airline’s own baggage page or its booking flow, on the day you book:",
      ],
      list: [
        "British Airways: the baggage calculator on ba.com shows the allowance for your cabin and route",
        "easyJet and Ryanair: check which bags your fare includes, the size of the free under-seat bag, and the price of adding a larger cabin bag",
        "Jet2 and TUI: check the allowance shown in your booking before you pack",
        "On a codeshare, the operating airline’s rules usually apply. BA, for example, says the allowance on connecting journeys is generally set by the airline that operates the longest flight",
      ],
    },
    {
      heading: "How to avoid paying at the gate",
      paragraphs: [
        "The CAA says that if your hand luggage is too big or too heavy, you may be required to have it placed in the hold, and this usually carries a charge. It also warns that paying for extra weight at the airport costs more than adding a bag when you book.",
      ],
      ordered: true,
      list: [
        "Measure your bag at home, including wheels and handles, and weigh it if the airline has a weight limit",
        "Add any bag you need when you book, not at the airport",
        "Check the allowance for every flight on your trip, especially if the airlines differ",
        "Keep your personal item small enough to go under the seat, so it isn’t counted as a second cabin bag",
        "Wear your bulkiest clothes and shoes on the plane",
      ],
      tip: "Travelling light is the best defence against fees. Our [carry-on only checklist](/travel-guides/carry-on-only-checklist) shows how to fit two weeks into a cabin bag.",
    },
    {
      heading: "Refunds when bags are delayed or a service isn’t provided",
      paragraphs: [
        "On flights to, from and within the US, the Department of Transportation says you’re entitled to a refund of the bag fee if your checked bag is lost or significantly delayed. Significantly delayed means not delivered within 12 hours of a domestic flight landing, or within 15 hours of an international flight (30 hours if the flight is longer than 12 hours). You need to file a mishandled baggage report with the airline.",
        "You can also get a refund of fees for extras you paid for but didn’t get, such as a seat you didn’t receive or Wi-Fi that didn’t work. Our guide to [your rights when a flight is cancelled or delayed](/travel-guides/flight-cancelled-or-delayed-rights) covers the rest.",
      ],
    },
    {
      heading: "What goes in which bag",
      paragraphs: [
        "Whatever the size, some things must stay with you in the cabin: power banks and spare batteries (never in the hold), medicines, passports and valuables. Liquids in your hand luggage follow the rules of the airport you fly from. See our guides to [power banks on planes](/travel-guides/power-bank-rules-on-planes) and [liquids rules at UK airports](/travel-guides/uk-airport-liquids-rules).",
      ],
    },
  ],
  faqs: [
    {
      q: "What size is a carry-on bag?",
      a: "United, American and Delta all allow 22 x 14 x 9 inches (about 56 x 35 x 23 cm), including wheels and handles. Low-cost and European airlines often have smaller limits or charge for a full-size cabin bag, so check your airline’s page.",
    },
    {
      q: "Does basic economy include a carry-on bag?",
      a: "It depends on the airline and route. United’s Basic Economy includes only a personal item on most trips, but allows a carry-on to South America and across the Atlantic or Pacific.",
    },
    {
      q: "Is it cheaper to pay for bags when booking or at the airport?",
      a: "When booking. The UK Civil Aviation Authority says paying for extra baggage at the airport costs more, and fees may be charged per flight.",
    },
    {
      q: "Can I get my bag fee back if my bag is late?",
      a: "On flights to, from or within the US, yes, if the bag is significantly delayed or lost: 12 hours for domestic flights, 15 hours for international flights, or 30 hours for flights over 12 hours. File a report with the airline.",
    },
    {
      q: "What counts as a personal item?",
      a: "A small bag that fits under the seat in front of you, such as a handbag, laptop bag or small backpack. United allows 17 x 10 x 9 inches and American 18 x 14 x 8 inches.",
    },
  ],
  keywords: ["airline baggage fees comparison", "carry on bag size", "personal item size", "united basic economy carry on", "hand luggage size", "bag fees"],
  sources: [
    { label: "UK Civil Aviation Authority: Checking your baggage allowance", url: "https://www.caa.co.uk/air-passengers/about-your-trip/baggage/checking-your-baggage-allowance/" },
    { label: "United: Carry-on bags", url: "https://www.united.com/en/us/fly/baggage/carry-on-bags.html" },
    { label: "American Airlines: Carry-on bags and size limits", url: "https://www.aa.com/i18n/travel-info/baggage/carry-on-baggage.jsp" },
    { label: "Delta: Carry-on baggage", url: "https://www.delta.com/us/en/baggage/carry-on-baggage" },
    { label: "Frontier: Bag options", url: "https://www.flyfrontier.com/travel/travel-info/bag-options/" },
    { label: "British Airways: Baggage essentials", url: "https://www.britishairways.com/content/information/baggage-essentials" },
    { label: "US Department of Transportation: Refunds (bag fees)", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
  ],
};
