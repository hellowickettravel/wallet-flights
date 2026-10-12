"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import clsx from "clsx";
import { fareBoard } from "@/content/deals";
import { site } from "@/content/site";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$";
const pad = (s: string, n: number) => s.padEnd(n, " ").slice(0, n);

const cols = [
  { key: "from", label: "From", width: 3, show: "lg" },
  { key: "to", label: "To", width: 3, show: "sm" },
  { key: "city", label: "Destination", width: 8, show: "all" },
  { key: "month", label: "Month", width: 3, show: "lg" },
  { key: "fare", label: "Fare", width: 4, show: "all" },
] as const;

type Row = (typeof fareBoard)[number];
const cellText = (r: Row, key: (typeof cols)[number]["key"]) =>
  key === "fare" ? `$${r.fare}` : (r[key] as string);

/**
 * Split-flap departure board: the homepage's one signature motion moment.
 * Each character cycles through random glyphs and settles left to right,
 * row by row, once when the board scrolls into view.
 */
export function FareBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [tick, setTick] = useState<number | null>(null); // null = settled

  useEffect(() => {
    if (!inView || reduce) return;
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      if (frame > 46) {
        window.clearInterval(id);
        setTick(null);
      } else setTick(frame);
    }, 55);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  function glyph(target: string, row: number, index: number) {
    if (tick === null || target === " ") return target;
    const settleAt = 8 + row * 4 + index * 1.2;
    if (tick >= settleAt) return target;
    return GLYPHS[(tick * 7 + index * 13 + row * 5) % GLYPHS.length];
  }

  return (
    <section aria-labelledby="board-title" className="bg-board py-18 text-white md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="board-title" className="font-display-tight text-[2rem] leading-[1.08] font-bold md:text-[2.75rem]">
              Departures worth a look
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/75">
              Sample round-trip fares to show what’s possible. Live prices are confirmed when you search or call.
            </p>
          </div>
          <a
            href={site.phone.href}
            className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-sun px-6 font-semibold text-ink transition-colors hover:bg-[#ffd666] md:self-auto"
          >
            Call to book <span className="tabular">{site.phone.display}</span>
          </a>
        </div>

        <div ref={ref} className="relative mt-10 overflow-hidden rounded-(--radius-panel) bg-[#0c1c38] p-3 ring-1 ring-white/10 sm:p-5 md:p-6">
          <table className="w-full border-separate border-spacing-y-2">
            <caption className="sr-only">Sample round-trip fares</caption>
            <thead>
              <tr>
                {cols.map((c) => (
                  <th
                    key={c.key}
                    scope="col"
                    className={clsx(
                      "w-px pb-2 pl-1 text-left font-mono whitespace-nowrap text-[0.6875rem] font-medium tracking-[0.14em] text-sun/80 uppercase",
                      c.show === "lg" && "hidden lg:table-cell", c.show === "sm" && "hidden sm:table-cell",
                    )}
                  >
                    {c.label}
                  </th>
                ))}
                <th scope="col" className="w-full">
                  <span className="sr-only">
                  Search</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {fareBoard.map((r, ri) => (
                <tr key={`${r.from}-${r.to}`} className="group">
                  {cols.map((c) => {
                    const text = pad(cellText(r, c.key), c.width);
                    return (
                      <td key={c.key} className={clsx("w-px pr-2.5 align-middle whitespace-nowrap md:pr-6 lg:pr-8", c.show === "lg" && "hidden lg:table-cell", c.show === "sm" && "hidden sm:table-cell")}>
                        <span className="sr-only">{cellText(r, c.key)}</span>
                        <span aria-hidden className="flex gap-[2px] sm:gap-[3px]">
                          {[...text].map((ch, i) => (
                            <Flap key={i} ch={glyph(ch, ri, i + (c.key === "fare" ? 14 : 0))} accent={c.key === "fare"} />
                          ))}
                        </span>
                      </td>
                    );
                  })}
                  <td className="w-full text-right align-middle">
                    <Link
                      href={`/flights?trip=round&from0=${r.from}&to0=${r.to}`}
                      aria-label={`Search flights ${r.from} to ${r.to}`}
                      className="inline-grid size-10 place-items-center rounded-full text-white/70 ring-1 ring-white/15 transition-colors group-hover:bg-white/10 group-hover:text-white hover:bg-sun hover:text-ink"
                    >
                      <ArrowRight className="size-[1.125rem]" weight="bold" aria-hidden />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Flap({ ch, accent }: { ch: string; accent?: boolean }) {
  return (
    <span className="relative grid h-[clamp(1.6rem,4.6vw,2.6rem)] w-[clamp(1.05rem,3.3vw,1.85rem)] place-items-center overflow-hidden rounded-[4px] bg-board-tile font-mono text-[clamp(0.875rem,2.6vw,1.5rem)] font-semibold shadow-[inset_0_-1px_0_rgb(0_0_0/0.35)] [perspective:200px]">
      <span key={ch} className={clsx("flap-in", accent ? "text-sun" : "text-white")}>
        {ch === " " ? " " : ch}
      </span>
      {/* the hinge line across the middle of a split-flap tile */}
      <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/45" />
    </span>
  );
}
