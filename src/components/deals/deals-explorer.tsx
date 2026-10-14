"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import clsx from "clsx";
import { DealCard } from "@/components/home/deals-rail";
import { origins, routes } from "@/content/deals";
import { regions, type Region } from "@/content/destinations";
import type { FareMap } from "@/lib/fares";

type Sort = "price" | "city";

export function DealsExplorer({ fares }: { fares: FareMap }) {
  const [origin, setOrigin] = useState<string>("all");
  const [region, setRegion] = useState<Region | "all">("all");
  const [sort, setSort] = useState<Sort>("price");

  const list = useMemo(() => {
    // Priced routes first (GBP, then USD, cheapest first); unpriced routes last.
    const rank = (slug: string) => {
      const f = fares[slug];
      return f ? [0, f.currency === "GBP" ? 0 : 1, f.price] : [1, 0, 0];
    };
    return routes
      .filter((d) => (origin === "all" || d.origin.code === origin) && (region === "all" || d.destination.region === region))
      .sort((a, b) => {
        if (sort === "city") return a.destination.city.localeCompare(b.destination.city);
        const ra = rank(a.slug);
        const rb = rank(b.slug);
        return ra[0] - rb[0] || ra[1] - rb[1] || ra[2] - rb[2];
      });
  }, [origin, region, sort, fares]);

  const chips = [{ code: "all", city: "All cities" }, ...origins];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <LayoutGroup id="deal-origin">
          <div role="group" aria-label="Departure city" className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
            {chips.map((o) => {
              const on = origin === o.code;
              return (
                <button
                  key={o.code}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setOrigin(o.code)}
                  className={clsx(
                    "relative h-11 shrink-0 cursor-pointer rounded-full px-5 text-[0.9375rem] font-semibold transition-colors",
                    on ? "text-white" : "text-ink ring-1 ring-line hover:bg-mist",
                  )}
                >
                  {on && <motion.span layoutId="deal-origin-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                  <span className="relative">{o.city}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <div className="grid grid-cols-2 gap-3 sm:flex">
          <label className="flex min-w-0 flex-col text-[0.8125rem] font-medium text-ink-soft">
            Region
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as Region | "all")}
              className="mt-1 h-11 w-full min-w-0 cursor-pointer rounded-xl bg-white px-3 text-[0.9375rem] font-semibold text-ink ring-1 ring-line"
            >
              <option value="all">All regions</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-0 flex-col text-[0.8125rem] font-medium text-ink-soft">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="mt-1 h-11 w-full min-w-0 cursor-pointer rounded-xl bg-white px-3 text-[0.9375rem] font-semibold text-ink ring-1 ring-line"
            >
              <option value="price">Lowest price</option>
              <option value="city">Destination A–Z</option>
            </select>
          </label>
        </div>
      </div>

      <h2 className="mt-6 text-[0.9375rem] font-normal text-ink" aria-live="polite">
        <strong className="font-semibold">{list.length}</strong> {list.length === 1 ? "route" : "routes"}
      </h2>

      {list.length === 0 ? (
        <div className="mt-4 rounded-(--radius-panel) bg-mist px-6 py-12 text-center">
          <p className="font-display-tight text-[1.375rem] font-bold text-ink">No featured routes for this combination</p>
          <button type="button" onClick={() => { setOrigin("all"); setRegion("all"); }} className="mt-4 h-11 cursor-pointer rounded-full bg-action px-6 font-semibold text-white">
            Show all deals
          </button>
        </div>
      ) : (
        <motion.ul layout className="mt-4 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((d) => (
              <motion.li
                key={d.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12 } }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <DealCard route={d} fare={fares[d.slug]} subId={`deals_${d.slug}`} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
      <p className="mt-8 text-[0.8125rem] text-ink-soft">
        Lowest round-trip economy fares per person found on Aviasales in the last few days, in the departure city’s currency. Routes
        without a recent fare show no price; search them for your dates.
      </p>
    </div>
  );
}
