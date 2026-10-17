// Content for /flight-delay-compensation. The rules themselves live in
// src/lib/compensation.ts; this file holds the places, airlines, questions and
// copy. Amounts and rules follow UK261 (Regulation (EC) No 261/2004 as it
// forms part of UK law) and EU261, as summarised in our guide
// src/content/guides/flight-cancelled-or-delayed-rights.ts (CAA and GOV.UK,
// read 16 Oct 2026). TODO(confirm): legal wording reviewed before launch.

import type { ProgramId } from "./affiliates";

/** Where an airport or airline sits for these rules. EU261 also covers Iceland, Norway and Switzerland. */
export type Region = "UK" | "EU" | "X";

export type RightsAirport = { code: string; city: string; name: string; region: Region; lat: number; lon: number };

/** Approximate coordinates (public data), used only for the great-circle distance. */
export const rightsAirports: RightsAirport[] = [
  { code: "LHR", city: "London", name: "Heathrow", region: "UK", lat: 51.47, lon: -0.454 },
  { code: "LGW", city: "London", name: "Gatwick", region: "UK", lat: 51.153, lon: -0.182 },
  { code: "STN", city: "London", name: "Stansted", region: "UK", lat: 51.885, lon: 0.235 },
  { code: "LTN", city: "London", name: "Luton", region: "UK", lat: 51.875, lon: -0.368 },
  { code: "LCY", city: "London", name: "London City", region: "UK", lat: 51.505, lon: 0.055 },
  { code: "MAN", city: "Manchester", name: "Manchester", region: "UK", lat: 53.365, lon: -2.273 },
  { code: "BHX", city: "Birmingham", name: "Birmingham", region: "UK", lat: 52.454, lon: -1.748 },
  { code: "BRS", city: "Bristol", name: "Bristol", region: "UK", lat: 51.383, lon: -2.719 },
  { code: "EMA", city: "East Midlands", name: "East Midlands", region: "UK", lat: 52.831, lon: -1.328 },
  { code: "LPL", city: "Liverpool", name: "Liverpool John Lennon", region: "UK", lat: 53.334, lon: -2.85 },
  { code: "NCL", city: "Newcastle", name: "Newcastle", region: "UK", lat: 55.038, lon: -1.692 },
  { code: "EDI", city: "Edinburgh", name: "Edinburgh", region: "UK", lat: 55.95, lon: -3.373 },
  { code: "GLA", city: "Glasgow", name: "Glasgow", region: "UK", lat: 55.872, lon: -4.433 },
  { code: "ABZ", city: "Aberdeen", name: "Aberdeen", region: "UK", lat: 57.202, lon: -2.198 },
  { code: "BFS", city: "Belfast", name: "Belfast International", region: "UK", lat: 54.658, lon: -6.216 },

  { code: "DUB", city: "Dublin", name: "Dublin", region: "EU", lat: 53.421, lon: -6.27 },
  { code: "AMS", city: "Amsterdam", name: "Schiphol", region: "EU", lat: 52.31, lon: 4.768 },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle", region: "EU", lat: 49.01, lon: 2.548 },
  { code: "ORY", city: "Paris", name: "Orly", region: "EU", lat: 48.723, lon: 2.379 },
  { code: "NCE", city: "Nice", name: "Côte d’Azur", region: "EU", lat: 43.658, lon: 7.216 },
  { code: "FRA", city: "Frankfurt", name: "Frankfurt", region: "EU", lat: 50.033, lon: 8.57 },
  { code: "MUC", city: "Munich", name: "Munich", region: "EU", lat: 48.354, lon: 11.786 },
  { code: "BER", city: "Berlin", name: "Brandenburg", region: "EU", lat: 52.366, lon: 13.503 },
  { code: "CPH", city: "Copenhagen", name: "Kastrup", region: "EU", lat: 55.618, lon: 12.656 },
  { code: "ARN", city: "Stockholm", name: "Arlanda", region: "EU", lat: 59.652, lon: 17.919 },
  { code: "OSL", city: "Oslo", name: "Gardermoen", region: "EU", lat: 60.197, lon: 11.1 },
  { code: "ZRH", city: "Zurich", name: "Zurich", region: "EU", lat: 47.458, lon: 8.555 },
  { code: "VIE", city: "Vienna", name: "Vienna", region: "EU", lat: 48.11, lon: 16.57 },
  { code: "PRG", city: "Prague", name: "Václav Havel", region: "EU", lat: 50.101, lon: 14.26 },
  { code: "BUD", city: "Budapest", name: "Ferenc Liszt", region: "EU", lat: 47.437, lon: 19.256 },
  { code: "KRK", city: "Kraków", name: "John Paul II", region: "EU", lat: 50.078, lon: 19.785 },
  { code: "WAW", city: "Warsaw", name: "Chopin", region: "EU", lat: 52.166, lon: 20.967 },
  { code: "BCN", city: "Barcelona", name: "El Prat", region: "EU", lat: 41.297, lon: 2.083 },
  { code: "MAD", city: "Madrid", name: "Barajas", region: "EU", lat: 40.498, lon: -3.568 },
  { code: "PMI", city: "Palma de Mallorca", name: "Palma", region: "EU", lat: 39.552, lon: 2.739 },
  { code: "AGP", city: "Málaga", name: "Málaga", region: "EU", lat: 36.675, lon: -4.499 },
  { code: "ALC", city: "Alicante", name: "Alicante", region: "EU", lat: 38.282, lon: -0.558 },
  { code: "TFS", city: "Tenerife", name: "Tenerife South", region: "EU", lat: 28.044, lon: -16.573 },
  { code: "LPA", city: "Gran Canaria", name: "Gran Canaria", region: "EU", lat: 27.932, lon: -15.387 },
  { code: "ACE", city: "Lanzarote", name: "Lanzarote", region: "EU", lat: 28.945, lon: -13.605 },
  { code: "LIS", city: "Lisbon", name: "Humberto Delgado", region: "EU", lat: 38.774, lon: -9.134 },
  { code: "FAO", city: "Faro", name: "Faro", region: "EU", lat: 37.014, lon: -7.966 },
  { code: "FCO", city: "Rome", name: "Fiumicino", region: "EU", lat: 41.8, lon: 12.239 },
  { code: "MXP", city: "Milan", name: "Malpensa", region: "EU", lat: 45.63, lon: 8.723 },
  { code: "ATH", city: "Athens", name: "Athens", region: "EU", lat: 37.936, lon: 23.944 },
  { code: "HER", city: "Heraklion", name: "Heraklion", region: "EU", lat: 35.34, lon: 25.18 },
  { code: "LCA", city: "Larnaca", name: "Larnaca", region: "EU", lat: 34.875, lon: 33.625 },

  { code: "IST", city: "Istanbul", name: "Istanbul Airport", region: "X", lat: 41.275, lon: 28.752 },
  { code: "CAI", city: "Cairo", name: "Cairo", region: "X", lat: 30.122, lon: 31.406 },
  { code: "DXB", city: "Dubai", name: "Dubai International", region: "X", lat: 25.253, lon: 55.366 },
  { code: "DOH", city: "Doha", name: "Hamad", region: "X", lat: 25.273, lon: 51.608 },
  { code: "DEL", city: "Delhi", name: "Indira Gandhi", region: "X", lat: 28.556, lon: 77.1 },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj", region: "X", lat: 19.09, lon: 72.868 },
  { code: "LHE", city: "Lahore", name: "Allama Iqbal", region: "X", lat: 31.522, lon: 74.404 },
  { code: "ISB", city: "Islamabad", name: "Islamabad", region: "X", lat: 33.549, lon: 72.825 },
  { code: "KHI", city: "Karachi", name: "Jinnah", region: "X", lat: 24.907, lon: 67.161 },
  { code: "LOS", city: "Lagos", name: "Murtala Muhammed", region: "X", lat: 6.577, lon: 3.321 },
  { code: "CPT", city: "Cape Town", name: "Cape Town", region: "X", lat: -33.965, lon: 18.602 },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi", region: "X", lat: 13.69, lon: 100.75 },
  { code: "SIN", city: "Singapore", name: "Changi", region: "X", lat: 1.364, lon: 103.991 },
  { code: "JFK", city: "New York", name: "JFK", region: "X", lat: 40.641, lon: -73.778 },
  { code: "EWR", city: "Newark", name: "Newark Liberty", region: "X", lat: 40.69, lon: -74.174 },
  { code: "ORD", city: "Chicago", name: "O’Hare", region: "X", lat: 41.978, lon: -87.905 },
  { code: "MCO", city: "Orlando", name: "Orlando", region: "X", lat: 28.431, lon: -81.308 },
  { code: "LAX", city: "Los Angeles", name: "Los Angeles", region: "X", lat: 33.942, lon: -118.408 },
  { code: "YYZ", city: "Toronto", name: "Pearson", region: "X", lat: 43.678, lon: -79.625 },
];

