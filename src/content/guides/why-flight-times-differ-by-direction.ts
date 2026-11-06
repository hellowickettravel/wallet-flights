import { guidesHPhotos } from "../photos/guides-h";
import type { Guide } from "./types";

// Batch H, guide 2. Primary keyword: "why is flying west to east faster".
// Sourcing: jet-stream facts from NOAA (noaa.gov/jetstream, NESDIS, GOES-R
// transcript, NWS JetStream) and the Met Office; great-circle definition from
// the FAA pilot's handbook glossary; all found with WebSearch on 6 Nov 2026.
// Route figures (distance, "about 7h 30m") are the ones our route pages show,
// worked out from the airport coordinates in src/lib/geo.ts and
// src/lib/demo-flights.ts (approxFlightTime). They are rough, identical in
// both directions, and are described that way here. No scheduled times, wind
// speeds on a given day or minute differences are stated, because none are
// sourced. Our own explanation and advice are labelled.
export const whyFlightTimesDifferByDirection: Guide = {
  slug: "why-flight-times-differ-by-direction",
  title: "Why is flying west to east faster? Jet streams, distance and scheduled times explained",
  seoTitle: "Why is flying west to east faster? Jet streams explained",
  excerpt:
    "Why the same route can take longer one way: jet streams, great-circle distance, and why scheduled and actual times differ, using London to New York.",
  topic: "flying",
  published: "2026-11-06",
  photo: guidesHPhotos.guideFlightTimes,
  summary: [
    "NOAA says a plane flying west to east can generally make the trip faster than one flying the other way, because the jet stream gives it a tailwind.",
    "The Met Office says the jet stream sits at about the same height as transatlantic aircraft, so flying with it can cut flight times and fuel use, and flying against it can add delay.",
    "That is why London to New York is usually the longer direction on a timetable, and New York to London the shorter one.",
    "Our route pages show one distance-based time for both directions; they are rough guides, not schedules. Check the times in your search results.",
  ],
  sections: [
    {
      heading: "The short answer",
      paragraphs: [
        "Winds high above the ground blow mainly from west to east. NOAA, the US weather agency, says an aeroplane flying west to east can generally make the trip faster than one flying the reverse way, because the jet stream gives it a tailwind. Flying east to west, the same wind is a headwind.",
        "The distance between two airports does not change with the direction you fly, so the difference comes from the air the plane is moving through, not from the ground beneath it.",
      ],
    },
    {
      heading: "What the jet stream is",
      paragraphs: [
        "The jet stream is a fast, narrow current of air high in the atmosphere. The Met Office explains that the westerly flow comes from the Coriolis effect, caused by the Earth’s rotation, and says it sits at about the same height that transatlantic aircraft fly at. Flying with it can reduce flight times and save fuel, while flying against it can lead to delays and increased fuel consumption. The Met Office also says the North Atlantic corridor between North America and Europe has the strongest jet streams.",
        "NOAA’s education material gives a sense of scale: jet streams average about 110 mph and can reach 250 mph or more in winter. A wind of that strength is why the effect can be noticeable on a long flight.",
        "The jet stream moves and changes strength from day to day, so the difference between directions is not the same every time. We have not found an official figure for how many minutes it saves on a given route, so we do not quote one.",
      ],
    },
    {
      heading: "London to New York and back: an example",
      paragraphs: [
        "Apply that to the Atlantic and London to New York flies west, against the prevailing westerly flow, while New York to London flies east, with it. So the westbound flight is usually the longer one. That is our reading of the NOAA and Met Office explanations, not a figure from either. We are not quoting scheduled minutes here, because airlines change their schedules and we have not confirmed one against an airline timetable.",
        "Our route pages work differently. They show a distance and a rough flight time worked out from that distance, so they give the same figure for both directions. They say so on the page, and note that scheduled times vary by airline and direction because winds can make one way slower.",
      ],
      table: {
        caption: "Distances and rough flight times as shown on our route pages (calculated from distance; not schedules)",
        head: ["Route", "Straight-line distance", "Rough nonstop time on our page", "Direction of travel"],
        rows: [
          ["[London to New York](/routes/london-to-new-york)", "About 5,540 km (3,440 miles), Heathrow to JFK", "About 7h 30m", "West"],
          ["[New York to London](/routes/new-york-to-london)", "About 5,540 km (3,440 miles), JFK to Heathrow", "About 7h 30m", "East"],
          ["[London to Tokyo](/routes/london-to-tokyo)", "About 9,590 km (5,960 miles), Heathrow to Haneda", "About 12h 30m", "East"],
          ["[Los Angeles to Tokyo](/routes/los-angeles-to-tokyo)", "About 8,810 km (5,480 miles), Los Angeles to Haneda", "About 11h 30m", "West"],
        ],
      },
      tip: "Our advice: treat the time on a route page as a starting point for planning, and read the scheduled duration on the flight itself when you book. The two can differ, and the scheduled one is the one your airline is working to.",
    },
    {
      heading: "Great-circle distance: why the map is misleading",
      paragraphs: [
        "The FAA defines a great circle route as the shortest distance across the surface of a sphere, here the Earth, between two points. Because the Earth is a globe, the shortest path can look curved when it is drawn on a flat map.",
        "The distances on our route pages are straight-line distances between the two airports. They say that the path a plane flies is usually a little longer, and our figures are rounded. Which exact path a plane takes on the day also depends on the airline’s flight plan and the winds, so the same route is not always flown along the same line.",
      ],
    },
    {
      heading: "Scheduled time versus actual time",
      paragraphs: [
        "Three things are easy to mix up. The distance is fixed. The scheduled time is the duration the airline publishes in advance. The actual time is what happens on the day, and can be shorter or longer than the schedule because of winds, the route flown, air traffic and the time spent on the ground before take-off and after landing.",
        "Our explanation, not a sourced figure: airlines build their timetables around typical conditions, which is one reason why the same flight can arrive a little early on one day and late on another without anything having gone wrong. If a flight is long delayed, our guide to [your rights when a flight is delayed or cancelled](/travel-guides/flight-cancelled-or-delayed-rights) explains when you may be owed help or compensation.",
      ],
    },
    {
      heading: "A shorter flight time is not the same as less jet lag",
      paragraphs: [
        "Flying east can shorten the flight, but it also moves you forward in time, so you land in the morning with your body clock still thinking it is the night before. How your body copes is a separate question from how long you spent in the air. Our [jet lag tips](/travel-guides/jet-lag-tips) guide, which draws on NHS and CDC advice, covers what to do.",
        "When you pick a flight, remember that the departure and arrival times on a ticket are local times at each end. To work out how long you will be in the air, take the difference between them and adjust for the time-zone change. The gap between local clocks is shown for each pair of cities on our route pages.",
      ],
      tip: "Our advice: when you compare two flights on the same route, compare the scheduled duration, not the local departure and arrival times, and then add any connection time. Our guide to [direct versus connecting flights](/travel-guides/direct-vs-connecting-flights) explains the trade-offs.",
    },
  ],
  faqs: [
    {
      q: "Why is flying west to east faster?",
      a: "NOAA says an aeroplane flying west to east can generally make the trip faster because the jet stream gives it a tailwind. Flying east to west, the same wind works against the plane.",
    },
    {
      q: "Why is London to New York longer than New York to London?",
      a: "London to New York flies west, against the prevailing westerly winds, while New York to London flies east with them. The Met Office says the North Atlantic corridor has the strongest jet streams, so the effect can be marked there.",
    },
    {
      q: "How much faster is the flight east than west?",
      a: "It varies from day to day with the strength and position of the jet stream, and we have not found an official figure for a given route. Check the scheduled duration of your own flight.",
    },
    {
      q: "How fast is the jet stream?",
      a: "NOAA’s education material says jet streams average about 110 mph and can reach 250 mph or more in winter.",
    },
    {
      q: "Why do your route pages show the same flight time both ways?",
      a: "Our route pages calculate a rough time from the straight-line distance, which is the same in both directions. They are guides, not schedules, and say that winds can make one direction slower.",
    },
  ],
  sources: [
    { label: "NOAA: The Jet Stream", url: "https://www.noaa.gov/jetstream/global/jet-stream" },
    { label: "NOAA NESDIS: What is the jet stream?", url: "https://www.nesdis.noaa.gov/about/k-12-education/atmosphere/what-the-jet-stream" },
    { label: "NOAA GOES-R: What is the jet stream? (video transcript)", url: "https://goes-r.noaa.gov/multimedia/originalVideoCopies/videosForKids/JetStream/jet_stream_transcript.txt" },
    { label: "National Weather Service: JetStream, the jet stream", url: "https://w2.weather.gov/jetstream/jet" },
    { label: "Met Office: What is the jet stream?", url: "https://weather.metoffice.gov.uk/learn-about/weather/types-of-weather/wind/what-is-the-jet-stream" },
    { label: "Met Office: What is the jet stream and how does it affect our weather?", url: "https://www.metoffice.gov.uk/blog/2025/what-is-the-jet-stream-and-how-does-it-affect-our-weather" },
    { label: "FAA: Pilot’s Handbook of Aeronautical Knowledge, glossary (great circle route)", url: "https://www.faa.gov/sites/faa.gov/files/21_phak_glossary.pdf" },
  ],
  keywords: ["why is flying west to east faster", "jet stream flights", "why is london to new york longer than new york to london", "flight time east vs west", "great circle route", "scheduled vs actual flight time", "why do flights take longer going west"],
};
