"use client";

import Link from "next/link";
import { useId, useState } from "react";
import clsx from "clsx";
import { dealHref, monthLabel } from "@/lib/deal-links";
import type { MonthCalendar as Calendar } from "@/lib/fares";
import { onRovingKeyDown } from "@/lib/roving";
import { Price } from "@/components/currency/currency-provider";

/**
 * Cheapest round trip per departure month, one tab per departure city. Bars
 * scale to that city's cheapest/dearest month; only months with a real fare
 * appear.
 */
export function MonthCalendar({ calendars, to, subPrefix }: { calendars: Calendar[]; to: string; subPrefix: string }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const cal = calendars[Math.min(active, calendars.length - 1)];
  if (!cal) return null;
  const prices = cal.months.map((m) => m.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return (
    <div>
      {calendars.length > 1 && (
        <div role="tablist" aria-label="Departure city" onKeyDown={(e) => onRovingKeyDown(e, setActive)} className="flex flex-wrap gap-2">
          {calendars.map((c, i) => (
            <button
              key={c.origin.code}
              id={`${base}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              aria-controls={`${base}-panel`}
              onClick={() => setActive(i)}
              className={clsx(
                "h-10 cursor-pointer rounded-full px-4 text-[0.9375rem] font-semibold transition-colors",
                i === active ? "bg-ink text-white" : "text-ink ring-1 ring-line hover:bg-mist",
              )}
            >
              From {c.origin.city}
            </button>
          ))}
        </div>
      )}
      <ol
        id={`${base}-panel`}
        role={calendars.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={calendars.length > 1 ? `${base}-tab-${active}` : undefined}
        aria-label={calendars.length > 1 ? undefined : `Cheapest month to fly from ${cal.origin.city}`}
        className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6"
      >
        {cal.months.map((m) => {
          const cheapest = m.price === min;
          const h = max === min ? 100 : 30 + ((m.price - min) / (max - min)) * 70;
          const href = dealHref(m, cal.origin.code, to, `${subPrefix}_month_${m.month}`);
          const cls = clsx(
            "group flex h-full flex-col justify-end rounded-xl p-3 ring-1 transition-colors",
            cheapest ? "bg-fare/[0.07] ring-fare/40 hover:bg-fare/[0.12]" : "ring-line hover:bg-mist",
          );
          const inner = (
            <>
              <span aria-hidden className="flex h-14 items-end">
                <span className={clsx("w-full rounded-md", cheapest ? "bg-fare" : "bg-action/25 group-hover:bg-action/40")} style={{ height: `${h}%` }} />
              </span>
              <span className="mt-2 text-[0.8125rem] text-ink-soft">{monthLabel(m.month)}</span>
              <Price amount={m.price} currency={m.currency} className={clsx("tabular text-[1.0625rem] font-bold", cheapest ? "text-fare" : "text-ink")} />
              {cheapest && <span className="text-[0.75rem] font-semibold text-fare">Cheapest month</span>}
            </>
          );
          return (
            <li key={m.month}>
              <Link href={href} className={cls}>
                {inner}
              </Link>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-[0.8125rem] text-ink-soft">
        Lowest round-trip fare per person found recently for departures in each month, from {cal.origin.city}. Months with no recent fare aren’t shown.
      </p>
    </div>
  );
}
