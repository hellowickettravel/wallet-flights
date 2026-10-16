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
import { destinationGuides } from "@/content/destination-guides";
import { routeQuestions } from "@/content/quick-answers";
import { routeGuides } from "@/content/route-facts";
import { guideBySlug } from "@/content/guides";
import { isUkOrigin, routeQuickAnswers, routeSeo, routeTimeDifference } from "@/lib/route-facts";
import { faqPage, jsonLdHtml, webPage } from "@/lib/schema";
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
  // Indexable with or without a fare: since Phase 4 part 3 every route page
  // answers the flight-time, distance, time-difference, airport and rights
  // questions for that pair, so it isn't a thin template any more.
  const { title, description } = routeSeo(r);
  return pageMetadata({ title, description, path: `/routes/${r.slug}` });
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
  // Answer-first questions (flight time, distance, time difference, airports,
  // rights, entry), shown on the page and in the FAQPage markup.
  const answers = routeQuickAnswers(r, await routeTimeDifference(r.slug));
  const beforeYouFly = [
    ...(isUkOrigin(r) ? routeGuides.uk : routeGuides.us),
    ...(routeGuides.schengenSlugs.includes(d.slug) ? [routeGuides.schengen] : []),
  ].flatMap((s) => (guideBySlug[s] ? [guideBySlug[s]] : []));
  const jsonLd = {
    "@graph": [
      webPage("WebPage", `/routes/${r.slug}`, `Flights from ${origin.city} to ${d.city}`, routeSeo(r).description, {
        about: [
          { "@type": "City", name: origin.city },
          { "@type": "City", name: d.city, containedInPlace: { "@type": "Country", name: d.country } },
        ],
      }),
      faqPage(answers),
    ],
  };

  return (
    <div>
      <PageHeader
        title={`Flights from ${origin.city} to ${d.city}`}
        intro={routeSeo(r).lead}
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
            {routeQuestions.heading(origin.city, d.city)}
          </h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {answers.map((x) => (
              <div key={x.q} className="grid gap-2 py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10">
                <h3 className="text-[1.0625rem] leading-snug font-semibold text-ink">{x.q}</h3>
                <p className="leading-relaxed text-ink/85">
                  {x.a}
                  {x.link && (
                    <>
                      {" "}
                      {x.link.external ? (
                        <a href={x.link.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-action hover:underline">
                          {x.link.label}
                          <ArrowUpRight className="size-3.5" weight="bold" aria-hidden />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <Link href={x.link.href} className="font-semibold text-action underline-offset-4 hover:underline">
                          {x.link.label}
                        </Link>
                      )}
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>

          {beforeYouFly.length > 0 && (
            <>
              <h3 className="mt-10 text-[1.125rem] font-semibold text-ink">{routeGuides.title}</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {beforeYouFly.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/travel-guides/${g.slug}`} className="flex h-full items-center rounded-(--radius-card) bg-mist px-4 py-3 font-semibold text-ink hover:text-action">
                      {g.seoTitle ?? g.title}
                    </Link>
                  </li>
                ))}
              </ul>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
    </div>
  );
}
