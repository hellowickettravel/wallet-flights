"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import clsx from "clsx";
import { SmartImage } from "@/components/ui/smart-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatPrice } from "@/content/deals";
import { destinations, regions, type Region } from "@/content/destinations";
import type { TileFare } from "@/lib/fares";

export function DestinationsMosaic({ fares }: { fares: Record<string, TileFare> }) {
  const [region, setRegion] = useState<Region>("europe");
  const list = destinations.filter((d) => d.region === region).slice(0, 5);

  return (
    <section aria-labelledby="dest-title" className="py-18 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="dest-title"
          title="Trending destinations"
          intro="Popular places to fly this season, with the cheapest round trip found recently from New York."
        >
          <Link href="/destinations" className="text-[0.9375rem] font-semibold text-action underline-offset-4 hover:underline">
            See all destinations
          </Link>
        </SectionHeading>

        <LayoutGroup id="region">
          <div role="tablist" aria-label="Region" className="scrollbar-none -mx-5 mt-8 flex gap-1 overflow-x-auto border-b border-line px-5 md:mx-0 md:px-0">
            {regions.map((r) => {
              const active = r.id === region;
              return (
                <button
                  key={r.id}
                  role="tab"
                  type="button"
                  id={`region-tab-${r.id}`}
                  aria-selected={active}
                  aria-controls="region-panel"
                  onClick={() => setRegion(r.id)}
                  className={clsx(
                    "relative h-12 shrink-0 cursor-pointer px-4 text-[0.9375rem] font-semibold transition-colors",
                    active ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {r.label}
                  {active && (
                    <m.span
                      layoutId="region-underline"
                      className="absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-action"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div id="region-panel" role="tabpanel" aria-labelledby={`region-tab-${region}`} className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <m.ul
              key={region}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid auto-rows-[11.5rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 lg:auto-rows-[15.5rem] lg:grid-cols-4"
            >
              {list.map((d, i) => {
                const fare = fares[d.slug];
                return (
                <li key={d.slug} className={clsx(i === 0 && "col-span-2 lg:row-span-2")}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="group relative block h-full overflow-hidden rounded-(--radius-card) focus-visible:outline-offset-4"
                  >
                    <SmartImage
                      photo={d.photo}
                      sizes={i === 0 ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 300px, 50vw"}
                      imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.04]"
                    />
                    <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(15_31_61/0.82)_0%,rgb(15_31_61/0.25)_45%,transparent_70%)]" />
                    {fare && (
                      <span className="absolute top-3 right-3 rounded-full bg-white px-2.5 py-1 text-[0.75rem] font-semibold text-ink sm:top-4 sm:right-4 sm:px-3 sm:py-1.5 sm:text-[0.8125rem]">
                        <span className="sr-only">Round trip from {fare.originCity} </span>
                        from <span className="tabular text-fare">{formatPrice(fare.price, fare.currency)}</span>
                      </span>
                    )}
                    <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <span
                        className={clsx(
                          "block font-display-tight font-bold text-white",
                          i === 0 ? "text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem]" : "text-[1.25rem] sm:text-[1.5rem]",
                        )}
                      >
                        {d.city}
                      </span>
                      <span className="block truncate text-[0.8125rem] text-white/80 sm:text-[0.875rem]">{i === 0 ? d.blurb : d.country}</span>
                    </span>
                  </Link>
                </li>
                );
              })}
            </m.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