export const rightsAirportByCode = Object.fromEntries(rightsAirports.map((a) => [a.code, a])) as Record<string, RightsAirport>;

export type RightsAirline = { code: string; name: string; region: Region };

/**
 * Where each airline holds its operating licence. Some groups have UK and EU
 * companies (easyJet, Ryanair, Wizz Air): the booking or boarding pass names
 * the one that flew you. Swiss and Norwegian carriers count as EU carriers
 * for EU261.
 */
export const rightsAirlines: RightsAirline[] = [
  { code: "BA", name: "British Airways", region: "UK" },
  { code: "VS", name: "Virgin Atlantic", region: "UK" },
  { code: "U2", name: "easyJet (UK)", region: "UK" },
  { code: "LS", name: "Jet2", region: "UK" },
  { code: "BY", name: "TUI Airways", region: "UK" },
  { code: "RK", name: "Ryanair UK", region: "UK" },
  { code: "W9", name: "Wizz Air UK", region: "UK" },
  { code: "LM", name: "Loganair", region: "UK" },

  { code: "FR", name: "Ryanair", region: "EU" },
  { code: "EC", name: "easyJet Europe", region: "EU" },
  { code: "W6", name: "Wizz Air", region: "EU" },
  { code: "EI", name: "Aer Lingus", region: "EU" },
  { code: "AF", name: "Air France", region: "EU" },
  { code: "KL", name: "KLM", region: "EU" },
  { code: "HV", name: "Transavia", region: "EU" },
  { code: "LH", name: "Lufthansa", region: "EU" },
  { code: "EW", name: "Eurowings", region: "EU" },
  { code: "LX", name: "Swiss", region: "EU" },
  { code: "OS", name: "Austrian", region: "EU" },
  { code: "SN", name: "Brussels Airlines", region: "EU" },
  { code: "IB", name: "Iberia", region: "EU" },
  { code: "VY", name: "Vueling", region: "EU" },
  { code: "TP", name: "TAP Air Portugal", region: "EU" },
  { code: "AZ", name: "ITA Airways", region: "EU" },
  { code: "SK", name: "SAS", region: "EU" },
  { code: "DY", name: "Norwegian", region: "EU" },
  { code: "AY", name: "Finnair", region: "EU" },
  { code: "A3", name: "Aegean", region: "EU" },

  { code: "EK", name: "Emirates", region: "X" },
  { code: "QR", name: "Qatar Airways", region: "X" },
  { code: "EY", name: "Etihad", region: "X" },
  { code: "FZ", name: "flydubai", region: "X" },
  { code: "TK", name: "Turkish Airlines", region: "X" },
  { code: "PC", name: "Pegasus", region: "X" },
  { code: "PK", name: "PIA", region: "X" },
  { code: "AI", name: "Air India", region: "X" },
  { code: "MS", name: "EgyptAir", region: "X" },
  { code: "SV", name: "Saudia", region: "X" },
  { code: "AA", name: "American Airlines", region: "X" },
  { code: "DL", name: "Delta", region: "X" },
  { code: "UA", name: "United", region: "X" },
  { code: "AC", name: "Air Canada", region: "X" },
  { code: "SQ", name: "Singapore Airlines", region: "X" },
];

