import { travelpayouts } from "@/content/affiliates";
import type { SearchQuery } from "@/lib/search-query";

export type Seg = { from: string; to: string; date: string };

const ddMM = (iso: string) => `${iso.slice(8, 10)}${iso.slice(5, 7)}`;
const UK = new Set(["United Kingdom"]);

function segments(q: SearchQuery): Seg[] {
  const out = q.legs.map((l) => ({ from: l.from.code, to: l.to.code, date: l.date }));
  if (q.trip === "round" && q.returnDate && out[0]) out.push({ from: out[0].to, to: out[0].from, date: q.returnDate });
  return out;
}

/**
 * Encodes a search the way the White Label's own form writes `?flightSearch=`
 * (taken from tpwdg.com/wl_web, function `gs`/`BB`): per segment
 * `[origin]ddMM[destination]`, the origin only on the first leg or after an
 * open jaw ("-"), the destination dropped on a plain return; then the trip class
 * ("" economy, "c" business) and passengers (adults[children[infants]]).
 * Round trip LON→NYC 15 Mar, back 20 Mar, 1 adult → "LON1503NYC20031".
 */
export function toFlightSearch(q: SearchQuery) {
  const segs = segments(q);
  // City codes ("NYC", "LON") are listed as "All airports"; everything else is a single airport.
  const places = new Map(q.legs.flatMap((l) => [[l.from.code, l.from], [l.to.code, l.to]] as const));
  const isAirport = (code: string) => places.get(code)?.name !== "All airports";
  const originAirports = segs.flatMap((s, i) => (isAirport(s.from) ? [i] : []));
  const destinationAirports = segs.flatMap((s, i) => (isAirport(s.to) ? [i] : []));
  return {
    flightSearch: searchString(segs, q),
    originAirports: originAirports.length ? originAirports.join(",") : undefined,
    destinationAirports: destinationAirports.length ? destinationAirports.join(",") : undefined,
  };
}

/** The Aviasales search string for explicit segments (also the path of aviasales.com/search/…). */
export function searchString(segs: Seg[], q: Pick<SearchQuery, "cabin" | "adults" | "children" | "infants">) {
  const first = segs[0];
  const last = segs[segs.length - 1];
  const parts: string[] = [];
  segs.forEach((s, i) => {
    const prevTo = segs[i - 1]?.to;
    const openJaw = !!prevTo && prevTo !== s.from;
    if (openJaw) parts.push("-");
    const isLast = i === segs.length - 1;
    const plainReturn = isLast && s.to === first.from && s.to !== s.from;
    const keepDest = isLast && (segs.length > 2 || first.from !== last.to);
    parts.push(`${i === 0 || openJaw ? s.from : ""}${ddMM(s.date)}${plainReturn && !keepDest ? "" : s.to}`);
  });
  // The widget only knows economy (Y) and business (C).
  const cls = q.cabin === "business" || q.cabin === "first" ? "c" : "";
  const pax = `${q.adults}${q.children || q.infants ? q.children : ""}${q.infants ? q.infants : ""}`;
  return `${parts.join("")}${cls}${pax}`;
}

/** Prices in GBP when the trip starts in the UK, otherwise the widget default (USD). */
export const currencyFor = (q: SearchQuery) => (UK.has(q.legs[0]?.from.country ?? "") ? "GBP" : undefined);

/**
 * Query string the White Label reads on load. `marker=567389.<sub_id>` makes
 * the widget attribute bookings to the placement that sent the visitor.
 */
export function whiteLabelParams(q: SearchQuery, subId: string) {
  const fs = toFlightSearch(q);
  const p = new URLSearchParams({ flightSearch: fs.flightSearch });
  if (fs.originAirports) p.set("origin_airports", fs.originAirports);
  if (fs.destinationAirports) p.set("destination_airports", fs.destinationAirports);
  const currency = currencyFor(q);
  if (currency) p.set("currency", currency);
  p.set("marker", `${travelpayouts.marker}.${subId.replace(/[^a-z0-9_]/gi, "_")}`);
  return p;
}
