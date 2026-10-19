"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { AirplaneTilt, MagnifyingGlass, SlidersHorizontal, WarningCircle } from "@phosphor-icons/react";
import type { Airport } from "@/content/airports";
import type { Currency } from "@/content/deals";
import { carrierName, extraAirportNames, fareCalendarCopy as copy, tripLengths } from "@/content/fare-calendar";
import type { FareCalendarData } from "@/lib/fare-calendar";
import { airportByCode, serializeSearch } from "@/lib/search-query";
import type { CalendarStart } from "@/app/api/fare-calendar/start/route";
import { SearchBar, type RouteQuery, type Trip } from "./search-bar";
import { FiltersRail, type Option } from "./filters-rail";
import { MonthSkyline } from "./month-skyline";
import { DayCalendar } from "./day-calendar";
import { DayFares } from "./day-fares";
import { TripGrid } from "./trip-grid";
import { RouteAlert } from "./route-alert";
import { useMoney } from "@/components/currency/currency-provider";
import {
  activeFilterCount,
  addDays,
  backFares,
  bestFor,
  daysBetween,
  GRID_DAYS,
  groupByDate,
  daysInMonth,
  monthSummaries,
  noFilters,
  outFares,
  priceRange,
  tripGrid,
  weekdayInsights,
  type Filters,
  type Model,
} from "./model";

const CODE = /^[A-Z]{3}$/;

/** A place from the URL: our list first, then any IATA code with its "city|name|country" label. */
function placeFrom(code: string | null, label: string | null): Airport | null {
  const c = (code ?? "").toUpperCase();
  const known = airportByCode(c);
  if (known || !CODE.test(c)) return known;
  const [city, name, country] = (label ?? "").split("|");
  return { code: c, city: city || c, name: name || "All airports", country: country || "" };
}

const currencyFor = (a: Airport): Currency => (a.country === "United Kingdom" ? "GBP" : "USD");
const airportLabel = (code: string) => {
  const a = airportByCode(code);
  return a && a.name !== "All airports" ? a.name : (extraAirportNames[code] ?? code);
};

function urlFor(q: RouteQuery) {
  const p = new URLSearchParams({ from: q.from.code, to: q.to.code, trip: q.trip });
  if (!airportByCode(q.from.code)) p.set("fromlabel", `${q.from.city}|${q.from.name}|${q.from.country}`);
  if (!airportByCode(q.to.code)) p.set("tolabel", `${q.to.city}|${q.to.name}|${q.to.country}`);
  if (q.trip === "return") p.set("nights", String(q.nights));
  return `/fare-calendar?${p}`;
}

/** The route on screen; either place may still be missing until the visitor (or their location) picks it. */
type Query = { from: Airport | null; to: Airport | null; trip: Trip; nights: number };
/** `alerts`: whether route price alerts can be offered (see /api/fare-calendar). */
type Loaded = { key: string; data: (FareCalendarData & { alerts?: boolean }) | null; error: boolean };
/** Per-route view state; a new route starts fresh. */
/** `grid`: the return grid's window (first leaving and first return date); null centres it on the chosen dates. */
type View = { key: string; filters: Filters; month: number | null; date: string | null; filtersOpen: boolean; grid: { leave: string; back: string } | null };

const isRoute = (q: Query): q is RouteQuery => !!q.from && !!q.to && q.from.code !== q.to.code;

