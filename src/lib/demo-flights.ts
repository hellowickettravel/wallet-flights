// Demo fare engine. Produces realistic-looking, *stable* results for any search
// (same search → same results) until a live fare API is connected. Nothing here
// is a real price or schedule; the results page labels it as a demo.
import { airlines, airlineByCode, type Airline } from "@/content/airlines";
import { airports } from "@/content/airports";
import type { Currency } from "@/content/deals";
import { distanceKm, utcOffset } from "@/lib/geo";
import type { Cabin, QueryLeg, SearchQuery } from "@/lib/search-query";

export type Segment = {
  from: string;
  to: string;
  flightNo: string;
  departMin: number; // minutes from local midnight on day 0 (local to `from`)
  durationMin: number;
};

export type Journey = {
  from: string;
  to: string;
  date: string;
  departMin: number; // local, origin
  arriveMin: number; // local, destination (may exceed 1440 → next day)
  durationMin: number;
  stops: number;
  via: string[];
  layoverMin: number[];
  segments: Segment[];
};

export type ProviderPrice = { provider: string; price: number; isAirline: boolean };

export type Itinerary = {
  id: string;
  airline: Airline;
  journeys: Journey[];
  price: number; // per person, cheapest provider
  total: number; // all travellers
  currency: Currency;
  providers: ProviderPrice[];
  cabinBag: boolean;
  checkedBag: boolean;
  refundable: boolean;
  seatsLeft?: number;
};

export type DemoResults = { itineraries: Itinerary[]; currency: Currency; providerCount: number };

const UK = new Set(["LON", "LHR", "LGW", "MAN", "EDI", "BHX"]);
const EUROPE = new Set([...UK, "CDG", "FCO", "MAD", "BCN", "LIS", "AMS", "FRA", "IST"]);
const OTAS = ["Tripnest", "Jetfare", "Skyvault", "Farewise"];
const CABIN_FACTOR: Record<Cabin, number> = { economy: 1, premium: 1.65, business: 3.4, first: 5.6 };
const GBP_PER_USD = 0.79;

// --- seeded randomness -------------------------------------------------------
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return h >>> 0;
}
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- helpers -------------------------------------------------------------------
const norm = (code: string) => (code === "NYC" ? "JFK" : code === "LON" ? "LHR" : code);
const flightMinutes = (km: number) => Math.round(km / 13.5 + 35); // ~810 km/h + taxi/climb
const countryByCode = Object.fromEntries(airports.map((a) => [a.code, a.country]));
const countryOf = (code: string) => countryByCode[code];

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

type Route = { airline: Airline; via: string[] };

/** Plausible ways to fly A→B: hub carriers nonstop, others via their hub. */
function routesFor(a: string, b: string): Route[] {
  const direct = distanceKm(a, b);
  const routes: Route[] = [];
  for (const al of airlines) {
    const hub = al.hub;
    const isHome = hub === a || hub === b || countryOf(a) === al.country || countryOf(b) === al.country;
    if (al.lowCost) {
      if (EUROPE.has(a) && EUROPE.has(b) && direct < 3200 && (UK.has(a) || UK.has(b))) routes.push({ airline: al, via: [] });
      continue;
    }
    if (!al.longHaul && direct > 5000) continue;
    if (isHome && direct < 15500) routes.push({ airline: al, via: [] });
    else if (hub !== a && hub !== b) {
      const detour = distanceKm(a, hub) + distanceKm(hub, b);
      if (detour <= direct * 1.3 + 1200) routes.push({ airline: al, via: [hub] });
    }
  }
  if (routes.length) return routes;
  // Unusual city pairs: fall back to the four hubs with the smallest detour.
  return airlines
    .filter((al) => al.longHaul && al.hub !== a && al.hub !== b)
    .map((al) => ({ al, detour: distanceKm(a, al.hub) + distanceKm(al.hub, b) }))
    .sort((x, y) => x.detour - y.detour)
    .slice(0, 4)
    .map(({ al }) => ({ airline: al, via: [al.hub] }));
}

function buildJourney(leg: { from: string; to: string; date: string }, route: Route, departMin: number, r: () => number, idx: number): Journey {
  const stops = [norm(leg.from), ...route.via, norm(leg.to)];
  const segments: Segment[] = [];
  const layovers: number[] = [];
  let clockUtc = departMin - utcOffset(stops[0]) * 60;
  for (let i = 0; i < stops.length - 1; i++) {
    const dur = flightMinutes(distanceKm(stops[i], stops[i + 1])) + Math.round(r() * 20);
    const localDepart = clockUtc + utcOffset(stops[i]) * 60;
    segments.push({
      from: stops[i],
      to: stops[i + 1],
      flightNo: `${route.airline.code} ${100 + ((idx * 37 + i * 211 + Math.floor(r() * 800)) % 899)}`,
      departMin: localDepart,
      durationMin: dur,
    });
    clockUtc += dur;
    if (i < stops.length - 2) {
      const lay = 65 + Math.round(r() * 175);
      layovers.push(lay);
      clockUtc += lay;
    }
  }
  const startUtc = departMin - utcOffset(stops[0]) * 60;
  return {
    from: leg.from,
    to: leg.to,
    date: leg.date,
    departMin,
    arriveMin: clockUtc + utcOffset(stops[stops.length - 1]) * 60,
    durationMin: clockUtc - startUtc,
    stops: route.via.length,
    via: route.via,
    layoverMin: layovers,
    segments,
  };
}

