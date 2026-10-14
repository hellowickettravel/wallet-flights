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
