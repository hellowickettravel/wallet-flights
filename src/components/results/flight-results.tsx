"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, LayoutGroup, m, useReducedMotion } from "motion/react";
import {
  ArrowSquareOut,
  CaretLeft,
  CaretRight,
  FadersHorizontal,
  Info,
  ListBullets,
  MagnifyingGlass,
  PencilSimple,
  Table,
  X,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { SearchPanel } from "@/components/search/search-panel";
import { formatPrice } from "@/content/deals";
import { parseSearch, travellerCount, type SearchQuery } from "@/lib/search-query";
import {
  clock,
  dayOffset,
  durationLabel,
  generateDemoResults,
  maxStops,
  stopsLabel,
  totalDuration,
  withDefaultDates,
  type Itinerary,
} from "@/lib/demo-flights";
import { AirlineMark } from "./airline-mark";
import { FlightCard, dealHref } from "./flight-card";
import { FiltersPanel, emptyFilters, timeBands, type FacetCounts, type Filters } from "./filters";
import { Searching } from "./searching";
import { onRovingKeyDown } from "@/lib/roving";

type Sort = "cheapest" | "fastest" | "best";
const PAGE = 10;
const noop = () => () => {};
const todayIso = () => new Date().toISOString().slice(0, 10);
const cabinLabel = { economy: "Economy", premium: "Premium economy", business: "Business", first: "First" } as const;

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
}

export function FlightResults() {
  const params = useSearchParams();
  const today = useSyncExternalStore(noop, todayIso, () => "");
  const parsed = useMemo(() => parseSearch(new URLSearchParams(params.toString())), [params]);

  if (!parsed.ok) return <NoSearch partial={parsed.partial} />;
  const query = withDefaultDates(parsed.query, today || todayIso());
  return <ResultsView key={params.toString()} query={query} />;
}

function NoSearch({ partial }: { partial: Partial<SearchQuery> }) {
  return (
    <div className="container-page py-10 md:py-16">
      <h1 className="font-display-tight text-[2.25rem] leading-tight font-extrabold text-ink md:text-[3rem]">Search flights</h1>
      <p className="mt-2 max-w-xl text-[1.0625rem] text-ink-soft">
        Choose where you’re flying from and to. We’ll compare airlines and travel sites, cheapest first.
      </p>
      <div className="mt-8">
        <SearchPanel initial={partial} variant="bar" />
      </div>
    </div>
  );
}

