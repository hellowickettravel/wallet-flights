"use client";

import { useId } from "react";
import clsx from "clsx";
import { formatPrice, type Currency } from "@/content/deals";
import { carrierName, fareCalendarCopy, weekdayNames, weekdays } from "@/content/fare-calendar";
import { activeFilterCount, noFilters, type Filters } from "./model";

const copy = fareCalendarCopy.filters;

export type Option = { code: string; label: string; from: number | null };

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
  airports: Option[];
  airlines: Option[];
  range: { lo: number; hi: number } | null;
  currency: Currency;
};

/** Toggle a value in a "null means all" list. */
function toggle(list: string[] | null, all: string[], code: string): string[] | null {
  const current = list ?? all;
  const next = current.includes(code) ? current.filter((c) => c !== code) : [...current, code];
  if (!next.length) return list; // keep at least one ticked
  return next.length === all.length ? null : next;
}

function CheckList({ title, options, value, onChange, currency }: { title: string; options: Option[]; value: string[] | null; onChange: (v: string[] | null) => void; currency: Currency }) {
  if (options.length < 2) return null;
  const all = options.map((o) => o.code);
  return (
    <fieldset className="border-t border-line pt-5">
      <legend className="float-left mb-3 w-full text-[0.9375rem] font-semibold text-ink">{title}</legend>
      <ul className="clear-left space-y-1">
        {options.map((o) => {
          const on = (value ?? all).includes(o.code);
          return (
            <li key={o.code}>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-mist">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => onChange(toggle(value, all, o.code))}
                  className="size-[1.125rem] shrink-0 cursor-pointer accent-action"
                />
                <span className="min-w-0 flex-1 truncate text-[0.9375rem] text-ink">{o.label}</span>
                {o.from !== null && (
                  <span className="tabular shrink-0 text-[0.8125rem] text-ink-soft">
                    {copy.from} {formatPrice(o.from, currency)}
                  </span>
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export function FiltersRail({ filters, onChange, airports, airlines, range, currency }: Props) {
  const id = useId();
  const count = activeFilterCount(filters);
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  // Slider runs 0–100; 100 means "any price".
  const pos = range && filters.maxPrice !== null ? Math.round(((filters.maxPrice - range.lo) / Math.max(1, range.hi - range.lo)) * 100) : 100;

  return (
    <div className="rounded-(--radius-panel) bg-white p-5 ring-1 ring-line">
      <div className="flex items-center justify-between">
        <h2 className="font-display-tight text-[1.25rem] font-bold text-ink">
          {copy.title}
          {count > 0 && (
            <span className="ml-2 inline-grid size-6 place-items-center rounded-full bg-action align-middle font-sans text-[0.75rem] font-bold text-white">
              <span className="sr-only">, </span>
              {count}
              <span className="sr-only"> active</span>
            </span>
          )}
        </h2>
        <button
          type="button"
          onClick={() => onChange(noFilters)}
          disabled={count === 0}
          className="cursor-pointer rounded-md px-2 py-1 text-[0.875rem] font-semibold text-action hover:underline disabled:cursor-default disabled:text-ink-soft disabled:no-underline"
        >
          {copy.reset}
        </button>
      </div>

      <label className="mt-5 flex cursor-pointer items-center justify-between gap-4 border-t border-line pt-5">
        <span className="text-[0.9375rem] font-semibold text-ink">{copy.direct}</span>
        <span className="relative inline-flex">
          <input type="checkbox" role="switch" checked={filters.direct} onChange={(e) => set({ direct: e.target.checked })} className="peer sr-only" />
          <span aria-hidden className="h-7 w-12 rounded-full bg-line transition-colors peer-checked:bg-action peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-action" />
          <span aria-hidden className="absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
        </span>
      </label>

      <fieldset className="mt-5 border-t border-line pt-5">
        <legend className="float-left mb-3 w-full text-[0.9375rem] font-semibold text-ink">{copy.days}</legend>
        <div className="clear-left grid grid-cols-7 gap-1">
          {weekdays.map((d, i) => {
            const on = filters.days.includes(i);
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                aria-label={weekdayNames[i]}
                onClick={() => {
                  if (on && filters.days.length === 1) return;
                  set({ days: on ? filters.days.filter((x) => x !== i) : [...filters.days, i].sort() });
                }}
                className={clsx(
                  "h-10 cursor-pointer rounded-lg text-[0.8125rem] font-semibold transition-colors",
                  on ? "bg-ink text-white" : "bg-mist text-ink-soft hover:text-ink",
                )}
              >
                {d.slice(0, 2)}
              </button>
            );
          })}
        </div>
      </fieldset>

      {range && (
        <div className="mt-5 border-t border-line pt-5">
          <div className="flex items-baseline justify-between">
            <label htmlFor={`${id}-max`} className="text-[0.9375rem] font-semibold text-ink">
              {copy.maxPrice}
            </label>
            <span className="tabular text-[0.9375rem] font-semibold text-ink">
              {filters.maxPrice === null ? copy.any : formatPrice(filters.maxPrice, currency)}
            </span>
          </div>
          <input
            id={`${id}-max`}
            type="range"
            min={0}
            max={100}
            value={pos}
            aria-valuetext={filters.maxPrice === null ? "Any price" : `Up to ${formatPrice(filters.maxPrice, currency)}`}
            onChange={(e) => {
              const v = Number(e.target.value);
              set({ maxPrice: v >= 100 ? null : Math.round(range.lo + ((range.hi - range.lo) * v) / 100) });
            }}
            className="mt-3 w-full cursor-pointer accent-action"
          />
          <div className="tabular mt-1 flex justify-between text-[0.8125rem] text-ink-soft">
            <span>{formatPrice(range.lo, currency)}</span>
            <span>{formatPrice(range.hi, currency)}</span>
          </div>
        </div>
      )}

      <div className="mt-5 space-y-5">
        <CheckList title={copy.airports} options={airports} value={filters.airports} onChange={(v) => set({ airports: v })} currency={currency} />
        <CheckList
          title={copy.airlines}
          options={airlines.map((a) => ({ ...a, label: a.label || carrierName(a.code) }))}
          value={filters.airlines}
          onChange={(v) => set({ airlines: v })}
          currency={currency}
        />
      </div>
    </div>
  );
}
