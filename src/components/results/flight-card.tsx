"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { AirplaneTilt, ArrowSquareOut, Backpack, CaretDown, Check, Suitcase, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { formatPrice } from "@/content/deals";
import { airportByCode } from "@/lib/search-query";
import { searchString } from "@/lib/white-label";
import { utcOffset } from "@/lib/geo";
import { clock, dayOffset, durationLabel, stopsLabel, type Itinerary, type Journey } from "@/lib/demo-flights";
import { AirlineMark } from "./airline-mark";

const cityOf = (code: string) => airportByCode(code)?.city ?? code;

/**
 * Demo results (behind NEXT_PUBLIC_DEMO_RESULTS) hand off through /go to the
 * same route on Aviasales, as a real affiliate link. The demo price is only
 * shown on the hand-off screen, labelled as such. No free text (airline or
 * provider names) goes in the URL: /go would display whatever it was given.
 */
export function dealHref(it: Itinerary, price: number) {
  const path = searchString(
    it.journeys.map((j) => ({ from: j.from, to: j.to, date: j.date })),
    { cabin: "economy", adults: 1, children: 0, infants: 0 },
  );
  const p = new URLSearchParams({
    program: "aviasales",
    url: `https://www.aviasales.com/search/${path}`,
    sub: "demo_results",
    price: String(price),
    currency: it.currency,
    from: it.journeys[0].from,
    to: it.journeys[0].to,
  });
  return `/go?${p.toString()}`;
}

type Props = {
  it: Itinerary;
  badge?: "Cheapest" | "Fastest" | "Best";
  travellers: number;
  expanded: boolean;
  onToggle: () => void;
  journeyLabels: string[];
};