export const rightsAirlineByCode = Object.fromEntries(rightsAirlines.map((a) => [a.code, a])) as Record<string, RightsAirline>;

/**
 * Which rules a country's airports fall under (ISO country codes). EU261
 * covers the 27 EU countries, their outermost regions that carry their own
 * codes (Guadeloupe, Martinique, French Guiana, Réunion, Mayotte,
 * Saint-Martin), Iceland, Norway and Switzerland. The Canaries, Madeira and
 * the Azores come under Spain and Portugal. UK261 covers the UK only; the
 * Channel Islands, the Isle of Man and Gibraltar have their own codes and are
 * treated as outside both. TODO(confirm): Gibraltar, in the legal review.
 */
const euCountries = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT",
  "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GP", "MQ", "GF", "RE", "YT", "MF", "IS", "NO", "CH",
]);
export const regionForCountry = (code: string): Region => (code === "GB" ? "UK" : euCountries.has(code) ? "EU" : "X");

export type What = "delayed" | "cancelled" | "denied" | "missed";
export type DelayBand = "lt2" | "2to3" | "3to4" | "4p";
export type Notice = "lt7" | "7to14" | "gt14";
export type AirlineBase = Region;
export type Reason = "tech" | "crew" | "strikeAirline" | "weather" | "atc" | "strikeOther" | "security" | "none";

