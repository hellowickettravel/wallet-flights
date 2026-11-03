import { photos } from "../images";
import type { Guide } from "./types";

// Growth proposal phase 2, month 1, guide 4 ("airport guides"). Primary
// keyword: "which london airport is best"; also "london airports to central
// london". Journey times and fares from the airports', operators' and TfL's
// own pages (checked 3 Nov 2026); distances are approximate.
export const londonAirports: Guide = {
  slug: "london-airports-guide",
  title: "London airports compared: Heathrow, Gatwick, Stansted, Luton, City and Southend",
  seoTitle: "Which London airport is best? All six compared",
  excerpt:
    "Which London airport to fly from or into: where each one is, who flies there, and the fastest and cheapest trains into central London.",
  topic: "flying",
  published: "2026-11-03",
  photo: photos.guideLondonAirports,
  summary: [
    "Heathrow and Gatwick handle most long-haul flights; Stansted and Luton are mainly for budget flights within Europe; London City is closest to the centre.",
    "From central London, the fastest trains take about 15 minutes to Heathrow, 20 to London City, 30 to Gatwick and Luton, and 48 to Stansted.",
    "The cheapest fare isn’t always the cheapest trip: add the train or taxi to each airport before you compare.",
    "Search for “London (all airports)” so every airport is included in your results.",
  ],
  sections: [
    {
      heading: "London’s six airports at a glance",
      paragraphs: [
        "London is served by six main airports, and which one you use can change both the fare and the journey. Most flights from the US land at Heathrow or Gatwick, while many low-cost European routes use Stansted, Luton or Southend. London City, in the Docklands, is the closest to the centre and mainly serves business routes in Europe.",
      ],
      table: {
        caption: "London’s airports: where they are and the main train into town (checked 3 November 2026)",
        head: ["Airport", "Where", "Mainly for", "Fastest train into London"],
        rows: [
          ["Heathrow (LHR)", "About 24 km west", "Long-haul, including most US flights", "Heathrow Express to Paddington: 15 to 21 minutes"],
          ["Gatwick (LGW)", "About 45 km south", "Long-haul and Europe", "Gatwick Express to Victoria: about 30 minutes"],
          ["Stansted (STN)", "About 55 km north-east", "Low-cost flights in Europe", "Stansted Express to Liverpool Street: about 48 minutes"],
          ["Luton (LTN)", "About 55 km north", "Low-cost flights in Europe", "Train from St Pancras, then the DART: about 30 minutes"],
          ["London City (LCY)", "In the Docklands, east London", "Short-haul and business routes", "DLR to Bank: about 20 minutes"],
          ["Southend (SEN)", "About 65 km east, in Essex", "A smaller number of European routes", "Train to Liverpool Street"],
        ],
      },
    },
    {
      heading: "Heathrow",
      paragraphs: [
        "Heathrow is the UK’s main long-haul airport and the one most flights from the US use. It has three ways into town by rail. The Heathrow Express runs nonstop to Paddington in 15 minutes from Terminals 2 and 3 and 21 from Terminal 5, with advance fares from £10. The Elizabeth line is slower but goes straight through central London to Bond Street, Tottenham Court Road and the City, in under 40 minutes. The Piccadilly line on the Underground is the cheapest, from £5.90 off-peak with contactless or Oyster, and takes about 50 minutes to the West End.",
      ],
      tip: "If you’re staying in the City or east London, the Elizabeth line can be quicker door to door than the Heathrow Express, because you don’t change at Paddington.",
    },
    {
      heading: "Gatwick",
      paragraphs: [
        "Gatwick, south of London, has a mix of long-haul and European flights. The Gatwick Express runs to Victoria in about 30 minutes, and Thameslink trains run through London Bridge, Blackfriars and St Pancras, which can be more convenient for the City and for onward trains north. Gatwick has two terminals, North and South, linked by a free shuttle that takes about two minutes.",
      ],
    },
    {
      heading: "Stansted and Luton",
      paragraphs: [
        "Stansted and Luton are the bases for many low-cost airlines flying to Europe. The Stansted Express runs to Liverpool Street in about 48 minutes, every 15 minutes during the day. For Luton, take the Luton Airport Express from St Pancras to Luton Airport Parkway, about 22 minutes, then the Luton DART shuttle to the terminal in about four minutes; buy a ticket to “Luton Airport” and the DART is included.",
        "Both are further from central London than Heathrow, so a cheap fare from either is worth checking against the cost of the train, especially for a family.",
      ],
    },
    {
      heading: "London City and Southend",
      paragraphs: [
        "London City Airport is in the Docklands, close to Canary Wharf and the City. The DLR takes about 20 minutes to Bank, which makes it the quickest airport to reach from central and east London. It mainly serves short-haul routes and has strict limits on aircraft size, so long-haul flights there are rare.",
        "Southend, in Essex, has a smaller number of flights, mostly to Europe, and a station next to the terminal with trains to Liverpool Street.",
      ],
    },
    {
      heading: "Which London airport should you choose?",
      paragraphs: [
        "Start by searching for London as a city, so results include every airport, then compare the total trip rather than the fare alone:",
      ],
      list: [
        "Flying to or from the US: Heathrow and Gatwick have the widest choice of nonstop flights",
        "Flying to Europe on a budget: compare Stansted, Luton and Gatwick, adding the train fare",
        "Staying in the City, Canary Wharf or east London: check London City first",
        "Arriving late at night: check that trains are still running from your airport, or budget for a taxi",
      ],
    },
  ],
  faqs: [
    {
      q: "Which London airport is closest to central London?",
      a: "London City Airport, in the Docklands. The DLR takes about 20 minutes to Bank. Heathrow is the closest of the big international airports, about 15 minutes from Paddington on the Heathrow Express.",
    },
    {
      q: "What is the cheapest way from Heathrow to central London?",
      a: "The Piccadilly line on the Underground, from £5.90 off-peak with contactless or Oyster, taking about 50 minutes to the West End. The Elizabeth line is faster; the Heathrow Express is fastest, with advance fares from £10.",
    },
    {
      q: "Which London airports have flights to the US?",
      a: "Most flights between London and the US use Heathrow, with others from Gatwick. Search for “London (all airports)” to see every option.",
    },
    {
      q: "Is Luton or Stansted closer to London?",
      a: "They’re a similar distance away. By train, Luton takes about 30 minutes from St Pancras including the DART shuttle, and Stansted about 48 minutes from Liverpool Street, so the better one depends on where in London you start.",
    },
  ],
  sources: [
    { label: "Heathrow: Getting to central London", url: "https://www.heathrow.com/transport-and-directions/getting-to-central-london" },
    { label: "Heathrow Express: Heathrow to London", url: "https://www.heathrowexpress.com/journey-planning/heathrow-london" },
    { label: "Heathrow: London Underground", url: "https://www.heathrow.com/transport-and-directions/by-rail-or-train/london-underground" },
    { label: "Gatwick Airport: Travelling to or from London", url: "https://www.gatwickairport.com/transport-options/to-from-london.html" },
    { label: "Gatwick Airport: Flight connections", url: "https://www.gatwickairport.com/flights/flight-connections.html" },
    { label: "Stansted Express: Timetables", url: "https://www.stanstedexpress.com/travel-information/timetables" },
    { label: "London Luton Airport: Trains to and from London", url: "https://www.london-luton.co.uk/to-and-from-lla/trains/to-from-london" },
    { label: "London Luton Airport: The Luton DART", url: "https://www.london-luton.co.uk/to-and-from-lla/trains/luton-dart" },
    { label: "TfL Visitor Shop: London airport transfers", url: "https://visitorshop.tfl.gov.uk/pages/london-airport-transfers" },
  ],
  keywords: ["which london airport is best", "london airports", "heathrow to central london", "london airports to city centre", "cheapest way from heathrow to london"],
};
