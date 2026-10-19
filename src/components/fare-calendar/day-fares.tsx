"use client";

import Link from "next/link";
import clsx from "clsx";
import { AirplaneTilt, ArrowRight, CalendarBlank } from "@phosphor-icons/react";
import { airlineByCode } from "@/content/airlines";
import type { Currency } from "@/content/deals";
import { carrierName, fareCalendarCopy } from "@/content/fare-calendar";
import { stopsText } from "@/lib/deal-links";
import type { CalendarFare } from "@/lib/fare-calendar";
import { minutesText } from "./model";
import { useMoney } from "@/components/currency/currency-provider";

const copy = fareCalendarCopy.day;
const longDay = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const shortDay = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
export const fmtLong = (iso: string) => longDay.format(new Date(`${iso}T12:00:00Z`));
export const fmtShort = (iso: string) => shortDay.format(new Date(`${iso}T12:00:00Z`));

/** IATA code on a tile, in the airline's colour when we know it (no logos). */
function Mark({ code }: { code: string }) {
  const color = airlineByCode[code]?.color ?? "#13284d";
  return (
    <span
      aria-hidden
      style={{ backgroundColor: color }}
      className="grid size-11 shrink-0 place-items-center rounded-lg font-display-tight text-[0.875rem] font-bold tracking-wide text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.18)]"
    >
      {code || <AirplaneTilt className="size-5" aria-hidden />}
    </span>
  );
}

type Props = {
  date: string | null;
  outs: CalendarFare[];
  back?: { date: string; fare: CalendarFare | undefined };
  currency: Currency;
  /** /flights deep link for this date pair. */
  selectHref: string;
};

/** The cheapest fares for the chosen day, each with a Select button into live search. */
export function DayFares({ date, outs, back, currency, selectHref }: Props) {
  const money = useMoney();
  if (!date) {
    return (
      <section aria-label="Fares for the chosen day" className="grid place-items-center rounded-(--radius-panel) bg-white p-10 text-center ring-1 ring-line">
        <CalendarBlank className="size-10 text-ink-soft" aria-hidden />
        <p className="mt-3 font-semibold text-ink">{copy.empty}</p>
        <p className="mt-1 text-ink-soft">{copy.emptyHint}</p>
      </section>
    );
  }
  const backPrice = back?.fare?.price ?? 0;
  return (
    <section aria-labelledby="day-title" className="@container rounded-(--radius-panel) bg-white p-5 ring-1 ring-line md:p-7">
      <h2 id="day-title" className="font-display-tight text-[1.375rem] font-bold text-ink md:text-[1.5rem]">
        {back ? copy.pair(fmtShort(date), fmtShort(back.date)) : fmtLong(date)}
      </h2>
      <p className="mt-1 text-[0.9375rem] text-ink-soft">
        {copy.title(outs.length)}
        {back ? `, ${copy.withReturn}` : ""}
      </p>

      <ul className="mt-5 space-y-3">
        {outs.map((f, i) => (
          <li
            key={`${f.airline}-${f.from}-${f.time}-${i}`}
            className={clsx(
              "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 rounded-(--radius-card) p-4 ring-1 @lg:grid-cols-[auto_minmax(0,1fr)_auto_auto]",
              i === 0 ? "bg-fare-tint/50 ring-fare/30" : "ring-line",
            )}
          >
            <Mark code={f.airline} />
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-ink">
                <span className="tabular">{f.time}</span>
                <span className="text-ink-soft" aria-hidden>
                  ·
                </span>
                <span>
                  {f.from} <ArrowRight className="inline size-3.5 align-[-2px] text-ink-soft" weight="bold" aria-label="to" /> {f.to}
                </span>
                {i === 0 && <span className="rounded-full bg-fare px-2 py-0.5 text-[0.75rem] font-semibold text-white">{copy.cheapest}</span>}
              </p>
              <p className="mt-0.5 truncate text-[0.875rem] text-ink-soft">
                {carrierName(f.airline) || "Airline"} · {f.stops === 0 ? copy.direct : stopsText(f.stops)}
                {minutesText(f.mins) ? ` · ${minutesText(f.mins)}` : ""}
              </p>
            </div>
            <p className="tabular col-start-2 text-[1.375rem] leading-none font-extrabold text-fare @lg:col-start-auto @lg:text-right">
              {money(f.price + backPrice, currency)}
              {back?.fare && <span className="mt-1 block text-[0.75rem] font-medium text-ink-soft">return total</span>}
            </p>
            <Link
              href={selectHref}
              className="col-span-2 inline-flex h-11 items-center justify-center rounded-full bg-action px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-action-deep @lg:col-span-1"
            >
              {copy.select}
              <span className="sr-only">
                {" "}
                {carrierName(f.airline)} {f.time} from {f.from}, {money(f.price + backPrice, currency)}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {back?.fare && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-(--radius-card) border border-dashed border-line p-4">
          <Mark code={back.fare.airline} />
          <p className="min-w-0 flex-1 basis-48 text-[0.9375rem] text-ink">
            <span className="font-semibold">
              {copy.returnLabel} {fmtShort(back.date)}, <span className="tabular">{back.fare.time}</span>
            </span>
            <span className="block text-[0.875rem] text-ink-soft">
              {carrierName(back.fare.airline)}, {back.fare.from} to {back.fare.to} · {back.fare.stops === 0 ? copy.direct : stopsText(back.fare.stops)}
            </span>
          </p>
          <p className="tabular w-full pl-15 text-[0.875rem] text-ink-soft @lg:w-auto @lg:pl-0 @lg:text-right">
            {copy.includes} <span className="font-semibold text-ink">{money(back.fare.price, currency)}</span>
          </p>
        </div>
      )}
    </section>
  );
}