export const questions = {
  what: {
    label: "What happened?",
    options: [
      { v: "delayed", label: "Delayed", hint: "Arrived late" },
      { v: "cancelled", label: "Cancelled", hint: "Flight didn’t run" },
      { v: "denied", label: "Denied boarding", hint: "Overbooked, bumped" },
      { v: "missed", label: "Missed connection", hint: "On one booking" },
    ] as { v: What; label: string; hint: string }[],
  },
  delay: {
    label: "How late did you arrive?",
    hint: "At your final destination, when the doors opened",
    options: [
      { v: "lt2", label: "Under 2 hours" },
      { v: "2to3", label: "2 to 3 hours" },
      { v: "3to4", label: "3 to 4 hours" },
      { v: "4p", label: "4 hours or more" },
    ] as { v: DelayBand; label: string }[],
  },
  notice: {
    label: "When were you told?",
    hint: "Before the original departure date",
    options: [
      { v: "lt7", label: "Less than 7 days before" },
      { v: "7to14", label: "7 to 14 days before" },
      { v: "gt14", label: "More than 14 days before" },
    ] as { v: Notice; label: string }[],
  },
  airlineBase: {
    label: (airline: string) => `Where is ${airline} licensed?`,
    hint: "It matters for flights into the UK or EU. Your booking says who operated the flight.",
    options: [
      { v: "UK", label: "In the UK" },
      { v: "EU", label: "In the EU, Norway or Switzerland" },
      { v: "X", label: "Somewhere else" },
    ] as { v: AirlineBase; label: string }[],
  },
  reason: {
    label: "Reason the airline gave",
    options: [
      { v: "tech", label: "Technical problem" },
      { v: "crew", label: "Crew or staff shortage" },
      { v: "strikeAirline", label: "Strike by airline staff" },
      { v: "weather", label: "Bad weather" },
      { v: "atc", label: "Air traffic control" },
      { v: "strikeOther", label: "Airport or air traffic strike" },
      { v: "security", label: "Security or airport issue" },
      { v: "none", label: "No reason given" },
    ] as { v: Reason; label: string }[],
  },
} as const;