export function FareCalendar() {
  const money = useMoney();
  const params = useSearchParams();
  const [query, setQuery] = useState<Query>(() => {
    const from = placeFrom(params.get("from"), params.get("fromlabel"));
    let to = placeFrom(params.get("to"), params.get("tolabel"));
    if (to && from && to.code === from.code) to = null;
    const nights = Math.min(30, Math.max(1, Number.parseInt(params.get("nights") ?? "", 10) || 7));
    return { from, to, trip: params.get("trip") === "oneway" ? "oneway" : "return", nights };
  });

  // Popular destinations from the origin, and (when the URL names no origin)
  // a starting city near the visitor. Nothing here is a default route: when
  // there's no location or no data, the visitor picks.
  const [start, setStart] = useState<{ key: string; data: CalendarStart | null } | null>(null);
  const startKey = query.from?.code ?? "near-me";
  useEffect(() => {
    const ctrl = new AbortController();
    const p = new URLSearchParams();
    if (query.from) p.set("from", query.from.code);
    else p.set("tz", Intl.DateTimeFormat().resolvedOptions().timeZone ?? "");
    fetch(`/api/fare-calendar/start?${p}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<CalendarStart>) : null))
      .then((data) => {
        setStart({ key: data?.from?.code ?? startKey, data });
        // First visit: fill in whatever the URL left out.
        if (data?.from)
          setQuery((q) => {
            const from = q.from ?? data.from;
            const to = q.to ?? data.destinations.find((d) => d.to.code !== from?.code)?.to ?? null;
            return from === q.from && to === q.to ? q : { ...q, from, to };
          });
      })
      .catch((e: Error) => {
        if (e.name !== "AbortError") setStart({ key: startKey, data: null });
      });
    return () => ctrl.abort();
    // Only a new origin needs new suggestions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startKey]);
  const locating = !query.from && start === null;
  const popular = start?.data && start.data.from && query.from && start.data.from.code === query.from.code ? start.data.destinations : [];

  const [retry, setRetry] = useState(0);
  const route = isRoute(query) ? query : null;
  const currency = query.from ? currencyFor(query.from) : "GBP";
  const key = route ? `${route.from.code}-${route.to.code}-${route.trip}-${currency}-${retry}` : "";

  const [loaded, setLoaded] = useState<Loaded | null>(null);
  useEffect(() => {
    if (!route) return;
    const ctrl = new AbortController();
    const p = new URLSearchParams({ origin: route.from.code, destination: route.to.code, currency, trip: route.trip });
    fetch(`/api/fare-calendar?${p}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<FareCalendarData & { alerts?: boolean }>) : Promise.reject(new Error(String(r.status)))))
      .then((data) => setLoaded({ key, data, error: false }))
      .catch((e: Error) => {
        if (e.name !== "AbortError") setLoaded({ key, data: null, error: true });
      });
    return () => ctrl.abort();
    // `key` covers the route, trip, currency and retries.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const ready = route && loaded?.key === key ? loaded : null;
  const data = ready?.data ?? null;

  const [viewState, setView] = useState<View | null>(null);
  const routeKey = route ? `${route.from.code}-${route.to.code}-${route.trip}` : "";
  const view: View = viewState?.key === routeKey ? viewState : { key: routeKey, filters: noFilters, month: null, date: null, filtersOpen: false, grid: null };
  const patch = (p: Partial<View>) => setView({ ...view, ...p });

  const out = useMemo(() => groupByDate(data?.out), [data]);
  const back = useMemo(() => (data?.back ? groupByDate(data.back) : undefined), [data]);
  const isReturn = query.trip === "return" && !!back;
  const model: Model = useMemo(
    () => ({ out, back: isReturn ? back : undefined, nights: query.nights, filters: view.filters }),
    [out, back, isReturn, query.nights, view.filters],
  );
  const months = useMemo(() => data?.months ?? [], [data]);
  const summaries = useMemo(() => monthSummaries(model, months), [model, months]);
  const range = useMemo(() => priceRange(model, months), [model, months]);
  const insights = useMemo(() => weekdayInsights(model, months), [model, months]);

  // The cheapest return total for each trip length, for the trip length list.
  const lengthPrices = useMemo(() => {
    if (!back) return {};
    const out: Record<number, number | null> = {};
    for (const t of tripLengths) {
      const mins = monthSummaries({ out: model.out, back, nights: t.nights, filters: noFilters }, months).flatMap((s) => (s.min === null ? [] : [s.min]));
      out[t.nights] = mins.length ? Math.min(...mins) : null;
    }
    return out;
  }, [model.out, back, months]);

  // What a price alert watches: the cheapest fare for this trip, ignoring filters.
  const alertCheapest = useMemo(() => {
    const mins = monthSummaries({ out, back: isReturn ? back : undefined, nights: query.nights, filters: noFilters }, months).flatMap((s) => (s.min === null ? [] : [s.min]));
    return mins.length ? Math.min(...mins) : null;
  }, [out, back, isReturn, query.nights, months]);

  const validMonths = summaries.filter((s) => s.min !== null);
  const cheapestMonth = validMonths.length ? summaries.indexOf(validMonths.reduce((a, b) => (b.min! < a.min! ? b : a))) : 0;
  const monthIdx = view.month ?? cheapestMonth;
  const month = summaries[monthIdx];
  const date = view.date && view.date.startsWith(month?.month ?? "-") && bestFor(model, view.date) ? view.date : (month?.minDate ?? null);

  const today = new Date().toISOString().slice(0, 10);
  const hasFares = (data?.out.length ?? 0) > 0;

  // Filter options come from the outbound fares, with the cheapest price for each.
  const options = useMemo(() => {
    const ap = new Map<string, number>();
    const al = new Map<string, number>();
    for (const f of data?.out ?? []) {
      ap.set(f.from, Math.min(ap.get(f.from) ?? Infinity, f.price));
      if (f.airline) al.set(f.airline, Math.min(al.get(f.airline) ?? Infinity, f.price));
    }
    const toOptions = (m: Map<string, number>, label: (c: string) => string): Option[] =>
      [...m].map(([code, from]) => ({ code, label: label(code), from })).sort((a, b) => (a.from ?? 0) - (b.from ?? 0));
    return { airports: toOptions(ap, airportLabel), airlines: toOptions(al, carrierName) };
  }, [data]);

  function search(q: RouteQuery) {
    setQuery(q);
    window.history.replaceState(null, "", urlFor(q));
  }
  function changeTrip(trip: Trip, nights: number) {
    const q = { ...query, trip, nights };
    setQuery(q);
    if (isRoute(q)) window.history.replaceState(null, "", urlFor(q));
  }

  const selectHref = useMemo(() => {
    if (!date || !route) return "/flights";
    const qs = serializeSearch({
      trip: isReturn ? "round" : "oneway",
      legs: [{ from: route.from, to: route.to, date }],
      returnDate: isReturn ? addDays(date, route.nights) : undefined,
      adults: 1,
      children: 0,
      infants: 0,
      cabin: "economy",
    });
    return `/flights?${qs}&sub=calendar`;
  }, [date, isReturn, route]);

  const dayOuts = date ? outFares(out, date, view.filters).filter((f) => !isReturn && view.filters.maxPrice !== null ? f.price <= view.filters.maxPrice : true).slice(0, 4) : [];
  const dayBack = date && isReturn && back ? { date: addDays(date, query.nights), fare: backFares(back, addDays(date, query.nights), view.filters)[0] } : undefined;
  // Return trips: the date grid. Centred on the chosen dates until the visitor
  // moves it or picks inside it, but never starting before today or before the
  // first day there are fares for (no rows of empty cells).
  const backDate = date && isReturn ? addDays(date, query.nights) : null;
  const half = Math.floor(GRID_DAYS / 2);
  const firstDay = months.length && months[0] > today.slice(0, 7) ? `${months[0]}-01` : today;
  const shiftBy = date ? Math.max(0, daysBetween(addDays(date, -half), firstDay)) : 0;
  const gridLeave = view.grid?.leave ?? (date ? addDays(date, shiftBy - half) : null);
  const gridBack = view.grid?.back ?? (backDate ? addDays(backDate, shiftBy - half) : null);
  const lastDay = months.length ? daysInMonth(months[months.length - 1]).at(-1)! : today;
  const grid = isReturn && gridLeave && gridBack ? tripGrid(model, gridLeave, gridBack, today) : null;
  const moveGrid = (days: number) => gridLeave && gridBack && patch({ grid: { leave: addDays(gridLeave, days), back: addDays(gridBack, days) } });
  const tripText = isReturn
    ? `return, ${tripLengths.find((t) => t.nights === query.nights)?.label.toLowerCase() ?? `${query.nights} nights`}`
    : "one way";
  const count = activeFilterCount(view.filters);

  return (
    <>
      {/* Pulled up over the photo header's deep bottom edge. */}
      <div className="relative z-10 container-page -mt-20 md:-mt-24">
        <SearchBar
          key={`${query.from?.code}-${query.to?.code}`}
          initial={query}
          onSearch={search}
          onTripChange={(trip, nights) => {
            changeTrip(trip, nights);
            // A new trip length re-centres the date grid on the new dates.
            patch({ grid: null });
          }}
          lengthPrices={lengthPrices}
          currency={currency}
        />
        {popular.length > 0 && query.from && (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <p className="shrink-0 text-[0.875rem] font-semibold text-ink-soft">{copy.popular.title(query.from.city)}</p>
            {/* relative (list and chips): the chips' sr-only words are absolutely positioned and would
                otherwise escape this sideways scroll and widen the page on phones. */}
            <ul className="relative -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {popular.map((d) => {
                const on = query.to?.code === d.to.code;
                return (
                  <li key={d.to.code} className="shrink-0">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => search({ from: query.from!, to: d.to, trip: query.trip, nights: query.nights })}
                      className={clsx(
                        "relative inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-[0.875rem] font-semibold whitespace-nowrap ring-1 transition-colors",
                        on ? "bg-ink text-white ring-ink" : "bg-white text-ink ring-line hover:ring-ink/30",
                      )}
                    >
                      {d.to.city}
                      <span className={clsx("tabular font-bold", on ? "text-sun" : "text-fare")}>
                        <span className="sr-only">{copy.popular.from} </span>
                        {money(d.price, start?.data?.currency ?? currency)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-8 bg-mist py-8 md:mt-12 md:py-12">
        <div className="container-page">
          {locating ? (
            <LoadingState label={copy.status.locating} />
          ) : !route ? (
            <div className="grid place-items-center rounded-(--radius-panel) bg-white px-6 py-14 text-center ring-1 ring-line">
              <AirplaneTilt className="size-10 text-action" aria-hidden />
              <h2 className="mt-4 font-display-tight text-[1.5rem] font-bold text-ink">{copy.status.pickTitle}</h2>
              <p className="mt-2 max-w-md text-ink-soft">{copy.status.pickText}</p>
            </div>
          ) : !ready ? (
            <LoadingState label={copy.status.loading} />
          ) : ready.error ? (
            <div role="alert" className="grid place-items-center rounded-(--radius-panel) bg-white p-10 text-center ring-1 ring-line">
              <WarningCircle className="size-10 text-dear" aria-hidden />
              <p className="mt-3 font-semibold text-ink">{copy.status.error}</p>
              <button type="button" onClick={() => setRetry((r) => r + 1)} className="mt-5 h-11 cursor-pointer rounded-full bg-action px-6 font-semibold text-white hover:bg-action-deep">
                {copy.status.retry}
              </button>
            </div>
          ) : !hasFares ? (
            <div className="grid place-items-center rounded-(--radius-panel) bg-white px-6 py-14 text-center ring-1 ring-line">
              <MagnifyingGlass className="size-10 text-action" aria-hidden />
              <h2 className="mt-4 font-display-tight text-[1.5rem] font-bold text-ink">{copy.status.emptyTitle}</h2>
              <p className="mt-2 max-w-md text-ink-soft">{copy.status.emptyText}</p>
              <Link
                href={`/flights?${serializeSearch({ trip: route.trip === "return" ? "round" : "oneway", legs: [{ from: route.from, to: route.to, date: "" }], adults: 1, children: 0, infants: 0, cabin: "economy" })}&sub=calendar`}
                className="mt-6 inline-flex h-12 items-center rounded-full bg-action px-6 font-semibold text-white hover:bg-action-deep"
              >
                {copy.status.emptyCta}
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:items-start xl:gap-8">
              <aside aria-label="Filters" className="lg:sticky lg:top-24">
                <button
                  type="button"
                  aria-expanded={view.filtersOpen}
                  aria-controls="calendar-filters"
                  onClick={() => patch({ filtersOpen: !view.filtersOpen })}
                  className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white font-semibold text-ink ring-1 ring-line lg:hidden"
                >
                  <SlidersHorizontal className="size-5" aria-hidden />
                  {copy.filters.show}
                  {count > 0 && <span className="grid size-6 place-items-center rounded-full bg-action text-[0.75rem] text-white">{count}</span>}
                </button>
                <div id="calendar-filters" className={clsx("mt-3 lg:mt-0 lg:block", view.filtersOpen ? "block" : "hidden")}>
                  <FiltersRail
                    filters={view.filters}
                    onChange={(filters) => patch({ filters, date: null, grid: null })}
                    airports={options.airports}
                    airlines={options.airlines}
                    range={range}
                    currency={currency}
                  />
                </div>
              </aside>

              <div className="min-w-0 space-y-6">
                <MonthSkyline
                  months={summaries}
                  active={monthIdx}
                  onPick={(i) => patch({ month: i, date: null, grid: null })}
                  insights={insights}
                  currency={currency}
                  oneWay={!isReturn}
                  subtitle={`${route.from.city} to ${route.to.city}, ${tripText}, one adult`}
                  animateKey={routeKey}
                />
                {/* The calendar (one way) or the date grid (return) on the left, the chosen day's fares beside it on wide screens. */}
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] xl:items-start">
                  {grid && date && backDate ? (
                    <TripGrid
                      {...grid}
                      selected={{ leave: date, back: backDate }}
                      currency={currency}
                      onPick={(l, r) => {
                        const nights = daysBetween(l, r);
                        const mi = months.indexOf(l.slice(0, 7));
                        if (nights !== query.nights) changeTrip("return", nights);
                        // Keep the grid where it is: the visitor is picking inside it.
                        setView({ ...view, month: mi >= 0 ? mi : monthIdx, date: l, grid: { leave: gridLeave!, back: gridBack! } });
                      }}
                      onPrev={gridLeave && gridLeave > firstDay ? () => moveGrid(-Math.min(GRID_DAYS, daysBetween(firstDay, gridLeave))) : undefined}
                      onNext={gridLeave && addDays(gridLeave, GRID_DAYS) <= lastDay ? () => moveGrid(GRID_DAYS) : undefined}
                    />
                  ) : (
                    month && (
                      <DayCalendar
                        month={month.month}
                        best={(d) => bestFor(model, d)}
                        bestDate={month.minDate}
                        selected={date}
                        today={today}
                        onSelect={(d) => patch({ month: monthIdx, date: d })}
                        onPrev={monthIdx > 0 ? () => patch({ month: monthIdx - 1, date: null }) : undefined}
                        onNext={monthIdx < summaries.length - 1 ? () => patch({ month: monthIdx + 1, date: null }) : undefined}
                        currency={currency}
                      />
                    )
                  )}
                  <div className="xl:sticky xl:top-24">
                    <DayFares date={date} outs={dayOuts} back={dayBack} currency={currency} selectHref={selectHref} />
                  </div>
                </div>
                {data?.alerts && (
                  <RouteAlert
                    key={`${routeKey}-${isReturn ? query.nights : 0}`}
                    from={route.from}
                    to={route.to}
                    trip={isReturn ? "return" : "oneway"}
                    nights={isReturn ? query.nights : 0}
                    cheapest={alertCheapest}
                    currency={currency}
                  />
                )}
                <p className="text-[0.8125rem] leading-relaxed text-ink-soft">{copy.disclaimer}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function LoadingState({ label }: { label: string }) {
  return (
    <div role="status" className="grid gap-6 lg:grid-cols-[17.5rem_minmax(0,1fr)]">
      <span className="sr-only">{label}</span>
      <div aria-hidden className="skeleton hidden h-96 rounded-(--radius-panel) ring-1 ring-line lg:block" />
      <div aria-hidden className="rounded-(--radius-panel) bg-white p-7 ring-1 ring-line">
        <div className="skeleton h-7 w-56 rounded-md" />
        <div className="mt-8 flex h-36 items-end gap-2">
          {[50, 38, 62, 70, 84, 92, 100, 96, 74, 60, 44, 80].map((h, i) => (
            <span key={i} className="skeleton flex-1 rounded-t-md" style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
        <p className="mt-6 text-[0.9375rem] text-ink-soft">{label}</p>
      </div>
    </div>
  );
}
