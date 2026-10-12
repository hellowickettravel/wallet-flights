import { airports, type Airport } from "@/content/airports";

export type TripType = "round" | "oneway" | "multi";
export type Cabin = "economy" | "premium" | "business" | "first";
export type QueryLeg = { from: Airport; to: Airport; date: string };

export type SearchQuery = {
  trip: TripType;
  legs: QueryLeg[];
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabin: Cabin;
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const cabins: Cabin[] = ["economy", "premium", "business", "first"];
export const airportByCode = (c: string | null | undefined) => airports.find((a) => a.code === c?.toUpperCase()) ?? null;

const int = (v: string | null, fallback: number, min: number, max: number) => {
  const n = Number.parseInt(v ?? "", 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};

export type ParseResult = { ok: true; query: SearchQuery } | { ok: false; partial: Partial<SearchQuery> };

/**
 * Reads a search from URL params (the format SearchPanel writes). Dates are
 * optional for deep links such as fare-board rows; they default later.
 */
export function parseSearch(params: URLSearchParams): ParseResult {
  const trip = (["round", "oneway", "multi"] as const).find((t) => t === params.get("trip")) ?? "round";
  const legs: QueryLeg[] = [];
  for (let i = 0; i < 5; i++) {
    const from = airportByCode(params.get(`from${i}`));
    const to = airportByCode(params.get(`to${i}`));
    if (!from || !to) break;
    const date = params.get(`date${i}`) ?? "";
    legs.push({ from, to, date: DATE.test(date) ? date : "" });
  }
  const ret = params.get("return");
  const query: SearchQuery = {
    trip,
    legs: trip === "multi" ? legs : legs.slice(0, 1),
    returnDate: trip === "round" && ret && DATE.test(ret) ? ret : undefined,
    adults: int(params.get("adults"), 1, 1, 9),
    children: int(params.get("children"), 0, 0, 8),
    infants: int(params.get("infants"), 0, 0, 4),
    cabin: cabins.find((c) => c === params.get("cabin")) ?? "economy",
  };
  query.infants = Math.min(query.infants, query.adults);
  const valid = query.legs.length > 0 && query.legs.every((l) => l.from.code !== l.to.code);
  return valid ? { ok: true, query } : { ok: false, partial: query };
}

export function serializeSearch(q: SearchQuery) {
  const p = new URLSearchParams({ trip: q.trip, cabin: q.cabin, adults: String(q.adults) });
  if (q.children) p.set("children", String(q.children));
  if (q.infants) p.set("infants", String(q.infants));
  q.legs.forEach((l, i) => {
    p.set(`from${i}`, l.from.code);
    p.set(`to${i}`, l.to.code);
    if (l.date) p.set(`date${i}`, l.date);
  });
  if (q.trip === "round" && q.returnDate) p.set("return", q.returnDate);
  return p.toString();
}

export const travellerCount = (q: Pick<SearchQuery, "adults" | "children" | "infants">) => q.adults + q.children + q.infants;
