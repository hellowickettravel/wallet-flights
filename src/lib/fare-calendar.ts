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

async function direction(origin: string, destination: string, months: string[], currency: Currency) {
  const all = await Promise.all(months.map((m) => monthFares(origin, destination, m, currency)));
  return all.flat();
}

export async function fareCalendar(origin: string, destination: string, currency: Currency, withReturn: boolean): Promise<FareCalendarData> {
  const months = nextMonths();
  const [out, back] = await Promise.all([
    direction(origin, destination, months, currency),
    withReturn ? direction(destination, origin, months, currency) : Promise.resolve(undefined),
  ]);
  return { currency, months, out, back };
}
