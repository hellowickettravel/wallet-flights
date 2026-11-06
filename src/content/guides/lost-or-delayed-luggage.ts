import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, guides agent C. Primary keywords: "lost luggage compensation",
// "delayed baggage". Rules from the Montreal Convention (full text on the CAA
// site), the UK Carriage by Air (Revision of Limits of Liability under the
// Montreal Convention) Order 2025, the CAA's baggage page and the US DOT's
// baggage and refunds pages, found on 5 to 6 Nov 2026. We describe the rules
// and point to the regulators; we never promise an outcome.
export const lostOrDelayedLuggage: Guide = {
  slug: "lost-or-delayed-luggage",
  title: "Lost or delayed luggage: what to do and how much you can claim",
  seoTitle: "Lost or delayed luggage: your compensation rights",
  excerpt:
    "Your bag didn’t arrive? What to do at the airport, the deadlines for claiming, and the limits under the Montreal Convention and US rules, from the regulators.",
  topic: "rights",
  published: "2026-11-05",
  photo: photos.guideLostLuggage,
  summary: [
    "Report a missing bag at the airport before you leave baggage reclaim, and get a written report with a reference number.",
    "On international flights, the Montreal Convention makes the airline liable for lost, damaged or delayed bags, up to 1,519 Special Drawing Rights per passenger.",
    "Claim in writing within 21 days of getting a delayed bag back, or within 7 days for damage; a bag still missing after 21 days can be treated as lost.",
    "On US domestic flights, airlines can’t limit their liability below $4,700 per passenger, and a significantly delayed bag earns a refund of the bag fee.",
    "Keep itemised receipts for essentials you buy while you wait; airlines usually pay back reasonable costs, not new wardrobes.",
  ],
  sections: [
    {
      heading: "First, at the airport: report it before you leave",
      paragraphs: [
        "If your bag doesn’t come off the carousel, go to the airline’s baggage desk, usually in the reclaim hall, before you go through customs or leave the airport. The desk is often run by a handling agent on the airline’s behalf.",
      ],
      ordered: true,
      list: [
        "Report the missing bag and fill in a Property Irregularity Report (PIR). Keep your copy and the reference number",
        "Give a description of the bag, your baggage tag number and a delivery address and phone number for the rest of your trip",
        "Ask what the airline will pay for while you wait, and whether it has a limit per day",
        "Keep your boarding pass and baggage tag receipt: you’ll need them for the claim",
        "Track the bag using the reference number on the airline’s or handling agent’s website",
      ],
      tip: "The CAA says to keep your PIR safe, as you may need copies if you later take your complaint to it. Take a photo of it straight away.",
    },
    {
      heading: "Which rules cover your bag?",
      paragraphs: [
        "UK261, the rule that gives fixed compensation for delayed and cancelled flights, doesn’t cover baggage. For bags, the main law on international flights is the Montreal Convention, an international treaty that the UK, the EU, the US and most other countries have signed. The UK applies it to flights by UK airlines too. On flights within the US, the Department of Transportation (DOT) sets the rules.",
      ],
      table: {
        caption: "Who covers lost, delayed and damaged bags, and the limits they set",
        head: ["Your flight", "Main rules", "Most the airline has to pay", "Where to escalate"],
        rows: [
          ["International, e.g. London to New York", "Montreal Convention", "1,519 Special Drawing Rights per passenger, unless you declared a higher value", "UK: the CAA or the airline’s ADR body; US: the DOT"],
          ["UK airline, any route", "Montreal Convention, applied by UK law", "1,519 Special Drawing Rights per passenger", "The airline’s ADR body, or the CAA"],
          ["Within the US, e.g. New York to Miami", "US DOT rules (14 CFR Part 254)", "At least $4,700 per passenger; airlines may pay more", "The DOT"],
        ],
      },
      tip: "Special Drawing Rights (SDRs) are a basket of currencies set by the IMF, so their value in pounds changes daily. The DOT puts 1,519 SDRs at about $2,175. The limit is a ceiling, not a fixed payout: you’re paid for your actual, provable loss up to that amount.",
    },
    {
      heading: "Delayed bags: what you can claim",
      paragraphs: [
        "Most missing bags turn up within a few days. While you wait, the airline is liable for the damage caused by the delay, which in practice means reasonable costs of replacing essentials. The CAA gives toiletries, underwear and laundry costs as examples when you’re away from home.",
        "Keep a full, itemised receipt for everything you buy, not just a card slip, and buy only what you need. The CAA notes that airlines don’t automatically accept claims for wider losses caused by the delay. If you need something more expensive, such as a suit for a wedding, ask the airline before you buy it.",
        "Once the bag is delivered, you have 21 days to claim in writing. That deadline comes from the Montreal Convention itself, and missing it can end your claim, so don’t wait for the end of your trip.",
        "On flights to, from or within the US, you’re also entitled to a refund of any fee you paid to check the bag if it’s significantly delayed. The DOT defines that as not delivered within 12 hours of a domestic flight landing, or 15 hours of an international flight landing (30 hours if the flight is over 12 hours). You must file a mishandled baggage report with the airline first.",
      ],
    },
    {
      heading: "When a delayed bag becomes a lost bag",
      paragraphs: [
        "Under the Montreal Convention, if your checked bag hasn’t arrived 21 days after the date it should have, the airline can be treated as having lost it, and you can claim for the bag and its contents. On US domestic flights, the DOT says airlines must also refund the checked bag fee for a lost bag.",
        "A claim for a lost bag works like an insurance claim. List every item with its approximate value and age, and send any receipts or photos you have. Airlines usually pay the depreciated value of older items, not the cost of new ones, and on US domestic flights the DOT says airlines don’t have to pay for items their contracts of carriage exclude, which often include valuables such as jewellery and electronics. The DOT notes that on international journeys, the Montreal Convention doesn’t allow airlines to exclude whole categories of items, though the overall limit still applies.",
      ],
      tip: "Our advice: before you fly, photograph the inside of your packed case and keep receipts for anything valuable. It makes a lost bag claim much easier to prove.",
    },
    {
      heading: "Damaged bags and missing items",
      paragraphs: [
        "If your bag arrives damaged, or something has been taken from it, report it at the baggage desk before you leave the airport if you can, and photograph the damage. The Montreal Convention gives you 7 days from receiving the bag to complain to the airline in writing.",
        "Airlines often exclude wear and tear, such as scuffs, broken straps or damaged wheels on an overpacked case, so read the airline’s conditions of carriage. Fragile and valuable items are best carried in the cabin.",
      ],
    },
    {
      heading: "How to claim, and where to go if the airline says no",
      ordered: true,
      paragraphs: [
        "On a journey with several airlines, the Montreal Convention lets you claim from the first airline, the last one, or the one whose flight lost or damaged the bag; the last airline is usually simplest, as you report the bag to it on arrival. You don’t need a claims company.",
      ],
      list: [
        "Send a written claim using the airline’s online form or by email, within the deadline: 21 days for delay, 7 days for damage",
        "Attach your PIR, boarding pass, baggage tag and itemised receipts",
        "Keep copies of everything you send and the date you sent it",
        "UK airlines and flights: if the airline rejects your claim or hasn’t replied within eight weeks, go to its alternative dispute resolution (ADR) body or, if it doesn’t have one, the CAA",
        "US flights: file a complaint with the US Department of Transportation",
        "Court action under the Montreal Convention must start within two years of the flight",
      ],
    },
    {
      heading: "Travel insurance and how to avoid it happening",
      paragraphs: [
        "Travel insurance can cover what the airline doesn’t, such as valuables or costs above the airline’s limit. Check whether your policy pays for essentials during a delay, and whether you must claim from the airline first.",
        "Our advice, to cut the risk: keep medicines, chargers and a change of clothes in your hand luggage, leave enough time for bags to make a connection (see [how long a layover you need](/travel-guides/how-long-a-layover)), and avoid self-transfer itineraries where you have to recheck bags. Power banks must stay in the cabin anyway; see our guide to [power bank rules](/travel-guides/power-bank-rules-on-planes). Our [checked baggage allowances guide](/travel-guides/checked-baggage-allowances) covers weights and sizes, and [your rights when a flight is cancelled or delayed](/travel-guides/flight-cancelled-or-delayed-rights) covers the flight itself. Flying [London to New York](/routes/london-to-new-york)? Both the Montreal Convention and US DOT rules can apply.",
      ],
    },
  ],
  faqs: [
    {
      q: "How much compensation do you get for lost luggage?",
      a: "On international flights, the Montreal Convention lets airlines limit what they pay to 1,519 Special Drawing Rights per passenger (about $2,175, the DOT says). On US domestic flights the limit can’t be lower than $4,700 per passenger. You’re paid your actual loss up to that amount, usually at depreciated value.",
    },
    {
      q: "How long does an airline have to find lost luggage?",
      a: "Under the Montreal Convention, if a checked bag hasn’t arrived 21 days after it should have, you can treat it as lost and claim for the bag and its contents.",
    },
    {
      q: "What can I claim if my bag is delayed?",
      a: "Reasonable costs of essentials while you wait, such as toiletries, underwear and laundry. Keep itemised receipts and claim in writing within 21 days of getting the bag back. On US flights, you can also get the bag fee refunded if the delay is significant.",
    },
    {
      q: "Does UK261 cover lost luggage?",
      a: "No. UK261 covers delayed, cancelled and overbooked flights. Lost, delayed and damaged bags on international flights are covered by the Montreal Convention instead.",
    },
    {
      q: "What is the time limit for a damaged bag claim?",
      a: "Seven days from receiving the bag, in writing, under the Montreal Convention. Report it at the airport before you leave if you can, and photograph the damage.",
    },
  ],
  sources: [
    { label: "UK Civil Aviation Authority: Lost, delayed or damaged baggage", url: "https://www.caa.co.uk/air-passengers/about-your-trip/baggage/lost-delayed-or-damaged-baggage/" },
    { label: "Montreal Convention 1999, full text (published by the CAA)", url: "https://www.caa.co.uk/media/ay3jntvg/mc99-full-text.pdf" },
    { label: "The Carriage by Air (Revision of Limits of Liability under the Montreal Convention) Order 2025", url: "https://www.legislation.gov.uk/uksi/2025/123/made" },
    { label: "US Department of Transportation: Lost, delayed or damaged baggage", url: "https://www.transportation.gov/lost-delayed-or-damaged-baggage" },
    { label: "US Department of Transportation: Refunds (bag fees)", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
    { label: "Federal Register: Domestic baggage liability limit raised to $4,700 (24 October 2024)", url: "https://www.govinfo.gov/content/pkg/FR-2024-10-24/html/2024-23588.htm" },
  ],
  keywords: ["lost luggage compensation", "delayed baggage compensation", "lost luggage what to do", "montreal convention baggage", "delayed baggage claim", "damaged luggage claim", "property irregularity report", "dot lost baggage rules"],
};
