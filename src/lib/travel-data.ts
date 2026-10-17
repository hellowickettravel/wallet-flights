// Reference data from the flight partner's public data files (no token
// needed): every airport and city with scheduled flights, country names and
// airline names. Reduced to what our tools use and cached for a day.
// Server-only; the browser reads it through /api/airport and /api/airlines.
import { cacheLife, cacheTag } from "next/cache";
import { airports as curated, type Airport } from "@/content/airports";

const DATA = "https://api.travelpayouts.com/data/en";

/** An airport or a city (all its airports), with what the tools need to know about it. */
export type Place = Airport & { countryCode: string; lat: number; lon: number; timeZone: string; cityCode: string };

type Named = { name: string | null; name_translations?: { en?: string } };
type RawAirport = Named & { code: string; city_code: string; country_code: string; time_zone: string; coordinates?: { lat: number; lon: number }; iata_type?: string; flightable?: boolean };
type RawCity = Named & { code: string; country_code: string; time_zone: string; coordinates?: { lat: number; lon: number }; has_flightable_airport?: boolean };
type RawCountry = Named & { code: string };
type RawAirline = Named & { code: string };

const en = (r: Named) => (r.name_translations?.en || r.name || "").trim();
const IATA = /^[A-Z]{3}$/;

async function load<T>(file: string): Promise<T[]> {
  const res = await fetch(`${DATA}/${file}.json`, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`${file}.json: ${res.status}`);
  return (await res.json()) as T[];
}

/** Airport names in the data end in "Airport" or "International Airport"; the city line already says it's an airport. */
const shortName = (name: string, city: string) => name.replace(/\s+(International\s+)?Airport$/i, "").replace(new RegExp(`^${city}\\s+`, "i"), "") || name;

/** code → place, for every airport and city that has scheduled flights. Throws on failure, so failures aren't cached. */
async function placeTable(): Promise<Record<string, Place>> {
  "use cache";
  cacheLife("days");
  cacheTag("travel-data");
  const [airports, cities, countries] = await Promise.all([load<RawAirport>("airports"), load<RawCity>("cities"), load<RawCountry>("countries")]);
  const country = new Map(countries.map((c) => [c.code, en(c)]));
  const cityName = new Map(cities.map((c) => [c.code, en(c)]));
  const out: Record<string, Place> = {};
  for (const c of cities) {
    if (!c.has_flightable_airport || !IATA.test(c.code) || !c.coordinates) continue;
    const name = en(c);
    out[c.code] = { code: c.code, city: name, name: "All airports", country: country.get(c.country_code) ?? c.country_code, countryCode: c.country_code, lat: c.coordinates.lat, lon: c.coordinates.lon, timeZone: c.time_zone, cityCode: c.code };
  }
  // An airport sharing its city's code (FAO) replaces the city entry: it's the only airport there.
  for (const a of airports) {
    if (!a.flightable || a.iata_type !== "airport" || !IATA.test(a.code) || !a.coordinates) continue;
    const city = cityName.get(a.city_code) || en(a);
    out[a.code] = { code: a.code, city, name: shortName(en(a), city), country: country.get(a.country_code) ?? a.country_code, countryCode: a.country_code, lat: a.coordinates.lat, lon: a.coordinates.lon, timeZone: a.time_zone, cityCode: a.city_code };
  }
  if (Object.keys(out).length < 1000) throw new Error("places data looks incomplete");
  return out;
}

async function airlineTable(): Promise<Record<string, string>> {
  "use cache";
  cacheLife("days");
  cacheTag("travel-data");
  const out: Record<string, string> = {};
  for (const a of await load<RawAirline>("airlines")) {
    const name = en(a);
    if (/^[A-Z0-9]{2}$/.test(a.code) && name) out[a.code] = name;
  }
  if (Object.keys(out).length < 300) throw new Error("airline data looks incomplete");
  return out;
}

async function safe<T>(f: () => Promise<T>): Promise<T | null> {
  try {
    return await f();
  } catch {
    return null;
  }
}

export async function placeByCode(code: string): Promise<Place | null> {
  const table = await safe(placeTable);
  return table?.[code.toUpperCase()] ?? null;
}

/** Airlines whose code or name matches, best first (code, then name start, then anywhere). */
export async function findAirlines(q: string, limit = 8): Promise<{ ok: boolean; airlines: { code: string; name: string }[] }> {
  const table = await safe(airlineTable);
  if (!table) return { ok: false, airlines: [] };
  const s = q.trim().toLowerCase();
  const scored: { code: string; name: string; score: number }[] = [];
  for (const [code, name] of Object.entries(table)) {
    const n = name.toLowerCase();
    const score = code.toLowerCase() === s ? 0 : n.startsWith(s) ? 1 : n.includes(` ${s}`) ? 2 : n.includes(s) ? 3 : -1;
    if (score >= 0) scored.push({ code, name, score });
  }
  scored.sort((a, b) => a.score - b.score || a.name.length - b.name.length);
  return { ok: true, airlines: scored.slice(0, limit).map(({ code, name }) => ({ code, name })) };
}

export async function airlineByCode(code: string) {
  const table = await safe(airlineTable);
  const name = table?.[code.toUpperCase()];
  return name ? { code: code.toUpperCase(), name } : null;
}

const km = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
  const t = Math.PI / 180;
  const h = Math.sin(((b.lat - a.lat) * t) / 2) ** 2 + Math.cos(a.lat * t) * Math.cos(b.lat * t) * Math.sin(((b.lon - a.lon) * t) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};

/**
 * A good place to start a fare search from, for someone at `at`: a major city
 * from our search list within 150 km, else the nearest city with flights in
 * the same country within 300 km. Null when nothing fits: the visitor picks.
 * Without coordinates, the city their time zone is named after, or a major
 * city in that zone.
 */
export async function startingCity(at: { lat: number; lon: number; country?: string } | null, timeZone?: string): Promise<Place | null> {
  const table = await safe(placeTable);
  if (!table) return null;
  // Our search list's cities, in its order (busiest first), as city codes.
  const hubs = [...new Set(curated.map((a) => table[a.code]?.cityCode).filter((c): c is string => !!c && !!table[c]))].map((c) => table[c]);
  if (at) {
    const near = hubs.map((p) => ({ p, d: km(at, p) })).sort((a, b) => a.d - b.d)[0];
    if (near && near.d <= 150) return near.p;
    const local = Object.values(table)
      // City-level entries only: a city, or an airport that is its city's only one (same code).
      .filter((p) => p.code === p.cityCode && (!at.country || p.countryCode === at.country))
      .map((p) => ({ p, d: km(at, p) }))
      .sort((a, b) => a.d - b.d)[0];
    return local && local.d <= 300 ? local.p : null;
  }
  if (!timeZone) return null;
  // Time zones are named after a city ("Asia/Karachi"): start there when it has flights, else at a major city in the zone.
  const tzCity = timeZone.split("/").pop()!.replace(/_/g, " ").toLowerCase();
  const named = Object.values(table).find((p) => p.code === p.cityCode && p.timeZone === timeZone && p.city.toLowerCase() === tzCity);
  return named ?? hubs.find((p) => p.timeZone === timeZone) ?? null;
}
