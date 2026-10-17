import { NextResponse, type NextRequest } from "next/server";
import type { Airport } from "@/content/airports";
import type { Currency } from "@/content/deals";
import { placeByCode, startingCity, type Place } from "@/lib/travel-data";
import { popularFrom } from "@/lib/travelpayouts";

export type CalendarStart = {
  /** Where to start from: the `from` asked for, else a city near the visitor, else null (they pick). */
  from: Airport | null;
  currency: Currency;
  /** Popular destinations from there, with the cheapest fare found recently. */
  destinations: { to: Airport; price: number }[];
};

const asAirport = ({ code, city, name, country }: Place): Airport => ({ code, city, name, country });

/**
 * Starting point for the fare calendar: GET /api/fare-calendar/start?from=LON
 * Without `from`, the visitor's approximate location (from Vercel's geo
 * headers, not stored) or their time zone (`tz`) picks a nearby city.
 */
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const asked = (p.get("from") ?? "").toUpperCase();
  let place: Place | null = null;
  if (/^[A-Z]{3}$/.test(asked)) place = await placeByCode(asked);
  else {
    const lat = Number.parseFloat(req.headers.get("x-vercel-ip-latitude") ?? "");
    const lon = Number.parseFloat(req.headers.get("x-vercel-ip-longitude") ?? "");
    const country = req.headers.get("x-vercel-ip-country") ?? undefined;
    const at = Number.isFinite(lat) && Number.isFinite(lon) ? { lat, lon, country } : null;
    place = await startingCity(at, p.get("tz")?.slice(0, 64) || undefined);
  }
  const currency: Currency = place?.countryCode === "GB" ? "GBP" : "USD";
  const origin = place?.cityCode ?? null;
  const fares = origin ? await popularFrom(origin, currency) : [];
  const places = await Promise.all(fares.map((f) => placeByCode(f.destination)));
  const destinations = fares.flatMap((f, i) => {
    const to = places[i];
    return to && to.cityCode !== origin ? [{ to: asAirport(to), price: f.price }] : [];
  });
  const body: CalendarStart = { from: place ? asAirport(place) : null, currency, destinations };
  // An answer for a named city can be shared; one based on location can't.
  const shared = !!asked && destinations.length > 0;
  return NextResponse.json(body, { headers: { "Cache-Control": shared ? "public, s-maxage=3600, stale-while-revalidate=86400" : "private, no-store" } });
}
