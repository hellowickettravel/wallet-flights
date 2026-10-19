"use client";

import { AnimatePresence, m } from "motion/react";
import clsx from "clsx";
import { CheckCircle, Hourglass, Warning, XCircle } from "@phosphor-icons/react";
import { compensationCopy } from "@/content/compensation";
import { formatMoney, type Assessment, type CheckState } from "@/lib/compensation";

const copy = compensationCopy.result;
const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const icon: Record<CheckState, React.ReactNode> = {
  ok: <CheckCircle className="size-5 text-[#6fdca6]" weight="fill" aria-hidden />,
  maybe: <Warning className="size-5 text-sun" weight="fill" aria-hidden />,
  no: <XCircle className="size-5 text-[#ff9c8a]" weight="fill" aria-hidden />,
};
const stateWord: Record<CheckState, string> = { ok: "Yes:", maybe: "Check:", no: "No:" };

/** Map a distance onto the bar: each band gets a third of the width. */
function markerPos(km: number) {
  if (km <= 1500) return (km / 1500) * 33.33;
  if (km <= 3500) return 33.33 + ((km - 1500) / 2000) * 33.33;
  return Math.min(98, 66.67 + ((km - 3500) / 6500) * 33.33);
}

/**
 * The page's signature: a boarding-pass stub on navy. The amount is set large
 * in sun and changes with a short slide whenever an answer changes it.
 */
export function ResultTicket({ result, passengers, example = false }: { result: Assessment; passengers: number; example?: boolean }) {
  const { verdict, currency, perPassenger, total, band, bandAmounts, distanceKm, checks, limit } = result;
  const heading = verdict === "owed" ? copy.owed : verdict === "maybe" ? copy.maybe : copy.not;

  return (
    <section id="result" aria-labelledby="result-title" className="relative overflow-hidden rounded-(--radius-panel) bg-board text-white shadow-(--shadow-float)">
      <div className="p-6 md:p-7">
        <h2 id="result-title" className="sr-only">
          {copy.title}
        </h2>
        <div aria-live="polite" aria-atomic="true">
          <p
            className={clsx(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.875rem] font-semibold",
              verdict === "owed" ? "bg-sun text-ink" : verdict === "maybe" ? "bg-white/15 text-white" : "bg-white/10 text-white/85",
            )}
          >
            {verdict === "not" ? <XCircle className="size-4" weight="bold" aria-hidden /> : <CheckCircle className="size-4" weight="bold" aria-hidden />}
            {heading}
          </p>
          {example && (
            <span className="ml-2 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[0.8125rem] font-semibold text-white ring-1 ring-white/30">
              {compensationCopy.example.label}
            </span>
          )}
          <p className="mt-4 flex items-baseline gap-3">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span
                key={`${currency}${perPassenger}`}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={clsx("tabular font-display-tight text-[3.5rem] leading-none font-extrabold md:text-[4rem]", verdict === "not" ? "text-white/45" : "text-sun")}
              >
                {formatMoney(perPassenger, currency)}
              </m.span>
            </AnimatePresence>
            <span className="text-white/75">{copy.perPassenger}</span>
          </p>
          <p className="mt-2 text-[1.0625rem] text-white/85">
            <span className="tabular font-semibold text-white">{formatMoney(total, currency)}</span> {copy.total(passengers)}
          </p>
          {result.halved && <p className="mt-1 text-[0.875rem] text-sun">{copy.halved}</p>}
          {example && <p className="mt-2 text-[0.875rem] text-white/70">{compensationCopy.example.ticket}</p>}
        </div>

        <div className="mt-6">
          <div className="relative flex h-2.5 gap-1" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span key={i} className={clsx("flex-1 rounded-full", i === band ? "bg-sun" : "bg-white/15")} />
            ))}
            <span
              className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-board bg-white transition-[left] duration-500 ease-(--ease-out-quint) motion-reduce:transition-none"
              style={{ left: `${markerPos(distanceKm)}%` }}
            />
          </div>
          <ol className="mt-2 grid grid-cols-3 gap-1 text-[0.75rem]" aria-label="Distance bands">
            {copy.bands.map((b, i) => (
              <li key={b} className={clsx(i === band ? "font-semibold text-white" : "text-white/60")}>
                {b}
                <span className="tabular block">{formatMoney(bandAmounts[i], currency)}</span>
                {i === band && <span className="sr-only"> (your flight, {Math.round(distanceKm).toLocaleString("en-GB")} km)</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Perforation: the stub tears off here. */}
      <div aria-hidden className="relative h-6">
        <span className="absolute top-0 -left-3 size-6 rounded-full bg-mist" />
        <span className="absolute top-0 -right-3 size-6 rounded-full bg-mist" />
        <span className="absolute top-1/2 right-5 left-5 border-t-2 border-dashed border-white/20" />
      </div>

      <div className="px-6 pt-2 pb-6 md:px-7 md:pb-7">
        <h3 className="text-[0.9375rem] font-semibold text-white">{copy.why}</h3>
        <ul className="mt-3 space-y-3.5">
          {checks.map((c) => (
            <li key={c.title} className="flex gap-3">
              <span className="mt-0.5 shrink-0">{icon[c.state]}</span>
              <span>
                <span className="block text-[0.9375rem] font-semibold text-white">
                  <span className="sr-only">{stateWord[c.state]} </span>
                  {c.title}
                </span>
                <span className="mt-0.5 block text-[0.875rem] leading-relaxed text-white/70">{c.detail}</span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-5 flex gap-3 rounded-xl bg-white/[0.07] p-3.5 text-[0.875rem] leading-relaxed text-white/80">
          <Hourglass className="mt-0.5 size-5 shrink-0 text-sun" aria-hidden />
          <span>
            {limit.status === "future"
              ? copy.future
              : limit.status === "expired"
                ? copy.outOfTime
                : (
                  <>
                    <span className="font-semibold text-white">
                      {copy.claimBy} {dateFmt.format(new Date(`${limit.claimBy}T12:00:00Z`))}
                    </span>{" "}
                    {limit.status === "scotland" ? copy.scotlandOnly : copy.claimByNote}
                  </>
                )}
          </span>
        </p>
      </div>
    </section>
  );
}