function ResultsView({ query }: { query: SearchQuery }) {
  const reduce = useReducedMotion();
  const data = useMemo(() => generateDemoResults(query), [query]);
  const travellers = travellerCount(query);
  const first = query.legs[0];

  const [searching, setSearching] = useState(true);
  const [sort, setSort] = useState<Sort>("cheapest");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [view, setView] = useState<"cards" | "table">("cards");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE);
  const [sheet, setSheet] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setSearching(false), reduce ? 300 : 1300);
    return () => window.clearTimeout(t);
  }, [reduce]);

  const journeyLabels = useMemo(() => {
    if (query.trip === "round") return ["Outbound", "Return"];
    if (query.trip === "multi") return query.legs.map((_, i) => `Flight ${i + 1}`);
    return ["Outbound"];
  }, [query]);

  const facets = useMemo<FacetCounts>(() => {
    const its = data.itineraries;
    const minOf = (list: Itinerary[]) => (list.length ? Math.min(...list.map((i) => i.price)) : undefined);
    const byAirline = new Map<string, Itinerary[]>();
    its.forEach((i) => byAirline.set(i.airline.code, [...(byAirline.get(i.airline.code) ?? []), i]));
    const times = { night: 0, morning: 0, afternoon: 0, evening: 0 };
    its.forEach((i) => {
      const m = i.journeys[0].departMin;
      const band = timeBands.find((b) => m >= b.from && m < b.to);
      if (band) times[band.id]++;
    });
    const stopsOf = (n: number) => its.filter((i) => (n === 2 ? maxStops(i) >= 2 : maxStops(i) === n));
    return {
      stops: [0, 1, 2].map((n) => ({ value: n, label: n === 2 ? "2+ stops" : stopsLabel(n), count: stopsOf(n).length, from: minOf(stopsOf(n)) })),
      airlines: [...byAirline.values()]
        .map((list) => ({ airline: list[0].airline, count: list.length, from: minOf(list)! }))
        .sort((a, b) => a.from - b.from),
      times,
      priceMin: minOf(its) ?? 0,
      priceMax: its.length ? Math.max(...its.map((i) => i.price)) : 0,
    };
  }, [data]);

  const filtered = useMemo(() => {
    const f = filters;
    return data.itineraries.filter((i) => {
      const s = Math.min(maxStops(i), 2);
      if (f.stops.size && !f.stops.has(s)) return false;
      if (f.airlines.size && !f.airlines.has(i.airline.code)) return false;
      if (f.maxPrice !== null && i.price > f.maxPrice) return false;
      if (f.refundableOnly && !i.refundable) return false;
      if (f.times.size) {
        const m = i.journeys[0].departMin;
        const band = timeBands.find((b) => m >= b.from && m < b.to);
        if (!band || !f.times.has(band.id)) return false;
      }
      return true;
    });
  }, [data, filters]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    const prices = list.map((i) => i.price);
    const durs = list.map(totalDuration);
    const [pMin, pMax, dMin, dMax] = [Math.min(...prices), Math.max(...prices), Math.min(...durs), Math.max(...durs)];
    const score = (i: Itinerary) =>
      0.6 * ((i.price - pMin) / (pMax - pMin || 1)) + 0.4 * ((totalDuration(i) - dMin) / (dMax - dMin || 1));
    if (sort === "cheapest") list.sort((a, b) => a.price - b.price || totalDuration(a) - totalDuration(b));
    if (sort === "fastest") list.sort((a, b) => totalDuration(a) - totalDuration(b) || a.price - b.price);
    if (sort === "best") list.sort((a, b) => score(a) - score(b));
    return { list, cheapestId: [...filtered].sort((a, b) => a.price - b.price)[0]?.id, fastestId: [...filtered].sort((a, b) => totalDuration(a) - totalDuration(b))[0]?.id, bestId: [...filtered].sort((a, b) => score(a) - score(b))[0]?.id };
  }, [filtered, sort]);

  const sortSummary = useMemo(() => {
    const cheapest = sorted.list.length ? Math.min(...sorted.list.map((i) => i.price)) : 0;
    const fastest = sorted.list.length ? Math.min(...sorted.list.map(totalDuration)) : 0;
    const bestIt = sorted.list.find((i) => i.id === sorted.bestId);
    return { cheapest, fastest, best: bestIt?.price ?? 0 };
  }, [sorted]);

  const activeCount =
    filters.stops.size + filters.airlines.size + filters.times.size + (filters.maxPrice !== null ? 1 : 0) + (filters.refundableOnly ? 1 : 0);

  function updateFilters(f: Filters) {
    setFilters(f);
    setShown(PAGE);
  }

  const summary = (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-mist text-action sm:grid">
        <MagnifyingGlass weight="bold" className="size-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <h1 className="truncate font-display-tight text-[1.25rem] leading-tight font-bold text-ink md:text-[1.5rem]">
          {first.from.city} <span className="text-ink-soft">→</span> {query.trip === "multi" ? query.legs[query.legs.length - 1].to.city : first.to.city}
        </h1>
        <p className="truncate text-[0.875rem] text-ink-soft">
          {query.trip === "round" ? `${fmtDate(first.date)} – ${fmtDate(query.returnDate)}` : query.legs.map((l) => fmtDate(l.date)).join(" · ")}
          {" · "}
          {travellers} traveller{travellers > 1 ? "s" : ""} · {cabinLabel[query.cabin]}
        </p>
      </div>
    </div>
  );

  return (
    <div className="pb-18 md:pb-24">
      <div className="border-b border-line bg-white">
        <div className="container-page py-4">
          <div className="flex items-center gap-3">
            {summary}
            <button
              type="button"
              onClick={() => setEditing((e) => !e)}
              aria-expanded={editing}
              aria-controls="modify-search"
              className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-ink px-4 font-semibold text-white hover:bg-ink/90 sm:px-5"
            >
              {editing ? <X className="size-4" weight="bold" aria-hidden /> : <PencilSimple className="size-4" weight="bold" aria-hidden />}
              <span className="hidden sm:inline">{editing ? "Close" : "Modify search"}</span>
              <span className="sm:hidden">{editing ? "Close" : "Edit"}</span>
            </button>
          </div>
          <AnimatePresence initial={false}>
            {editing && (
              <m.div
                id="modify-search"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <SearchPanel initial={query} variant="bar" />
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="container-page pt-6">
        <p className="flex items-start gap-2.5 rounded-xl bg-sun/25 px-4 py-3 text-[0.875rem] text-ink ring-1 ring-sun/60">
          <Info className="mt-0.5 size-4 shrink-0" weight="bold" aria-hidden />
          <span>
            <strong className="font-semibold">Demo results.</strong> Prices, times and providers are examples while live fares are being connected.
          </span>
        </p>

        {searching ? (
          <div className="mt-6">
            <Searching from={first.from.code} to={first.to.code} providers={data.providerCount} />
          </div>
        ) : (
          <>
            <AirlineStrip facets={facets} currency={data.currency} selected={filters.airlines} onPick={(code) => updateFilters({ ...filters, airlines: new Set(filters.airlines.has(code) && filters.airlines.size === 1 ? [] : [code]) })} />

            <div className="mt-6 grid gap-6 lg:grid-cols-[17.5rem_1fr] lg:gap-8">
              <aside aria-label="Filters" className="hidden lg:block">
                <div className="sticky top-24 rounded-(--radius-panel) bg-white p-5 ring-1 ring-line">
                  <FiltersPanel filters={filters} facets={facets} currency={data.currency} onChange={updateFilters} onReset={() => updateFilters(emptyFilters())} activeCount={activeCount} />
                </div>
              </aside>

              <section aria-label="Results" className="min-w-0">
                <SortTabs sort={sort} onSort={setSort} summary={sortSummary} currency={data.currency} />

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[0.9375rem] text-ink" aria-live="polite">
                    <strong className="font-semibold">{filtered.length}</strong> of {data.itineraries.length} flights
                    <span className="text-ink-soft"> from {facets.airlines.length} airlines</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSheet(true)}
                      className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-white px-4 text-[0.9375rem] font-semibold text-ink ring-1 ring-line hover:bg-mist lg:hidden"
                    >
                      <FadersHorizontal className="size-4" weight="bold" aria-hidden />
                      Filters{activeCount ? ` (${activeCount})` : ""}
                    </button>
                    <div role="group" aria-label="View" className="flex rounded-full bg-white p-1 ring-1 ring-line">
                      {(
                        [
                          ["cards", "List view", ListBullets],
                          ["table", "Table view", Table],
                        ] as const
                      ).map(([id, label, Icon]) => (
                        <button
                          key={id}
                          type="button"
                          aria-pressed={view === id}
                          aria-label={label}
                          onClick={() => setView(id)}
                          className={clsx(
                            "grid h-8 w-10 cursor-pointer place-items-center rounded-full transition-colors",
                            view === id ? "bg-ink text-white" : "text-ink-soft hover:text-ink",
                          )}
                        >
                          <Icon className="size-[1.125rem]" weight="bold" aria-hidden />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {sorted.list.length === 0 ? (
                  <div className="mt-6 rounded-(--radius-panel) bg-white px-6 py-14 text-center ring-1 ring-line">
                    <p className="font-display-tight text-[1.5rem] font-bold text-ink">No flights match these filters</p>
                    <p className="mt-2 text-ink-soft">Remove a filter or raise the max price to see more options.</p>
                    <button
                      type="button"
                      onClick={() => updateFilters(emptyFilters())}
                      className="mt-6 h-11 cursor-pointer rounded-full bg-action px-6 font-semibold text-white hover:bg-action-deep"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : view === "cards" ? (
                  <m.ol layout className="mt-4 space-y-4">
                    <AnimatePresence initial={true} mode="popLayout">
                      {sorted.list.slice(0, shown).map((it, i) => (
                        <m.li
                          key={it.id}
                          layout
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0, transition: { duration: 0.35, delay: Math.min(i, 6) * 0.04, ease: [0.22, 1, 0.36, 1] } }}
                          exit={{ opacity: 0, transition: { duration: 0.12 } }}
                        >
                          <FlightCard
                            it={it}
                            travellers={travellers}
                            journeyLabels={journeyLabels}
                            expanded={expanded === it.id}
                            onToggle={() => setExpanded((e) => (e === it.id ? null : it.id))}
                            badge={it.id === sorted.cheapestId ? "Cheapest" : it.id === sorted.fastestId ? "Fastest" : it.id === sorted.bestId ? "Best" : undefined}
                          />
                        </m.li>
                      ))}
                    </AnimatePresence>
                  </m.ol>
                ) : (
                  <ResultsTable list={sorted.list.slice(0, shown)} cheapestId={sorted.cheapestId} />
                )}

                {sorted.list.length > shown && (
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => setShown((s) => s + PAGE)}
                      className="h-12 cursor-pointer rounded-full bg-white px-7 font-semibold text-ink ring-1 ring-line hover:bg-mist"
                    >
                      Show more flights ({sorted.list.length - shown} more)
                    </button>
                  </div>
                )}
              </section>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {sheet && (
          <FilterSheet onClose={() => setSheet(false)} count={filtered.length}>
            <FiltersPanel filters={filters} facets={facets} currency={data.currency} onChange={updateFilters} onReset={() => updateFilters(emptyFilters())} activeCount={activeCount} />
          </FilterSheet>
        )}
      </AnimatePresence>
    </div>
  );
}

function AirlineStrip({
  facets,
  currency,
  selected,
  onPick,
}: {
  facets: FacetCounts;
  currency: "USD" | "GBP";
  selected: Set<string>;
  onPick: (code: string) => void;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (d: 1 | -1) => ref.current?.scrollBy({ left: d * 320, behavior: "smooth" });
  return (
    <div className="mt-6 flex items-center gap-2 rounded-(--radius-panel) bg-white p-2 ring-1 ring-line">
      <StripButton label="Scroll airlines left" onClick={() => scroll(-1)}>
        <CaretLeft className="size-4" weight="bold" aria-hidden />
      </StripButton>
      <ul ref={ref} aria-label="Cheapest price by airline" className="scrollbar-none flex flex-1 snap-x gap-1 overflow-x-auto">
        {facets.airlines.map(({ airline, from }) => {
          const on = selected.has(airline.code);
          return (
            <li key={airline.code} className="snap-start">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onPick(airline.code)}
                className={clsx(
                  "flex h-14 cursor-pointer items-center gap-2.5 rounded-xl px-3 text-left transition-colors",
                  on ? "bg-mist ring-2 ring-action" : "hover:bg-mist",
                )}
              >
                <AirlineMark airline={airline} size="sm" />
                <span>
                  <span className="block max-w-28 truncate text-[0.8125rem] text-ink-soft">{airline.name}</span>
                  <span className="tabular block text-[0.9375rem] font-bold text-ink">{formatPrice(from, currency)}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <StripButton label="Scroll airlines right" onClick={() => scroll(1)}>
        <CaretRight className="size-4" weight="bold" aria-hidden />
      </StripButton>
    </div>
  );
}

function StripButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="hidden size-10 shrink-0 cursor-pointer place-items-center rounded-full text-ink ring-1 ring-line hover:bg-mist sm:grid"
    >
      {children}
    </button>
  );
}

function SortTabs({
  sort,
  onSort,
  summary,
  currency,
}: {
  sort: Sort;
  onSort: (s: Sort) => void;
  summary: { cheapest: number; fastest: number; best: number };
  currency: "USD" | "GBP";
}) {
  const tabs: { id: Sort; label: string; meta: string }[] = [
    { id: "cheapest", label: "Cheapest", meta: formatPrice(summary.cheapest, currency) },
    { id: "best", label: "Best", meta: formatPrice(summary.best, currency) },
    { id: "fastest", label: "Fastest", meta: durationLabel(summary.fastest) },
  ];
  return (
    <LayoutGroup id="sort">
      <div role="tablist" aria-label="Sort results" onKeyDown={(e) => onRovingKeyDown(e, (i) => onSort(tabs[i].id))} className="grid grid-cols-3 rounded-(--radius-panel) bg-white p-1.5 ring-1 ring-line">
        {tabs.map((t) => {
          const on = sort === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => onSort(t.id)}
              className="relative cursor-pointer rounded-[14px] px-3 py-2.5 text-left sm:px-4"
            >
              {on && <m.span layoutId="sort-pill" className="absolute inset-0 rounded-[14px] bg-ink" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
              <span className={clsx("relative block text-[0.9375rem] font-semibold", on ? "text-white" : "text-ink")}>{t.label}</span>
              <span className={clsx("tabular relative block text-[0.8125rem]", on ? "text-white/75" : "text-ink-soft")}>{t.meta}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function ResultsTable({ list, cheapestId }: { list: Itinerary[]; cheapestId?: string }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-(--radius-panel) bg-white ring-1 ring-line">
      <table className="w-full min-w-[40rem] text-left text-[0.9375rem]">
        <caption className="sr-only">Flight results</caption>
        <thead className="border-b border-line text-[0.8125rem] text-ink-soft">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">Airline</th>
            <th scope="col" className="px-4 py-3 font-medium">Departs</th>
            <th scope="col" className="px-4 py-3 font-medium">Arrives</th>
            <th scope="col" className="px-4 py-3 font-medium">Duration</th>
            <th scope="col" className="px-4 py-3 font-medium">Stops</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Price</th>
            <th scope="col" className="px-4 py-3"><span className="sr-only">Deal</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {list.map((it) => {
            const j = it.journeys[0];
            const d = dayOffset(j.arriveMin);
            return (
              <tr key={it.id} className="hover:bg-mist/60">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2.5">
                    <AirlineMark airline={it.airline} size="sm" />
                    <span className="font-medium text-ink">{it.airline.name}</span>
                  </span>
                </td>
                <td className="tabular px-4 py-3 font-semibold text-ink">{clock(j.departMin)}</td>
                <td className="tabular px-4 py-3 font-semibold text-ink">
                  {clock(j.arriveMin)}
                  {d !== 0 && <sup className="ml-0.5 text-[0.6875rem] text-action">{d > 0 ? `+${d}` : d}</sup>}
                </td>
                <td className="tabular px-4 py-3 text-ink-soft">{durationLabel(totalDuration(it))}</td>
                <td className={clsx("px-4 py-3", maxStops(it) ? "text-ink" : "text-fare")}>{stopsLabel(maxStops(it))}</td>
                <td className={clsx("tabular px-4 py-3 text-right font-bold", it.id === cheapestId ? "text-fare" : "text-ink")}>
                  {formatPrice(it.price, it.currency)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={dealHref(it, it.providers[0].price)}
                    aria-label={`View ${it.airline.name} deal on ${it.providers[0].provider}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-action px-3.5 text-[0.875rem] font-semibold text-white hover:bg-action-deep"
                  >
                    View
                    <ArrowSquareOut weight="bold" className="size-3.5" aria-hidden />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FilterSheet({ onClose, count, children }: { onClose: () => void; count: number; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return (
    <>
      <m.div
        className="fixed inset-0 z-40 bg-ink/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <m.div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 40 }}
        className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] flex-col rounded-t-[24px] bg-white shadow-(--shadow-pop)"
      >
        {/* Header row in normal flow: the close button must never cover the panel's Reset link. */}
        <div className="relative flex h-14 shrink-0 items-center justify-end px-3">
          <span className="absolute top-2.5 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-line" aria-hidden />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            autoFocus
            className="grid size-10 cursor-pointer place-items-center rounded-full ring-1 ring-line hover:bg-mist"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-4">{children}</div>
        <div className="border-t border-line p-4">
          <button type="button" onClick={onClose} className="h-12 w-full cursor-pointer rounded-full bg-action font-semibold text-white hover:bg-action-deep">
            Show {count} flight{count === 1 ? "" : "s"}
          </button>
        </div>
      </m.div>
    </>
  );
}
