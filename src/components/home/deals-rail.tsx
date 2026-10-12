"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import clsx from "clsx";
import { SmartImage } from "@/components/ui/smart-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { dealsByOrigin, origins, type Deal } from "@/content/deals";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function DealsRail() {
  const [origin, setOrigin] = useState(origins[0].code);
  const rail = useRef<HTMLUListElement>(null);
  const deals = dealsByOrigin[origin];

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
          intro="Example round-trip fares to places people love. Pick your departure city."
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
          <div role="tablist" aria-label="Departure city" className="scrollbar-none -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            {origins.map((o) => {
              const active = o.code === origin;
              return (
                <button
                  key={o.code}
                  role="tab"
                  type="button"
                  id={`origin-tab-${o.code}`}
                  aria-selected={active}
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
                    <motion.span layoutId="origin-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
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
              <motion.li
                key={d.id}
                layout
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-3*1.25rem)/4)]"
              >
                <DealCard deal={d} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <p className="mt-6 text-[0.8125rem] text-ink-soft">
          Example fares in USD per person, economy, taxes included. Prices change often; your exact price is confirmed before you pay.
        </p>
      </div>
    </section>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  const { destination: d } = deal;
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className="group block rounded-(--radius-card) focus-visible:outline-offset-4"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius-card)">
        <SmartImage
          photo={d.photo}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 44vw, 78vw"
          imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.75rem] font-semibold text-ink">
          {deal.stops === 0 ? "Nonstop" : `${deal.stops} stop`}
        </span>
      </div>
      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[1.0625rem] font-semibold text-ink group-hover:text-action">{d.city}</h3>
          <p className="truncate text-[0.875rem] text-ink-soft">
            {deal.origin} → {d.airport} · {deal.travel}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="tabular text-[1.25rem] leading-none font-bold text-fare">{usd.format(deal.price)}</p>
          <p className="mt-1 text-[0.75rem] text-ink-soft">round trip</p>
        </div>
      </div>
    </Link>
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
