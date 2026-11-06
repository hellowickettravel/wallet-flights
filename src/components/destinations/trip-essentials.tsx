"use client";

import { useSyncExternalStore } from "react";
import { Coins, Drop, HandCoins, Plug, Siren, Translate, type Icon } from "@phosphor-icons/react";
import { useRates } from "@/components/currency/currency-provider";
import type { DestinationDepth } from "@/content/destination-depth/types";
import { convert } from "@/lib/currency";
import { diffText, zoneDifference, type DiffCopy } from "./zone-time";

/**
 * The widget's words, from depthCopy.tripEssentials, prepared on the server
 * (this is a client component, so it doesn't import the content index and
 * every city's data with it).
 */
export type EssentialsCopy = {
  title: string;
  localTime: string;
  rateNote: string;
  diff: DiffCopy;
  rows: { currency: string; plugs: string; language: string; emergency: string; tipping: string; water: string };
};

/** The two cities most visitors compare with: the site's UK and US gateways. */
const compareWith = [
  { city: "London", timeZone: "Europe/London" },
  { city: "New York", timeZone: "America/New_York" },
];

// The clock runs in the browser only (a prerendered page can't know the time
// it's read at); the HTML keeps a slot of the same size, so nothing shifts.
function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 15_000);
  return () => window.clearInterval(id);
}
/** Changes once a minute, so the snapshot is stable between ticks. */
const minuteNow = () => Math.floor(Date.now() / 60_000);
const serverNow = () => null;

function Clock({ city, timeZone, copy }: { city: string; timeZone: string; copy: EssentialsCopy }) {
  const minute = useSyncExternalStore(subscribe, minuteNow, serverNow);
  const now = minute === null ? null : new Date(minute * 60_000);
  const time = now ? new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(now) : null;
  const day = now ? new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "long" }).format(now) : null;
  const others = compareWith.filter((c) => c.city !== city);
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        <p className="text-[0.875rem] text-ink-soft">{copy.localTime}</p>
        <p className="mt-1 font-display-tight text-[2.75rem] leading-none font-bold text-ink tabular">{time ?? <span className="invisible">00:00</span>}</p>
        <p className="mt-1 min-h-5 text-[0.875rem] text-ink-soft">{day}</p>
      </div>
      <ul className="space-y-1 text-[0.875rem] leading-snug font-medium text-ink sm:text-right">
        {others.map((c) => (
          <li key={c.city} className="min-h-5">
            {now ? diffText(zoneDifference(timeZone, c.timeZone, now), c.city, copy.diff) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** ISO code from "Pound sterling (GBP)". */
const isoCode = (currency: string) => /\(([A-Z]{3})\)/.exec(currency)?.[1];

function formatAmount(n: number, code: string) {
  const digits = n >= 100 ? 0 : n >= 10 ? 1 : 2;
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: code, maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(n);
  } catch {
    return `${n.toFixed(digits)} ${code}`;
  }
}

/** "1 GBP ≈ €1.15" and "1 USD ≈ €0.86", from the site's own daily rates. Hidden when a rate is missing. */
function RateLine({ code, note }: { code: string; note: string }) {
  const rates = useRates();
  const pairs = (["GBP", "USD"] as const)
    .filter((from) => from !== code)
    .flatMap((from) => {
      const v = convert(1, from, code, rates);
      return v === null ? [] : [`1 ${from} ≈ ${formatAmount(v, code)}`];
    });
  if (!pairs.length) return null;
  return (
    <>
      {pairs.map((p) => (
        <span key={p} className="mt-1 block font-semibold text-ink tabular">
          {p}
        </span>
      ))}
      <span className="block text-[0.8125rem] text-ink-soft">{note}</span>
    </>
  );
}

/**
 * Trip essentials (Batch 22): live local time with the difference from London
 * and New York, then currency (with today's rate), plugs, language, the
 * emergency number, tipping and tap water.
 */
export function TripEssentials({ city, timeZone, essentials, copy }: { city: string; timeZone: string; essentials: DestinationDepth["essentials"]; copy: EssentialsCopy }) {
  const code = isoCode(essentials.currency);
  const rows: { icon: Icon; label: string; value: string; extra?: React.ReactNode }[] = [
    { icon: Coins, label: copy.rows.currency, value: essentials.currency, extra: code ? <RateLine code={code} note={copy.rateNote} /> : null },
    { icon: Plug, label: copy.rows.plugs, value: essentials.plugs },
    { icon: Translate, label: copy.rows.language, value: essentials.language },
    { icon: Siren, label: copy.rows.emergency, value: essentials.emergency },
    { icon: HandCoins, label: copy.rows.tipping, value: essentials.tipping },
    { icon: Drop, label: copy.rows.water, value: essentials.water },
  ];
  return (
    <section aria-labelledby="essentials-title" className="overflow-hidden rounded-(--radius-panel) ring-1 ring-line">
      <div className="bg-mist p-6 md:p-7">
        <h3 id="essentials-title" className="mb-4 font-display-tight text-[1.5rem] font-bold text-ink">
          {copy.title}
        </h3>
        <Clock city={city} timeZone={timeZone} copy={copy} />
      </div>
      <dl className="divide-y divide-line bg-white px-6 md:px-7">
        {rows.map(({ icon: RowIcon, label, value, extra }) => (
          <div key={label} className="flex gap-4 py-4">
            <RowIcon className="mt-0.5 size-6 shrink-0 text-action" weight="duotone" aria-hidden />
            <div className="min-w-0">
              <dt className="text-[0.8125rem] text-ink-soft">{label}</dt>
              <dd className="mt-0.5 leading-snug text-ink">
                {value}
                {extra}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
