"use client";

import clsx from "clsx";
import { CalendarCheck, TrendDown, TrendUp } from "@phosphor-icons/react";
import { formatPrice, type Currency } from "@/content/deals";
import { fareCalendarCopy, weekdayNames } from "@/content/fare-calendar";
import type { Insights, MonthSummary } from "./model";

const copy = fareCalendarCopy;
const short = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });
const long = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
const year = (ym: string) => ym.slice(0, 4);
export const monthName = (ym: string) => long.format(new Date(`${ym}-15T12:00:00Z`));

type Props = {
  months: MonthSummary[];
  active: number;
  onPick: (i: number) => void;
  insights: Insights;
  currency: Currency;
  oneWay: boolean;
  subtitle: string;
  /** Changes when a new route loads, so the bars grow again once. */
  animateKey: string;
};

/**
 * The page's signature: twelve bars like a skyline, cheapest month in fare
 * green. Each bar is a button that opens that month in the calendar.
 */
export function MonthSkyline({ months, active, onPick, insights, currency, oneWay, subtitle, animateKey }: Props) {
  const valid = months.filter((m) => m.min !== null) as (MonthSummary & { min: number })[];
  const cheapest = valid.length ? valid.reduce((a, b) => (b.min < a.min ? b : a)) : null;
  const hi = Math.max(...valid.map((m) => m.min), 1);
  const lo = Math.min(...valid.map((m) => m.min), hi);

  return (
    <section aria-labelledby="months-title" className="rounded-(--radius-panel) bg-white p-5 ring-1 ring-line md:p-7">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h2 id="months-title" className="font-display-tight text-[1.5rem] font-bold text-ink md:text-[1.75rem]">
            {copy.months.title}
          </h2>
          <p className="mt-1 text-[0.9375rem] text-ink-soft">{subtitle}</p>
        </div>
      </div>

      <ol key={animateKey} className="mt-6 grid grid-cols-6 gap-x-1.5 gap-y-4 sm:grid-cols-12 sm:gap-x-2" aria-label="Lowest fare in each month">
        {months.map((m, i) => {
          const isCheapest = cheapest?.month === m.month;
          const h = m.min === null ? 6 : hi === lo ? 100 : 26 + (74 * (m.min - lo)) / (hi - lo);
          const newYear = i > 0 && year(m.month) !== year(months[i - 1].month);
          return (
            <li key={m.month} className="relative">
              {newYear && (
                <span aria-hidden className="absolute -top-1 -left-1.5 hidden h-[calc(100%+0.25rem)] border-l border-dashed border-line sm:block" />
              )}
              <button
                type="button"
                disabled={m.min === null}
                aria-pressed={i === active}
                aria-label={`${monthName(m.month)}: ${m.min === null ? copy.months.none : `from ${formatPrice(m.min, currency)}`}${isCheapest ? `, ${copy.months.cheapest.toLowerCase()}` : ""}`}
                onClick={() => onPick(i)}
                className={clsx(
                  "group flex w-full cursor-pointer flex-col items-center rounded-xl px-0.5 pt-2 pb-2 transition-colors disabled:cursor-default",
                  i === active ? "bg-mist ring-2 ring-ink" : "hover:bg-mist",
                )}
              >
                <span className={clsx("tabular text-[0.75rem] font-bold sm:text-[0.8125rem]", isCheapest ? "text-fare" : m.min === null ? "text-ink-soft" : "text-ink")}>
                  {m.min === null ? "–" : formatPrice(m.min, currency)}
                </span>
                <span aria-hidden className="mt-1.5 flex h-24 w-full items-end justify-center md:h-32">
                  <span
                    className={clsx(
                      "skyline-bar w-[70%] max-w-9 rounded-t-md rounded-b-sm",
                      isCheapest ? "bg-fare" : m.min === null ? "bg-line" : "bg-action/25 group-hover:bg-action/45",
                      i === active && !isCheapest && m.min !== null && "bg-action/60",
                    )}
                    style={{ height: `${h}%`, animationDelay: `${i * 45}ms` }}
                  />
                </span>
                <span className={clsx("mt-2 text-[0.8125rem]", i === active ? "font-semibold text-ink" : "text-ink-soft")}>{short.format(new Date(`${m.month}-15T12:00:00Z`))}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-[0.8125rem] text-ink-soft">{copy.months.note(oneWay)}</p>

      {cheapest && (
        <ul aria-label="What the fares show" className="mt-6 grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
          <li>
          <button
            type="button"
            onClick={() => onPick(months.indexOf(cheapest))}
            className="flex h-full w-full cursor-pointer items-start gap-3 rounded-(--radius-card) bg-fare-tint p-4 text-left ring-1 ring-fare/20 transition-colors hover:ring-fare/50"
          >
            <CalendarCheck className="mt-0.5 size-6 shrink-0 text-fare-deep" weight="duotone" aria-hidden />
            <span>
              <span className="block text-[0.8125rem] text-fare-deep">{copy.insights.cheapestMonth}</span>
              <span className="block mt-0.5 font-semibold text-ink">
                {monthName(cheapest.month)}, {copy.insights.from} <span className="tabular text-fare-deep">{formatPrice(cheapest.min, currency)}</span>
              </span>
            </span>
          </button>
          </li>
          {insights && (
            <>
              <li className="flex items-start gap-3 rounded-(--radius-card) bg-mist p-4">
                <TrendDown className="mt-0.5 size-6 shrink-0 text-action" weight="bold" aria-hidden />
                <div>
                  <span className="block text-[0.8125rem] text-ink-soft">{copy.insights.cheapestDay}</span>
                  <span className="block mt-0.5 font-semibold text-ink">
                    {weekdayNames[insights.cheapestDow]}, {copy.insights.about} <span className="tabular">{formatPrice(insights.cheapestAvg, currency)}</span>
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-(--radius-card) bg-mist p-4">
                <TrendUp className="mt-0.5 size-6 shrink-0 text-dear" weight="bold" aria-hidden />
                <div>
                  <span className="block text-[0.8125rem] text-ink-soft">{copy.insights.dearestDay}</span>
                  <span className="block mt-0.5 font-semibold text-ink">
                    {weekdayNames[insights.dearestDow]}, {copy.insights.more(insights.pctMore)}
                  </span>
                </div>
              </li>
            </>
          )}
        </ul>
      )}
    </section>
  );
}
