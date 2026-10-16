import { photos } from "../images";
import type { Guide } from "./types";

// Wave 1, post 1 (docs/SEO-CONTENT-PLAN.md). Primary keyword: "power bank on
// plane". Every rule and figure comes from the official pages in `sources`,
// read on 16 Oct 2026. Airline-specific rules aren't listed: each airline can
// set stricter limits, and we tell readers to check theirs.
export const powerBankRules: Guide = {
  slug: "power-bank-rules-on-planes",
  title: "Can you take a power bank on a plane? The 2026 rules for UK and US flights",
  seoTitle: "Power bank rules on planes in 2026",
  excerpt:
    "Power banks go in your hand luggage, never your checked bag. The 2026 UK limits, the US rules, how to work out watt-hours, and using one on board.",
  topic: "baggage",
  published: "2026-10-16",
  photo: photos.guidePowerBank,
  summary: [
    "Yes, but only in your hand luggage. Power banks and spare lithium batteries are banned from checked bags in both the UK and the US.",
    "Since 27 March 2026, the UK Civil Aviation Authority limits you to two power banks each.",
    "Up to 100 watt-hours (Wh) needs no approval; 100 to 160 Wh needs your airline’s approval; anything bigger can’t fly.",
    "In the UK, power banks must not be recharged on board, and shouldn’t be used to charge other devices during the flight.",
    "Airlines can be stricter than the law, so check your airline’s rules before you pack.",
  ],
  sections: [
    {
      heading: "The short version: cabin bag only",
      paragraphs: [
        "You can take a power bank on a plane, but it has to travel with you in the cabin. The US Transportation Security Administration (TSA) says power banks containing a lithium-ion battery must be packed in carry-on bags, and that spare lithium batteries, including power banks and phone chargers, are prohibited in checked luggage. The UK rules say the same: a power bank must be carried in your hand luggage.",
        "The reason is fire safety. Lithium batteries can overheat, and if that happens in the cabin, the crew can see it and deal with it. In the hold, nobody would know until it was too late.",
        "So the power bank goes in your backpack, handbag or cabin case, not in the suitcase you check in. The same goes for spare camera batteries and any loose lithium batteries.",
      ],
    },
    {
      heading: "What changed in the UK on 27 March 2026",
      paragraphs: [
        "The UK Civil Aviation Authority (CAA) introduced new rules for power banks on flights, effective from 27 March 2026. They apply to airlines regulated in the UK, and other airlines flying from the UK publish similar limits in their own conditions.",
      ],
      list: [
        "A maximum of two power banks per person",
        "They must be carried in your hand luggage",
        "Power banks up to 100 Wh are allowed without the airline’s approval",
        "Power banks over 100 Wh and up to 160 Wh need the airline’s approval",
        "They must not be recharged on board the aircraft",
        "They should not be used to charge other devices on board",
        "Each one must be individually protected when not in use, so the terminals can’t short-circuit",
      ],
      tip: "If your airline’s own page is stricter than this list, follow the airline. Its rules are the ones the crew will apply on the day.",
    },
    {
      heading: "How to work out watt-hours from mAh",
      paragraphs: [
        "The limits are in watt-hours (Wh), but most power banks are sold by milliamp-hours (mAh). Many power banks print the Wh rating on the case, usually in small text next to the input and output details. If yours does, use that figure.",
        "If it only shows mAh, you can work it out: multiply the mAh by the battery’s voltage, then divide by 1,000. Most power banks use cells rated at 3.6 or 3.7 volts, and the voltage is usually printed on the label too.",
      ],
      table: {
        caption: "Approximate watt-hours for common power bank sizes, at 3.7 volts",
        head: ["Capacity", "Sum (mAh × 3.7 ÷ 1,000)", "Watt-hours", "Airline approval needed?"],
        rows: [
          ["10,000 mAh", "10,000 × 3.7 ÷ 1,000", "37 Wh", "No"],
          ["20,000 mAh", "20,000 × 3.7 ÷ 1,000", "74 Wh", "No"],
          ["26,800 mAh", "26,800 × 3.7 ÷ 1,000", "about 99 Wh", "No, but it’s close to the limit, so check the label"],
          ["30,000 mAh", "30,000 × 3.7 ÷ 1,000", "111 Wh", "Yes (100 to 160 Wh)"],
          ["50,000 mAh", "50,000 × 3.7 ÷ 1,000", "185 Wh", "Not allowed on passenger flights"],
        ],
      },
      tip: "Security staff need to be able to read the rating. If the label has worn off or the power bank has no markings, it may be refused, so take a clearly labelled one.",
    },
    {
      heading: "UK and US rules side by side",
      paragraphs: [
        "The broad rules are the same on both sides of the Atlantic: cabin only, with limits at 100 Wh and 160 Wh. The details differ a little, mainly on how many you can take.",
      ],
      table: {
        caption: "Power bank rules on UK and US flights",
        head: ["", "UK (Civil Aviation Authority)", "US (TSA and FAA)"],
        rows: [
          ["Where it goes", "Hand luggage only", "Carry-on bags only; banned in checked bags"],
          ["Up to 100 Wh", "Allowed without approval", "Allowed without approval"],
          ["100 to 160 Wh", "Airline approval needed", "Airline approval needed, and no more than two of these larger batteries"],
          ["How many", "No more than two power banks per person", "No more than two of the larger 100 to 160 Wh batteries; your airline may limit the rest"],
          ["Charging the power bank on board", "Not allowed", "Set by your airline"],
          ["Protecting the terminals", "Required", "Required"],
        ],
      },
    },
    {
      heading: "Can you use a power bank during the flight?",
      paragraphs: [
        "Under the CAA rules, you must not recharge a power bank on board, for example from the seat’s USB socket, and you shouldn’t use it to charge your phone or other devices during the flight either. Some airlines go further and ask you not to use power banks at all once you’re on board, or to keep them where you can see them rather than in the overhead locker.",
        "In the US, there is no single federal rule on using a power bank in your seat, so it depends on your airline’s policy. Listen to the cabin crew’s announcements: if they ask you to stop using or charging a device, do so.",
        "The simple way round it is to charge your phone fully before you board and use the seat power, where there is some, for the phone itself rather than the power bank.",
      ],
    },
    {
      heading: "Packing a power bank safely",
      paragraphs: [
        "A few habits make it easy at security and safe on board.",
      ],
      list: [
        "Keep it in your hand luggage, somewhere you can get to it quickly if security asks to see it",
        "Cover the ports or keep it in its own pouch, so nothing metal can touch the terminals",
        "Don’t pack a power bank that is damaged, swollen or gets hot when you use it",
        "Switch off any power bank with an on/off button before you board",
        "Take no more than two, and leave the oversized ones at home",
      ],
    },
    {
      heading: "If your cabin bag is taken at the gate",
      paragraphs: [
        "On busy flights, the crew may ask to put some cabin bags in the hold when the overhead lockers are full. If that happens, take the power bank and any spare batteries out first and keep them with you, because they aren’t allowed in the hold. Do the same with your passport, medicines, keys and valuables. Our [carry-on only checklist](/travel-guides/carry-on-only-checklist) has more on packing so this takes seconds rather than minutes.",
      ],
    },
    {
      heading: "Other batteries: laptops, cameras and vapes",
      paragraphs: [
        "Laptops, tablets, phones and cameras contain lithium batteries too. When the battery is inside the device, keep the device in your hand luggage where you can; some airlines also accept devices in checked bags if they’re switched off and protected, so check yours. Spare camera and drone batteries count as spare lithium batteries, so they follow the power bank rules: hand luggage only, with the terminals protected.",
        "Electronic cigarettes and vapes must also travel in your hand luggage, and you mustn’t use them on board.",
        "For liquids, the other rule that catches people out at security, see our guide to [liquids rules at UK airports](/travel-guides/uk-airport-liquids-rules).",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I take a 20,000 mAh power bank on a plane?",
      a: "Yes. At 3.7 volts, a 20,000 mAh power bank is about 74 Wh, which is under the 100 Wh limit, so it needs no approval. It must go in your hand luggage.",
    },
    {
      q: "Can a power bank go in checked luggage?",
      a: "No. Power banks and spare lithium batteries are banned from checked bags on UK and US flights. They must travel in the cabin with you.",
    },
    {
      q: "How many power banks can I take on a plane?",
      a: "On flights under UK rules, no more than two per person since 27 March 2026. In the US, the FAA allows no more than two larger batteries of 100 to 160 Wh; airlines can set their own limits on smaller ones.",
    },
    {
      q: "Can I use my power bank on the plane?",
      a: "Under UK rules, you must not recharge it on board and shouldn’t use it to charge other devices. In the US it depends on the airline, and some airlines restrict use during the flight, so check before you fly.",
    },
    {
      q: "What size power bank is not allowed on a plane?",
      a: "Anything over 160 Wh can’t be carried on passenger flights. Between 100 and 160 Wh you need the airline’s approval first.",
    },
  ],
  keywords: ["power bank on plane", "can you take a power bank on a plane", "power bank on plane uk", "power bank limit flight", "power bank rules 2026", "tsa power bank rules"],
  // Read on 16 Oct 2026. FAA figures as read for the carry-on checklist the same day.
  sources: [
    {
      label: "UK Civil Aviation Authority: Changes to rules on lithium batteries and power banks (from 27 March 2026)",
      url: "https://www.caa.co.uk/commercial-industry/airlines/dangerous-goods/changes-to-rules-on-the-carriage-of-lithium-cellsbatteries-and-power-banks/",
    },
    { label: "TSA: Power banks", url: "https://www.tsa.gov/travel/security-screening/whatcanibring/items/power-banks" },
    { label: "FAA: PackSafe, lithium batteries", url: "https://www.faa.gov/hazmat/packsafe/lithium-batteries" },
    { label: "UK Civil Aviation Authority: Safety advice on what to pack", url: "https://www.caa.co.uk/air-passengers/about-your-trip/baggage/safety-advice-on-what-to-pack/" },
  ],
};
