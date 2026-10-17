// Pure helpers for the fare calendar: filtering, cheapest-per-day, month
// minimums, insights and the flexible-dates grid. Everything runs on the
// fares /api/fare-calendar returned; no extra requests.
import type { CalendarFare } from "@/lib/fare-calendar";

export type Filters = {
  direct: boolean;
  /** Weekdays allowed for the outbound flight, Monday = 0. */
  days: number[];
  /** Highest total to show; null = any. */
  maxPrice: number | null;
  /** Departure airports allowed; null = all. */
  airports: string[] | null;
  /** Airlines allowed; null = all. */
  airlines: string[] | null;
};

export const allDays = [0, 1, 2, 3, 4, 5, 6];
export const noFilters: Filters = { direct: false, days: allDays, maxPrice: null, airports: null, airlines: null };

export const activeFilterCount = (f: Filters) =>
  Number(f.direct) + Number(f.days.length < 7) + Number(f.maxPrice !== null) + Number(f.airports !== null) + Number(f.airlines !== null);

/** Monday = 0, for a YYYY-MM-DD date. */
export const weekday = (iso: string) => (new Date(`${iso}T12:00:00Z`).getUTCDay() + 6) % 7;

export function addDays(iso: string, n: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export const daysBetween = (a: string, b: string) => Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 864e5);

export function daysInMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  const n = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return Array.from({ length: n }, (_, i) => `${ym}-${String(i + 1).padStart(2, "0")}`);
}

export type ByDate = Map<string, CalendarFare[]>;

export function groupByDate(fares: CalendarFare[] | undefined): ByDate {
  const map: ByDate = new Map();
  for (const f of fares ?? []) {
    const list = map.get(f.date);
    if (list) list.push(f);
    else map.set(f.date, [f]);
  }
  for (const list of map.values()) list.sort((a, b) => a.price - b.price);
  return map;
}

/** Outbound fares that pass the filters (the airport filter is the departure airport). */
export function outFares(byDate: ByDate, date: string, f: Filters) {
  if (!f.days.includes(weekday(date))) return [];
  return (byDate.get(date) ?? []).filter(
    (x) => (!f.direct || x.stops === 0) && (!f.airports || f.airports.includes(x.from)) && (!f.airlines || f.airlines.includes(x.airline)),
  );
}

/** Return fares that pass the filters (they land at the airports the visitor would leave from). */
export function backFares(byDate: ByDate, date: string, f: Filters) {
  return (byDate.get(date) ?? []).filter(
    (x) => (!f.direct || x.stops === 0) && (!f.airports || f.airports.includes(x.to)) && (!f.airlines || f.airlines.includes(x.airline)),
  );
}

export type DayBest = { out: CalendarFare; back?: CalendarFare; total: number };

export type Model = {
  out: ByDate;
  back?: ByDate;
  /** Nights between outbound and return; ignored for one-way trips. */
  nights: number;
  filters: Filters;
};

/** Cheapest option for leaving on `date`, with the cheapest return when it's a return trip. */
export function bestFor(m: Model, date: string, applyMax = true): DayBest | null {
  const outs = outFares(m.out, date, m.filters);
  if (!outs.length) return null;
  let back: CalendarFare | undefined;
  if (m.back) {
    back = backFares(m.back, addDays(date, m.nights), m.filters)[0];
    if (!back) return null;
  }
  const total = outs[0].price + (back?.price ?? 0);
  if (applyMax && m.filters.maxPrice !== null && total > m.filters.maxPrice) return null;
  return { out: outs[0], back, total };
}

export type MonthSummary = { month: string; min: number | null; minDate: string | null };

export function monthSummaries(m: Model, months: string[]): MonthSummary[] {
  return months.map((month) => {
    let min: number | null = null;
    let minDate: string | null = null;
    for (const date of daysInMonth(month)) {
      const b = bestFor(m, date);
      if (b && (min === null || b.total < min)) {
        min = b.total;
        minDate = date;
      }
    }
    return { month, min, minDate };
  });
}

/** Lowest and highest daily totals before the price cap, for the max-price slider. */
export function priceRange(m: Model, months: string[]) {
  let lo = Infinity;
  let hi = 0;
  for (const month of months)
    for (const date of daysInMonth(month)) {
      const b = bestFor(m, date, false);
      if (b) {
        lo = Math.min(lo, b.total);
        hi = Math.max(hi, b.total);
      }
    }
  return lo === Infinity ? null : { lo, hi };
}

export type Insights = { cheapestDow: number; dearestDow: number; cheapestAvg: number; pctMore: number } | null;

/** Average daily total per weekday across all months on screen. */
export function weekdayInsights(m: Model, months: string[]): Insights {
  const sums = Array(7).fill(0);
  const counts = Array(7).fill(0);
  for (const month of months)
    for (const date of daysInMonth(month)) {
      const b = bestFor(m, date);
      if (!b) continue;
      const d = weekday(date);
      sums[d] += b.total;
      counts[d]++;
    }
  const avg = sums.map((s, i) => (counts[i] >= 3 ? s / counts[i] : null));
  const valid = avg.flatMap((v, i) => (v === null ? [] : [{ v, i }]));
  if (valid.length < 2) return null;
  const lo = valid.reduce((a, b) => (b.v < a.v ? b : a));
  const hi = valid.reduce((a, b) => (b.v > a.v ? b : a));
  return { cheapestDow: lo.i, dearestDow: hi.i, cheapestAvg: Math.round(lo.v), pctMore: Math.round((hi.v / lo.v - 1) * 100) };
}

export type Tier = "best" | "low" | "high" | "mid";

/** Cheapest day, cheapest third, dearest quarter, the rest. */
export function tierer(values: number[], bestValue: number | null) {
  const s = [...values].sort((a, b) => a - b);
  const lo = s[Math.floor(s.length * 0.33)];
  const hi = s[Math.floor(s.length * 0.75)];
  return (v: number): Tier => (v === bestValue ? "best" : s.length < 4 ? "mid" : v <= lo ? "low" : v >= hi ? "high" : "mid");
}

/** Return totals for 3 days either side of the chosen outbound and return dates. */
export function flexGrid(m: Model, date: string) {
  const offsets = [-3, -2, -1, 0, 1, 2, 3];
  const leave = offsets.map((n) => addDays(date, n));
  const back = offsets.map((n) => addDays(date, m.nights + n));
  const cheapestOut = (d: string) => outFares(m.out, d, m.filters)[0]?.price ?? null;
  const cheapestBack = (d: string) => (m.back ? backFares(m.back, d, m.filters)[0]?.price ?? null : null);
  const cells = leave.map((l) =>
    back.map((r) => {
      if (r <= l) return null;
      const a = cheapestOut(l);
      const b = cheapestBack(r);
      return a !== null && b !== null ? a + b : null;
    }),
  );
  const values = cells.flat().filter((v): v is number => v !== null);
  return { leave, back, cells, min: values.length ? Math.min(...values) : null };
}

export const minutesText = (mins?: number) => (mins ? `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m` : null);
