"use client";

import clsx from "clsx";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { Currency } from "@/content/deals";
import { fareCalendarCopy, weekdays } from "@/content/fare-calendar";
import { daysInMonth, tierer, weekday, type DayBest, type Tier } from "./model";
import { monthName } from "./month-skyline";
import { useMoney } from "@/components/currency/currency-provider";

const copy = fareCalendarCopy.calendar;
const dayLabel = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

type Props = {
  month: string;
  best: (date: string) => DayBest | null;
  bestDate: string | null;
  selected: string | null;
  today: string;
  onSelect: (date: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  currency: Currency;
};

const tierClass: Record<Tier, string> = {
  best: "bg-fare text-white ring-2 ring-fare hover:bg-fare-deep",
  low: "bg-fare-tint text-fare-deep hover:ring-2 hover:ring-fare/50",
  mid: "bg-mist text-ink hover:ring-2 hover:ring-ink/20",
  high: "bg-dear-tint text-dear hover:ring-2 hover:ring-dear/40",
};
const tierWord: Record<Tier, string> = { best: "cheapest day this month", low: "cheaper day", mid: "", high: "dearer day" };

/** Day-by-day calendar for one month: cheap days green, dear days red. */
export function DayCalendar({ month, best, bestDate, selected, today, onSelect, onPrev, onNext, currency }: Props) {
  const money = useMoney();
  const dates = daysInMonth(month);
  const cells = dates.map((date) => ({ date, b: best(date) }));
  const values = cells.flatMap((c) => (c.b ? [c.b.total] : []));
  const bestValue = bestDate ? (best(bestDate)?.total ?? null) : null;
  const tier = tierer(values, bestValue);
  const lead = weekday(dates[0]);

  return (
    <section aria-labelledby="calendar-title" className="rounded-(--radius-panel) bg-white p-5 ring-1 ring-line md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={!onPrev}
            aria-label={copy.prev}
            className="grid size-10 cursor-pointer place-items-center rounded-full text-ink ring-1 ring-line transition-colors hover:bg-mist disabled:cursor-default disabled:opacity-40"
          >
            <CaretLeft className="size-4" weight="bold" aria-hidden />
          </button>
          <h2 id="calendar-title" aria-live="polite" className="min-w-44 text-center font-display-tight text-[1.375rem] font-bold text-ink md:text-[1.5rem]">
            {monthName(month)}
          </h2>
          <button
            type="button"
            onClick={onNext}
            disabled={!onNext}
            aria-label={copy.next}
            className="grid size-10 cursor-pointer place-items-center rounded-full text-ink ring-1 ring-line transition-colors hover:bg-mist disabled:cursor-default disabled:opacity-40"
          >
            <CaretRight className="size-4" weight="bold" aria-hidden />
          </button>
        </div>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8125rem] text-ink-soft" aria-label="Legend">
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-3.5 rounded bg-fare" /> Cheapest
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-3.5 rounded bg-fare-tint ring-1 ring-fare/30" /> {copy.low}
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="size-3.5 rounded bg-dear-tint ring-1 ring-dear/30" /> {copy.high}
          </li>
        </ul>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 sm:gap-1.5">
        {weekdays.map((d) => (
          <div key={d} aria-hidden className="pb-1 text-center text-[0.75rem] font-semibold text-ink-soft sm:text-[0.8125rem]">
            {d}
          </div>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <div key={`pad-${i}`} aria-hidden />
        ))}
        {cells.map(({ date, b }) => {
          const past = date < today;
          const t = b ? tier(b.total) : null;
          const day = Number(date.slice(8));
          const label = `${dayLabel.format(new Date(`${date}T12:00:00Z`))}: ${
            b ? `from ${money(b.total, currency)}${t && tierWord[t] ? `, ${tierWord[t]}` : ""}` : past ? copy.past : copy.noFare
          }`;
          return (
            <button
              key={date}
              type="button"
              disabled={!b}
              aria-pressed={selected === date}
              aria-label={label}
              onClick={() => onSelect(date)}
              className={clsx(
                "relative flex aspect-[1/1.05] min-h-12 cursor-pointer flex-col items-center justify-center rounded-lg transition-[box-shadow,background-color] sm:aspect-auto sm:h-[4.5rem] sm:items-start sm:justify-between sm:p-2 md:rounded-xl",
                b && t ? tierClass[t] : "cursor-default bg-transparent text-ink-soft/60 ring-1 ring-line/70",
                selected === date && "ring-[3px]! ring-ink! ring-offset-2",
              )}
            >
              <span className={clsx("text-[0.8125rem] font-semibold sm:text-[0.875rem]", past && "line-through decoration-ink-soft/40")}>{day}</span>
              <span className="tabular text-[0.6875rem] font-bold sm:text-[0.875rem]">
                {b ? money(b.total, currency) : <span className="sr-only sm:not-sr-only">–</span>}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
