import { guidesHPhotos } from "../photos/guides-h";
import type { Guide } from "./types";

// Batch H, guide 3. Primary keyword: "codeshare flights". Sourcing: disclosure
// rule from 14 CFR Part 257 (eCFR) and the US DOT's codeshare-disclosure and
// baggage pages; UK/EU position on the operating carrier from the CAA's
// Regulation 261 text and its summer 2026 travel advice; baggage wording from
// British Airways' and Virgin Atlantic's own pages; alliance founding facts
// from staralliance.com, oneworld.com and skyteam.com; all found with
// WebSearch on 6 Nov 2026. Alliance membership lists change (Star Alliance
// had an exit notice dated 23 June 2026; oneworld added Hawaiian in April
// 2026; SkyTeam has a suspended member), so the guide lists no members and
// sends readers to each alliance's members page. The UK rule for who must
// disclose the operating carrier was not verified, so only the US rule is
// stated. Advice that is ours is labelled "our advice".
export const airlineAlliancesAndCodeshareFlights: Guide = {
  slug: "airline-alliances-and-codeshare-flights",
  title: "Codeshare flights and airline alliances: who actually flies you, and who to call",
  seoTitle: "Codeshare flights: who flies, baggage and your rights",
  excerpt:
    "What a codeshare flight is, how Star Alliance, oneworld and SkyTeam differ, how to find the airline really operating your flight and who is responsible.",
  topic: "booking",
  published: "2026-11-06",
  photo: guidesHPhotos.guideAlliancesCodeshare,
  summary: [
    "A codeshare flight is sold under one airline’s name and flight number but flown by another airline. In the US, rules require the airline operating it to be named, with “Operated by” wording at the point of sale.",
    "An alliance is a partnership between airlines. Star Alliance, oneworld and SkyTeam each publish their current members on their own sites.",
    "Find the operating carrier on your booking confirmation or the first results screen. It is the airline whose aircraft, crew and airport staff you will meet.",
    "For delays and cancellations, the operating airline is the one the rules put the duty on, and for UK arrivals the CAA says its nationality matters.",
    "For baggage, British Airways and Virgin Atlantic each say the marketing carrier’s rules decide the allowance in the cases their terms describe, so read the terms on your ticket.",
  ],
  sections: [
    {
      heading: "What a codeshare flight is",
      paragraphs: [
        "On a codeshare flight, one airline (the marketing carrier) sells seats under its own flight number on a plane that another airline (the operating carrier) flies. You may buy a ticket from one airline, see its name and flight number on the booking, and then board an aircraft painted in a different airline’s colours.",
        "The US rule in 14 CFR Part 257 says that where the flight’s designator code is not that of the airline operating it, the written notice at the point of sale must say “Operated by” followed by the operating airline’s name. The US Department of Transportation (DOT) says that the disclosure must appear on the first screen of a website after an itinerary search, not behind a pop-up or link, and that ticket agents have to name the operating carrier when selling by phone or in person.",
        "We could not verify the equivalent UK rule on one of the regulator’s pages, so we do not state it. If you book a codeshare in the UK and the operator is unclear, ask the airline or agent before you pay.",
      ],
    },
    {
      heading: "Codeshare is not the same as an alliance",
      paragraphs: [
        "An alliance is a partnership between airlines. Star Alliance says it was founded in 1997 by five airlines as the first global alliance, that its member airlines run the flights and customer service, and that each member runs its own frequent flyer programme. oneworld says it was founded on 1 February 1999 by American Airlines, British Airways, Cathay Pacific and Qantas. SkyTeam says it was founded in 2000 by Aeromexico, Air France, Delta and Korean Air.",
        "Memberships change. Alliance sites show their current members, including airlines that are suspended or leaving, so check the members page of [Star Alliance](https://www.staralliance.com/en/members), [oneworld](https://www.oneworld.com/members) or [SkyTeam](https://www.skyteam.com/en/about/our-members) rather than trusting a list in an article, including ours. Star Alliance also has “connecting partners” that are not members.",
        "Our explanation: codeshare is a way of selling seats, while an alliance is a wider partnership. Airlines in the same alliance often codeshare, but the two are not the same thing, and an airline outside any alliance can codeshare as well.",
      ],
      table: {
        caption: "Codeshare and alliance compared (our summary)",
        head: ["", "Codeshare", "Alliance"],
        rows: [
          ["What it is", "A seat sold under one airline’s flight number on another airline’s plane", "A partnership between airlines, such as Star Alliance, oneworld or SkyTeam"],
          ["Where you see it", "On your booking: “Operated by …”", "On the alliance and airline websites"],
          ["Where to check members", "Not applicable", "The alliance’s own members page"],
          ["Affects", "Who flies you, and which terms apply to your ticket", "How member airlines cooperate; Star Alliance says each member runs its own frequent flyer programme"],
        ],
      },
    },
    {
      heading: "How to find the operating carrier on your booking",
      paragraphs: [
        "Look for “Operated by” next to each flight on your confirmation, your e-ticket and the first results screen.",
      ],
      list: [
        "Read each flight on the confirmation, not just the first, because a single trip can mix airlines",
        "Search the flight number on the operating airline’s website to see what it says about check-in and baggage for that flight",
        "On the day, check the terminal and check-in desk for the operating airline, not just the airline that sold you the ticket",
      ],
      tip: "Our advice: before you pay, note the operating carrier for each flight and look up its baggage and check-in pages. If the booking does not name one, ask the airline or agent in writing and keep the answer.",
    },
    {
      heading: "What it means for baggage",
      paragraphs: [
        "Which baggage rules apply is not the same on every ticket. British Airways says that when a journey combines British Airways and other airlines’ codes, the allowance is decided by the most significant marketing carrier under IATA Resolution 302. Virgin Atlantic’s terms say that on a codeshare it, as the marketing carrier, applies its own baggage allowance, and also tell passengers to check the operating airline’s rules on accepting baggage.",
        "DOT’s baggage page for US travel says the same baggage allowances and fees should apply across a journey, and that airlines have to disclose differences in optional service fees. For travel touching the US, check the DOT page and the contract of carriage of the airline that sold you the ticket.",
        "For the allowance itself, our [checked baggage allowances guide](/travel-guides/checked-baggage-allowances) explains the common limits. If a bag does not arrive, our [lost or delayed luggage guide](/travel-guides/lost-or-delayed-luggage) covers what to do.",
      ],
    },
    {
      heading: "Check-in and who to contact",
      paragraphs: [
        "We found no official page that gives a single rule for who to contact or whose check-in deadline applies, because it varies by airline, so read the pages of both airlines and your ticket.",
        "Our advice: contact the airline that sold the ticket about changes and refunds, and the operating airline about the flight itself on the day, such as bag-drop timing and delays, unless either tells you otherwise. If you booked through an agent, they are your first call for changes made before you travel.",
      ],
      tip: "Our advice: save the operating airline’s app or phone number before you fly, and check the check-in deadline on its page, as set out in our guide to [online check-in and boarding passes](/travel-guides/online-check-in-and-boarding-passes).",
    },
    {
      heading: "Your rights if the flight is delayed or cancelled",
      paragraphs: [
        "The UK and EU passenger-rights rules place their duties on the operating carrier. The CAA’s summer 2026 travel advice says fixed-sum compensation for flights arriving in the UK is covered for UK or EU airlines but not for other airlines, so on a codeshare it matters which airline operates the flight and where it is based.",
        "If your codeshare is a connection on one ticket, the EU’s interpretative guidelines on the Regulation say an operating airline that flew any leg of the connection can be responsible for compensation, even if the other airline caused the delay. Read our guide to [your rights when a flight is delayed or cancelled](/travel-guides/flight-cancelled-or-delayed-rights) for the rules in each country, and our [direct versus connecting flights guide](/travel-guides/direct-vs-connecting-flights) for how connections are treated. This is general information, not legal advice.",
      ],
    },
    {
      heading: "Booking tips for codeshares",
      paragraphs: [
        "Our advice: when two fares look alike, compare the operating airline as well as the price, because the aircraft, seat and service come from the operator. On a route such as [London to New York](/routes/london-to-new-york), check the “Operated by” line on every result before you compare prices.",
        "If you are travelling from or to the US, our guide to [the 24-hour cancellation rule](/travel-guides/24-hour-flight-cancellation-rule) explains what you can change after booking.",
      ],
    },
  ],
  faqs: [
    {
      q: "What does a codeshare flight mean?",
      a: "It is a flight sold under one airline’s flight number but flown by another airline. The booking should say “Operated by” and name the airline that flies it.",
    },
    {
      q: "How do I know which airline is flying my codeshare flight?",
      a: "Look for “Operated by” on your booking confirmation and e-ticket. In the US, the DOT says the operating carrier has to be disclosed on the first screen after an itinerary search.",
    },
    {
      q: "Whose baggage rules apply on a codeshare?",
      a: "It depends on the airlines and the route. British Airways says the most significant marketing carrier decides, and Virgin Atlantic says its own allowance applies as marketing carrier. Read the terms on your ticket.",
    },
    {
      q: "Who do I claim from if my codeshare flight is delayed?",
      a: "Under UK and EU rules the duty falls on the operating airline. The CAA says that for flights arriving in the UK, fixed-sum compensation covers UK or EU airlines but not other airlines.",
    },
    {
      q: "Is an alliance the same as a codeshare?",
      a: "No. An alliance is a partnership between airlines, such as Star Alliance, oneworld or SkyTeam. A codeshare is a way of selling a seat on a partner’s flight.",
    },
  ],
  sources: [
    { label: "eCFR: 14 CFR Part 257, Disclosure of code-sharing arrangements and long-term wet leases", url: "https://www.ecfr.gov/current/title-14/chapter-II/subchapter-A/part-257" },
    { label: "US DOT: Codeshare disclosure", url: "https://www.transportation.gov/airconsumer/codeshare-disclosure" },
    { label: "US DOT: Baggage", url: "https://www.transportation.gov/airconsumer/baggage" },
    { label: "UK CAA: Regulation (EC) No 261/2004 text", url: "https://www.caa.co.uk/media/wbanxved/261-2004.pdf" },
    { label: "EU: Interpretative guidelines on Regulation (EC) No 261/2004", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:C_202405687" },
    { label: "UK CAA: Consumer travel advice, summer 2026", url: "https://www.caa.co.uk/newsroom/news/consumer-travel-advice-summer-2026/" },
    { label: "British Airways: Partners and alliances", url: "https://www.britishairways.com/content/en/us/information/partners-and-alliances" },
    { label: "Virgin Atlantic: Conditions of carriage", url: "https://help.virginatlantic.com/content/dam/conditions-of-carriage/Revision%2053%20(25%20Mar%202025).pdf" },
    { label: "Star Alliance: Member airlines", url: "https://www.staralliance.com/en/members" },
    { label: "oneworld: Members", url: "https://www.oneworld.com/members" },
    { label: "SkyTeam: Our members", url: "https://www.skyteam.com/en/about/our-members" },
  ],
  keywords: ["codeshare flights", "what is a codeshare flight", "airline alliances", "star alliance oneworld skyteam", "operated by codeshare meaning", "codeshare baggage rules", "codeshare flight delayed who is responsible"],
};
