"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { Info, MagnifyingGlass, SlidersHorizontal, WarningCircle } from "@phosphor-icons/react";
import type { Airport } from "@/content/airports";
import type { Currency } from "@/content/deals";
import { carrierName, defaultRoute, extraAirportNames, fareCalendarCopy as copy, tripLengths } from "@/content/fare-calendar";
import type { FareCalendarData } from "@/lib/fare-calendar";
import { airportByCode, serializeSearch } from "@/lib/search-query";
import { SearchBar, type RouteQuery, type Trip } from "./search-bar";
import { FiltersRail, type Option } from "./filters-rail";
import { MonthSkyline } from "./month-skyline";
import { DayCalendar } from "./day-calendar";
import { DayFares } from "./day-fares";
import { FlexGrid } from "./flex-grid";
import { RouteAlert } from "./route-alert";
import {
  activeFilterCount,
  addDays,
  backFares,
  bestFor,
  daysBetween,
  flexGrid,
  groupByDate,
  monthSummaries,
  noFilters,
  outFares,
  priceRange,
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

type Loaded = { key: string; data: FareCalendarData | null; error: boolean };
/** Per-route view state; a new route starts fresh. */
type View = { key: string; filters: Filters; month: number | null; date: string | null; filtersOpen: boolean };

export function FareCalendar() {
  const params = useSearchParams();
  const [query, setQuery] = useState<RouteQuery>(() => {
    const from = placeFrom(params.get("from"), params.get("fromlabel")) ?? airportByCode(defaultRoute.from)!;
    let to = placeFrom(params.get("to"), params.get("tolabel")) ?? airportByCode(defaultRoute.to)!;
    if (to.code === from.code) to = airportByCode(from.code === defaultRoute.to ? defaultRoute.from : defaultRoute.to)!;
    const nights = Math.min(30, Math.max(1, Number.parseInt(params.get("nights") ?? "", 10) || 7));
    return { from, to, trip: params.get("trip") === "oneway" ? "oneway" : "return", nights };
  });
  const [retry, setRetry] = useState(0);
  const currency = currencyFor(query.from);
  const key = `${query.from.code}-${query.to.code}-${query.trip}-${currency}-${retry}`;

  const [loaded, setLoaded] = useState<Loaded | null>(null);
  useEffect(() => {
    const ctrl = new AbortController();
    const p = new URLSearchParams({ origin: query.from.code, destination: query.to.code, currency, trip: query.trip });
    fetch(`/api/fare-calendar?${p}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<FareCalendarData>) : Promise.reject(new Error(String(r.status)))))
      .then((data) => setLoaded({ key, data, error: false }))
      .catch((e: Error) => {
        if (e.name !== "AbortError") setLoaded({ key, data: null, error: true });
      });
    return () => ctrl.abort();
  }, [key, query.from.code, query.to.code, query.trip, currency]);

  const ready = loaded?.key === key ? loaded : null;
  const data = ready?.data ?? null;

  const [viewState, setView] = useState<View | null>(null);
  const routeKey = `${query.from.code}-${query.to.code}-${query.trip}`;
  const view: View = viewState?.key === routeKey ? viewState : { key: routeKey, filters: noFilters, month: null, date: null, filtersOpen: false };
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
    window.history.replaceState(null, "", urlFor(q));
  }

  const selectHref = useMemo(() => {
    if (!date) return "/flights";
    const qs = serializeSearch({
      trip: isReturn ? "round" : "oneway",
      legs: [{ from: query.from, to: query.to, date }],
      returnDate: isReturn ? addDays(date, query.nights) : undefined,
      adults: 1,
      children: 0,
      infants: 0,
      cabin: "economy",
    });
    return `/flights?${qs}&sub=calendar`;
  }, [date, isReturn, query]);

  const dayOuts = date ? outFares(out, date, view.filters).filter((f) => !isReturn && view.filters.maxPrice !== null ? f.price <= view.filters.maxPrice : true).slice(0, 4) : [];
  const dayBack = date && isReturn && back ? { date: addDays(date, query.nights), fare: backFares(back, addDays(date, query.nights), view.filters)[0] } : undefined;
  const flex = date && isReturn ? flexGrid(model, date) : null;
  const tripText = isReturn
    ? `return, ${tripLengths.find((t) => t.nights === query.nights)?.label.toLowerCase() ?? `${query.nights} nights`}`
    : "one way";
  const count = activeFilterCount(view.filters);

  return (
    <>
      <div className="container-page mt-8 md:mt-10">
        <SearchBar
          key={`${query.from.code}-${query.to.code}`}
          initial={{ from: query.from, to: query.to, trip: query.trip, nights: query.nights }}
          onSearch={search}
          onTripChange={changeTrip}
        />
        {data?.sample && (
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-sun/25 px-4 py-3 text-[0.875rem] font-medium text-ink ring-1 ring-sun">
            <Info className="mt-0.5 size-4 shrink-0" weight="bold" aria-hidden />
            {copy.status.sample}
          </p>
        )}
      </div>

      <div className="mt-8 bg-mist py-8 md:mt-12 md:py-12">
        <div className="container-page">
          {!ready ? (
            <LoadingState />
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
                href={`/flights?${serializeSearch({ trip: query.trip === "return" ? "round" : "oneway", legs: [{ from: query.from, to: query.to, date: "" }], adults: 1, children: 0, infants: 0, cabin: "economy" })}&sub=calendar`}
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
                    onChange={(filters) => patch({ filters, date: null })}
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
                  onPick={(i) => patch({ month: i, date: null })}
                  insights={insights}
                  currency={currency}
                  oneWay={!isReturn}
                  subtitle={`${query.from.city} to ${query.to.city}, ${tripText}, one adult`}
                  animateKey={routeKey}
                />
                {month && (
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
                )}
                <DayFares date={date} outs={dayOuts} back={dayBack} currency={currency} selectHref={selectHref} />
                {flex && flex.min !== null && (
                  <FlexGrid
                    {...flex}
                    currency={currency}
                    onPick={(l, r) => {
                      const nights = daysBetween(l, r);
                      const mi = months.indexOf(l.slice(0, 7));
                      if (nights !== query.nights) changeTrip("return", nights);
                      setView({ ...view, month: mi >= 0 ? mi : monthIdx, date: l });
                    }}
                  />
                )}
                <RouteAlert
                  key={routeKey}
                  from={query.from}
                  to={query.to}
                  suggested={validMonths.length ? Math.floor(Math.min(...validMonths.map((m) => m.min!)) * 0.95) : null}
                  currency={currency}
                />
                <p className="text-[0.8125rem] leading-relaxed text-ink-soft">{copy.disclaimer}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <div role="status" className="grid gap-6 lg:grid-cols-[17.5rem_minmax(0,1fr)]">
      <span className="sr-only">{copy.status.loading}</span>
      <div aria-hidden className="hidden h-96 rounded-(--radius-panel) bg-white ring-1 ring-line lg:block" />
      <div aria-hidden className="rounded-(--radius-panel) bg-white p-7 ring-1 ring-line">
        <div className="h-7 w-56 rounded-md bg-mist" />
        <div className="mt-8 flex h-36 items-end gap-2">
          {[50, 38, 62, 70, 84, 92, 100, 96, 74, 60, 44, 80].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-md bg-mist motion-safe:animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
        <p className="mt-6 text-[0.9375rem] text-ink-soft">{copy.status.loading}</p>
      </div>
    </div>
  );
}
