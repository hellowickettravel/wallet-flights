import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, Agent A, guide 4 (docs/BATCH-22-BRIEF.md). Primary keyword:
// "basic economy explained" / "hand luggage only fares". Fare rules from the
// airlines' own pages found with WebSearch on 6 Nov 2026 (British Airways
// seating and FAQs, United seat options, carry-on and refund pages, American's
// Basic Economy page and newsroom, Delta Main Basic); bag fee warning from the
// CAA; 24-hour rule from the US DOT. Fare rules change often, so the guide
// tells readers to check their own fare and gives no fee amounts. The "is it
// worth it" table is our own advice and is labelled so.
export const basicEconomyExplained: Guide = {
  slug: "basic-economy-explained",
  title: "Basic economy explained: what hand-luggage-only fares leave out",
  seoTitle: "Basic economy and hand luggage only fares explained",
  excerpt:
    "Basic economy is the same seat for less, minus bags, seat choice and changes. What each big airline leaves out, and when the cheapest fare is worth it.",
  topic: "booking",
  published: "2026-11-05",
  photo: photos.guideBasicEconomy,
  summary: [
    "Basic economy (BA calls it Basic, Delta calls it Main Basic) puts you in the same cabin as standard economy, but strips out extras.",
    "Expect no checked bag, a seat given at check-in unless you pay, boarding near the end, and few or no changes or refunds.",
    "Hand luggage rules differ: on United, Basic Economy includes only a personal item on most trips, while American’s includes a carry-on.",
    "It’s good value for short trips with a small bag. Our view: if you need a bag, a seat together or flexibility, compare the next fare up first.",
  ],
  sections: [
    {
      heading: "The short answer: same seat, fewer extras",
      paragraphs: [
        "Basic economy is the cheapest fare an airline sells in its economy cabin. You sit in the same seats and get the same service on board; what you lose is everything around the flight. Delta, for example, says there is no difference in the onboard experience between its Basic, Classic and Extra fares. The catch is in the rules: checked bags, choosing a seat, changing your flight and getting money back all cost extra or aren’t allowed.",
        "Airlines use different names, which makes comparing harder. British Airways sells a Basic fare in Euro Traveller, its short-haul economy cabin, United and American call theirs Basic Economy, and Delta now calls its version Delta Main Basic. Low-cost airlines such as easyJet and Ryanair work the same way on every fare: the headline price includes only a small bag, and you add what you need.",
      ],
    },
    {
      heading: "What basic economy leaves out",
      paragraphs: [
        "These are the extras most basic fares drop. Not every airline drops all of them, so the table in the next section shows the main differences.",
      ],
      list: [
        "Checked bags: British Airways’ Basic fare is hand baggage only, and American’s Basic Economy includes no checked bag",
        "Seat choice: BA allocates Basic customers a seat at check-in, 24 hours before departure, unless they pay to choose earlier; Delta and United assign seats at check-in too",
        "Sitting together: Delta warns that on Main Basic you aren’t guaranteed a seat next to your travelling companions, including family",
        "Boarding: American’s Basic Economy usually boards in the last group, and Delta’s Main Basic boards in Zone 8",
        "Changes and refunds: United says Basic Economy tickets can’t be changed; Delta allows a cancellation for a fee, returned as a partial eCredit",
        "Miles and perks: Delta’s Main Basic earns no miles and gives no Sky Club entry",
      ],
      tip: "If you’re travelling as a family or a couple, check the price of choosing seats together before you book basic. Paying for two or three seats can wipe out the saving.",
    },
    {
      heading: "Basic fares at the big airlines",
      paragraphs: [
        "This is a summary of what each airline’s own pages said when we checked in November 2026. Fare rules change often, so read the rules shown when you book.",
      ],
      table: {
        caption: "What the basic fare includes at four big airlines (from each airline’s own pages, November 2026)",
        head: ["Airline", "Fare name", "Cabin bag", "Seat", "Changes"],
        rows: [
          ["British Airways", "Basic", "Hand baggage only; no checked bag", "Allocated at check-in, or pay to choose", "For a fee plus any fare difference; no refund"],
          ["United", "Basic Economy", "Personal item only on most trips; a carry-on is allowed across the Atlantic", "Assigned at check-in, or pay to choose", "Not allowed"],
          ["American", "Basic Economy", "Personal item and a carry-on; no checked bag", "Pay to choose at any time, or assigned free at check-in", "Generally no changes or refunds"],
          ["Delta", "Delta Main Basic", "Check Delta’s carry-on page", "Assigned after check-in, or pay to choose", "Cancel for a fee for a partial eCredit"],
        ],
      },
    },
    {
      heading: "The rules that still protect you",
      paragraphs: [
        "A basic fare doesn’t take away your legal rights. In the US, the Department of Transportation’s 24-hour rule lets you cancel for a full refund within 24 hours of booking, as long as you booked at least seven days before departure, and United’s refund page confirms this applies to Basic Economy. Our guide to the [24-hour cancellation rule](/travel-guides/24-hour-flight-cancellation-rule) explains how to use it.",
        "If your flight is cancelled or badly delayed, the same passenger rights apply whatever you paid. The CAA’s rules on delays and cancellations, covered in our guide to [your rights when a flight is delayed or cancelled](/travel-guides/flight-cancelled-or-delayed-rights), don’t depend on your fare type.",
      ],
    },
    {
      heading: "Is basic economy worth it?",
      paragraphs: [
        "It depends on what you need to take and how sure you are of your plans. This table is our own rule of thumb.",
      ],
      table: {
        caption: "When the basic fare is good value (Wallet Flights’ advice)",
        head: ["Your trip", "Basic fare?", "Why"],
        rows: [
          ["Short break with a small bag", "Yes", "You don’t need the extras, so you keep the saving"],
          ["Solo traveller, any seat is fine", "Yes", "Seat assignment at check-in costs you nothing"],
          ["Family or group who want to sit together", "Compare first", "Paying for several seats may cost more than the next fare up"],
          ["Long trip with a checked bag", "Compare first", "Add the bag fee and check the standard fare"],
          ["Plans that might change", "Usually no", "Changes are limited or not allowed"],
        ],
      },
      tip: "The CAA warns that bag fees may be charged per flight rather than per return trip, and usually cost more at the airport than when you book. Add bags at the time of booking if you know you’ll need them.",
    },
    {
      heading: "How to compare a basic fare properly",
      paragraphs: [
        "Our own approach is to price the trip you’ll actually take, not the headline fare.",
      ],
      ordered: true,
      list: [
        "Decide what bags you need; our [hand luggage sizes and bag fees guide](/travel-guides/hand-luggage-sizes-bag-fees) explains the three bag types",
        "Price the basic fare with those bags and any seats you want",
        "Price the next fare up, which often includes a cabin bag or seat choice",
        "Check the change and refund rules of both",
        "Pick the cheaper total; if they’re close, the more flexible fare is usually worth it",
      ],
      tip: "Travelling light? Our [carry-on only checklist](/travel-guides/carry-on-only-checklist) helps you fit a week into one small bag, which is where basic fares make most sense, such as on [London to Lisbon](/routes/london-to-lisbon) or [New York to London](/routes/new-york-to-london).",
    },
  ],
  faqs: [
    {
      q: "What does basic economy mean?",
      a: "It’s an airline’s cheapest economy fare. You fly in the same cabin as standard economy, but checked bags, seat choice, changes and refunds are limited or cost extra. Each airline sets its own rules.",
    },
    {
      q: "Can I take a carry-on with basic economy?",
      a: "It depends on the airline. American’s Basic Economy includes a carry-on, while United’s includes only a personal item on most trips, though a carry-on is allowed across the Atlantic. Check your airline’s page before you pack.",
    },
    {
      q: "Can I choose my seat on a basic fare?",
      a: "Usually only by paying. British Airways, United and Delta assign basic passengers a seat at check-in unless they buy one earlier, and Delta says you may not sit with your travelling companions.",
    },
    {
      q: "Can I cancel a basic economy ticket?",
      a: "In the US you can cancel for a full refund within 24 hours of booking if you booked at least seven days before departure. After that, it depends on the airline: United doesn’t allow changes, while Delta allows a cancellation for a fee as a partial eCredit.",
    },
    {
      q: "Is BA Basic the same as hand luggage only?",
      a: "Yes. British Airways’ Basic fare is hand baggage only, with a seat allocated at check-in unless you pay to choose earlier. You can add a hold bag for a fee.",
    },
  ],
  sources: [
    { label: "British Airways: Choosing your seat", url: "https://www.britishairways.com/content/information/seating/reserving-your-seat" },
    { label: "British Airways: Make a booking FAQs", url: "https://www.britishairways.com/content/information/help/faqs/make-booking" },
    { label: "United: Carry-on bags", url: "https://www.united.com/en/us/fly/baggage/carry-on-bags.html" },
    { label: "United: Seating options", url: "https://www.united.com/en-ar/seat-options" },
    { label: "United: Refunds", url: "https://www.united.com/ual/en/IL/customer/refund" },
    { label: "American Airlines: Basic Economy fare details", url: "https://www.aa.com/web/i18n/travel-info/experience/seats/basic-economy.html" },
    { label: "Delta: Delta Main Basic", url: "https://www.delta.com/us/en/onboard/onboard-experience/delta-main-basic" },
    { label: "Delta News Hub: New product names and travel experiences", url: "https://news.delta.com/now-booking-delta-new-product-names-and-travel-experiences-flying-fall" },
    { label: "Civil Aviation Authority: Checking your baggage allowance", url: "https://www.caa.co.uk/air-passengers/about-your-trip/baggage/checking-your-baggage-allowance/" },
    { label: "US Department of Transportation: Refunds", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
  ],
  keywords: [
    "basic economy explained",
    "what is basic economy",
    "hand luggage only fares",
    "ba basic fare",
    "can i take a carry on with basic economy",
    "basic economy seat selection",
    "is basic economy worth it",
    "delta main basic",
  ],
};
