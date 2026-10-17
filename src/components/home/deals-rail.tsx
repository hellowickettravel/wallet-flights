"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import clsx from "clsx";
import { SmartImage } from "@/components/ui/smart-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatPrice, origins, routesByOrigin, type Route } from "@/content/deals";
import { dealLink, fareDates, stopsText } from "@/lib/deal-links";
import type { FareMap } from "@/lib/fares";
import type { Fare } from "@/lib/travelpayouts";
import { onRovingKeyDown } from "@/lib/roving";

export function DealsRail({ fares }: { fares: FareMap }) {
  const [origin, setOrigin] = useState(origins[0].code);
  const rail = useRef<HTMLUListElement>(null);
  const deals = routesByOrigin[origin];

  function scrollBy(dir: 1 | -1) {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 20) * 2, behavior: "smooth" });
  }

  return (
    <section aria-labelledby="deals-title" className="py-18 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="deals-title"
          title="Fares from your city"
          intro="The cheapest round trips other travellers found recently from the US and UK. Pick your departure city."
        >
          <div className="hidden gap-2 md:flex">
            <RailButton label="Previous deals" onClick={() => scrollBy(-1)}>
              <CaretLeft className="size-5" aria-hidden />
            </RailButton>
            <RailButton label="Next deals" onClick={() => scrollBy(1)}>
              <CaretRight className="size-5" aria-hidden />
            </RailButton>
          </div>
        </SectionHeading>

        <LayoutGroup id="origin">
          <div
            role="tablist"
            aria-label="Departure city"
            onKeyDown={(e) =>
              onRovingKeyDown(e, (i) => {
                setOrigin(origins[i].code);
                rail.current?.scrollTo({ left: 0 });
              })
            }
            className="scrollbar-none -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            {origins.map((o) => {
              const active = o.code === origin;
              return (
                <button
                  key={o.code}
                  role="tab"
                  type="button"
                  id={`origin-tab-${o.code}`}
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  aria-controls="deals-panel"
                  onClick={() => {
                    setOrigin(o.code);
                    rail.current?.scrollTo({ left: 0 });
                  }}
                  className={clsx(
                    "relative h-11 shrink-0 cursor-pointer rounded-full px-5 text-[0.9375rem] font-semibold transition-colors",
                    active ? "text-white" : "text-ink ring-1 ring-line hover:bg-mist",
                  )}
                >
                  {active && (
                    <m.span layoutId="origin-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
                  )}
                  <span className="relative">{o.city}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <div id="deals-panel" role="tabpanel" aria-labelledby={`origin-tab-${origin}`} className="container-page mt-6">
        <ul
          ref={rail}
          className="scrollbar-none -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 md:-mx-8 md:scroll-px-8 md:px-8 xl:mx-0 xl:scroll-px-0 xl:px-0"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {deals.map((d, i) => (
              <m.li
                key={d.slug}
                layout
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-3*1.25rem)/4)]"
              >
                <DealCard route={d} fare={fares[d.slug]} subId={`home_deals_${d.slug}`} />
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
        <p className="mt-6 text-[0.8125rem] text-ink-soft">
          Lowest round-trip economy fares per person found in the last few days, in the departure city’s currency.
          Prices change often; the provider confirms the final price when you book.
        </p>
      </div>
    </section>
  );
}

/** A featured route. Shows the recent cheapest fare when there is one; otherwise no price. */
export function DealCard({ route, fare, subId, priority }: { route: Route; fare?: Fare; subId: string; priority?: boolean }) {
  const { destination: d, origin } = route;
  const link = dealLink(fare, origin.code, d.airport, subId);
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius-card)">
        <SmartImage
          photo={d.photo}
          priority={priority}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 44vw, 78vw"
          imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.04]"
        />
        {fare && (
          <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.75rem] font-semibold text-ink">{stopsText(fare.transfers)}</span>
        )}
      </div>
      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="flex items-center gap-1 truncate text-[1.0625rem] font-semibold text-ink group-hover:text-action">
            {d.city}
            {link.external && <ArrowUpRight className="size-4 shrink-0 text-ink-soft" weight="bold" aria-hidden />}
          </h3>
          <p className="truncate text-[0.875rem] text-ink-soft">
            {origin.city} to {d.city}
            {fare && <> · {fareDates(fare)}</>}
          </p>
        </div>
        {fare ? (
          <div className="shrink-0 text-right">
            <p className="tabular text-[1.25rem] leading-none font-bold text-fare">{formatPrice(fare.price, fare.currency)}</p>
            <p className="mt-1 text-[0.75rem] text-ink-soft">round trip</p>
          </div>
        ) : (
          <p className="shrink-0 pt-0.5 text-right text-[0.875rem] font-semibold text-action">Search dates</p>
        )}
      </div>
      {link.external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  const cls = "group block rounded-(--radius-card) focus-visible:outline-offset-4";
  return (
    <>
      {link.external ? (
        <a href={link.href} rel="sponsored noopener" target="_blank" className={cls} data-sub={subId}>
          {body}
        </a>
      ) : (
        <Link href={link.href} className={cls} data-sub={subId}>
          {body}
        </Link>
      )}
      {/* Crawlable link to the route's own page (the card itself goes to booking or search). */}
      <Link href={`/routes/${route.slug}`} className="mt-1 inline-block py-0.5 text-[0.8125rem] font-medium text-ink-soft underline decoration-line underline-offset-4 hover:text-action">
        {origin.city} to {d.city} flights
      </Link>
    </>
  );
}

function RailButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 cursor-pointer place-items-center rounded-full text-ink ring-1 ring-line transition-colors hover:bg-mist"
    >
      {children}
    </button>
  );
}
