import { breadcrumbList, faqPage, jsonLdHtml } from "@/lib/schema";
import { destinationQuestions } from "@/content/quick-answers";
import { pageMetadata, unsplashShareImage } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AirplaneTakeoff, ArrowUpRight, CalendarCheck, CaretRight, Coins, Lightbulb, MagnifyingGlass, MapPin, Plug, Train, Translate } from "@phosphor-icons/react/dist/ssr";
import { ParallaxHero } from "@/components/destinations/parallax-hero";
import { DestinationTile } from "@/components/destinations/destination-tile";
import { AirportTransfers } from "@/components/destinations/airport-transfers";
import { GuideSection, SectionMenu } from "@/components/destinations/guide-section";
import { MonthStrip } from "@/components/destinations/month-strip";
import { SearchPanel } from "@/components/search/search-panel";
import { GuideCard } from "@/components/guides/guide-card";
import { airports } from "@/content/airports";
import { MonthCalendar } from "@/components/destinations/month-calendar";
import { TripExtras } from "@/components/destinations/trip-extras";
import { origins, routeBySlug, routeOrigins } from "@/content/deals";
import { destinationGuides, entryNote, usPassportNote } from "@/content/destination-guides";
import { depthCopy, destinationDepth } from "@/content/destination-depth";
import { destinationBySlug, destinations, regions } from "@/content/destinations";
import { guideBySlug } from "@/content/guides";
import { site } from "@/content/site";
import { approxFlightTime } from "@/lib/demo-flights";
import { dealHref, fareDates, stopsText } from "@/lib/deal-links";
import { depthAnswers } from "@/lib/destination-faqs";
import { destinationTileFares, monthCalendars } from "@/lib/fares";
import type { QuickAnswer } from "@/lib/route-facts";
import { cheapestFare } from "@/lib/travelpayouts";
import { Price } from "@/components/currency/currency-provider";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = destinationBySlug[slug];
  if (!d) return {};
  return pageMetadata({
    title: `${d.city} flights: best time to visit and fares`,
    description: `Flights to ${d.city}: the best months to visit, getting in from the airport, where to stay, a 3-day plan and live fares from the UK and US.`,
    path: `/destinations/${d.slug}`,
    image: unsplashShareImage(d.photo),
  });
}

/** A quick answer; `inline` puts the official link in the middle of the sentence (the entry question). */
type Answer = QuickAnswer & { inline?: { lead: string; link: { label: string; href: string }; rest: string } };


function ExternalLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-action hover:underline">
      {label}
      <ArrowUpRight className="size-3.5" weight="bold" aria-hidden />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function AnswerText({ x }: { x: Answer }) {
  if (x.inline)
    return (
      <p className="leading-relaxed text-ink/85">
        {x.inline.lead} <ExternalLink {...x.inline.link} />. {x.inline.rest}
      </p>
    );
  return (
    <p className="leading-relaxed text-ink/85">
      {x.a}
      {x.link && (
        <>
          {" "}
          {x.link.external ? (
            <ExternalLink label={x.link.label} href={x.link.href} />
          ) : (
            <Link href={x.link.href} className="font-semibold text-action underline-offset-4 hover:underline">
              {x.link.label}
            </Link>
          )}
        </>
      )}
    </p>
  );
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = destinationBySlug[slug];
  const guide = destinationGuides[slug];
  const depth = destinationDepth[slug];
  if (!d || !guide || !depth) notFound();

  const airport = airports.find((a) => a.code === d.airport);
  const fromNyc = approxFlightTime("JFK", d.airport);
  const fromLon = approxFlightTime("LHR", d.airport);
  // Fares from all six departure cities (except the city itself); month calendars from New York and London.
  const fromOrigins = origins.filter((o) => o.apiCode !== d.cityCode);
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
      label: "Approx. flying time",
      value: [
        d.city !== "New York" && `About ${fromNyc.label} from New York${fromNyc.longHaul ? " with a connection" : ""}`,
        d.city !== "London" && `About ${fromLon.label} from London${fromLon.longHaul ? " with a connection" : ""}`,
      ]
        .filter(Boolean)
        .join(" · "),
    },
    { icon: Coins, label: depthCopy.essentials.currency, value: depth.essentials.currency },
    { icon: Plug, label: depthCopy.essentials.plugs, value: depth.essentials.plugs },
    { icon: Translate, label: depthCopy.essentials.language, value: depth.essentials.language },
  ];

  const timesFrom = [
    d.city !== "London" && { from: "London", time: fromLon },
    d.city !== "New York" && { from: "New York", time: fromNyc },
  ].filter((t) => !!t);
  const notUkUs = d.country !== "United Kingdom" && d.country !== "United States";
  const entryRest = `${entryNote}${notUkUs ? ` ${usPassportNote}` : ""}`;
  // The four original questions, then the phase-2 ones (transfers, where to stay, days, money, plugs, language, city-specific).
  const answers: Answer[] = [
    { q: destinationQuestions.bestTime.q(d.city), a: destinationQuestions.bestTime.a(guide.bestTime, guide.whenToGo) },
    { q: destinationQuestions.airports.q(d.city), a: guide.flying },
    {
      q: destinationQuestions.flightTime.q(d.city, d.city === "London" ? "the US" : d.city === "New York" ? "the UK" : "the UK and US"),
      a: destinationQuestions.flightTime.a(timesFrom),
    },
    {
      q: destinationQuestions.entry.q(/^United /.test(d.country) ? `the ${d.country}` : d.country),
      a: `${destinationQuestions.entryLead} ${guide.entry.label} (${guide.entry.url}). ${entryRest}`,
      inline: { lead: destinationQuestions.entryLead, link: { label: guide.entry.label, href: guide.entry.url }, rest: entryRest },
    },
    ...depthAnswers(d),
  ];

  // Cheapest departure month in the first calendar (New York, or London for New York itself).
  const cal = calendars[0];
  const cheapest = cal?.months.length ? cal.months.reduce((a, b) => (b.price < a.price ? b : a)) : undefined;
  const cheapestMonth = cheapest ? Number(cheapest.month.slice(5, 7)) - 1 : undefined;

  const cityRoutes = routeOrigins
    .filter((o) => o.apiCode !== d.cityCode)
    .map((o) => ({ origin: o, route: routeBySlug[`${o.slug}-to-${d.slug}`] }))
    .filter((x) => x.route || !(x.origin.country === "United Kingdom" && d.slug === "london"));
  const readNext = depth.guides.flatMap((s) => (guideBySlug[s] ? [guideBySlug[s]] : []));
  const transferFares = depth.airports.flatMap((a) => a.transfers.filter((t) => t.fare).map((t) => ({ airport: a, t })));

  const jsonLd = {
    "@graph": [
      faqPage(answers),
      {
        "@type": "TouristDestination",
        name: d.city,
        description: guide.intro,
        url: `${site.url}/destinations/${d.slug}`,
        image: unsplashShareImage(d.photo).url,
        containedInPlace: { "@type": "Country", name: d.country },
        touristType: ["Leisure travellers"],
      },
      {
        "@type": "TouristTrip",
        name: depthCopy.plan.tripName(depth.itinerary.length, d.city),
        description: depth.daysNeeded,
        itinerary: {
          "@type": "ItemList",
          numberOfItems: depth.itinerary.length,
          itemListElement: depth.itinerary.map((day, i) => ({ "@type": "ListItem", position: i + 1, name: `${depthCopy.plan.day(i + 1)}: ${day.title}`, description: `${day.morning} ${day.afternoon} ${day.evening}` })),
        },
      },
      breadcrumbList([
        { label: "Home", href: "/" },
        { label: "Destinations", href: "/destinations" },
        { label: d.city, href: `/destinations/${d.slug}` },
      ]),
    ],
  };


  const c = depthCopy;
  const menu = [
    { id: "overview", label: c.menu.overview },
    { id: "airports", label: c.menu.airports },
    { id: "when-to-go", label: c.menu.months },
    { id: "plan", label: c.menu.plan },
    { id: "where-to-stay", label: c.menu.stay },
    { id: "costs", label: c.menu.costs },
    { id: "questions", label: c.menu.faqs },
    { id: "flights-from", label: c.menu.routes },
  ];

  return (
    <article>
      <ParallaxHero photo={d.photo}>
        <div className="container-page flex min-h-[26rem] flex-col justify-end pt-24 pb-10 md:min-h-[32rem] md:pb-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.875rem] text-white/80">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="inline-flex min-h-6 items-center hover:text-white hover:underline">Home</Link>
                <CaretRight className="size-3.5" aria-hidden />
              </li>
              <li className="flex items-center gap-1.5">
                <Link href="/destinations" className="inline-flex min-h-6 items-center hover:text-white hover:underline">Destinations</Link>
                <CaretRight className="size-3.5" aria-hidden />
              </li>
              <li aria-current="page" className="font-medium text-white">{d.city}</li>
            </ol>
          </nav>
          <p className="mt-6 text-[1.0625rem] font-medium text-sun">{d.country}</p>
          {/* "Flights to London" for search engines; the city stays the big display line. */}
          <h1 className="font-display-tight text-[3.25rem] leading-[0.95] font-extrabold text-white sm:text-[4.5rem] lg:text-[6rem]">
            <span className="mb-1 block font-sans text-[1.25rem] leading-tight font-semibold tracking-normal text-white/85 sm:text-[1.5rem]">Flights to</span>{" "}
            {d.city}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-white/85 md:text-[1.1875rem]">{guide.intro}</p>
        </div>
      </ParallaxHero>

      <div className="container-page relative z-10 -mt-6">
        <SearchPanel variant="bar" defaultFrom="NYC" defaultTo={d.airport} subId={`destination_${d.slug}`} />
      </div>

      <div className="mt-10">
        <SectionMenu items={menu} />
      </div>

      {/* Overview: the facts at a glance, and recent fares beside them. */}
      <section id="overview" aria-label="Overview" className="scroll-mt-32 py-12 md:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <dl className="grid content-start grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-(--radius-card) bg-mist p-4 sm:p-5">
                <Icon className="size-6 text-action" aria-hidden />
                <dt className="mt-3 text-[0.8125rem] text-ink-soft">{label}</dt>
                <dd className="mt-1 font-semibold leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <aside aria-labelledby="fares-title" className="rounded-(--radius-panel) bg-board p-6 text-white md:p-7">
            <h2 id="fares-title" className="font-display-tight text-[1.5rem] font-bold">Recent fares to {d.city}</h2>
            {fares.length > 0 ? (
              <ul className="mt-5 divide-y divide-white/10">
                {fares.map(({ origin, fare }) => {
                  const href = dealHref(fare, origin.code, d.airport, `destination_${d.slug}_fares_${origin.slug}`);
                  return (
                    <li key={origin.code}>
                      <Link href={href} className="group flex items-center justify-between gap-4 py-3">
                        <span>
                          <span className="block font-semibold group-hover:underline">From {origin.city}</span>
                          <span className="text-[0.875rem] text-white/65">
                            {fareDates(fare)}, {stopsText(fare.transfers)}
                          </span>
                        </span>
                        <Price amount={fare.price} currency={fare.currency} className="tabular text-[1.25rem] font-bold text-sun" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <>
                <p className="mt-4 leading-relaxed text-white/75">No recent fares found for {d.city}. Search your dates to see live prices.</p>
                <Link
                  href={dealHref(undefined, "NYC", d.airport, `destination_${d.slug}_fares_search`)}
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-sun px-5 font-semibold text-ink hover:bg-[#ffd666]"
                >
                  <MagnifyingGlass className="size-4" weight="bold" aria-hidden />
                  {c.costs.noFlights}
                </Link>
              </>
            )}
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-white/60">
              Cheapest round trips per person found in the last few days. The provider confirms the final price.
            </p>
          </aside>
        </div>
      </section>

      <GuideSection id="airports" title={c.airports.title(d.city)} intro={c.airports.intro} tone="mist">
        <AirportTransfers airports={depth.airports} checked={depth.checked} />
      </GuideSection>

      <GuideSection id="when-to-go" title={c.months.title(d.city)} intro={c.months.intro}>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div>
            <p className="text-[1.125rem] font-semibold leading-snug text-ink">{guide.bestTime}.</p>
            <p className="mt-3 leading-[1.75] text-ink/85">{guide.whenToGo}</p>
          </div>
          <MonthStrip weather={depth.weather} climate={depth.climate?.months} cheapestMonth={cheapestMonth} cheapestLabel={cal ? `Cheapest from ${cal.origin.city}` : undefined} />
        </div>
        {calendars.length > 0 && (
          <div className="mt-12">
            <h3 className="text-[1.25rem] font-semibold text-ink">{c.months.calendar(d.city)}</h3>
            <div className="mt-4">
              <MonthCalendar calendars={calendars} to={d.airport} subPrefix={`destination_${d.slug}`} />
            </div>
          </div>
        )}
      </GuideSection>

      <GuideSection id="plan" title={c.plan.title(d.city)} intro={c.plan.intro} tone="mist">
        {/* A real sequence, so the days are numbered. */}
        <ol className="grid gap-5 lg:grid-cols-3">
          {depth.itinerary.map((day, i) => (
            <li key={day.title} className="flex flex-col rounded-(--radius-panel) bg-white p-6 ring-1 ring-line">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink font-display-tight font-bold text-sun" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="font-display-tight text-[1.25rem] leading-snug font-bold text-ink">
                  <span className="sr-only">{c.plan.day(i + 1)}: </span>
                  {day.title}
                </h3>
              </div>
              <dl className="mt-5 space-y-4">
                {(["morning", "afternoon", "evening"] as const).map((part) => (
                  <div key={part} className="border-l-2 border-line pl-4">
                    <dt className="text-[0.8125rem] font-semibold text-action">{c.plan.parts[part]}</dt>
                    <dd className="mt-1 leading-relaxed text-ink/85">{day[part]}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-(--radius-panel) bg-white p-6 ring-1 ring-line">
            <h3 className="font-semibold text-ink">{c.plan.highlights}</h3>
            <ul className="mt-3 space-y-2">
              {guide.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-ink/85">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-action" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">{depth.daysNeeded}</p>
          </div>
          <div className="flex gap-4 rounded-(--radius-panel) bg-sun/25 p-6 ring-1 ring-sun/60">
            <Lightbulb className="size-6 shrink-0 text-ink" weight="fill" aria-hidden />
            <div>
              <h3 className="font-semibold text-ink">{c.plan.tip}</h3>
              <p className="mt-2 leading-relaxed text-ink">{guide.tip}</p>
            </div>
          </div>
        </div>
      </GuideSection>

      <GuideSection id="where-to-stay" title={c.stay.title(d.city)} intro={c.stay.intro}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {depth.neighbourhoods.map((n) => (
            <li key={n.name} className="flex flex-col rounded-(--radius-panel) p-6 ring-1 ring-line">
              <span className="w-fit rounded-full bg-mist px-3 py-1 text-[0.8125rem] font-semibold text-action">
                <span className="sr-only">{c.stay.bestFor}: </span>
                {n.bestFor}
              </span>
              <h3 className="mt-4 font-display-tight text-[1.375rem] font-bold text-ink">{n.name}</h3>
              <p className="mt-2 leading-relaxed text-ink/85">{n.text}</p>
            </li>
          ))}
        </ul>
      </GuideSection>

      <GuideSection id="costs" title={c.costs.title(d.city)} intro={c.costs.intro} tone="mist">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-(--radius-panel) bg-white p-6 ring-1 ring-line">
            <AirplaneTakeoff className="size-7 text-action" aria-hidden />
            <h3 className="mt-4 font-semibold text-ink">{c.costs.flights}</h3>
            {fares.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {fares.slice(0, 4).map(({ origin, fare }) => (
                  <li key={origin.code} className="flex items-baseline justify-between gap-3 text-ink/85">
                    {c.costs.flightsFrom(origin.city)}
                    <Price amount={fare.price} currency={fare.currency} className="tabular text-[1.125rem] font-bold text-fare" />
                  </li>
                ))}
              </ul>
            ) : (
              <Link href={dealHref(undefined, "NYC", d.airport, `destination_${d.slug}_costs`)} className="mt-3 inline-flex items-center gap-2 font-semibold text-action hover:underline">
                <MagnifyingGlass className="size-4" weight="bold" aria-hidden />
                {c.costs.noFlights}
              </Link>
            )}
          </div>
          <div className="rounded-(--radius-panel) bg-white p-6 ring-1 ring-line">
            <Train className="size-7 text-action" aria-hidden />
            <h3 className="mt-4 font-semibold text-ink">{c.costs.transfer}</h3>
            {transferFares.length > 0 ? (
              <ul className="mt-3 space-y-3">
                {transferFares.map(({ airport: a, t }) => (
                  <li key={`${a.code}-${t.name}`} className="text-ink/85">
                    <span className="block text-[0.9375rem]">
                      {t.name}, from {a.name}
                    </span>
                    <span className="tabular font-bold text-fare">{t.fare?.text}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 leading-relaxed text-ink/85">{c.costs.transferNone}</p>
            )}
          </div>
          <div className="rounded-(--radius-panel) bg-white p-6 ring-1 ring-line">
            <Coins className="size-7 text-action" aria-hidden />
            <h3 className="mt-4 font-semibold text-ink">{c.costs.around}</h3>
            <p className="mt-3 leading-relaxed text-ink/85">{depth.gettingAround}</p>
            <p className="mt-3 text-[0.9375rem] text-ink-soft">{depth.essentials.currency}</p>
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-soft">{c.costs.note}</p>
      </GuideSection>

      <GuideSection id="questions" title={c.faqs.title(d.city)} intro={c.faqs.intro}>
        {/* Answer-first; the same text feeds the FAQPage markup below. */}
        <div className="divide-y divide-line border-y border-line">
          {answers.map((x) => (
            <div key={x.q} className="grid gap-2 py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12">
              <h3 className="text-[1.0625rem] leading-snug font-semibold text-ink">{x.q}</h3>
              <AnswerText x={x} />
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection id="flights-from" title={c.routes.title(d.city)} intro={c.routes.intro} tone="mist">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cityRoutes.map(({ origin, route }) => (
            <li key={origin.code}>
              <Link
                href={route ? `/routes/${route.slug}` : dealHref(undefined, origin.code, d.airport, `destination_${d.slug}_from_${origin.slug}`)}
                className="flex h-full items-center justify-between gap-3 rounded-(--radius-card) bg-white px-5 py-4 font-semibold text-ink ring-1 ring-line hover:text-action hover:ring-ink/20"
              >
                {route ? c.routes.route(origin.city) : c.routes.search(origin.city)}
                <CaretRight className="size-4 shrink-0" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </GuideSection>

      {readNext.length > 0 && (
        <GuideSection id="before-you-go" title={c.guides.title} intro={c.guides.intro}>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {readNext.map((g) => (
              <li key={g.slug}>
                <GuideCard guide={g} />
              </li>
            ))}
          </ul>
        </GuideSection>
      )}

      <TripExtras slug={d.slug} city={d.city} subPrefix={`destination_${d.slug}`} />

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-mist py-14 md:py-20">
          <div className="container-page">
            <h2 id="related-title" className="font-display-tight text-[1.875rem] leading-[1.1] font-bold text-ink md:text-[2.5rem]">
              More in {regions.find((x) => x.id === d.region)?.label}
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <DestinationTile d={r} fare={tileFares[r.slug]} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
    </article>
  );
}
