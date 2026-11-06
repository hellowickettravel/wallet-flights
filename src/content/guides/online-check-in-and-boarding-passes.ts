import { guidesHPhotos } from "../photos/guides-h";
import type { Guide } from "./types";

// Batch H, guide 1. Primary keyword: "online check in". Sourcing notes: the
// airline pages below were found with WebSearch on 6 Nov 2026 (WebFetch could
// not reach the airline hosts from the build sandbox, so each figure is the
// one the search returned from that airline's own page). British Airways,
// American Airlines, easyJet and Ryanair only. Ryanair's opening time is left
// out because its own pages disagree (24 hours in its terms, 72 hours on a help
// page); American's online closing time is left out because the figures found
// conflicted. Ryanair's airport fee amount is left out; the guide sends readers
// to its fee table. Advice that is ours is labelled "our advice".
export const onlineCheckInAndBoardingPasses: Guide = {
  slug: "online-check-in-and-boarding-passes",
  title: "Online check-in and boarding passes: when it opens, when it closes and what to do next",
  seoTitle: "Online check-in: times, boarding passes and bag drop",
  excerpt:
    "When online check-in opens and closes at British Airways, American, easyJet and Ryanair, mobile or printed boarding passes, bag drop and passport checks.",
  topic: "flying",
  published: "2026-11-06",
  photo: guidesHPhotos.guideOnlineCheckIn,
  summary: [
    "Online check-in opens 24 hours before departure at British Airways and American, and 30 days before at easyJet. Opening and closing times differ by airline and route, so read your own booking.",
    "Online check-in closing time is not the same as the airport deadline for bags. British Airways closes airport check-in at Heathrow and Gatwick 60 minutes before long-haul and 45 minutes before short-haul flights.",
    "Most airlines accept a mobile boarding pass, but not all airports do. Ryanair is now digital only, with a short list of exceptions.",
    "On some airlines, not checking in online costs money at the airport. Ryanair’s help centre says so; the other airlines here did not on the pages we found.",
    "On international flights, expect a passport or visa check, either during online check-in or before security.",
  ],
  sections: [
    {
      heading: "The short answer",
      paragraphs: [
        "Online check-in is the step where you confirm you are flying, choose or receive a seat and get your boarding pass, from the airline’s website or app instead of a desk. It usually opens a day or so before departure, and it closes well before the plane leaves: the exact window is set by your airline, and the window on your booking confirmation is the one that counts.",
        "Checking in online does not remove the airport deadlines. If you have a bag to check, you still have to reach bag drop before it closes. Our guide to [how early to get to the airport](/travel-guides/how-early-to-get-to-the-airport) has more on those cut-offs.",
      ],
    },
    {
      heading: "When online check-in opens and closes",
      paragraphs: [
        "These are the windows we found on four airlines’ own pages on 6 November 2026. They are examples, not a rule for every airline, and airlines change them, so check your booking.",
        "British Airways says online check-in opens 24 hours before departure through Manage My Booking or the app. An older British Airways trade guide gives the window as 24 hours to 1 hour before departure, with a shorter window on US departures, so look at your own booking.",
        "easyJet says online check-in is available for all flights between 30 days and 2 hours before departure, and that if you cannot check in online you should arrive at the airport at least two hours before your flight. Ryanair says online check-in closes 2 hours before departure.",
        "American Airlines says online check-in opens 24 hours before departure. We found conflicting closing times for online check-in, so we have left that out and listed the bag deadlines instead.",
      ],
      table: {
        caption: "Online check-in and airport deadlines on four airlines’ own pages (checked 6 November 2026)",
        head: ["Airline", "Online check-in", "Airport deadline the airline states"],
        rows: [
          ["British Airways", "Opens 24 hours before departure", "Heathrow and Gatwick: 60 minutes before long-haul, 45 minutes before short-haul; London City: 30 minutes"],
          ["American Airlines", "Opens 24 hours before departure", "Bags and airport check-in: 45 minutes before domestic, 60 minutes before international flights"],
          ["easyJet", "30 days to 2 hours before departure", "If you cannot check in online, arrive at least 2 hours before the flight"],
          ["Ryanair", "Closes 2 hours before departure", "Check-in desks close 40 minutes before departure"],
        ],
      },
      tip: "Our advice: set a phone reminder for when check-in opens, and do it as soon as it does if you want to pick a free seat. Then check the airport bag-drop deadline separately, because it is usually much later than online check-in but cannot be extended.",
    },
    {
      heading: "Mobile boarding pass or printed",
      paragraphs: [
        "American Airlines says you can use a mobile boarding pass at most airports, but you should check your departure and connecting airports first. It asks you to make sure the whole barcode is visible on screen at security. If a mobile pass will not work, you can print one at home or at any self-service kiosk at the airport.",
        "British Airways says you can download boarding passes for up to eight people in one booking to one phone, and then go straight to bag drop if you are checking a bag. If you do not have a pass, its kiosks will print one, and at Heathrow Terminal 3 you can print your bag tags at a kiosk even after checking in online.",
        "Ryanair has moved to digital boarding passes only. It announced that change for 12 November 2025: passes can only be reached in the Ryanair app and are scanned from a smartphone at security and the gate. Its help pages list a few airports where a paper copy is still needed, so check yours. If you checked in online and your phone is lost or flat, Ryanair says it will give you a free replacement pass at the airport.",
      ],
      list: [
        "Save the pass to your phone or wallet app before you leave home, so you do not rely on mobile signal at the airport",
        "Charge your phone, and see our [power bank rules](/travel-guides/power-bank-rules-on-planes) if you carry a spare battery",
        "Our advice: keep a printed copy as a back-up on a trip with a tight connection or where the airport or airline asks for paper",
      ],
    },
    {
      heading: "Bag drop after online check-in",
      paragraphs: [
        "If you have only hand luggage, you can usually go straight to security with your pass, and our [carry-on only checklist](/travel-guides/carry-on-only-checklist) helps you pack for it. If you have a bag to check, you take it to a bag-drop desk, not a normal check-in desk, and the cut-off is the airline’s published deadline.",
        "American Airlines says you can pay for up to three checked bags per person online, until two hours before departure, and that bags cannot be checked at the airport until 45 minutes before a domestic flight or 60 minutes before an international one. It also says some airports limit how early you can drop a bag, such as Newark, where the limit is 8 hours before departure. British Airways says that with a pass on its app or website you can go directly to the bag-drop area.",
      ],
      tip: "Our advice: weigh your bag at home. Airlines set their own allowances, and paying for an overweight bag at the desk is usually dearer than choosing the right allowance when you book. Our [checked baggage allowances guide](/travel-guides/checked-baggage-allowances) explains the common limits.",
    },
    {
      heading: "Passport and visa checks",
      paragraphs: [
        "On international flights, the airline has to confirm you can travel. The way it does this varies. Ryanair asks non-EU and non-EEA passengers to verify their travel documents in its app during check-in, and says that if online verification is not available for your flight, the documents are checked at the desk, which closes 40 minutes before departure. A passenger who is not verified will not be allowed to fly and gets no refund.",
        "British Airways says passport and visa checks happen before security on intercontinental flights from Heathrow Terminals 3 and 5. easyJet says to confirm the passport, visa and entry requirements for your destination before you fly.",
        "Airline checks are not the same as the destination’s entry rules, so check those yourself first. Our guides to [passport validity rules](/travel-guides/passport-validity-rules) and the [ESTA and UK ETA](/travel-guides/esta-and-uk-eta) cover two common ones.",
      ],
    },
    {
      heading: "Does it cost money to check in at the airport?",
      paragraphs: [
        "Mostly no, but not always. Ryanair’s help centre says that if you have not checked in online before the two-hour cut-off, you will check in at the airport and pay its airport check-in fee. It lists some exceptions, such as passengers who have started document verification in the app before the cut-off, and refers to its Table of Fees for the amount, which we have not copied here because fees change.",
        "On the British Airways, American Airlines and easyJet pages we found, we did not see an airport check-in fee, but we are not saying none exists, so read your own fare conditions.",
      ],
    },
    {
      heading: "If something goes wrong",
      paragraphs: [
        "If the app will not let you check in, do not wait. Go to the airline’s desk well ahead of the published deadline. On a short trip such as [London to Paris](/routes/london-to-paris), it is tempting to arrive late, but the check-in and bag-drop deadline is just as strict. If you are refused travel because you arrived too late, see our guide to [denied boarding and overbooked flights](/travel-guides/denied-boarding-overbooked-flights) for what is and is not covered.",
      ],
    },
  ],
  faqs: [
    {
      q: "How early can I check in online?",
      a: "It depends on the airline. British Airways and American Airlines open online check-in 24 hours before departure; easyJet opens it 30 days before. Your booking confirmation shows the exact time.",
    },
    {
      q: "When does online check-in close?",
      a: "easyJet and Ryanair say online check-in closes 2 hours before departure. British Airways has given a window up to 1 hour before. Check your airline, because the airport bag-drop deadline is a different time.",
    },
    {
      q: "Can I use a screenshot of my boarding pass?",
      a: "We found no airline page that confirms it. American Airlines says to show the pass from its app or a saved copy with the whole barcode visible. Use the app or wallet pass, and print one if you are unsure.",
    },
    {
      q: "Do I need to print my boarding pass?",
      a: "Usually not. American Airlines says mobile boarding passes work at most airports, and Ryanair now issues digital passes only, with a short list of exceptions. Some airports or routes still need paper, so check yours.",
    },
    {
      q: "What happens if I do not check in online?",
      a: "At Ryanair you pay an airport check-in fee. On other airlines you can usually check in at the airport desk, but you must arrive before the deadline for check-in and bag drop, or you may be refused travel.",
    },
  ],
  sources: [
    { label: "British Airways: Checking in", url: "https://www.britishairways.com/content/information/checking-in-and-boarding/checking-in" },
    { label: "British Airways: Online check-in (trade guide, PDF)", url: "https://www.britishairways.com/cms/b2b/tradeOnline/Global/content/services_and_external/Online_Check_in.pdf" },
    { label: "American Airlines: Check-in and arrival times", url: "https://www.aa.com/i18n/travel-info/check-in-and-arrival.jsp" },
    { label: "American Airlines: Mobile boarding passes", url: "https://www.aa.com/web/i18n/travel-info/travel-tools/mobile-boarding-pass.html" },
    { label: "easyJet: Check-in", url: "https://www.easyjet.com/en/help/booking-and-check-in/check-in" },
    { label: "Ryanair help centre: Do I have to pay a check-in fee at the airport?", url: "https://help.ryanair.com/hc/en-gb/articles/35609771611537-Do-I-have-to-pay-a-check-in-fee-at-the-airport" },
    { label: "Ryanair: Move to 100% digital boarding passes from 12 November", url: "https://corporate.ryanair.com/news/ryanair-confirms-wed-nov-12th-launch-for-100-digital-boarding-passes/" },
    { label: "Ryanair help centre: Travel document check for non-EU/EEA citizens", url: "https://help.ryanair.com/hc/en-gb/articles/35609583589265-I-am-a-non-EU-EEA-citizen-and-need-to-complete-a-travel-document-check-How-do-I-do-this" },
  ],
  keywords: ["online check in", "when does online check in open", "mobile boarding pass", "bag drop", "airport check in fee", "check in online british airways", "ryanair digital boarding pass"],
};