export function FlightCard({ it, badge, travellers, expanded, onToggle, journeyLabels }: Props) {
  const best = it.providers[0];
  const detailsId = `details-${it.id}`;
  return (
    <article
      aria-label={`${it.airline.name}, ${formatPrice(it.price, it.currency)} per person`}
      className={clsx(
        "overflow-hidden rounded-(--radius-panel) bg-white ring-1 transition-shadow hover:shadow-[0_12px_32px_-20px_rgb(15_31_61/0.35)]",
        badge === "Cheapest" ? "ring-fare/50" : "ring-line",
      )}
    >
      <div className="grid gap-5 p-4 sm:p-5 md:grid-cols-[1fr_auto] md:gap-8">
        <div className="min-w-0 space-y-4">
          <div className="flex items-center gap-3">
            <AirlineMark airline={it.airline} />
            <div className="min-w-0">
              <p className="truncate font-semibold text-ink">{it.airline.name}</p>
              <p className="truncate text-[0.8125rem] text-ink-soft">
                {it.journeys[0].segments.map((s) => s.flightNo).join(" · ")}
              </p>
            </div>
            {badge && (
              <span
                className={clsx(
                  "ml-auto shrink-0 rounded-full px-2.5 py-1 text-[0.75rem] font-semibold md:ml-2",
                  badge === "Cheapest" ? "bg-fare text-white" : badge === "Fastest" ? "bg-action text-white" : "bg-sun text-ink",
                )}
              >
                {badge}
              </span>
            )}
          </div>
          {it.journeys.map((j, i) => (
            <JourneyRow key={i} journey={j} label={journeyLabels[i]} />
          ))}
        </div>

        <div className="flex flex-row items-end justify-between gap-4 border-t border-line pt-4 md:w-52 md:flex-col md:items-end md:justify-center md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <div className="md:text-right">
            <p className="tabular text-[1.75rem] leading-none font-bold text-fare">{formatPrice(it.price, it.currency)}</p>
            <p className="mt-1 text-[0.8125rem] text-ink-soft">
              per person{travellers > 1 && <> · {formatPrice(it.total, it.currency)} total</>}
            </p>
            <p className="mt-1 text-[0.8125rem] text-ink-soft">on {best.provider}</p>
          </div>
          <Link
            href={dealHref(it, best.price)}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-action px-5 font-semibold text-white transition-colors hover:bg-action-deep"
          >
            View deal
            <ArrowSquareOut weight="bold" className="size-4" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line bg-mist/60 px-4 py-2.5 sm:px-5">
        <Tag ok={it.cabinBag} icon={<Backpack className="size-4" aria-hidden />} yes="Cabin bag" no="No cabin bag" />
        <Tag ok={it.checkedBag} icon={<Suitcase className="size-4" aria-hidden />} yes="Checked bag included" no="Checked bag extra" />
        <Tag ok={it.refundable} icon={null} yes="Refundable" no="Non-refundable" />
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={detailsId}
          className="ml-auto inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[0.875rem] font-semibold text-action hover:bg-white"
        >
          {it.providers.length > 1 ? `Details & ${it.providers.length} deals` : "Flight details"}
          <CaretDown className={clsx("size-4 transition-transform duration-300", expanded && "rotate-180")} aria-hidden />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <m.div
            id={detailsId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <Details it={it} journeyLabels={journeyLabels} />
          </m.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function JourneyRow({ journey: j, label }: { journey: Journey; label: string }) {
  const days = dayOffset(j.arriveMin);
  return (
    <div>
      <p className="mb-1.5 text-[0.75rem] font-medium text-ink-soft">{label}</p>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-5">
        <div>
          <p className="tabular text-[1.375rem] leading-none font-bold text-ink">{clock(j.departMin)}</p>
          <p className="mt-1 text-[0.8125rem] font-medium text-ink-soft">{j.from}</p>
        </div>
        <RouteLine journey={j} />
        <div className="text-right">
          <p className="tabular text-[1.375rem] leading-none font-bold text-ink">
            {clock(j.arriveMin)}
            {days !== 0 && (
              <sup className="ml-0.5 text-[0.6875rem] font-semibold text-action" title={days > 0 ? `Arrives ${days} day later` : "Arrives the day before"}>
                {days > 0 ? `+${days}` : days}
              </sup>
            )}
          </p>
          <p className="mt-1 text-[0.8125rem] font-medium text-ink-soft">{j.to}</p>
        </div>
      </div>
    </div>
  );
}

function RouteLine({ journey: j }: { journey: Journey }) {
  return (
    <div className="min-w-0 text-center">
      <p className="text-[0.75rem] text-ink-soft">{durationLabel(j.durationMin)}</p>
      <div className="relative my-1.5 flex items-center">
        <span className="size-1.5 rounded-full bg-ink/40" />
        <span className="h-px flex-1 border-t-2 border-dashed border-ink/20" />
        {j.via.map((v) => (
          <span key={v} className="flex items-center">
            <span className="size-2 rounded-full bg-sun ring-2 ring-white" title={`Stop in ${cityOf(v)}`} />
            <span className="h-px w-6 border-t-2 border-dashed border-ink/20 sm:w-10" />
          </span>
        ))}
        <AirplaneTilt weight="fill" className="size-4 rotate-45 text-ink/60" aria-hidden />
      </div>
      <p className={clsx("truncate text-[0.75rem] font-medium", j.stops ? "text-ink" : "text-fare")}>
        {stopsLabel(j.stops)}
        {j.stops > 0 && <span className="font-normal text-ink-soft"> · {j.via.join(", ")}</span>}
      </p>
    </div>
  );
}

function Tag({ ok, icon, yes, no }: { ok: boolean; icon: React.ReactNode; yes: string; no: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 text-[0.8125rem] font-medium", ok ? "text-fare" : "text-ink-soft")}>
      {icon ?? (ok ? <Check className="size-4" weight="bold" aria-hidden /> : <X className="size-4" aria-hidden />)}
      {ok ? yes : no}
    </span>
  );
}

function Details({ it, journeyLabels }: { it: Itinerary; journeyLabels: string[] }) {
  return (
    <div className="grid gap-8 border-t border-line p-4 sm:p-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
        {it.journeys.map((j, ji) => (
          <div key={ji}>
            <p className="text-[0.875rem] font-semibold text-ink">
              {journeyLabels[ji]} · {cityOf(j.from)} to {cityOf(j.to)}
            </p>
            <ol className="mt-3 space-y-3 border-l-2 border-line pl-5">
              {j.segments.map((s, si) => (
                <li key={si} className="relative">
                  <span className="absolute top-1.5 -left-[1.6rem] size-2.5 rounded-full bg-ink ring-4 ring-white" aria-hidden />
                  <p className="text-[0.9375rem] text-ink">
                    <span className="tabular font-semibold">{clock(s.departMin)}</span> {airportByCode(s.from)?.name ?? s.from} ({s.from})
                  </p>
                  <p className="text-[0.8125rem] text-ink-soft">
                    {s.flightNo} · {durationLabel(s.durationMin)} · {it.airline.name}
                  </p>
                  <p className="mt-1 text-[0.9375rem] text-ink">
                    <span className="tabular font-semibold">{clock(s.departMin + s.durationMin + (utcShift(s.from, s.to)))}</span>{" "}
                    {airportByCode(s.to)?.name ?? s.to} ({s.to})
                  </p>
                  {j.layoverMin[si] !== undefined && (
                    <p className="mt-2 inline-flex rounded-full bg-sun/30 px-3 py-1 text-[0.8125rem] font-medium text-ink">
                      {durationLabel(j.layoverMin[si])} layover in {cityOf(s.to)}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div>
        <p className="text-[0.875rem] font-semibold text-ink">Compare deals for this flight</p>
        <ul className="mt-3 divide-y divide-line rounded-xl ring-1 ring-line">
          {it.providers.map((p, i) => (
            <li key={p.provider} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="min-w-0">
                <span className="block truncate font-medium text-ink">{p.provider}</span>
                <span className="text-[0.8125rem] text-ink-soft">{p.isAirline ? "Book direct with the airline" : "Online travel site"}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className={clsx("tabular font-bold", i === 0 ? "text-fare" : "text-ink")}>{formatPrice(p.price, it.currency)}</span>
                <Link
                  href={dealHref(it, p.price)}
                  aria-label={`View deal on ${p.provider} for ${formatPrice(p.price, it.currency)}`}
                  className="inline-flex h-9 items-center rounded-full px-3.5 text-[0.875rem] font-semibold text-action ring-1 ring-line hover:bg-mist"
                >
                  View
                </Link>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-soft">
          You book and pay on the provider’s site. Baggage rules and fare conditions are confirmed there before you pay.
        </p>
      </div>
    </div>
  );
}

const utcShift = (from: string, to: string) => (utcOffset(to) - utcOffset(from)) * 60;
