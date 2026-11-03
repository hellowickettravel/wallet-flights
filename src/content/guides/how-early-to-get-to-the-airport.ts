import { photos } from "../images";
import type { Guide } from "./types";

// Growth proposal phase 2, month 1, guide 2 (docs/SEO-CONTENT-PLAN.md, wave 2
// "how-early-to-get-to-the-airport"). Check-in and bag-drop deadlines from
// British Airways, American Airlines and Delta (checked 3 Nov 2026). The
// arrival times in the table are our own advice and are labelled as such.
export const howEarlyAirport: Guide = {
  slug: "how-early-to-get-to-the-airport",
  title: "How early should you get to the airport? Check-in deadlines and how much time to leave",
  seoTitle: "How early should you get to the airport?",
  excerpt:
    "When check-in and bag drop close for British Airways, American and Delta, and how early to arrive for short-haul, long-haul and US flights.",
  topic: "flying",
  published: "2026-11-03",
  photo: photos.guideCheckIn,
  summary: [
    "The deadline that matters is your airline’s check-in or bag-drop cut-off, not the departure time. Miss it and you can be refused travel.",
    "British Airways closes check-in at Heathrow 60 minutes before long-haul and 45 minutes before short-haul flights.",
    "American Airlines and Delta close bag check 45 minutes before most US domestic flights and 60 minutes before international ones.",
    "As a rule of thumb, we arrive 2 hours before a short-haul flight and 3 hours before a long-haul or US international one.",
  ],
  sections: [
    {
      heading: "Work back from the airline’s cut-off",
      paragraphs: [
        "Every airline sets a time after which it closes check-in and bag drop, and another after which you can’t board. They’re in your booking confirmation and on the airline’s website, and they’re strict: arriving at the desk a minute late can mean being refused travel, with no refund on a non-flexible ticket.",
        "So the sensible way to plan is backwards. Start with the cut-off, add the time it takes to get through security and walk to the gate, then add a buffer for traffic, queues and the unexpected. The figures below come from the airlines’ own pages and can differ by airport and route, so always check your own booking.",
      ],
      table: {
        caption: "Check-in and bag-drop deadlines from airline websites (checked 3 November 2026)",
        head: ["Airline", "Short-haul or domestic", "Long-haul or international"],
        rows: [
          ["British Airways (Heathrow)", "Check-in closes 45 minutes before", "Check-in closes 60 minutes before; some routes earlier"],
          ["American Airlines", "Bags and airport check-in: 45 minutes before", "Bags and airport check-in: 60 minutes before"],
          ["Delta", "Bags: 45 minutes before at most airports", "Checked in at least 1 hour before"],
        ],
      },
      tip: "Some deadlines are longer than they look: British Airways asks for oversize bags at least 90 minutes before departure, and says some routes, such as flights to Ghana, close 90 minutes before.",
    },
    {
      heading: "How early to arrive: our rule of thumb",
      paragraphs: [
        "These are the arrival times we’d plan for ourselves, as an allowance on top of the airline’s cut-off. They’re our advice, not airline rules, and a quiet regional airport early on a Tuesday needs less time than a big hub on the first Saturday of the school holidays.",
      ],
      table: {
        caption: "Suggested arrival times at the airport (Wallet Flights’ advice)",
        head: ["Trip", "Hand luggage only, checked in online", "Checking a bag"],
        rows: [
          ["Short-haul from the UK", "1½ to 2 hours", "2 hours"],
          ["Long-haul from the UK", "2½ hours", "3 hours"],
          ["Domestic flight in the US", "1½ to 2 hours", "2 hours"],
          ["International flight from the US", "2½ to 3 hours", "3 hours"],
          ["School holidays and peak weekends", "Add 30 to 60 minutes", "Add 30 to 60 minutes"],
        ],
      },
    },
    {
      heading: "Security and the walk to the gate",
      paragraphs: [
        "Check-in is only half of it. At Heathrow Terminal 5, British Airways asks passengers to be through security at least 35 minutes before departure, and gates at big airports can be a long walk or a train ride from the security hall. At peak times, security queues can take far longer than you’d expect.",
        "You can save time by checking in online, packing so your liquids and electronics come out quickly, and knowing the rules before you reach the tray. Our guides to [liquids at UK airports](/travel-guides/uk-airport-liquids-rules) and [power banks on planes](/travel-guides/power-bank-rules-on-planes) cover the items that most often slow people down.",
      ],
      list: [
        "Check in online as soon as it opens; American, for example, lets you check in from 24 hours before departure",
        "Download your boarding pass to your phone and keep it with your passport",
        "Pack liquids in one clear bag at the top of your hand luggage",
        "Check the terminal before you set off: many airports have several, some far apart",
      ],
    },
    {
      heading: "Getting to the airport on time",
      paragraphs: [
        "Allow for the journey too. Airport trains are usually more predictable than the road at rush hour: from central London, the Heathrow Express reaches Heathrow in 15 to 21 minutes, the Gatwick Express takes about 30 minutes from Victoria and the Stansted Express about 48 minutes from Liverpool Street. Our [London airports guide](/travel-guides/london-airports-guide) compares them all.",
        "If your flight leaves very early, look at a hotel at or near the airport the night before, or check whether your airline offers bag drop the evening before. British Airways, for example, runs an overnight bag drop at Heathrow Terminal 3 for some morning flights.",
      ],
    },
    {
      heading: "If you’re running late",
      paragraphs: [
        "Call or message the airline as soon as you know: some can help, especially if you’re only checking in hand luggage. If you miss the flight because you arrived late, you usually lose the ticket and aren’t entitled to compensation, and on many airlines missing the outbound flight cancels the return too, so ask the airline before you assume the rest of the trip is safe.",
      ],
    },
  ],
  faqs: [
    {
      q: "How early should I get to the airport for an international flight?",
      a: "Our rule of thumb is 3 hours before a long-haul or international flight if you’re checking a bag, and about 2½ hours with hand luggage only. Always check your airline’s check-in cut-off, which is usually 60 minutes before international departures.",
    },
    {
      q: "Is 2 hours enough for a short-haul flight?",
      a: "Usually, yes. Two hours gives time for bag drop, security and the walk to the gate at most UK airports, but allow more in school holidays or if you need assistance.",
    },
    {
      q: "When does check-in close for British Airways at Heathrow?",
      a: "British Airways says check-in closes 60 minutes before long-haul flights and 45 minutes before short-haul flights at Heathrow, and some routes close earlier. Check your booking for your flight.",
    },
    {
      q: "What happens if I miss check-in?",
      a: "The airline can refuse to let you travel. On a non-flexible ticket you usually lose the fare, and some airlines cancel the rest of your booking if you miss a flight, so contact them straight away.",
    },
  ],
  sources: [
    { label: "British Airways: Checking in", url: "https://www.britishairways.com/content/information/checking-in-and-boarding/checking-in/" },
    { label: "British Airways: London Heathrow Terminal 5", url: "https://www.britishairways.com/content/information/airport-information/london-heathrow-airport/heathrow-t5" },
    { label: "American Airlines: Check-in and arrival times", url: "https://www.aa.com/web/i18n/travel-info/check-in-and-arrival.html" },
    { label: "Delta: International check-in requirements", url: "https://www.delta.com/us/en/check-in-security/check-in-time-requirements/international-check-in" },
    { label: "Delta: US domestic check-in requirements", url: "https://www.delta.com/us/en/check-in-security/check-in-time-requirements/domestic-check-in" },
  ],
  keywords: ["how early should I get to the airport", "how early to get to the airport for an international flight", "check-in closing time", "is 2 hours enough at the airport"],
};
