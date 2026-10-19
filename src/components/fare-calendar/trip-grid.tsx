"use client";

import clsx from "clsx";
import { ArrowDown, ArrowRight, CaretLeft, CaretRight, Star } from "@phosphor-icons/react";
import type { Currency } from "@/content/deals";
import { fareCalendarCopy, weekdays } from "@/content/fare-calendar";
import { compactMoney, shortSymbol } from "@/lib/currency";
import { tierer, weekday, type Tier } from "./model";
import { fmtShort } from "./day-fares";
import { useDisplayCurrency, useMoney, useToDisplay } from "@/components/currency/currency-provider";

const copy = fareCalendarCopy.grid;

type Props = {
  leave: string[];
  back: string[];
  cells: (number | null)[][];
  min: number | null;
  /** The chosen pair, highlighted with its two dates. */
  selected: { leave: string; back: string } | null;
  onPick: (leave: string, back: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  currency: Currency;
};

// The same colours as the one-way month calendar: cheapest solid green, cheaper days tinted green, dearer red.
const tierClass: Record<Tier, string> = {
  best: "bg-fare text-white hover:bg-fare-deep",
  low: "bg-fare-tint text-fare-deep hover:ring-2 hover:ring-fare/50",
  mid: "bg-mist text-ink hover:ring-2 hover:ring-ink/20",
  high: "bg-dear-tint text-dear hover:ring-2 hover:ring-dear/40",
};
const tierWord: Record<Tier, string> = { best: "cheapest", low: "cheaper", mid: "", high: "dearer" };

const day = (iso: string) => Number(iso.slice(8));
const mon = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });
const monthOf = (iso: string) => mon.format(new Date(`${iso}T12:00:00Z`));

function DateHead({ date, on }: { date: string; on: boolean }) {
  return (
    <span className={clsx("block rounded-lg px-1 py-1.5 leading-tight transition-colors", on ? "bg-action text-white" : "text-ink")}>
      <span className={clsx("block text-[0.6875rem] font-medium sm:text-[0.75rem]", on ? "text-white/85" : "text-ink-soft")}>{weekdays[weekday(date)]}</span>
      <span className="block text-[0.8125rem] font-semibold sm:text-[0.875rem]">
        {day(date)} {monthOf(date)}
      </span>
    </span>
  );
}

/**
 * Return trips: one grid to pick both dates. Leaving dates run down the left,
 * return dates across the top, and each cell is the return total for that
 * pair. Picking a cell highlights its two dates and shows its fares.
 */
export function TripGrid({ leave, back, cells, min, selected, onPick, onPrev, onNext, currency }: Props) {
  const money = useMoney();
  const toDisplay = useToDisplay();
  const shown = useDisplayCurrency() ?? currency;
  const values = cells.flat().filter((v): v is number => v !== null);
  const tier = tierer(values, min);
  // Cells are narrow: long symbols ("PKR") are named once, above the grid.
  const code = shortSymbol(shown) ? null : shown;

  return (
    <section aria-labelledby="grid-title" className="rounded-(--radius-panel) bg-white p-4 ring-1 ring-line sm:p-5 md:p-7">
      <div className="flex items-center justify-between gap-4">
        <h2 id="grid-title" className="font-display-tight text-[1.375rem] font-bold text-ink md:text-[1.5rem]">
          {copy.title}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={!onPrev}
            aria-label={copy.prev}
            className="grid size-10 cursor-pointer place-items-center rounded-full text-ink ring-1 ring-line transition-colors hover:bg-mist disabled:cursor-default disabled:opacity-40"
          >
            <CaretLeft className="size-4" weight="bold" aria-hidden />
          </button>
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
      </div>
      <p className="mt-1 max-w-xl text-[0.9375rem] text-ink-soft">
        {copy.intro}
        {code && ` ${copy.pricesIn(code)}`}
      </p>

      <table className="mt-5 w-full table-fixed border-separate border-spacing-[3px] text-center sm:border-spacing-1">
        <caption className="sr-only">{copy.caption}</caption>
        <colgroup>
          <col className="w-[3.75rem] sm:w-[5.5rem]" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="p-0 align-bottom">
              {/* Which way each axis runs, in words and arrows. */}
              <span className="flex flex-col items-start gap-0.5 pb-1 text-left text-[0.6875rem] font-semibold text-ink-soft sm:text-[0.75rem]">
                <span className="flex items-center gap-1">
                  {copy.back}
                  <ArrowRight className="size-3" weight="bold" aria-hidden />
                </span>
                <span className="flex items-center gap-1">
                  {copy.leave}
                  <ArrowDown className="size-3" weight="bold" aria-hidden />
                </span>
              </span>
            </th>
            {back.map((d) => (
              <th key={d} scope="col" className="p-0 font-normal" aria-label={`${copy.back} ${fmtShort(d)}`}>
                <DateHead date={d} on={selected?.back === d} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leave.map((l, i) => (
            <tr key={l}>
              <th scope="row" className="p-0 text-left font-normal" aria-label={`${copy.leave} ${fmtShort(l)}`}>
                <DateHead date={l} on={selected?.leave === l} />
              </th>
              {cells[i].map((v, j) => {
                const r = back[j];
                const chosen = selected?.leave === l && selected.back === r;
                if (v === null)
                  return (
                    <td key={r} className="p-0">
                      <span className="grid h-11 place-items-center rounded-lg text-[0.875rem] text-ink-soft/50 sm:h-12" aria-label={copy.none}>
                        –
                      </span>
                    </td>
                  );
                const t = tier(v);
                const d = toDisplay(v, currency);
                return (
                  <td key={r} className="p-0">
                    <button
                      type="button"
                      onClick={() => onPick(l, r)}
                      aria-pressed={chosen}
                      aria-label={`${copy.leave} ${fmtShort(l)}, ${copy.back.toLowerCase()} ${fmtShort(r)}: ${money(v, currency)}${tierWord[t] ? `, ${tierWord[t]}` : ""}`}
                      className={clsx(
                        "tabular relative grid h-11 w-full cursor-pointer place-items-center rounded-lg px-0.5 text-[0.75rem] font-bold transition-[background-color,box-shadow] sm:h-12 sm:text-[0.875rem]",
                        tierClass[t],
                        chosen && "ring-[3px]! ring-ink! ring-offset-1",
                      )}
                    >
                      {compactMoney(d.amount, d.currency)}
                      {t === "best" && <Star weight="fill" className="absolute top-0.5 right-0.5 size-2.5 text-sun sm:size-3" aria-hidden />}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8125rem] text-ink-soft" aria-label="Legend">
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="size-3.5 rounded bg-fare" /> {copy.cheapest}
        </li>
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="size-3.5 rounded bg-fare-tint ring-1 ring-fare/30" /> {copy.low}
        </li>
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="size-3.5 rounded bg-dear-tint ring-1 ring-dear/30" /> {copy.high}
        </li>
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="size-3.5 rounded bg-action" /> {copy.yourDates}
        </li>
      </ul>
    </section>
  );
}
