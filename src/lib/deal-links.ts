import type { Fare } from "@/lib/travelpayouts";

/**
 * Where a deal goes: our own live search on /flights, prefilled with the route
 * and, when we have a fare, its dates, so the visitor sees that fare's search
 * without leaving the site (owner, 19 Oct 2026: no links out to the partner's
 * site). `sub` carries the placement into the search's marker. Past dates (a
 * page cached before the fare's day) are replaced on /flights.
 */
export function dealHref(fare: Partial<Pick<Fare, "departureAt" | "returnAt">> | undefined, from: string, to: string, subId: string) {
  const p = new URLSearchParams({ trip: "round", cabin: "economy", adults: "1", from0: from, to0: to });
  const out = fare?.departureAt?.slice(0, 10);
  const back = fare?.returnAt?.slice(0, 10);
  if (out) p.set("date0", out);
  if (out && back && back >= out) p.set("return", back);
  p.set("sub", subId);
  return `/flights?${p}`;
}

const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const month = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

/** "26 Nov – 3 Dec" (dates are the fare's own; shown in UTC, as the API gives them). */
export function fareDates(f: Pick<Fare, "departureAt" | "returnAt">) {
  const out = day.format(new Date(f.departureAt));
  return f.returnAt ? `${out} – ${day.format(new Date(f.returnAt))}` : out;
}

export const monthLabel = (ym: string) => month.format(new Date(`${ym}-01T12:00:00Z`));

export const stopsText = (n: number) => (n === 0 ? "Nonstop" : n === 1 ? "1 stop" : `${n} stops`);
