import { guidesEPhotos } from "../photos/guides-e";
import type { Guide } from "./types";

// Batch E, guide 1. Primary keyword: "hidden city ticketing". An informational
// warning, never a tactic. Contract wording is from Delta's U.S. and
// International Contracts of Carriage, opened and read on 6 Nov 2026 (Rule
// 16(A) and 16(C) in the U.S. contract; 15(C) in the international one).
// American Airlines', British Airways' and Lufthansa's conditions could not be
// opened from the build sandbox, so they are not cited. Not verified, so left
// out: other airlines' wording, loyalty-account penalties, court outcomes in
// any country, how often airlines act. The explanation of through-checked bags
// and the alternatives are our own advice and are labelled as such.
export const hiddenCityTicketingRisks: Guide = {
  slug: "hidden-city-ticketing-risks",
  title: "Hidden city ticketing: what it is and why airlines forbid it",
  seoTitle: "Hidden city ticketing: what it is and the risks",
  excerpt:
    "Hidden city ticketing means booking a flight to a city you don’t plan to reach. What airline contracts say about it, the risks, and safer ways to cut a fare.",
  topic: "booking",
  published: "2026-11-06",
  photo: guidesEPhotos.guideHiddenCity,
  summary: [
    "Hidden city ticketing means buying a ticket to a city beyond the one you actually want, and leaving the trip at the connection.",
    "Airline contracts can prohibit it. Delta’s lets it cancel the unused part of the ticket, refuse to let you board or check bags, and charge the full applicable fare.",
    "Under Delta’s terms the rest of the ticket can be cancelled, so a return leg is at risk, and checked bags are the practical problem.",
    "We don’t recommend it. Flexible dates, nearby airports and one-way tickets are allowed ways to look for a lower fare.",
  ],
  sections: [
    {
      heading: "The short answer: it breaks the airline’s contract",
      paragraphs: [
        "Hidden city ticketing, also called point-beyond ticketing, is buying a ticket to a destination you don’t intend to reach because it is cheaper than a ticket to the city where you actually want to go. The traveller gets off at the connecting airport and skips the last flight. This guide explains it so you can recognise it and understand the risk. It is not a how-to, and we don’t recommend it.",
        "The reason to be wary is simple: you agree to the airline’s contract of carriage when you buy a ticket, and some airlines’ contracts, such as Delta’s, say the fare applies only to the journey you ticketed. Breaking the terms can cost you more than the saving. This guide is general information, not legal advice. If you are in a dispute with an airline, take advice specific to your case.",
      ],
      tip: "If a fare looks too good to be true because the destination is further away than the one you want, read the airline’s conditions of carriage before you book. Our advice: if you can’t find a clause that allows it, assume it doesn’t.",
    },
    {
      heading: "How it works, and why it can look cheap",
      paragraphs: [
        "Say you want to fly from city A to city B, and the airline connects through B on the way to city C. Sometimes the A to C ticket is priced lower than A to B, even though it includes the same first flight. A hidden city traveller books A to C and leaves at B.",
        "We don’t explain how to find these fares, and we don’t show them on our pages. The point is the other side of the deal: the airline sold you a single journey with a single price, and it expects you to fly all of it.",
      ],
    },
    {
      heading: "What airlines’ contracts say",
      paragraphs: [
        "Delta’s U.S. Contract of Carriage is plain about it. Rule 16(A) says fares apply only between the points for which they are published, and that tickets may not be issued at a fare published to a more distant point than the points being travelled, even when that produces a lower fare. Rule 16(C) lists “Hidden City/Point Beyond Ticketing” as a prohibited practice, defined as the purchase or usage of a fare from a point before the passenger’s actual origin or to a point beyond the passenger’s actual destination. Delta’s international contract has the same definition.",
        "If a passenger, the ticket purchaser or their agents have done this, Delta reserves the right to cancel any unused portion of the ticket, void any remaining value of it, refuse to let the passenger board or check bags and, if the passenger is allowed to board, charge the Applicable Full Fare.",
        "Other airlines write their own terms, and we have not been able to read them all, so we don’t quote them. The point is that this is a matter of the contract you accept when you buy: check the conditions of carriage of the airline you are booking with.",
      ],
      table: {
        caption: "What Delta’s Contract of Carriage says about hidden city ticketing",
        head: ["Topic", "What the contract says"],
        rows: [
          ["Is it prohibited?", "Yes: listed in Rule 16(C) (Rule 15(C) in the international contract) as a prohibited ticketing practice"],
          ["Cancelling the ticket", "Delta reserves the right to cancel any unused portion and void its remaining value"],
          ["At the airport", "Delta reserves the right to refuse to let the passenger board or check bags"],
          ["If you are allowed to board", "Delta may charge the Applicable Full Fare"],
        ],
      },
    },
    {
      heading: "The risks, one by one",
      paragraphs: [
        "These are the practical ways it can go wrong. The contract wording above is sourced; how an airline applies it in a particular case is up to the airline, so treat the rest as what could happen, not what always does.",
      ],
      list: [
        "The rest of your ticket may be cancelled. Delta’s terms let it cancel any unused portion of the ticket, so a return flight on the same booking is at risk.",
        "You may be refused boarding, or refused bags. Delta’s terms say it may refuse to let you board or check bags. If this happens at the airport, you could be left to buy a new ticket.",
        "You may be asked to pay the full fare. Delta’s terms say that if you are allowed to board it may charge the Applicable Full Fare, which can be more than you saved.",
        "A checked bag goes to the ticketed destination. Our explanation, not from a source: bags are normally checked through to the final destination on your ticket, so with a hidden city booking your bag may go to a city you never meant to visit.",
        "Other penalties may exist. We haven’t read any airline’s loyalty programme terms, so we can’t say whether they add any; read yours.",
      ],
      tip: "Our advice: before you buy any ticket, open the airline’s conditions of carriage and search for “unused”, “coupons” and “prohibited”. If you can’t tell what applies, ask the airline.",
    },
    {
      heading: "Legal ways to pay less",
      paragraphs: [
        "The good news is that most of the savings people look for come from allowed methods. These are our own advice, and none of them breaks a contract.",
        "Search around your dates. Fares vary from day to day, and our guides on the [cheapest day to fly](/travel-guides/cheapest-day-to-fly) and [how to find cheap flights](/travel-guides/how-to-find-cheap-flights) show a step-by-step search routine. The [fare calendar](/fare-calendar) shows prices across a month for routes we cover.",
        "Try nearby airports. A city’s airports can have very different fares and prices to get there. Our guides to [London’s airports](/travel-guides/london-airports-guide) and [New York’s airports](/travel-guides/new-york-airports-guide) explain how to compare them.",
        "Compare one-ways with returns, and consider a connection or a stopover. A connecting itinerary on one ticket is allowed, because you fly every leg. See [direct vs connecting flights](/travel-guides/direct-vs-connecting-flights) for the trade-offs, and [stopover vs layover](/travel-guides/stopover-vs-layover) if you would like to break up a long trip.",
        "Set a price alert and book when your target fare appears. Our [flight price alerts guide](/travel-guides/flight-price-alerts) explains how.",
      ],
    },
    {
      heading: "If you are offered a suspiciously cheap ticket",
      paragraphs: [
        "The cheapest ticket on screen is not always the best deal. Check three things before paying: which airport the ticket ends at, whether it is on one ticket with the connection you want, and what the fare conditions say about skipping flights.",
        "If the answer is that you would be buying a flight you plan to skip, the safest decision is not to book it. Weigh any saving against the chance of a cancelled return or a new ticket bought at the airport.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is hidden city ticketing?",
      a: "Buying a ticket to a city beyond the one you want to reach, because it costs less, and leaving the journey at the connecting city. Airline contracts generally prohibit it.",
    },
    {
      q: "Is hidden city ticketing illegal?",
      a: "We can’t give legal advice. What we can say is that Delta’s contract of carriage prohibits it and gives the airline remedies such as cancelling the unused part of the ticket. Whether it would be treated as anything more than a breach of contract is a question for a lawyer.",
    },
    {
      q: "What happens if you skip the last leg of a flight?",
      a: "Under Delta’s contract, the airline can cancel any unused portion of the ticket and void its remaining value, which puts a return flight on the same booking at risk.",
    },
    {
      q: "Can I check a bag on a hidden city ticket?",
      a: "Bags are normally checked through to the destination on your ticket, which is our understanding of how through-checking works, so a checked bag could go to a city you didn’t plan to visit. Delta’s terms also say it may refuse to let you check bags where the practice has occurred.",
    },
    {
      q: "What are the safer ways to find a cheaper flight?",
      a: "Be flexible on dates, compare nearby airports, check one-way tickets against returns and set a price alert. Our guide to finding cheap flights walks through each step.",
    },
  ],
  sources: [
    { label: "Delta: Contract of Carriage, U.S. (Rule 16: Fares)", url: "https://www.delta.com/us/en/legal/contract-of-carriage-dgr" },
    { label: "Delta: Contract of Carriage, International (Rule 15: Fares)", url: "https://www.delta.com/us/en/legal/contract-of-carriage-igr" },
  ],
  keywords: ["hidden city ticketing", "hidden city flights", "point beyond ticketing", "hidden city ticketing risks", "is hidden city ticketing illegal", "airline conditions of carriage hidden city"],
};
