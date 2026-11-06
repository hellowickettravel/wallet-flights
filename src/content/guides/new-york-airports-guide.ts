import { photos } from "../images";
import type { Guide } from "./types";

// Batch 22, guides agent C. Primary keyword: "JFK vs Newark vs LaGuardia".
// Transit times, fares and terminal details from the MTA, the Port Authority's
// airport sites (jfkairport.com, newarkairport.com, laguardiaairport.com) and
// NJ TRANSIT, found on 5 to 6 Nov 2026. Fares change, so each one is tied to
// the page it came from and readers are told to check before travelling.
export const newYorkAirportsGuide: Guide = {
  slug: "new-york-airports-guide",
  title: "JFK vs Newark vs LaGuardia: which New York airport should you fly into?",
  seoTitle: "JFK vs Newark vs LaGuardia: which NYC airport?",
  excerpt:
    "Which New York airport to choose: who flies to JFK, Newark and LaGuardia, how to get into Manhattan from each, and when the cheaper fare is worth it.",
  topic: "flying",
  published: "2026-11-05",
  photo: photos.guideNewYorkAirports,
  summary: [
    "JFK has the widest choice of international flights, with more than 70 airlines; most flights from London land there or at Newark.",
    "Newark, in New Jersey, is United’s hub and is about 30 minutes from New York Penn Station by NJ TRANSIT train.",
    "LaGuardia is mainly for flights within the US and to Canada; the Port Authority’s perimeter rule bars most nonstop flights over 1,500 miles.",
    "From JFK, the AirTrain links to the subway and the Long Island Rail Road; from LaGuardia, the Q70 LaGuardia Link bus is free.",
    "Search for “New York (all airports)” and compare the fare plus the journey into the city, not the fare alone.",
  ],
  sections: [
    {
      heading: "New York’s three airports at a glance",
      paragraphs: [
        "New York City is served by three major airports, all run by the Port Authority of New York and New Jersey. JFK and LaGuardia are in Queens, on the city side of the Hudson; Newark Liberty is across the river in New Jersey. Flights from the UK use JFK and Newark; LaGuardia handles mostly domestic traffic.",
      ],
      table: {
        caption: "New York’s three airports compared, from the airports’, MTA’s and NJ TRANSIT’s own pages (checked November 2026)",
        head: ["Airport", "Where", "Mainly for", "Main public transport into Manhattan"],
        rows: [
          ["JFK (JFK)", "Southern Queens", "Long-haul and international; more than 70 airlines", "AirTrain to Jamaica, then the LIRR or the E, J or Z subway; or AirTrain to Howard Beach for the A train"],
          ["Newark Liberty (EWR)", "Newark, New Jersey", "United’s hub, plus long-haul on other airlines", "AirTrain to the airport rail station, then NJ TRANSIT to New York Penn Station, about 30 minutes"],
          ["LaGuardia (LGA)", "Northern Queens", "US domestic flights and short international routes", "Free Q70 LaGuardia Link bus to the subway at Jackson Heights and the LIRR at Woodside"],
        ],
      },
      tip: "Use the city code NYC when you search, or choose “New York (all airports)”, so fares to JFK, Newark and LaGuardia all appear in one list.",
    },
    {
      heading: "JFK: the main international gateway",
      paragraphs: [
        "JFK is New York’s largest international airport. Its own site lists more than 70 airlines across several terminals: Terminal 1 for many foreign airlines, Terminal 4 with Delta as its main tenant, Terminal 5 for JetBlue and Terminal 8 for American, British Airways and other oneworld airlines. Large rebuilding works are under way, including the New Terminal One and a new Terminal 6, so check your terminal before you set off.",
        "To get into the city, take the AirTrain from your terminal to Jamaica or Howard Beach. At Jamaica you can change to the Long Island Rail Road (LIRR), the fastest option to Penn Station or Grand Central, or to the E, J and Z subway lines. At Howard Beach you change to the A train. The AirTrain is paid when you enter or leave at Jamaica or Howard Beach: the airport’s AirTrain page gives the fare as $8.75, on top of the subway or train fare, and OMNY or a contactless card works at the gates.",
        "Unlimited-ride MetroCards don’t cover the AirTrain, and rides between terminals are free.",
      ],
      tip: "Our advice: if you land in the evening with heavy bags, the LIRR from Jamaica is usually the easier choice. It’s a short, direct hop into Manhattan with fewer stops than the subway.",
    },
    {
      heading: "Newark Liberty: United’s hub in New Jersey",
      paragraphs: [
        "Newark is United’s main New York hub. United uses Terminal C, with more than 350 daily flights to over 160 destinations, and also flies from Terminal A, which opened in 2022. Terminal B has more than 25 airlines, including Lufthansa. Many transatlantic flights from London and Manchester arrive here, and fares can be lower than to JFK.",
        "Despite being in another state, Newark is easy to reach. Take the AirTrain to the Newark Liberty International Airport rail station, then an NJ TRANSIT or Amtrak train to New York Penn Station. NJ TRANSIT says Penn Station is about 30 minutes away by train, and your NJ TRANSIT ticket to or from the airport includes the AirTrain fee. Buy a ticket to New York Penn Station, not to Newark Penn Station, which is a different station in New Jersey.",
        "The AirTrain itself is being replaced. While the new system is built, the Port Authority runs shuttle buses on part of the line at some times of day, so check the airport’s alerts page before you travel and allow extra time.",
      ],
    },
    {
      heading: "LaGuardia: closest to Manhattan, mostly domestic",
      paragraphs: [
        "LaGuardia is the closest of the three to Midtown, but it isn’t an option for flights from the UK. A perimeter rule set by the Port Authority prohibits nonstop flights of more than 1,500 miles into and out of LaGuardia, with an exception for Denver. In practice that means flights within the eastern and central US, plus routes to Canada and parts of the Caribbean.",
        "If you’re connecting onwards in the US, LaGuardia matters. The Q70 LaGuardia Link bus is free to board, runs 24 hours a day and, the MTA says, comes about every 10 minutes during the day. It links Terminals B and C to the subway at Jackson Heights–Roosevelt Avenue and to the LIRR at Woodside; from Terminal A, take the airport shuttle to Terminal B first. You still pay the normal fare when you enter the subway. The M60 Select Bus Service runs from all three terminals towards upper Manhattan.",
      ],
    },
    {
      heading: "Which New York airport should you choose?",
      paragraphs: [
        "Start with the whole-city search, then compare the total trip. These are our rules of thumb, based on the facts above:",
      ],
      list: [
        "Flying from London: compare JFK and Newark. Both have many daily nonstop flights; take whichever is cheaper once you add the trip into town",
        "Staying in Midtown West or near Penn Station: Newark is often as quick as JFK, because the train arrives at Penn Station",
        "Staying in Brooklyn or Queens: JFK is usually more convenient",
        "Connecting to another US city: check whether your onward flight leaves from LaGuardia, and never book a connection between airports on a tight schedule",
        "Arriving late at night: check that trains are running, and allow for longer gaps between services",
      ],
      tip: "Changing airports in New York on separate tickets is risky: you’ll need to collect your bags, clear the city traffic and check in again. Our guide to [self-transfer flights](/travel-guides/self-transfer-separate-tickets) explains how much time to leave, and [how long a layover you need](/travel-guides/how-long-a-layover) covers connections on one ticket.",
    },
    {
      heading: "Before you fly to New York",
      paragraphs: [
        "UK travellers need an approved ESTA before boarding a flight to the US; see our guide to the [ESTA and the UK ETA](/travel-guides/esta-and-uk-eta). Allow time for US immigration on arrival, especially at JFK in the afternoon when many transatlantic flights land.",
        "For fares and flight times, see our [London to New York](/routes/london-to-new-york) and [New York to London](/routes/new-york-to-london) route pages, and our [New York city guide](/destinations/new-york) for where to stay. Flying home, our guide to [how early to get to the airport](/travel-guides/how-early-to-get-to-the-airport) applies at all three airports, and if you’re comparing the London end too, see our [London airports guide](/travel-guides/london-airports-guide).",
      ],
    },
  ],
  faqs: [
    {
      q: "Is it better to fly into JFK or Newark?",
      a: "For most trips from the UK, either works. JFK has more airlines and is better for Brooklyn and Queens; Newark is United’s hub and its train reaches New York Penn Station in about 30 minutes. Compare the fare plus the journey into town.",
    },
    {
      q: "Can you fly from London to LaGuardia?",
      a: "No. The Port Authority’s perimeter rule prohibits nonstop flights of more than 1,500 miles into and out of LaGuardia, except to and from Denver, so flights from London use JFK or Newark.",
    },
    {
      q: "How much is the AirTrain at JFK?",
      a: "JFK’s AirTrain page gives the fare as $8.75, paid when you enter or leave at Jamaica or Howard Beach, plus your subway or train fare. Travel between terminals is free. Check the airport’s page before you travel, as fares change.",
    },
    {
      q: "Is the bus from LaGuardia free?",
      a: "Yes. The Q70 LaGuardia Link bus is free to board and connects to the subway at Jackson Heights and the LIRR at Woodside. You pay the normal fare when you enter the subway.",
    },
    {
      q: "Is Newark Airport in New York?",
      a: "No, it’s in Newark, New Jersey, but it’s one of New York City’s three main airports. NJ TRANSIT trains run from the airport rail station to New York Penn Station in about 30 minutes.",
    },
  ],
  sources: [
    { label: "JFK Airport: AirTrain JFK", url: "https://www.jfkairport.com/transportation/airtrain" },
    { label: "JFK Airport: All airlines", url: "https://www.jfkairport.com/flights/airlines" },
    { label: "MTA: How to get to JFK Airport on public transit", url: "https://www.mta.info/guides/airports/jfk" },
    { label: "Newark Airport: Terminal C", url: "https://www.newarkairport.com/explore-ewr/terminals/terminal-c" },
    { label: "Newark Airport: AirTrain Newark partial service outage", url: "https://www.newarkairport.com/alerts-advisories/airtrain-partial-shutdown" },
    { label: "NJ TRANSIT: Newark Liberty International Airport", url: "https://www.njtransit.com/destinations/newark-liberty-international-airport" },
    { label: "LaGuardia Airport: Public transportation", url: "https://www.laguardiaairport.com/transportation/public-transport" },
    { label: "MTA: How to get to LaGuardia Airport on public transit", url: "https://www.mta.info/guides/airports/laguardia" },
    { label: "Federal Register: Congestion Management Rule for LaGuardia Airport (perimeter rule)", url: "https://www.federalregister.gov/documents/2008/04/17/E8-8308/congestion-management-rule-for-laguardia-airport" },
  ],
  keywords: ["jfk vs newark vs laguardia", "which new york airport is best", "jfk or newark", "new york airports", "jfk to manhattan", "newark airport to manhattan", "laguardia airport to manhattan", "airtrain jfk fare"],
};
