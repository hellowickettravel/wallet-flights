"use client";

import clsx from "clsx";
import type { Airline } from "@/content/airlines";
import { formatPrice, type Currency } from "@/content/deals";
import { AirlineMark } from "./airline-mark";

export type TimeBand = "night" | "morning" | "afternoon" | "evening";
export type Filters = {
  stops: Set<number>; // 0, 1, 2 (= 2+)
  airlines: Set<string>;
  times: Set<TimeBand>;
  maxPrice: number | null;
  refundableOnly: boolean;
};

export const emptyFilters = (): Filters => ({
  stops: new Set(),
  airlines: new Set(),
  times: new Set(),
  maxPrice: null,
  refundableOnly: false,
});

export const timeBands: { id: TimeBand; label: string; range: string; from: number; to: number }[] = [
  { id: "night", label: "Night", range: "00:00–05:59", from: 0, to: 360 },
  { id: "morning", label: "Morning", range: "06:00–11:59", from: 360, to: 720 },
  { id: "afternoon", label: "Afternoon", range: "12:00–17:59", from: 720, to: 1080 },
  { id: "evening", label: "Evening", range: "18:00–23:59", from: 1080, to: 1440 },
];

export type FacetCounts = {
  stops: { value: number; label: string; count: number; from?: number }[];
  airlines: { airline: Airline; count: number; from: number }[];
  times: Record<TimeBand, number>;
  priceMin: number;
  priceMax: number;
};

type Props = {
  filters: Filters;
  facets: FacetCounts;
  currency: Currency;
  onChange: (f: Filters) => void;
  onReset: () => void;
  activeCount: number;
};

function toggle<T>(set: Set<T>, v: T) {
  const next = new Set(set);
  if (next.has(v)) next.delete(v);
  else next.add(v);
  return next;
}

export function FiltersPanel({ filters, facets, currency, onChange, onReset, activeCount }: Props) {
  const max = filters.maxPrice ?? facets.priceMax;
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="font-display-tight text-[1.25rem] font-bold text-ink">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          disabled={activeCount === 0}
          className="cursor-pointer text-[0.875rem] font-semibold text-action disabled:cursor-default disabled:text-ink-soft/60"
        >
          Reset{activeCount ? ` (${activeCount})` : ""}
        </button>
      </div>

      <fieldset>
        <legend className="mb-3 text-[0.9375rem] font-semibold text-ink">Stops</legend>
        <div className="space-y-1">
          {facets.stops.map((s) => (
            <CheckRow
              key={s.value}
              checked={filters.stops.has(s.value)}
              disabled={s.count === 0}
              onChange={() => onChange({ ...filters, stops: toggle(filters.stops, s.value) })}
              label={s.label}
              meta={s.from !== undefined ? formatPrice(s.from, currency) : "—"}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 flex w-full items-baseline justify-between text-[0.9375rem] font-semibold text-ink">
          Max price <span className="tabular text-[0.875rem] font-semibold text-fare">{formatPrice(max, currency)}</span>
        </legend>
        <input
          type="range"
          min={facets.priceMin}
          max={facets.priceMax}
          step={1}
          value={max}
          onChange={(e) => {
            const v = Number(e.target.value);
            onChange({ ...filters, maxPrice: v >= facets.priceMax ? null : v });
          }}
          aria-label="Maximum price per person"
          aria-valuetext={formatPrice(max, currency)}
          className="w-full cursor-pointer accent-[var(--color-action)]"
        />
        <div className="tabular mt-1 flex justify-between text-[0.75rem] text-ink-soft">
          <span>{formatPrice(facets.priceMin, currency)}</span>
          <span>{formatPrice(facets.priceMax, currency)}</span>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-[0.9375rem] font-semibold text-ink">Departure time (outbound)</legend>
        <div className="grid grid-cols-2 gap-2">
          {timeBands.map((b) => {
            const on = filters.times.has(b.id);
            const count = facets.times[b.id];
            return (
              <label
                key={b.id}
                className={clsx(
                  "flex cursor-pointer flex-col rounded-xl px-3 py-2.5 ring-1 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-action",
                  on ? "bg-ink text-white ring-ink" : "text-ink ring-line hover:bg-mist",
                  count === 0 && !on && "cursor-not-allowed opacity-45",
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  disabled={count === 0 && !on}
                  onChange={() => onChange({ ...filters, times: toggle(filters.times, b.id) })}
                />
                <span className="text-[0.875rem] font-semibold">{b.label}</span>
                <span className={clsx("tabular text-[0.75rem]", on ? "text-white/75" : "text-ink-soft")}>{b.range}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-[0.9375rem] font-semibold text-ink">Airlines</legend>
        <div className="space-y-1">
          {facets.airlines.map(({ airline, from }) => (
            <CheckRow
              key={airline.code}
              checked={filters.airlines.has(airline.code)}
              onChange={() => onChange({ ...filters, airlines: toggle(filters.airlines, airline.code) })}
              label={airline.name}
              meta={formatPrice(from, currency)}
              icon={<AirlineMark airline={airline} size="sm" />}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-[0.9375rem] font-semibold text-ink">Fare</legend>
        <CheckRow
          checked={filters.refundableOnly}
          onChange={() => onChange({ ...filters, refundableOnly: !filters.refundableOnly })}
          label="Refundable fares only"
        />
      </fieldset>
    </div>
  );
}

function CheckRow({
  checked,
  disabled,
  onChange,
  label,
  meta,
  icon,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  label: string;
  meta?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label
      className={clsx(
        "flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-mist has-focus-visible:ring-2 has-focus-visible:ring-action",
        disabled && "cursor-not-allowed opacity-45 hover:bg-transparent",
      )}
    >
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} className="size-[1.125rem] shrink-0 cursor-pointer accent-[var(--color-action)]" />
      {icon}
      <span className="min-w-0 flex-1 truncate text-[0.9375rem] text-ink">{label}</span>
      {meta && <span className="tabular shrink-0 text-[0.8125rem] text-ink-soft">{meta}</span>}
    </label>
  );
}
