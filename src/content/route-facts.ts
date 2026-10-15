// Per-route facts for /routes/[slug] (plan item 4.5, 16 Oct 2026). Only what
// is certain or can be calculated: time zones (IANA names, so clock changes
// come from the runtime's time-zone data), the airports that serve each
// departure city, and the passenger-rights rules for the departure country
// (sources checked 16 Oct 2026). Which airlines fly a route nonstop is left
// out: airport and airline sites don't confirm nonstop service in a form we
// could check. TODO(confirm): add nonstop airlines per route once checked
// against airline timetables.

/** IANA time zone for each departure city and destination. */
export const timeZones: Record<string, string> = {
  // Departure cities (origin codes in src/content/deals.ts)
  NYC: "America/New_York",
  LON: "Europe/London",
  LAX: "America/Los_Angeles",
  MAN: "Europe/London",
  ORD: "America/Chicago",
  ATL: "America/New_York",
  // Destinations (slugs in src/content/destinations.ts)
  london: "Europe/London",
  paris: "Europe/Paris",
  rome: "Europe/Rome",
  barcelona: "Europe/Madrid",
  lisbon: "Europe/Lisbon",
  tokyo: "Asia/Tokyo",
  bali: "Asia/Makassar",
  singapore: "Asia/Singapore",
  bangkok: "Asia/Bangkok",
  sydney: "Australia/Sydney",
  dubai: "Asia/Dubai",
  istanbul: "Europe/Istanbul",
  cairo: "Africa/Cairo",
  "cape-town": "Africa/Johannesburg",
  delhi: "Asia/Kolkata",
  cancun: "America/Cancun",
  "rio-de-janeiro": "America/Sao_Paulo",
  "mexico-city": "America/Mexico_City",
  cusco: "America/Lima",
  "new-york": "America/New_York",
};

/** The airports that serve each departure city. */
export const originAirports: Record<string, string> = {
  NYC: "JFK and Newark handle most international flights; LaGuardia is mainly for flights within the US and to Canada.",
  LON: "Heathrow and Gatwick handle most long-haul flights; Stansted, Luton, London City and Southend serve mainly European routes.",
  LAX: "Los Angeles International (LAX) handles almost all of the city’s international flights.",
  MAN: "Manchester Airport is the main airport for the north of England, with flights across Europe and some long-haul routes.",
  ORD: "O’Hare handles Chicago’s international flights; Midway is mainly for flights within the US.",
  ATL: "Hartsfield-Jackson Atlanta International is the city’s airport and Delta’s main hub.",
};

/** Passenger-rights notes by departure country, with the official source. */
export const rights = {
  uk: {
    text: "Flights leaving a UK airport are covered by UK rules on any airline. If your flight is cancelled you can choose a refund or another flight, and you may be able to claim compensation if you were told less than 14 days before departure. Compensation depends on the flight’s distance.",
    source: { label: "UK Civil Aviation Authority: Cancellations", url: "https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/cancellations/" },
    /** CAA distance bands, km. */
    bands: [
      { max: 1500, label: "under 1,500km" },
      { max: 3500, label: "1,500km to 3,500km" },
      { max: Infinity, label: "over 3,500km" },
    ],
  },
  us: {
    text: "Under US Department of Transportation rules, if the airline cancels your flight or changes it significantly and you choose not to travel, you’re entitled to a refund, even on a non-refundable ticket. On international trips, leaving 6 hours or more earlier, or arriving 6 hours or more later, than scheduled counts as a significant change.",
    source: { label: "US Department of Transportation: Refunds", url: "https://www.transportation.gov/individuals/aviation-consumer-protection/refunds" },
  },
} as const;