/** Departure dates may be missing for deep links; fill sensible defaults. */
export function withDefaultDates(q: SearchQuery, todayIso: string): SearchQuery {
  const legs: QueryLeg[] = q.legs.map((l, i) => ({ ...l, date: l.date || addDays(todayIso, 21 + i * 5) }));
  const returnDate = q.trip === "round" ? q.returnDate || addDays(legs[0].date, 7) : undefined;
  return { ...q, legs, returnDate };
}

export function generateDemoResults(q: SearchQuery): DemoResults {
  const origin = q.legs[0].from.code;
  const currency: Currency = UK.has(origin) ? "GBP" : "USD";
  const fx = currency === "GBP" ? GBP_PER_USD : 1;
  const paying = q.adults + q.children + q.infants * 0.1;

  const legs = [...q.legs.map((l) => ({ from: l.from.code, to: l.to.code, date: l.date }))];
  if (q.trip === "round" && q.returnDate) legs.push({ from: legs[0].to, to: legs[0].from, date: q.returnDate });

  const seed = hash(JSON.stringify([legs, q.cabin]));
  const r = rng(seed);
  const outbound = routesFor(norm(legs[0].from), norm(legs[0].to));
  const itineraries: Itinerary[] = [];

  outbound.forEach((route, ri) => {
    const times = 1 + Math.floor(r() * 2.6); // 1–3 departures per route
    for (let t = 0; t < times; t++) {
      const departMin = 6 * 60 + Math.round((r() * 16 * 60) / 5) * 5; // 06:00–22:00
      const journeys = legs.map((leg, li) => {
        const legRoute: Route =
          li === 0 ? route : { airline: route.airline, via: route.via.length ? [route.airline.hub].filter((h) => h !== norm(leg.from) && h !== norm(leg.to)) : [] };
        const dm = li === 0 ? departMin : 7 * 60 + Math.round((r() * 14 * 60) / 5) * 5;
        return buildJourney(leg, legRoute, dm, r, ri * 3 + t + li);
      });

      const km = legs.reduce((s, l) => s + distanceKm(norm(l.from), norm(l.to)), 0);
      const base = (45 + km * 0.058) * CABIN_FACTOR[q.cabin];
      const shape = journeys[0].stops === 0 ? 1.12 : 0.9;
      const brand = route.airline.lowCost ? 0.62 : ["EK", "QR", "SQ", "VS", "JL"].includes(route.airline.code) ? 1.12 : 0.92 + r() * 0.22;
      const timeOfDay = departMin < 9 * 60 || departMin > 20 * 60 ? 0.94 : 1.03;
      const airlinePrice = Math.round(base * shape * brand * timeOfDay * fx * (0.9 + r() * 0.25));

      const providers: ProviderPrice[] = [{ provider: `${route.airline.name}`, price: airlinePrice, isAirline: true }];
      const otaCount = 1 + Math.floor(r() * 3);
      const shuffled = [...OTAS].sort(() => r() - 0.5).slice(0, otaCount);
      for (const ota of shuffled) providers.push({ provider: ota, price: Math.round(airlinePrice * (0.93 + r() * 0.12)), isAirline: false });
      providers.sort((a, b) => a.price - b.price);

      const price = providers[0].price;
      itineraries.push({
        id: `${route.airline.code}-${ri}-${t}`,
        airline: route.airline,
        journeys,
        price,
        total: Math.round(price * paying),
        currency,
        providers,
        cabinBag: true,
        checkedBag: !route.airline.lowCost && (km > 2500 || q.cabin !== "economy"),
        refundable: q.cabin === "business" || q.cabin === "first" ? r() > 0.3 : r() > 0.78,
        seatsLeft: r() > 0.82 ? 2 + Math.floor(r() * 4) : undefined,
      });
    }
  });

  return { itineraries, currency, providerCount: OTAS.length + new Set(outbound.map((o) => o.airline.code)).size };
}

// --- presentation helpers ------------------------------------------------------
export const clock = (min: number) => {
  const m = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};
export const dayOffset = (min: number) => Math.floor(min / 1440);
export const durationLabel = (min: number) => `${Math.floor(min / 60)}h ${String(min % 60).padStart(2, "0")}m`;
export const stopsLabel = (n: number) => (n === 0 ? "Nonstop" : n === 1 ? "1 stop" : `${n} stops`);
export const totalDuration = (it: Itinerary) => it.journeys.reduce((s, j) => s + j.durationMin, 0);
export const maxStops = (it: Itinerary) => Math.max(...it.journeys.map((j) => j.stops));
export { airlineByCode };

/** Approximate nonstop flight time between two airports, for guide pages. */
export function approxFlightTime(a: string, b: string) {
  const km = distanceKm(norm(a), norm(b));
  const mins = Math.round(flightMinutes(km) / 30) * 30;
  return { km, label: `${Math.floor(mins / 60)}h${mins % 60 ? " 30m" : ""}`, longHaul: km > 15500 };
}
