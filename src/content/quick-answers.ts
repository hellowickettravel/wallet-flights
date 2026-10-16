// Question-and-answer wording for route and destination pages. Questions use
// the words people type into search engines and AI assistants ("How long is
// the flight from London to Dubai?"), and every answer starts with the answer.
// Values come from calculations (src/lib/route-facts.ts, approxFlightTime) or
// from src/content; nothing here is a schedule or a price. The same text is
// shown on the page and used in the FAQPage markup.

type FlightTime = { label: string; longHaul: boolean };

const around = (t: FlightTime) =>
  t.longHaul ? `about ${t.label} in the air, and most trips connect along the way, which adds time on the ground` : `about ${t.label} nonstop`;

/** Shorter form for one-line summaries. */
const aroundShort = (t: FlightTime) => (t.longHaul ? `about ${t.label} in the air, usually with a connection` : `about ${t.label} nonstop`);

export const routeQuestions = {
  heading: (from: string, to: string) => `${from} to ${to} flights: quick answers`,
  /** The route page's opening line, under the H1. */
  lead: (from: string, to: string, t: FlightTime, km: string) =>
    `Flights from ${from} to ${to} take ${aroundShort(t)}, and the two cities are about ${km} km apart. Compare live prices for your dates below.`,
  flightTime: {
    q: (from: string, to: string) => `How long is the flight from ${from} to ${to}?`,
    a: (t: FlightTime, km: string, fromAirport: string, toAirport: string) =>
      `It’s ${around(t)}. That’s a rough guide worked out from the ${km} km between ${fromAirport} and ${toAirport}; scheduled times vary by airline and direction, because winds can make one way slower, and a flight with a connection takes longer.`,
  },
  returnTime: {
    q: (from: string, to: string) => `How long is the flight back from ${to} to ${from}?`,
    a: (t: FlightTime) =>
      `About the same time in the air, ${t.longHaul ? `roughly ${t.label} plus the connection` : `roughly ${t.label}`}, because the distance is the same. High-altitude winds usually make one direction faster than the other, so check the scheduled times in your search results.`,
  },
  distance: {
    q: (from: string, to: string) => `How far is ${to} from ${from}?`,
    a: (km: string, miles: string, fromAirport: string, toAirport: string) =>
      `About ${km} km (${miles} miles) between ${fromAirport} and ${toAirport}, in a straight line. The path a plane flies is usually a little longer.`,
  },
  timeDifference: { q: (from: string, to: string) => `What is the time difference between ${from} and ${to}?` },
  originAirports: { q: (from: string) => `Which airports can I fly from in ${from}?` },
  arrival: {
    q: (to: string) => `Which airport do I fly into in ${to}?`,
    a: (airport: string, to: string) => `${airport} is ${to}’s main airport.`,
  },
  bestTime: {
    q: (to: string) => `When is the best time to visit ${to}?`,
    a: (bestTime: string) => `${bestTime}.`,
  },
  rights: { q: (from: string, to: string) => `What are my rights if my ${from} to ${to} flight is cancelled?` },
  entry: { q: (to: string) => `What do I need to enter the country when I fly to ${to}?` },
} as const;

export const destinationQuestions = {
  bestTime: {
    q: (city: string) => `When is the best time to visit ${city}?`,
    a: (bestTime: string, whenToGo: string) => `${bestTime}. ${whenToGo}`,
  },
  airports: { q: (city: string) => `Which airport do I fly into for ${city}?` },
  flightTime: {
    /** `from` is "the UK and US", or just one of them for London and New York. */
    q: (city: string, from: string) => `How long is the flight to ${city} from ${from}?`,
    a: (times: { from: string; time: FlightTime }[]) =>
      `${times.map((t, i) => (i === 0 ? `From ${t.from}, it’s ${around(t.time)}` : `from ${t.from}, ${around(t.time)}`)).join("; ")}. These are rough guides worked out from distance; scheduled times vary by airline, direction and connection.`,
  },
  entry: { q: (country: string) => `Do I need a visa to visit ${country}?` },
  entryLead: "It depends on your passport, so check the official page before you book:",
} as const;
