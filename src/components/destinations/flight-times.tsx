import Link from "next/link";
import { AirplaneTilt, ArrowRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { allRoutePairs, routeBySlug } from "@/content/deals";
import { depthCopy } from "@/content/destination-depth";
import type { Destination } from "@/content/destinations";
import { timeZones } from "@/content/route-facts";
import { approxFlightTime } from "@/lib/demo-flights";
import { dealHref } from "@/lib/deal-links";
import { routeDistance } from "@/lib/route-facts";
import { ZoneDiff } from "./zone-diff";
import { diffTemplates } from "./zone-time";

const copy = depthCopy.flightTimes;
const mainAirport = (code: string) => (code === "NYC" ? "JFK" : code === "LON" ? "LHR" : code);
const n = (x: number) => x.toLocaleString("en-GB");

/**
 * Flight times (Batch 22): every departure city with a route to this
 * destination, as rows of a departures list: approximate nonstop flying
 * time, straight-line distance and the time difference. Each row links to the
 * route guide when it's published, or to a tracked live search otherwise.
 */
export function FlightTimes({ d, timeZone }: { d: Destination; timeZone: string }) {
  const rows = allRoutePairs
    .filter((r) => r.destination.slug === d.slug)
    .map((r) => {
      const t = approxFlightTime(mainAirport(r.origin.code), d.airport);
      const dist = routeDistance(r);
      const live = !!routeBySlug[r.slug];
      return {
        r,
        t,
        dist,
        href: live ? `/routes/${r.slug}` : dealHref(undefined, r.origin.code, d.airport, `destination_${d.slug}_times_${r.origin.slug}`),
        live,
      };
    })
    .sort((a, b) => a.t.km - b.t.km);
  const diffCopy = diffTemplates(depthCopy.tripEssentials);

  return (
    <div>
      <div className="overflow-hidden rounded-(--radius-panel) ring-1 ring-line">
        <div aria-hidden className="hidden grid-cols-[1.3fr_1fr_1.1fr_1.4fr_auto] gap-4 bg-ink px-6 py-3 text-[0.8125rem] font-semibold text-white/75 md:grid">
          <span>{copy.cols.from}</span>
          <span>{copy.cols.time}</span>
          <span>{copy.cols.distance}</span>
          <span>{copy.cols.diff}</span>
          <span className="w-36" />
        </div>
        <ul className="divide-y divide-line bg-white">
          {rows.map(({ r, t, dist, href, live }) => (
            <li key={r.slug} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-4 md:grid-cols-[1.3fr_1fr_1.1fr_1.4fr_auto] md:px-6">
              <span className="flex min-w-0 items-center gap-3">
                <AirplaneTilt className="size-5 shrink-0 text-action" weight="duotone" aria-hidden />
                <span className="font-semibold text-ink">{copy.from(r.origin.city)}</span>
              </span>
              <span className="text-right md:text-left">
                <span className="font-display-tight text-[1.375rem] leading-none font-bold text-ink tabular">{t.label}</span>
                {t.longHaul && <span className="block text-[0.8125rem] text-ink-soft">{copy.connection}</span>}
              </span>
              <span className="col-span-2 text-[0.9375rem] text-ink-soft tabular md:col-span-1">
                <span className="sr-only">{copy.cols.distance}: </span>
                {copy.distance(n(dist.km), n(dist.miles))}
              </span>
              <span className="col-span-2 text-[0.9375rem] text-ink-soft md:col-span-1">
                {timeZones[r.origin.code] && <ZoneDiff to={timeZone} from={timeZones[r.origin.code]} fromCity={r.origin.city} copy={diffCopy} />}
              </span>
              <Link
                href={href}
                className="col-span-2 mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-[0.9375rem] font-semibold text-action ring-1 ring-line hover:bg-mist md:col-span-1 md:mt-0 md:w-36"
              >
                {live ? <ArrowRight className="size-4" weight="bold" aria-hidden /> : <MagnifyingGlass className="size-4" weight="bold" aria-hidden />}
                {live ? copy.route : copy.search}
                <span className="sr-only"> {copy.linkFrom(r.origin.city)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 max-w-3xl text-[0.875rem] leading-relaxed text-ink-soft">{copy.note}</p>
    </div>
  );
}