export const compensationCopy = {
  title: "Check what you’re owed",
  intro:
    "Delayed, cancelled or bumped off a flight? Answer a few questions and see what UK and EU passenger rights say you’re owed, per passenger and in total. Free, and it takes a minute.",
  points: ["UK261 and EU261 rules", "Free claim letter", "No sign-up"],
  metaTitle: "Flight delay compensation calculator (UK261 and EU261)",
  metaDescription:
    "Check how much compensation you’re owed for a delayed, cancelled or overbooked flight under UK261 and EU261: £220 to £520 or €250 to €600 per passenger.",
  form: {
    title: "Your flight",
    from: "Flew from",
    to: "Flew to",
    toHint: "Your final destination, if you had connections",
    airline: "Airline",
    airlineHint: "The airline that operated the flight",
    placeFrom: "Airport or city",
    placeAirline: "Airline name or code",
    date: "Flight date",
    dateHint: "The date your flight was due to leave",
    passengers: "Passengers on the booking",
    swap: "Swap airports",
  },
  progress: {
    title: "Your result appears here",
    left: (n: number) => (n === 1 ? "One more answer and we’ll work it out." : `${n} more answers and we’ll work it out.`),
    items: {
      from: "Where you flew from",
      to: "Where you flew to",
      airline: "The airline",
      airlineBase: "Where the airline is licensed",
      date: "The flight date",
      what: "What happened",
      delay: "How late you arrived",
      notice: "When you were told",
      reason: "The reason the airline gave",
    },
    lookup: "Checking that airport…",
    amounts: "UK rules pay £220 to £520 and EU rules €250 to €600 per passenger, depending on how far the flight was.",
  },
  result: {
    title: "Your result",
    owed: "You’re likely owed",
    maybe: "You may be owed",
    not: "Probably no compensation",
    perPassenger: "per passenger",
    total: (n: number) => (n === 1 ? "for 1 passenger" : `in total for ${n} passengers`),
    halved: "Halved for a 3 to 4 hour delay on a long flight",
    why: "How we worked it out",
    bands: ["Up to 1,500 km", "1,500 to 3,500 km", "Over 3,500 km"],
    claimBy: "Claim by",
    claimByNote: "in England and Wales (6 years). In Scotland the limit is 5 years; EU countries set their own.",
    outOfTime: "This flight is more than 6 years ago, past the time limit for claims in UK courts.",
    scotlandOnly: "More than 5 years ago: past the limit in Scotland, still in time in England and Wales.",
    future: "That date hasn’t happened yet. Check back after your flight if something goes wrong.",
    disclaimer: "A guide to UK and EU passenger rights, not legal advice. The airline or a court makes the final decision.",
  },
  claim: {
    title: "Ways to claim",
    intro: "Claiming direct is free and you keep every penny. A claims company does the chasing for you and takes a fee if you’re paid.",
    yourself: {
      name: "Claim it yourself",
      price: "Free. You keep 100%",
      points: ["Write to the airline with our ready-made letter", "Many airlines also have an online claim form", "If they refuse, you can escalate it"],
      cta: "Write my claim letter",
    },
    notOwed: {
      title: "Compensation looks unlikely from your answers.",
      text: "Depending on what happened, the airline may still owe you a refund or reasonable costs such as meals and a hotel. Change an answer above if something doesn’t match.",
    },
    partnerCta: (name: string) => `Claim with ${name}`,
    partnerNote: "We may earn a commission if you claim through this link.",
    share: {
      title: "Travelling with others?",
      text: "Send everyone on the booking a link with your answers filled in.",
      cta: "Copy share link",
      done: "Link copied",
      native: "Share",
    },
  },
  letter: {
    title: "Your claim letter",
    intro: "Fill in your details, then copy the letter into the airline’s claim form or an email.",
    name: "Your full name",
    booking: "Booking reference",
    flight: "Flight number",
    copy: "Copy letter",
    copied: "Copied",
    download: "Download .txt",
    close: "Close",
  },
  rules: {
    title: "The rules in brief",
    intro: "UK rules (UK261) and EU rules (EU261) set the same three distance bands. The amount is per passenger, whatever you paid for the ticket.",
    head: ["Flight distance", "UK flights (UK261)", "EU flights (EU261)"],
    rows: [
      ["Up to 1,500 km", "£220", "€250"],
      ["1,500 to 3,500 km", "£350", "€400"],
      ["Over 3,500 km", "£520", "€600"],
    ],
    notes: [
      "You need to arrive 3 hours or more late at your final destination for a delay to count.",
      "On flights over 3,500 km, a delay of 3 to 4 hours can be paid at half the amount.",
      "Nothing is owed if the cause was outside the airline’s control, such as bad weather or air traffic control restrictions. You’re still owed care: food, drink and a hotel if needed.",
    ],
    guide: "Read our full guide to delayed and cancelled flight rights",
  },
} as const;

/**
 * Claim companies, linked through our affiliate network (docs/TRAVELPAYOUTS.md).
 * Fee and points use Compensair's own wording from its programme terms
 * (17 Oct 2026): "No win, no fee", free to submit, 25–35% service fee only if
 * the customer is paid.
 *
 * AirHelp is listed in the network but not open to us yet: it needs three
 * months of steady monthly traffic, then "Submit for review" in the dashboard
 * (owner's call). Until then it isn't shown, as the link wouldn't earn.
 * Its terms then: 15% of AirHelp's fee (16.6% AirHelp+), 45-day cookie.
 */
export const claimPartners = [
  {
    id: "compensair",
    name: "Compensair",
    program: "compensair",
    url: "https://www.compensair.com/",
    fee: "No win, no fee",
    points: ["Free to submit your claim", "They deal with the airline for you", "Their fee is 25–35%, only if you’re paid"],
  },
] as const satisfies readonly { id: string; name: string; program: ProgramId; url: string; fee: string; points: readonly string[] }[];
