import { breadcrumbList, faqPage, jsonLdHtml } from "@/lib/schema";
import { destinationQuestions } from "@/content/quick-answers";
import { pageMetadata, unsplashShareImage } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AirplaneTakeoff, CalendarCheck, CaretRight, Lightbulb, MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import { ParallaxHero } from "@/components/destinations/parallax-hero";
import { DestinationTile } from "@/components/destinations/destination-tile";
import { SearchPanel } from "@/components/search/search-panel";
import { AirportTabs } from "@/components/destinations/airport-tabs";
import { MonthStrip } from "@/components/destinations/month-strip";
import { QuestionList } from "@/components/destinations/question-list";
import { GuideSection, SectionMenu } from "@/components/destinations/guide-section";
import { TripEssentials } from "@/components/destinations/trip-essentials";
import { FlightTimes } from "@/components/destinations/flight-times";
import { DayPlan } from "@/components/destinations/day-plan";
import { StayTiles } from "@/components/destinations/stay-tiles";
import { LocalTips } from "@/components/destinations/local-tips";
import { FoodList } from "@/components/destinations/food-list";
import { DayTrips } from "@/components/destinations/day-trips";
import { GuideCard } from "@/components/guides/guide-card";
import { depthCopy, destinationDepth } from "@/content/destination-depth";
import { guideBySlug } from "@/content/guides";
import { airports } from "@/content/airports";
import { MonthCalendar } from "@/components/destinations/month-calendar";
import { TripExtras } from "@/components/destinations/trip-extras";
import { originByCode, routes } from "@/content/deals";
import { destinationGuides, entryNote, usPassportNote } from "@/content/destination-guides";
import { destinationBySlug, destinations, regions } from "@/content/destinations";
import { site } from "@/content/site";
import { approxFlightTime } from "@/lib/demo-flights";
import { dealHref, fareDates, stopsText } from "@/lib/deal-links";
import { destinationTileFares, monthCalendars } from "@/lib/fares";
import { cheapestFare } from "@/lib/travelpayouts";
import { Price } from "@/components/currency/currency-provider";
import { diffTemplates } from "@/components/destinations/zone-time";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = destinationBySlug[slug];
  if (!d) return {};
  // Flight times are shown from the other gateway city, never from the city itself.
  const from = ["New York", "London"].filter((c) => c !== d.city).join(" and ");
  return pageMetadata({
    title: `${d.city} flights: best time to visit and fares`,
    description: `How long the flight to ${d.city} is from ${from}, the best months to visit, which airport to use, and entry rules for UK and US travellers.`,
    path: `/destinations/${d.slug}`,
    image: unsplashShareImage(d.photo),
  });
}

/**
 * Destination page v2 (Batch 22): one template for every city. Hero and
 * search, then sections in the shared GuideSection wrapper with a sticky
 * "On this page" menu. All copy lives in src/content (depthCopy and the city's
 * DestinationDepth); the fare board stays the one signature element.
 */
