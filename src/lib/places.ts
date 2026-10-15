// Worldwide city and airport lookup for the search form. Server-only: the
// browser asks our /api/places route, so visitors' IP addresses never reach
// the lookup service. Public endpoint, no token needed.
import { cacheLife, cacheTag } from "next/cache";
import type { Airport } from "@/content/airports";

const API = "https://autocomplete.travelpayouts.com/places2";

type RawPlace = {
  type: "city" | "airport";
  code: string;
  name: string;
  country_name: string;
  city_name?: string;
};

/**
 * Up to 8 matches, best first. A city covers all of its airports. Failures
 * throw, so they're never cached (a cached empty answer would blank that
 * search for days); use lookupPlaces() to call it.
 */
async function findPlaces(term: string): Promise<Airport[]> {
  "use cache";
  cacheLife("days");
  cacheTag("places");
  const params = new URLSearchParams({ term, locale: "en" });
  params.append("types[]", "city");
  params.append("types[]", "airport");
  const res = await fetch(`${API}?${params}`, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`places lookup failed: ${res.status}`);
  // The service also returns fuzzy matches ("lisb" → Budapest): put places
  // whose code, city or name actually contains the text first.
  const has = (p: RawPlace) => `${p.code} ${p.name} ${p.city_name ?? ""}`.toLowerCase().includes(term);
  const raw = ((await res.json()) as RawPlace[]).map((p, i) => ({ p, i, hit: has(p) ? 0 : 1 }));
  raw.sort((a, b) => a.hit - b.hit || a.i - b.i);
  const seen = new Set<string>();
  const out: Airport[] = [];
  for (const { p } of raw) {
    // A city and its main airport can share a code (DEL): keep the first.
    if (!/^[A-Z]{3}$/.test(p.code) || seen.has(p.code)) continue;
    seen.add(p.code);
    out.push(
      p.type === "city"
        ? { code: p.code, city: p.name, name: "All airports", country: p.country_name }
        : { code: p.code, city: p.city_name || p.name, name: p.name, country: p.country_name },
    );
    if (out.length === 8) break;
  }
  // An empty answer may be the service failing quietly: don't cache it either.
  if (!out.length) throw new Error("places lookup returned nothing");
  return out;
}

/** `ok: false` when the lookup service failed: the caller must not cache that. */
export async function lookupPlaces(term: string): Promise<{ ok: boolean; places: Airport[] }> {
  try {
    return { ok: true, places: await findPlaces(term) };
  } catch {
    return { ok: false, places: [] };
  }
}
