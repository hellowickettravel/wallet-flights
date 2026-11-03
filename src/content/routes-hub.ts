// The /routes hub: every published route page, grouped by departure city
// (Growth proposal phase 2, pillar B, 3 Nov 2026).
export const routesHub = {
  title: "Flight routes from the UK and US",
  seoTitle: "Flight routes from London, Manchester and US cities",
  intro:
    "Flight times, distances, time differences, airports and your rights for popular routes from London, Manchester, Birmingham, New York, Boston, Los Angeles, Chicago and Atlanta, with live fares where we have them.",
  description:
    "Flight time, distance, time difference and live fares for routes from London, Manchester, Birmingham, New York, Boston, Chicago and more.",
  byCity: (city: string) => `Flights from ${city}`,
  count: (n: number) => `${n} route${n === 1 ? "" : "s"}`,
  destinationsLink: "Or browse by destination",
} as const;
