// Server helpers that attach Data API fares to our content. Pages call these;
// client components receive plain, serialisable results.
import { originByCode, routes, type Origin, type Route } from "@/content/deals";
import { destinations, type Destination } from "@/content/destinations";
import { cheapestByMonth, cheapestFare, type Fare, type MonthFare } from "@/lib/travelpayouts";

/** Fares keyed by route slug; routes without a recent price are absent. */
export type FareMap = Record<string, Fare>;

export async function routeFares(list: Route[] = routes): Promise<FareMap> {
  const fares = await Promise.all(list.map((r) => cheapestFare(r.origin.apiCode, r.destination.cityCode, r.origin.currency)));
  return Object.fromEntries(list.flatMap((r, i) => (fares[i] ? [[r.slug, fares[i]]] : [])));
}

/** The cheapest fare in each currency (pounds first), for the hero's "from" prices. */
export function lowestFares(fares: FareMap, list: Route[] = routes): { route: Route; fare: Fare }[] {
  const best = new Map<string, { route: Route; fare: Fare }>();
  for (const route of list) {
    const fare = fares[route.slug];
    if (!fare) continue;
    const cur = best.get(fare.currency);
    if (!cur || fare.price < cur.fare.price) best.set(fare.currency, { route, fare });
  }
  return ["GBP", "USD"].flatMap((c) => best.get(c) ?? []);
}

/** For destination tiles: from New York (or from London for New York itself). */
export const tileOrigin = (d: Destination): Origin => (d.cityCode === "NYC" ? originByCode.LON : originByCode.NYC);

export type TileFare = Fare & { originCity: string };

export async function destinationTileFares(list: Destination[] = destinations): Promise<Record<string, TileFare>> {
  const fares = await Promise.all(
    list.map(async (d) => {
      const o = tileOrigin(d);
      const f = await cheapestFare(o.apiCode, d.cityCode, o.currency);
      return f ? ([d.slug, { ...f, originCity: o.city }] as const) : null;
    }),
  );
  return Object.fromEntries(fares.filter((x) => x !== null));
}

export type MonthCalendar = { origin: Origin; months: MonthFare[] };

/** Cheapest fare per month from each origin that has any data. */
export async function monthCalendars(destination: Destination, from: Origin[]): Promise<MonthCalendar[]> {
  const out = await Promise.all(
    from.filter((o) => o.apiCode !== destination.cityCode).map(async (origin) => ({ origin, months: await cheapestByMonth(origin.apiCode, destination.cityCode, origin.currency) })),
  );
  return out.filter((c) => c.months.length > 0);
}
