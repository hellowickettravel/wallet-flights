import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AirplaneTakeoff, ArrowUpRight, CalendarCheck, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/page-header";
import { SearchPanel } from "@/components/search/search-panel";
import { MonthCalendar } from "@/components/destinations/month-calendar";
import { TripExtras } from "@/components/destinations/trip-extras";
import { formatPrice, routeBySlug, routes } from "@/content/deals";
import { destinationGuides, entryNote, usPassportNote } from "@/content/destination-guides";
import { airports } from "@/content/airports";
import { originAirports } from "@/content/route-facts";
import { isUkOrigin, routeDistance, routeRights, routeTimeDifference } from "@/lib/route-facts";
import { approxFlightTime } from "@/lib/demo-flights";
import { dealLink, fareDates, stopsText } from "@/lib/deal-links";
import { monthCalendars } from "@/lib/fares";
import { cheapestFare } from "@/lib/travelpayouts";

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/routes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = routeBySlug[slug];
  if (!r) return {};
  // A route page is only worth indexing with a real fare on it; without one
  // it's a thin template. It comes back by itself once fares flow.
  const fare = await cheapestFare(r.origin.apiCode, r.destination.cityCode, r.origin.currency);
  return pageMetadata({
    robots: fare ? undefined : { index: false, follow: true },
    title: `Cheap flights from ${r.origin.city} to ${r.destination.city}`,
    description: `Recent cheapest round trips from ${r.origin.city} to ${r.destination.city}, the cheapest month to fly, and a live price comparison.`,
    path: `/routes/${r.slug}`,
  });
}

