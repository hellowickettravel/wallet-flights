import { rights, timeZones } from "@/content/route-facts";
import { cacheLife } from "next/cache";
import { routeBySlug, type Route } from "@/content/deals";
import { distanceKm } from "@/lib/geo";

const ukOrigins = new Set(["LON", "MAN"]);
const usOrigins = new Set(["NYC", "LAX", "ORD", "ATL"]);
const mainAirport = (code: string) => (code === "NYC" ? "JFK" : code === "LON" ? "LHR" : code);

/** Minutes ahead of UTC in `timeZone` at `date`, from the runtime's time-zone data. */
function offsetMinutes(timeZone: string, date: Date) {
  const name = new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "longOffset" }).formatToParts(date).find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = name.match(/GMT([+-])(\d{2}):(\d{2})/);
  return m ? (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) : 0;
}

const hours = (min: number) => {
  const h = Math.abs(min) / 60;
  const whole = Math.floor(h);
  const text = h % 1 ? `${whole ? whole : ""}½` : String(whole);
  return `${text} hour${h === 1 ? "" : "s"}`;
};

/**
 * Time difference between the two cities: right now, plus the other values it
 * takes during the year when the two places change their clocks on different
 * dates (or only one of them does).
 */
export function timeDifference(r: Route, now = new Date()) {
  const from = timeZones[r.origin.code];
  const to = timeZones[r.destination.slug];
  if (!from || !to) return null;
  const diff = (d: Date) => offsetMinutes(to, d) - offsetMinutes(from, d);
  const current = diff(now);
  const year = new Set<number>();
  for (let day = 0; day < 366; day += 1) year.add(diff(new Date(Date.UTC(now.getUTCFullYear(), 0, 1 + day, 12))));
  const others = [...year].filter((d) => d !== current).sort((a, b) => a - b);
  const city = r.destination.city;
  const lead = current === 0 ? `${city} is on the same time as ${r.origin.city}` : `${city} is ${hours(current)} ${current > 0 ? "ahead of" : "behind"} ${r.origin.city}`;
  const rest = others.length
    ? ` right now; at other times of year it’s ${others.map((d) => (d === 0 ? "the same time" : `${hours(d)} ${d > 0 ? "ahead" : "behind"}`)).join(" or ")}, because of daylight saving time`
    : "";
  return `${lead}${rest}.`;
}

/** Great-circle distance between the main airports, rounded to the nearest 10. */
export function routeDistance(r: Route) {
  const km = distanceKm(mainAirport(r.origin.code), r.destination.airport);
  const round = (n: number) => Math.round(n / 10) * 10;
  return { km: round(km), miles: round(km * 0.621371), exactKm: km };
}

/**
 * The passenger-rights note for the departure country. For UK departures the
 * CAA distance band is named only when the route isn't close to a band edge
 * (our airport coordinates are approximate, and other London airports differ).
 */
export function routeRights(r: Route) {
  if (ukOrigins.has(r.origin.code)) {
    const { exactKm } = routeDistance(r);
    const nearEdge = [1500, 3500].some((edge) => Math.abs(exactKm - edge) < edge * 0.05);
    const band = nearEdge ? undefined : rights.uk.bands.find((b) => exactKm < b.max)?.label;
    return { text: rights.uk.text, band, source: rights.uk.source };
  }
  if (usOrigins.has(r.origin.code)) return { text: rights.us.text, band: undefined, source: rights.us.source };
  return null;
}

export const isUkOrigin = (r: Route) => ukOrigins.has(r.origin.code);

/**
 * `timeDifference` for a route slug, cached for a few hours: with Cache
 * Components the current time can only be read inside a cache scope, and
 * the answer only changes when clocks change.
 */
export async function routeTimeDifference(slug: string) {
  "use cache";
  cacheLife("hours");
  const r = routeBySlug[slug];
  return r ? timeDifference(r) : null;
}
