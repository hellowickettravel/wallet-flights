import type { Fare } from "@/lib/travelpayouts";
import { affiliateUrl, aviasalesUrl } from "@/lib/affiliate";

export type DealLink = { href: string; external: boolean };

/**
 * Where a deal button goes. With a Data API fare: that exact Aviasales search,
 * as a Travelpayouts affiliate link. Without one: our White Label on /flights,
 * prefilled for the route (it carries marker.sub_id too).
 */
export function dealLink(fare: Pick<Fare, "link"> | undefined, from: string, to: string, subId: string): DealLink {
  if (fare?.link) return { href: affiliateUrl("aviasales", aviasalesUrl(fare.link), subId), external: true };
  const p = new URLSearchParams({ trip: "round", cabin: "economy", adults: "1", from0: from, to0: to, sub: subId });
  return { href: `/flights?${p}`, external: false };
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
