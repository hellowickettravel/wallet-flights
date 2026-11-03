"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { onRovingKeyDown } from "@/lib/roving";
import type { AirportGuide } from "@/content/destination-depth";

/**
 * Getting in from the airport, at a glance: one tab per airport, one line per
 * way into town (service, time, fare). Fares only where an official page gave
 * one, linked to it.
 */
export function AirportTabs({ airports }: { airports: AirportGuide[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const a = airports[active];
  return (
    <div>
      {airports.length > 1 && (
        <div role="tablist" aria-label="Airport" onKeyDown={(e) => onRovingKeyDown(e, setActive)} className="flex flex-wrap gap-2">
          {airports.map((x, i) => (
            <button
              key={x.code}
              id={`${base}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${base}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={clsx(
                "h-10 cursor-pointer rounded-full px-4 text-[0.9375rem] font-semibold transition-colors",
                i === active ? "bg-ink text-white" : "text-ink ring-1 ring-line hover:bg-mist",
              )}
            >
              {x.name}
            </button>
          ))}
        </div>
      )}
      <div id={`${base}-panel`} role={airports.length > 1 ? "tabpanel" : undefined} aria-labelledby={airports.length > 1 ? `${base}-tab-${active}` : undefined}>
      <ul className="mt-4 divide-y divide-line rounded-(--radius-card) ring-1 ring-line">
        {a.transfers.map((t) => (
          <li key={t.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3">
            <span className="font-semibold text-ink">{t.name}</span>
            <span className="text-[0.9375rem] text-ink-soft">
              {t.time ? t.time.replace(/^about /, "") : `to ${t.to}`}
              {t.fare && (
                <>
                  {" · "}
                  <a href={t.fare.source.url} target="_blank" rel="noopener" className="tabular font-semibold text-fare hover:underline">
                    {t.fare.text.replace(/ with contactless or Oyster| booked in advance/, "")}
                    <span className="sr-only"> ({t.fare.source.label}, opens in a new tab)</span>
                  </a>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
