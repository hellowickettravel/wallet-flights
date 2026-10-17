"use client";

import { useState } from "react";
import clsx from "clsx";
import { AirplaneLanding, AirplaneTakeoff, ArrowsLeftRight, MagnifyingGlass } from "@phosphor-icons/react";
import { AirportField } from "@/components/search/airport-field";
import type { Airport } from "@/content/airports";
import { fareCalendarCopy as copy, tripLengths } from "@/content/fare-calendar";
import { onRovingKeyDown } from "@/lib/roving";

export type Trip = "oneway" | "return";
export type RouteQuery = { from: Airport; to: Airport; trip: Trip; nights: number };

type Props = {
  initial: { from: Airport | null; to: Airport | null; trip: Trip; nights: number };
  onSearch: (q: RouteQuery) => void;
  /** Trip type and length apply at once (the fares are already loaded); places wait for "Show fares". */
  onTripChange: (trip: Trip, nights: number) => void;
};

/** Route search for the fare calendar: From ⇄ To, one way or return, trip length. */
export function SearchBar({ initial, onSearch, onTripChange }: Props) {
  const [from, setFrom] = useState<Airport | null>(initial.from);
  const [to, setTo] = useState<Airport | null>(initial.to);
  const [error, setError] = useState<string | null>(null);
  const [spin, setSpin] = useState(0);
  const trips: { v: Trip; label: string }[] = [
    { v: "oneway", label: copy.search.oneWay },
    { v: "return", label: copy.search.return },
  ];
  const custom = !tripLengths.some((t) => t.nights === initial.nights);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) return setError(!from ? "Choose where you’re leaving from" : "Choose where you’re going");
    if (from.code === to.code) return setError(copy.search.same);
    setError(null);
    onSearch({ from, to, trip: initial.trip, nights: initial.nights });
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Route" className="rounded-(--radius-panel) bg-white p-3 shadow-(--shadow-float) ring-1 ring-line md:p-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_auto_auto] lg:items-center lg:gap-2">
        <AirportField
          label={copy.search.from}
          icon={<AirplaneTakeoff className="size-5" aria-hidden />}
          value={from}
          onChange={setFrom}
          placeholder="City or airport"
        />
        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
            setSpin((s) => s + 180);
          }}
          aria-label="Swap leaving from and going to"
          className="mx-auto -my-5 grid size-10 cursor-pointer place-items-center rounded-full bg-white text-action ring-1 ring-line transition-colors hover:bg-mist lg:my-0"
        >
          <span className="grid transition-transform duration-300 motion-reduce:transition-none" style={{ transform: `rotate(${spin}deg)` }}>
            <ArrowsLeftRight className="size-5 rotate-90 lg:rotate-0" weight="bold" aria-hidden />
          </span>
        </button>
        <AirportField
          label={copy.search.to}
          icon={<AirplaneLanding className="size-5" aria-hidden />}
          value={to}
          onChange={setTo}
          placeholder="City or airport"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[auto_1fr] lg:contents">
          <div
            role="radiogroup"
            aria-label={copy.search.trip}
            onKeyDown={(e) => onRovingKeyDown(e, (i) => onTripChange(trips[i].v, initial.nights))}
            className="col-span-2 flex h-16 items-center gap-1 rounded-xl bg-mist p-1.5 sm:col-span-1"
          >
            {trips.map((t) => {
              const on = initial.trip === t.v;
              return (
                <button
                  key={t.v}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => onTripChange(t.v, initial.nights)}
                  className={clsx(
                    "h-full flex-1 cursor-pointer rounded-lg px-4 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors",
                    on ? "bg-white text-ink shadow-sm ring-1 ring-line" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <label
            className={clsx(
              "col-span-2 flex h-16 flex-col justify-center rounded-xl bg-white px-4 ring-1 ring-line transition-opacity focus-within:ring-2 focus-within:ring-action sm:col-span-1 lg:min-w-44",
              initial.trip === "oneway" && "opacity-50",
            )}
          >
            <span className="text-[0.75rem] font-medium text-ink-soft">{copy.search.length}</span>
            <select
              value={initial.nights}
              disabled={initial.trip === "oneway"}
              onChange={(e) => onTripChange(initial.trip, Number(e.target.value))}
              className="-ml-1 w-full cursor-pointer bg-transparent text-[1.0625rem] font-semibold text-ink outline-none disabled:cursor-not-allowed"
            >
              {custom && <option value={initial.nights}>{initial.nights} nights</option>}
              {tripLengths.map((t) => (
                <option key={t.nights} value={t.nights}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="flex h-16 cursor-pointer items-center justify-center gap-2 rounded-xl bg-action px-7 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-action-deep"
        >
          <MagnifyingGlass className="size-5" weight="bold" aria-hidden />
          {copy.search.submit}
        </button>
      </div>
      <p role="alert" className={clsx("px-1 text-[0.875rem] font-medium text-red-700", error && "mt-2")}>
        {error}
      </p>
    </form>
  );
}
