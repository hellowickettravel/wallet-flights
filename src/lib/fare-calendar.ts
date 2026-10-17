// Fare calendar data: the flight partner's Data API `prices_for_dates`, one
// call per departure month (and per direction for return trips), cached
// hourly. Server-only; the browser reads it through /api/fare-calendar. Prices
// are cached search results, not live quotes, and are never estimated: when
// the API has nothing, the month is simply empty.
import { cacheLife, cacheTag } from "next/cache";
import type { Currency } from "@/content/deals";
import { get } from "@/lib/travelpayouts";

/** One fare on one day. Compact on purpose: a year of a busy route is ~2,000 of these. */
export type CalendarFare = {
  /** Departure date, local to the departure airport (YYYY-MM-DD). */
  date: string;
  /** Departure time, local (HH:MM). */
  time: string;
  airline: string;
  /** Departure and arrival airports (IATA). */
  from: string;
  to: string;
  stops: number;
  /** Flight time in minutes, when the API gives it. */
  mins?: number;
  price: number;
};

export type FareCalendarData = {
  currency: Currency;
  /** True only in development without a token: the page labels these as samples. */
  sample: boolean;
  /** The 12 departure months covered, YYYY-MM. */
  months: string[];
  out: CalendarFare[];
  /** Only for return trips: fares from the destination back to the origin. */
  back?: CalendarFare[];
};

type RawFare = {
  origin_airport?: string;
  destination_airport?: string;
  origin: string;
  destination: string;
  price: number;
  departure_at: string;
  transfers?: number;
  airline?: string;
  duration_to?: number;
  duration?: number;
};

/** The next 12 departure months, starting with the current one (UTC). */
export function nextMonths(now = new Date()) {
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1));
    return d.toISOString().slice(0, 7);
  });
}

/**
 * Keeps the cheapest fare per day for each airline, departure airport and
 * direct/connecting mix: enough for every filter to stay exact, a fraction of
 * the raw payload.
 */
function compact(raw: RawFare[], today: string): CalendarFare[] {
  const best = new Map<string, CalendarFare>();
  for (const r of raw) {
    if (!(r.price > 0) || !r.departure_at) continue;
    const date = r.departure_at.slice(0, 10);
    if (date < today) continue;
    const f: CalendarFare = {
      date,
      time: r.departure_at.slice(11, 16),
      airline: r.airline || "",
      from: r.origin_airport || r.origin,
      to: r.destination_airport || r.destination,
      stops: r.transfers ?? 0,
      mins: r.duration_to ?? r.duration ?? undefined,
      price: Math.round(r.price),
    };
    const key = `${f.date}|${f.airline}|${f.from}|${f.stops > 0}`;
    const seen = best.get(key);
    if (!seen || f.price < seen.price) best.set(key, f);
  }
  return [...best.values()].sort((a, b) => a.date.localeCompare(b.date) || a.price - b.price);
}

/** One-way fares departing in one month. */
async function monthFares(origin: string, destination: string, month: string, currency: Currency): Promise<CalendarFare[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("tp-prices", `tp-calendar-${origin}-${destination}`);
  const data = await get<RawFare[]>("prices_for_dates", {
    origin,
    destination,
    departure_at: month,
    one_way: "true",
    direct: "false",
    currency: currency.toLowerCase(),
    sorting: "price",
    unique: "false",
    limit: "1000",
    page: "1",
  });
  return compact(data ?? [], new Date().toISOString().slice(0, 10));
}

const hasToken = () => !!process.env.TRAVELPAYOUTS_TOKEN;
/** Sample fares exist so the layout can be reviewed locally. Never in production. */
const sampleMode = () => !hasToken() && process.env.NODE_ENV === "development";

async function direction(origin: string, destination: string, months: string[], currency: Currency) {
  if (sampleMode()) return months.flatMap((m) => sampleMonth(origin, destination, m, currency));
  const all = await Promise.all(months.map((m) => monthFares(origin, destination, m, currency)));
  return all.flat();
}

export async function fareCalendar(origin: string, destination: string, currency: Currency, withReturn: boolean): Promise<FareCalendarData> {
  const months = nextMonths();
  const [out, back] = await Promise.all([
    direction(origin, destination, months, currency),
    withReturn ? direction(destination, origin, months, currency) : Promise.resolve(undefined),
  ]);
  return { currency, sample: sampleMode(), months, out, back };
}

// ---------------------------------------------------------------------------
// Development-only sample data (see sampleMode). Deterministic per route and
// month, so the page looks the same on every reload. Not real prices.

function rng(seed: string) {
  let a = 0;
  for (const c of seed) a = (a * 31 + c.charCodeAt(0)) | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const sampleAirports: Record<string, string[]> = {
  LON: ["LHR", "LGW", "STN", "LTN"],
  NYC: ["JFK", "EWR"],
  PAR: ["CDG", "ORY"],
  MIL: ["MXP", "LIN"],
  ROM: ["FCO"],
  IST: ["IST", "SAW"],
};
const sampleCarriers = ["U2", "BA", "FR", "VY", "W6", "TK"];
const season = [0.82, 0.76, 0.86, 0.95, 1, 1.08, 1.26, 1.3, 1, 0.92, 0.8, 1.14];
const week = [1, 0.86, 0.89, 1.02, 1.16, 1.05, 1.13];

function sampleMonth(origin: string, destination: string, month: string, currency: Currency): CalendarFare[] {
  const r = rng(`${origin}${destination}${month}`);
  const base = 40 + (((origin.charCodeAt(0) * 7 + destination.charCodeAt(1) * 13) % 9) * 22) * (currency === "USD" ? 1.25 : 1);
  const [y, m] = month.split("-").map(Number);
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const today = new Date().toISOString().slice(0, 10);
  const froms = sampleAirports[origin] ?? [origin];
  const tos = sampleAirports[destination] ?? [destination];
  const out: CalendarFare[] = [];
  for (let d = 1; d <= days; d++) {
    const date = `${month}-${String(d).padStart(2, "0")}`;
    if (date < today || r() < 0.06) continue;
    const dow = (new Date(`${date}T12:00:00Z`).getUTCDay() + 6) % 7;
    const n = 2 + Math.floor(r() * 4);
    for (let i = 0; i < n; i++) {
      const stops = r() < 0.75 ? 0 : 1;
      const minute = 6 * 60 + Math.floor(r() * 60) * 15;
      out.push({
        date,
        time: `${String(Math.floor(minute / 60) % 24).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`,
        airline: sampleCarriers[Math.floor(r() * sampleCarriers.length)],
        from: froms[Math.floor(r() * froms.length)],
        to: tos[Math.floor(r() * tos.length)],
        stops,
        mins: 95 + Math.floor(r() * 60) + stops * 140,
        price: Math.round(base * season[m - 1] * week[dow] * (stops ? 0.86 : 1) * (0.84 + r() * 0.42)),
      });
    }
  }
  return compact(
    out.map((f) => ({ origin, destination, origin_airport: f.from, destination_airport: f.to, price: f.price, departure_at: `${f.date}T${f.time}:00`, transfers: f.stops, airline: f.airline, duration_to: f.mins })),
    today,
  );
}
