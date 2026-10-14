// Aviasales Data API (Travelpayouts): cached prices that Aviasales users found
// in the last few days. Server-only — the token is read from the environment
// and never reaches the browser. Every function returns null / [] when the
// token is missing, the API fails or there is no data: callers then hide the
// price. We never estimate one.
import { cacheLife, cacheTag } from "next/cache";
import type { Currency } from "@/content/deals";

const API = "https://api.travelpayouts.com/aviasales/v3";

export type Fare = {
  origin: string;
  destination: string;
  price: number;
  currency: Currency;
  departureAt: string; // ISO date-time
  returnAt?: string;
  transfers: number;
  airline?: string;
  /** Aviasales search path for this fare, e.g. "/search/LON2611NYC0312?t=…" */
  link?: string;
};

export type MonthFare = { month: string; price: number; currency: Currency; departureAt: string; link?: string; transfers: number };

type RawFare = {
  origin: string;
  destination: string;
  price: number;
  departure_at: string;
  return_at?: string;
  transfers?: number;
  airline?: string;
  link?: string;
};

async function get<T>(path: string, params: Record<string, string>): Promise<T | null> {
  const token = process.env.TRAVELPAYOUTS_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(`${API}/${path}?${new URLSearchParams(params)}`, {
      headers: { "X-Access-Token": token, "Accept-Encoding": "gzip, deflate" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { success?: boolean; data?: T };
    return body.success && body.data ? body.data : null;
  } catch {
    return null;
  }
}

const future = (iso: string) => new Date(iso).getTime() > Date.now();

function toFare(r: RawFare, currency: Currency): Fare | null {
  if (!(r.price > 0) || !r.departure_at || !future(r.departure_at)) return null;
  return {
    origin: r.origin,
    destination: r.destination,
    price: Math.round(r.price),
    currency,
    departureAt: r.departure_at,
    returnAt: r.return_at || undefined,
    transfers: r.transfers ?? 0,
    airline: r.airline || undefined,
    link: r.link || undefined,
  };
}

/** Cheapest round-trip fare found recently on a route (any dates). */
export async function cheapestFare(origin: string, destination: string, currency: Currency): Promise<Fare | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("tp-prices", `tp-route-${origin}-${destination}`);
  const data = await get<RawFare[]>("prices_for_dates", {
    origin,
    destination,
    currency: currency.toLowerCase(),
    one_way: "false",
    sorting: "price",
    unique: "false",
    limit: "10",
    page: "1",
  });
  return (data ?? []).map((r) => toFare(r, currency)).find(Boolean) ?? null;
}

/** Cheapest fare per departure month on a route, for the month calendar. */
export async function cheapestByMonth(origin: string, destination: string, currency: Currency): Promise<MonthFare[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("tp-prices", `tp-months-${origin}-${destination}`);
  const data = await get<Record<string, RawFare>>("grouped_prices", {
    origin,
    destination,
    currency: currency.toLowerCase(),
    group_by: "month",
  });
  return Object.entries(data ?? {})
    .flatMap(([month, r]): MonthFare[] => {
      const f = toFare(r, currency);
      return f ? [{ month: month.slice(0, 7), price: f.price, currency, departureAt: f.departureAt, link: f.link, transfers: f.transfers }] : [];
    })
    .sort((a, b) => a.month.localeCompare(b.month));
}

/** Cheapest fares for many routes at once; missing routes are simply absent. */
export async function faresFor(routes: { origin: string; destination: string; currency: Currency }[]) {
  const fares = await Promise.all(routes.map((r) => cheapestFare(r.origin, r.destination, r.currency)));
  const out: Record<string, Fare> = {};
  routes.forEach((r, i) => {
    const f = fares[i];
    if (f) out[`${r.origin}-${r.destination}`] = f;
  });
  return out;
}
