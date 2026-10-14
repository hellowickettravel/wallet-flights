import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AirplaneTakeoff, CalendarCheck, CaretRight, Lightbulb, MapPin } from "@phosphor-icons/react/dist/ssr";
import { ParallaxHero } from "@/components/destinations/parallax-hero";
import { DestinationTile } from "@/components/destinations/destination-tile";
import { SearchPanel } from "@/components/search/search-panel";
import { airports } from "@/content/airports";
import { MonthCalendar } from "@/components/destinations/month-calendar";
import { TripExtras } from "@/components/destinations/trip-extras";
import { formatPrice, originByCode, routes } from "@/content/deals";
import { destinationGuides } from "@/content/destination-guides";
import { destinationBySlug, destinations } from "@/content/destinations";
import { site } from "@/content/site";
import { approxFlightTime } from "@/lib/demo-flights";
import { dealLink, fareDates, stopsText } from "@/lib/deal-links";
import { destinationTileFares, monthCalendars } from "@/lib/fares";
import { cheapestFare } from "@/lib/travelpayouts";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = destinationBySlug[slug];
  if (!d) return {};
  return {
    title: `Cheap flights to ${d.city}`,
    description: `Compare flights to ${d.city}, ${d.country}. Best time to visit, flight times from New York and London, recent fares and the cheapest month to fly.`,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: { images: [{ url: `https://images.unsplash.com/${d.photo.id}?auto=format&fit=crop&w=1200&h=630&q=70`, width: 1200, height: 630, alt: d.photo.alt }] },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = destinationBySlug[slug];
  const guide = destinationGuides[slug];
  if (!d || !guide) notFound();

  const airport = airports.find((a) => a.code === d.airport);
  const fromNyc = approxFlightTime("JFK", d.airport);
  const fromLon = approxFlightTime("LHR", d.airport);
  // Departure cities: our featured routes to this place, plus New York and London.
  const fromCodes = [...new Set(["NYC", "LON", ...routes.filter((r) => r.destination.slug === slug).map((r) => r.origin.code)])];
  const fromOrigins = fromCodes.map((c) => originByCode[c]).filter((o) => o.apiCode !== d.cityCode);
  const related = destinations.filter((x) => x.region === d.region && x.slug !== d.slug).slice(0, 3);
  const [fareList, calendars, tileFares] = await Promise.all([
    Promise.all(fromOrigins.map(async (o) => ({ origin: o, fare: await cheapestFare(o.apiCode, d.cityCode, o.currency) }))),
    monthCalendars(d, fromOrigins.filter((o) => o.code === "NYC" || o.code === "LON")),
    destinationTileFares(related),
  ]);
  const fares = fareList.flatMap((x) => (x.fare ? [{ origin: x.origin, fare: x.fare }] : []));

  const facts = [
    { icon: MapPin, label: "Main airport", value: airport ? `${airport.name} (${d.airport})` : d.airport },
    { icon: CalendarCheck, label: "Best time to visit", value: guide.bestTime },
    {
      icon: AirplaneTakeoff,
      label: "Flight time",
      value: [
        d.city !== "New York" && `About ${fromNyc.label} from New York${fromNyc.longHaul ? " with a connection" : ""}`,
        d.city !== "London" && `About ${fromLon.label} from London${fromLon.longHaul ? " with a connection" : ""}`,
      ]
        .filter(Boolean)
        .join(" · "),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.city,
    description: guide.intro,
    url: `${site.url}/destinations/${d.slug}`,
    containedInPlace: { "@type": "Country", name: d.country },
  };

  return (
    <article>
      <ParallaxHero photo={d.photo}>
        <div className="container-page flex min-h-[26rem] flex-col justify-end pt-24 pb-10 md:min-h-[32rem] md:pb-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.875rem] text-white/80">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="hover:text-white hover:underline">Home</Link>
                <CaretRight className="size-3.5" aria-hidden />
              </li>
              <li className="flex items-center gap-1.5">
                <Link href="/destinations" className="hover:text-white hover:underline">Destinations</Link>
                <CaretRight className="size-3.5" aria-hidden />
              </li>
              <li aria-current="page" className="font-medium text-white">{d.city}</li>
            </ol>
          </nav>
          <p className="mt-6 text-[1.0625rem] font-medium text-sun">{d.country}</p>
          <h1 className="font-display-tight text-[3.25rem] leading-[0.95] font-extrabold text-white sm:text-[4.5rem] lg:text-[6rem]">{d.city}</h1>
          <p className="mt-4 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-white/85 md:text-[1.1875rem]">{guide.intro}</p>
        </div>
      </ParallaxHero>

      <div className="container-page relative z-10 -mt-6">
        <SearchPanel variant="bar" defaultFrom="NYC" defaultTo={d.airport} subId={`destination_${d.slug}`} />
      </div>

      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <dl className="grid gap-5 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-(--radius-card) bg-mist p-5">
                <Icon className="size-6 text-action" aria-hidden />
                <dt className="mt-3 text-[0.8125rem] text-ink-soft">{label}</dt>
                <dd className="mt-1 font-semibold leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">Don’t miss</h2>
          <ol className="mt-6 space-y-4">
            {guide.highlights.map((h, i) => (
              <li key={h} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink font-display-tight font-bold text-sun">{i + 1}</span>
                <span className="pt-1.5 text-[1.0625rem] text-ink">{h}</span>
              </li>
            ))}
          </ol>

          {routes.some((r) => r.destination.slug === slug) && (
            <>
              <h2 className="mt-12 font-display-tight text-[1.375rem] font-bold text-ink">Popular routes to {d.city}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {routes
                  .filter((r) => r.destination.slug === slug)
                  .map((r) => (
                    <li key={r.slug}>
                      <Link href={`/routes/${r.slug}`} className="inline-flex h-10 items-center rounded-full px-4 font-semibold text-ink ring-1 ring-line hover:bg-mist">
                        From {r.origin.city}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}

          <div className="mt-10 flex gap-4 rounded-(--radius-card) bg-sun/20 p-5 ring-1 ring-sun/50">
            <Lightbulb className="size-6 shrink-0 text-ink" weight="fill" aria-hidden />
            <p className="leading-relaxed text-ink">
              <strong className="font-semibold">Flight tip: </strong>
              {guide.tip}
            </p>
          </div>
        </div>

        <aside aria-labelledby="fares-title">
          <div className="rounded-(--radius-panel) bg-board p-6 text-white md:p-7">
            <h2 id="fares-title" className="font-display-tight text-[1.5rem] font-bold">Recent fares to {d.city}</h2>
            {fares.length > 0 ? (
              <ul className="mt-5 divide-y divide-white/10">
                {fares.map(({ origin, fare }) => {
                  const link = dealLink(fare, origin.code, d.airport, `destination_${d.slug}_fares_${origin.slug}`);
                  return (
                    <li key={origin.code}>
                      <a
                        href={link.href}
                        {...(link.external ? { rel: "sponsored noopener", target: "_blank" } : {})}
                        className="group flex items-center justify-between gap-4 py-3"
                      >
                        <span>
                          <span className="block font-semibold group-hover:underline">From {origin.city}</span>
                          <span className="text-[0.875rem] text-white/65">
                            {fareDates(fare)} · {stopsText(fare.transfers)}
                          </span>
                        </span>
                        <span className="tabular text-[1.25rem] font-bold text-sun">{formatPrice(fare.price, fare.currency)}</span>
                        {link.external && <span className="sr-only"> (opens Aviasales in a new tab)</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 leading-relaxed text-white/75">No recent fares found for {d.city}. Search your dates to see live prices.</p>
            )}
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-white/60">
              Cheapest round trips per person found on Aviasales in the last few days. The provider confirms the final price.
            </p>
          </div>
        </aside>
      </div>

      {calendars.length > 0 && (
        <section aria-labelledby="months-title" className="border-t border-line py-14 md:py-20">
          <div className="container-page">
            <h2 id="months-title" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
              Cheapest month to fly to {d.city}
            </h2>
            <div className="mt-6">
              <MonthCalendar calendars={calendars} to={d.airport} subPrefix={`destination_${d.slug}`} />
            </div>
          </div>
        </section>
      )}

      <TripExtras slug={d.slug} city={d.city} subPrefix={`destination_${d.slug}`} />

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-mist py-14 md:py-20">
          <div className="container-page">
            <h2 id="related-title" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">More places nearby</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <DestinationTile d={r} fare={tileFares[r.slug]} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </article>
  );
}