export default async function RoutePage({ params }: PageProps<"/routes/[slug]">) {
  const { slug } = await params;
  const r = routeBySlug[slug];
  if (!r) notFound();
  const { origin, destination: d } = r;
  const guide = destinationGuides[d.slug];
  const sub = `route_${r.slug}`;

  const [fare, calendars] = await Promise.all([cheapestFare(origin.apiCode, d.cityCode, origin.currency), monthCalendars(d, [origin])]);
  const link = dealLink(fare ?? undefined, origin.code, d.airport, `${sub}_cheapest`);
  const time = approxFlightTime(origin.code, d.airport);
  const distance = routeDistance(r);
  const timeDiff = await routeTimeDifference(r.slug);
  const rightsNote = routeRights(r);
  const originMain = origin.code === "NYC" ? "JFK" : origin.code === "LON" ? "Heathrow" : origin.code;
  const arrival = airports.find((a) => a.code === d.airport);
  // UK departures get GOV.UK (or ESTA for New York); US departures only have an
  // official link for London (the UK ETA). Elsewhere, point US travellers to
  // the State Department.
  const showEntryLink = isUkOrigin(r) || d.slug === "london";

  return (
    <div>
      <PageHeader
        title={`Flights from ${origin.city} to ${d.city}`}
        intro="The cheapest round trips travellers found recently, the cheapest month to go, and live prices for your dates."
        crumbs={[
          { label: "Deals", href: "/deals" },
          { label: `${origin.city} to ${d.city}`, href: `/routes/${r.slug}` },
        ]}
      />

      <div className="container-page mt-8">
        <SearchPanel variant="bar" defaultFrom={origin.code} defaultTo={d.airport} subId={sub} />
      </div>

      <div className="container-page grid gap-8 py-12 md:py-16 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <section aria-labelledby="cheapest-title" className="rounded-(--radius-panel) bg-board p-6 text-white md:p-8">
          <h2 id="cheapest-title" className="font-display-tight text-[1.5rem] font-bold">Cheapest recent fare</h2>
          {fare ? (
            <>
              <p className="tabular mt-4 font-display-tight text-[3rem] leading-none font-extrabold text-sun">{formatPrice(fare.price, fare.currency)}</p>
              <p className="mt-2 text-white/80">
                Round trip · {fareDates(fare)} · {stopsText(fare.transfers)}
              </p>
              <a
                href={link.href}
                rel="sponsored noopener"
                target="_blank"
                data-sub={`${sub}_cheapest`}
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-sun px-6 font-semibold text-ink hover:bg-[#ffd666]"
              >
                View this fare
                <ArrowUpRight className="size-4" weight="bold" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </>
          ) : (
            <>
              <p className="mt-4 leading-relaxed text-white/80">No recent fare found for this route. Search your dates to compare live prices.</p>
              <Link href={link.href} className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-sun px-6 font-semibold text-ink hover:bg-[#ffd666]">
                <MagnifyingGlass className="size-4" weight="bold" aria-hidden />
                Search live prices
              </Link>
            </>
          )}
          <p className="mt-6 text-[0.8125rem] leading-relaxed text-white/60">
            Found in the last few days, per person, economy. The provider confirms the final price.
          </p>
        </section>

        <div>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-(--radius-card) bg-mist p-5">
              <AirplaneTakeoff className="size-6 text-action" aria-hidden />
              <dt className="mt-3 text-[0.8125rem] text-ink-soft">Approx. flying time</dt>
              <dd className="mt-1 font-semibold text-ink">
                About {time.label}
                {time.longHaul ? " with a connection" : ""}
              </dd>
            </div>
            {guide && (
              <div className="rounded-(--radius-card) bg-mist p-5">
                <CalendarCheck className="size-6 text-action" aria-hidden />
                <dt className="mt-3 text-[0.8125rem] text-ink-soft">Best time to visit {d.city}</dt>
                <dd className="mt-1 font-semibold text-ink">{guide.bestTime}</dd>
              </div>
            )}
          </dl>
          {guide && (
            <p className="mt-6 leading-relaxed text-ink">
              <strong className="font-semibold">Flight tip: </strong>
              {guide.tip}{" "}
              <Link href={`/destinations/${d.slug}`} className="font-semibold text-action underline-offset-4 hover:underline">
                Read our {d.city} guide
              </Link>
            </p>
          )}
        </div>
      </div>

      <section aria-labelledby="route-facts-title" className="border-t border-line py-14 md:py-20">
        <div className="container-page max-w-4xl">
          <h2 id="route-facts-title" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
            About this route
          </h2>
          <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-[0.8125rem] text-ink-soft">Distance</dt>
              <dd className="tabular mt-1 text-ink">
                About {distance.km.toLocaleString("en-GB")} km ({distance.miles.toLocaleString("en-GB")} miles) between {originMain} and {d.airport}, in a straight line
              </dd>
            </div>
            {timeDiff && (
              <div>
                <dt className="text-[0.8125rem] text-ink-soft">Time difference</dt>
                <dd className="mt-1 text-ink">{timeDiff}</dd>
              </div>
            )}
            <div>
              <dt className="text-[0.8125rem] text-ink-soft">Airports in {origin.city}</dt>
              <dd className="mt-1 text-ink">{originAirports[origin.code]}</dd>
            </div>
            <div>
              <dt className="text-[0.8125rem] text-ink-soft">Arriving in {d.city}</dt>
              <dd className="mt-1 text-ink">{arrival ? `${arrival.name} (${d.airport})` : d.airport} is the main airport. <Link href={`/destinations/${d.slug}`} className="font-semibold text-action underline-offset-4 hover:underline">Other airports and when to go</Link></dd>
            </div>
          </dl>

          {rightsNote && (
            <>
              <h3 className="mt-10 text-[1.125rem] font-semibold text-ink">If your flight is cancelled</h3>
              <p className="mt-2 leading-relaxed text-ink/85">
                {rightsNote.text}
                {rightsNote.band && ` This route is in the ${rightsNote.band} band.`}{" "}
                <a href={rightsNote.source.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-action hover:underline">
                  {rightsNote.source.label}
                  <ArrowUpRight className="size-3.5" weight="bold" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </>
          )}

          {guide && (
            <>
              <h3 className="mt-8 text-[1.125rem] font-semibold text-ink">Passports and entry</h3>
              <p className="mt-2 leading-relaxed text-ink/85">
                {showEntryLink ? (
                  <>
                    <a href={guide.entry.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-action hover:underline">
                      {guide.entry.label}
                      <ArrowUpRight className="size-3.5" weight="bold" aria-hidden />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    . {entryNote}
                  </>
                ) : (
                  `${usPassportNote} ${entryNote}`
                )}
              </p>
            </>
          )}
        </div>
      </section>

      {calendars.length > 0 && (
        <section aria-labelledby="months-title" className="border-t border-line py-14 md:py-20">
          <div className="container-page">
            <h2 id="months-title" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
              Cheapest month to fly from {origin.city}
            </h2>
            <div className="mt-6">
              <MonthCalendar calendars={calendars} to={d.airport} subPrefix={sub} />
            </div>
          </div>
        </section>
      )}

      <TripExtras slug={d.slug} city={d.city} subPrefix={sub} />
    </div>
  );
}