export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = destinationBySlug[slug];
  const guide = destinationGuides[slug];
  const depth = destinationDepth[slug];
  if (!d || !guide || !depth) notFound();

  const airport = airports.find((a) => a.code === d.airport);
  const fromNyc = approxFlightTime("JFK", d.airport);
  const fromLon = approxFlightTime("LHR", d.airport);
  // Fare board: our featured routes to this place, plus New York and London.
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
      label: "Approx. flying time",
      value: [
        d.city !== "New York" && `About ${fromNyc.label} from New York${fromNyc.longHaul ? " with a connection" : ""}`,
        d.city !== "London" && `About ${fromLon.label} from London${fromLon.longHaul ? " with a connection" : ""}`,
      ]
        .filter(Boolean)
        .join(" · "),
    },
  ];

  const timesFrom = [
    d.city !== "London" && { from: "London", time: fromLon },
    d.city !== "New York" && { from: "New York", time: fromNyc },
  ].filter((t) => !!t);
  const notUkUs = d.country !== "United Kingdom" && d.country !== "United States";
  const entryAnswer = `${destinationQuestions.entryLead} ${guide.entry.label}. ${entryNote}${notUkUs ? ` ${usPassportNote}` : ""}`;
  // The six built answers, then the city's own questions. The same list feeds
  // the accordion and the FAQPage markup, so they always match.
  const questions = [
    { q: destinationQuestions.bestTime.q(d.city), a: destinationQuestions.bestTime.a(guide.bestTime, guide.whenToGo) },
    { q: destinationQuestions.airports.q(d.city), a: guide.flying },
    {
      q: destinationQuestions.flightTime.q(d.city, d.city === "London" ? "the US" : d.city === "New York" ? "the UK" : "the UK and US"),
      a: destinationQuestions.flightTime.a(timesFrom),
    },
    {
      q: destinationQuestions.entry.q(/^United /.test(d.country) ? `the ${d.country}` : d.country),
      a: entryAnswer,
      link: { label: guide.entry.label, href: guide.entry.url },
    },
    { q: `What’s the best way to get around ${d.city}?`, a: depth.gettingAround },
    { q: `How many days do you need in ${d.city}?`, a: depth.daysNeeded },
    ...depth.faqs,
  ];
  const cal = calendars[0];
  const cheapest = cal?.months.length ? cal.months.reduce((a, b) => (b.price < a.price ? b : a)) : undefined;
  const cityGuides = depth.guides.flatMap((s) => (guideBySlug[s] ? [guideBySlug[s]] : []));
  const regionLabel = regions.find((x) => x.id === d.region)?.label;

  const te = depthCopy.tripEssentials;
  const essentialsCopy = { title: te.title, localTime: te.localTime(d.city), rateNote: te.rateNote, diff: diffTemplates(te), rows: te.rows };
  const nav = depthCopy.nav;
  const menu = [
    { id: "overview", label: nav.overview },
    { id: "flight-times", label: nav.flights },
    { id: "airports", label: nav.airports },
    { id: "plan", label: nav.plan },
    { id: "stay", label: nav.stay },
    { id: "when", label: nav.months },
    { id: "tips", label: nav.tips },
    { id: "food", label: nav.food },
    { id: "day-trips", label: nav.trips },
    { id: "questions", label: nav.faqs },
    ...(cityGuides.length ? [{ id: "before-you-go", label: nav.guides }] : []),
  ];

  const jsonLd = {
    "@graph": [
      faqPage(questions.map((x) => ({ q: x.q, a: x.a }))),
      {
        "@type": "TouristDestination",
        name: d.city,
        description: guide.intro,
        url: `${site.url}/destinations/${d.slug}`,
        image: unsplashShareImage(d.photo).url,
        containedInPlace: { "@type": "Country", name: d.country },
      },
      breadcrumbList([
        { label: "Home", href: "/" },
        { label: "Destinations", href: "/destinations" },
        { label: d.city, href: `/destinations/${d.slug}` },
      ]),
    ],
  };

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

      {/* Above the sticky section menu (z-30), so the search's popovers open over it; below the header (z-40). */}
      <div className="container-page relative z-[35] -mt-6 mb-10">
        <SearchPanel variant="bar" defaultFrom="NYC" defaultTo={d.airport} subId={`destination_${d.slug}`} />
      </div>

      {/* A direct child of the article, so it stays stuck under the header for the whole page. */}
      <SectionMenu items={menu} />

      <GuideSection id="overview" title={depthCopy.overview.title(d.city)} intro={depthCopy.overview.intro}>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <dl className="grid gap-5 sm:grid-cols-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-(--radius-card) bg-mist p-5">
                  <Icon className="size-6 text-action" aria-hidden />
                  <dt className="mt-3 text-[0.8125rem] text-ink-soft">{label}</dt>
                  <dd className="mt-1 font-semibold leading-snug text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-10 font-display-tight text-[1.375rem] font-bold text-ink">{depthCopy.overview.highlights}</h3>
            <ul className="mt-4 space-y-3">
              {guide.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <Star className="mt-0.5 size-5 shrink-0 text-action" weight="duotone" aria-hidden />
                  <span className="text-[1.0625rem] leading-snug text-ink">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex gap-4 rounded-(--radius-card) bg-sun/20 p-5 ring-1 ring-sun/50">
              <Lightbulb className="size-6 shrink-0 text-ink" weight="fill" aria-hidden />
              <p className="leading-relaxed text-ink">
                <strong className="font-semibold">{depthCopy.overview.tip}: </strong>
                {guide.tip}
              </p>
            </div>
          </div>

          <aside className="min-w-0 space-y-6">
            <section aria-labelledby="fares-title" className="rounded-(--radius-panel) bg-board p-6 text-white md:p-7">
              <h3 id="fares-title" className="font-display-tight text-[1.5rem] font-bold">Recent fares to {d.city}</h3>
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
                              {fareDates(fare)} · {stopsText(fare.transfers)}
                            </span>
                          </span>
                          <Price amount={fare.price} currency={fare.currency} className="tabular text-[1.25rem] font-bold text-sun" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-4 leading-relaxed text-white/75">No recent fares found for {d.city}. Search your dates to see live prices.</p>
              )}
              <p className="mt-4 text-[0.8125rem] leading-relaxed text-white/60">
                Cheapest round trips per person found in the last few days. The provider confirms the final price.
              </p>
            </section>
            <TripEssentials city={d.city} timeZone={depth.timeZone} essentials={depth.essentials} copy={essentialsCopy} />
          </aside>
        </div>
      </GuideSection>

      <GuideSection id="flight-times" tone="mist" title={depthCopy.flightTimes.title(d.city)} intro={depthCopy.flightTimes.intro}>
        <FlightTimes d={d} timeZone={depth.timeZone} />
      </GuideSection>

      <GuideSection id="airports" title={depthCopy.airports.title(d.city)} intro={depthCopy.airports.intro}>
        <AirportTabs airports={depth.airports} />
      </GuideSection>

      <GuideSection id="plan" tone="mist" title={depthCopy.plan.title(d.city)} intro={depthCopy.plan.intro}>
        <DayPlan days={depth.visual.days} itinerary={depth.itinerary} />
      </GuideSection>

      <GuideSection id="stay" title={depthCopy.stay.title(d.city)} intro={depthCopy.stay.intro}>
        <StayTiles stay={depth.visual.stay} neighbourhoods={depth.neighbourhoods} />
      </GuideSection>

      <GuideSection id="when" tone="mist" title={depthCopy.months.title(d.city)} intro={depthCopy.months.intro}>
        <p className="text-[1.0625rem] font-semibold text-ink">{guide.bestTime}</p>
        <div className="mt-5">
          <MonthStrip
            weather={depth.weather}
            climate={depth.climate?.months}
            cheapestMonth={cheapest ? Number(cheapest.month.slice(5, 7)) - 1 : undefined}
            cheapestLabel={cal ? `Cheapest from ${cal.origin.city}` : undefined}
          />
        </div>
        {calendars.length > 0 && (
          <div className="mt-12">
            <h3 className="font-display-tight text-[1.375rem] font-bold text-ink md:text-[1.625rem]">{depthCopy.months.calendar(d.city)}</h3>
            <div className="mt-5">
              <MonthCalendar calendars={calendars} to={d.airport} subPrefix={`destination_${d.slug}`} />
            </div>
          </div>
        )}
      </GuideSection>

      <GuideSection id="tips" title={depthCopy.tips.title(d.city)} intro={depthCopy.tips.intro}>
        <LocalTips tips={depth.localTips} />
      </GuideSection>

      <GuideSection id="food" tone="mist" title={depthCopy.food.title(d.city)} intro={depthCopy.food.intro}>
        <FoodList foods={depth.foods} />
      </GuideSection>

      <GuideSection id="day-trips" title={depthCopy.dayTrips.title(d.city)} intro={depthCopy.dayTrips.intro}>
        <DayTrips trips={depth.dayTrips} />
      </GuideSection>

      <GuideSection id="questions" tone="mist" title={depthCopy.faqs.title(d.city)} intro={depthCopy.faqs.intro}>
        <div className="max-w-4xl">
          <QuestionList items={questions} />
        </div>
      </GuideSection>

      {cityGuides.length > 0 && (
        <GuideSection id="before-you-go" title={depthCopy.beforeYouGo.title} intro={depthCopy.beforeYouGo.intro(d.city)}>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cityGuides.map((g) => (
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
            <h2 id="related-title" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">More in {regionLabel}</h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
