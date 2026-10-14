"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { ladderExample } from "@/content/about";
const sorted = [...ladderExample.rows].sort((a, b) => a.rank - b.rank);

/**
 * The About page's one motion moment: example results arrive unsorted and
 * settle into price order once the card scrolls into view.
 */
export function PriceLadder({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const settled = inView || !!reduce;
  const rows = settled ? sorted : ladderExample.rows;
  const cheapest = sorted[0].id;

  return (
    <figure ref={ref} className={clsx("rounded-(--radius-panel) bg-white p-4 shadow-(--shadow-float) ring-1 ring-line/70 sm:p-5", className)}>
      <div className="px-1">
        <p className="font-semibold text-ink">{ladderExample.route}</p>
        <p className="text-[0.8125rem] text-ink-soft">{ladderExample.dates}</p>
      </div>
      <ol className="mt-3 space-y-2" aria-label="Example results">
        {rows.map((r) => {
          const isCheapest = settled && r.id === cheapest;
          return (
            <motion.li
              key={r.id}
              layout
              transition={{ type: "spring", stiffness: 260, damping: 30, delay: 0.15 }}
              className={clsx(
                "flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 ring-1 transition-colors duration-500",
                isCheapest ? "bg-fare/[0.07] ring-fare/40" : "ring-line",
              )}
            >
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
                  {r.label}
                  {isCheapest && <span className="rounded-full bg-fare px-2 py-0.5 text-[0.6875rem] font-semibold text-white">Cheapest</span>}
                </span>
                <span className="block truncate text-[0.8125rem] text-ink-soft">{r.detail}</span>
              </span>
              <span className="flex w-20 shrink-0 justify-end">
                <span className="sr-only">{r.rank === 1 ? "Lowest price" : `Price rank ${r.rank} of ${sorted.length}`}</span>
                <span aria-hidden className={clsx("h-2 rounded-full", isCheapest ? "bg-fare" : "bg-ink/25")} style={{ width: `${30 + (r.rank - 1) * 17.5}%` }} />
              </span>
            </motion.li>
          );
        })}
      </ol>
      <figcaption className="mt-3 px-1 text-[0.75rem] text-ink-soft">
        Illustration of how results are listed, cheapest first. Bars show relative price.
      </figcaption>
    </figure>
  );
}
