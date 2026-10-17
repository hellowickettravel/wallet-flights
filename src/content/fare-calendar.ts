// Copy and options for /fare-calendar. Prices come from the flight partner's
// Data API through /api/fare-calendar (src/lib/fare-calendar.ts); nothing here
// is a price.

export const fareCalendarCopy = {
  title: "Find the cheapest time to fly",
  intro:
    "See the lowest fare travellers found for every month and every day on your route, then pick the cheapest day and compare live prices.",
  points: ["12 months of fares", "Cheapest day highlighted", "Book with the provider"],
  metaTitle: "Fare calendar: find the cheapest time to fly",
  metaDescription:
    "Lowest fares by month and by day for your route, with direct-only, airline, airport and weekday filters. Pick the cheapest day, then compare live prices.",
  search: {
    from: "Leaving from",
    to: "Going to",
    trip: "Trip",
    oneWay: "One way",
    return: "Return",
    length: "Trip length",
    submit: "Show fares",
    same: "Choose two different places",
  },
  months: {
    title: "Lowest fare by month",
    note: (oneWay: boolean) =>
      oneWay
        ? "Lowest one-way fare per person found recently for departures in each month."
        : "Lowest total of an outbound and a return fare per person, found recently for departures in each month.",
    none: "No fare",
    cheapest: "Cheapest month",
  },
  insights: {
    cheapestMonth: "Cheapest month",
    cheapestDay: "Cheapest day to leave",
    dearestDay: "Dearest day to leave",
    more: (pct: number) => `${pct}% more on average`,
    from: "from",
    about: "about",
  },
  calendar: {
    prev: "Previous month",
    next: "Next month",
    low: "Cheaper days",
    high: "Dearer days",
    noFare: "No fare",
    past: "Past",
  },
  day: {
    title: (n: number) => (n === 1 ? "Cheapest fare" : `${n} cheapest fares`),
    withReturn: "with the cheapest return",
    cheapest: "Cheapest",
    direct: "Direct",
    select: "Select",
    returnLabel: "Return",
    includes: "incl.",
    empty: "No fares match these filters this month.",
    emptyHint: "Turn off a filter or pick another month.",
    pick: "Pick a day in the calendar to see its fares.",
  },
  flex: {
    title: "Flexible by a few days?",
    intro: "Return trip totals for one adult, three days either side of your dates.",
    leave: "Leave",
    back: "Return",
    corner: "Leave ↓ Return →",
  },
  filters: {
    title: "Filters",
    reset: "Reset",
    direct: "Direct flights only",
    days: "Leave on",
    maxPrice: "Max price",
    any: "Any",
    airports: "Departure airport",
    airlines: "Airlines",
    show: "Filters",
    from: "from",
  },
  popular: {
    title: (city: string) => `Popular from ${city}`,
    from: "from",
  },
  status: {
    loading: "Loading fares for the next 12 months…",
    locating: "Finding popular routes near you…",
    pickTitle: "Where do you want to go?",
    pickText: "Choose where you’re leaving from and where you’re going, and we’ll chart the lowest fares for the next 12 months.",
    error: "We couldn’t load fares just now. Please try again.",
    retry: "Try again",
    emptyTitle: "No recent fares on this route",
    emptyText: "Travellers haven’t searched this route lately, so there’s nothing to chart. Live search still checks every provider.",
    emptyCta: "Search live prices",
  },
  disclaimer:
    "Fares were found by travellers in the last few days and are per person in economy. They can change or sell out; the provider confirms the final price when you book.",
} as const;

export const tripLengths = [
  { nights: 2, label: "Weekend, 2 nights" },
  { nights: 3, label: "3 nights" },
  { nights: 4, label: "4 nights" },
  { nights: 5, label: "5 nights" },
  { nights: 7, label: "1 week" },
  { nights: 10, label: "10 nights" },
  { nights: 14, label: "2 weeks" },
] as const;

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const weekdayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

/**
 * Airline names for the IATA codes the Data API returns. Public facts; any
 * code not listed is shown as the code itself.
 */
export const carrierNames: Record<string, string> = {
  BA: "British Airways", VS: "Virgin Atlantic", U2: "easyJet", FR: "Ryanair", W6: "Wizz Air", LS: "Jet2",
  BY: "TUI Airways", EI: "Aer Lingus", VY: "Vueling", IB: "Iberia", UX: "Air Europa", AF: "Air France",
  KL: "KLM", HV: "Transavia", LH: "Lufthansa", EW: "Eurowings", LX: "Swiss", OS: "Austrian", SN: "Brussels Airlines",
  AZ: "ITA Airways", TP: "TAP Air Portugal", SK: "SAS", DY: "Norwegian", A3: "Aegean", TK: "Turkish Airlines",
  PC: "Pegasus", EK: "Emirates", QR: "Qatar Airways", EY: "Etihad", FZ: "flydubai", GF: "Gulf Air", WY: "Oman Air",
  SV: "Saudia", MS: "EgyptAir", ET: "Ethiopian", KQ: "Kenya Airways", PK: "PIA", AI: "Air India", "6E": "IndiGo",
  AA: "American Airlines", DL: "Delta", UA: "United", B6: "JetBlue", AC: "Air Canada", SQ: "Singapore Airlines",
  CX: "Cathay Pacific", JL: "Japan Airlines", NH: "ANA", TG: "Thai Airways",
};

export const carrierName = (code: string) => carrierNames[code] ?? code;

/** Airport names for codes outside src/content/airports.ts (public facts). */
export const extraAirportNames: Record<string, string> = {
  STN: "Stansted", LTN: "Luton", LCY: "London City", SEN: "Southend", ORY: "Paris Orly", BVA: "Beauvais",
  SAW: "Sabiha Gökçen", MXP: "Milan Malpensa", LIN: "Milan Linate", BGY: "Bergamo", CIA: "Rome Ciampino",
  LGA: "LaGuardia", MDW: "Chicago Midway", DWC: "Dubai World Central", GLA: "Glasgow", BRS: "Bristol",
};
