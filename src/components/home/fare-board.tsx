"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import clsx from "clsx";
import { currencySymbol, fareBoardRoutes, routeBySlug, type Route } from "@/content/deals";
import { dealLink } from "@/lib/deal-links";
import type { FareMap } from "@/lib/fares";
import type { Fare } from "@/lib/travelpayouts";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$£";
const pad = (s: string, n: number) => s.padEnd(n, " ").slice(0, n);

const cols = [
  { key: "from", label: "From", width: 3, show: "lg" },
  { key: "to", label: "To", width: 3, show: "sm" },
  { key: "city", label: "Destination", width: 8, show: "all" },
  { key: "month", label: "Month", width: 3, show: "lg" },
  { key: "fare", label: "Fare", width: 4, show: "all" },
] as const;

type Row = { route: Route; city: string; fare?: Fare };
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// No fare → blank flaps: we never show a price we didn't find.
function cellText(r: Row, key: (typeof cols)[number]["key"]) {
  switch (key) {
    case "from":
      return r.route.origin.code;
    case "to":
      return r.route.destination.cityCode;
    case "city":
      return r.city;
    case "month":
      return r.fare ? MONTHS[new Date(r.fare.departureAt).getUTCMonth()] : "";
    case "fare":
      return r.fare ? `${currencySymbol(r.fare.currency)}${r.fare.price}` : "";
  }
}
const srText = (r: Row, key: (typeof cols)[number]["key"]) =>
  cellText(r, key) || (key === "fare" ? "No recent price" : key === "month" ? "Any month" : "");

/**
 * Split-flap departure board: the homepage's one signature motion moment.
 * Each character cycles through random glyphs and settles left to right,
 * row by row, once when the board scrolls into view.
 */
export function FareBoard({ fares, subPrefix = "home_board" }: { fares: FareMap; subPrefix?: string }) {
  const rows: Row[] = fareBoardRoutes.map((b) => ({ route: routeBySlug[b.route], city: b.city, fare: fares[b.route] }));
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
              Recent cheapest round trips from the US and UK, found on Aviasales. Search to compare live prices across providers.
            </p>
          </div>
          <Link
            href="/#search"
            className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-sun px-6 font-semibold text-ink transition-colors hover:bg-[#ffd666] md:self-auto"
          >
            <MagnifyingGlass className="size-5" weight="bold" aria-hidden />
            Search your route
          </Link>
        </div>

        <div ref={ref} className="relative mt-10 overflow-hidden rounded-(--radius-panel) bg-[#0c1c38] p-3 ring-1 ring-white/10 sm:p-5 md:p-6">
          <table className="w-full border-separate border-spacing-y-2">
            <caption className="sr-only">Recent cheapest round-trip fares</caption>
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
              {rows.map((r, ri) => {
                const link = dealLink(r.fare, r.route.origin.code, r.route.destination.airport, `${subPrefix}_${r.route.slug}`);
                const label = `${link.external ? "Book" : "Compare flights"} ${r.route.origin.city} to ${r.route.destination.city}${link.external ? " on Aviasales (opens in a new tab)" : ""}`;
                const arrowCls =
                  "inline-grid size-10 place-items-center rounded-full text-white/70 ring-1 ring-white/15 transition-colors group-hover:bg-white/10 group-hover:text-white hover:bg-sun hover:text-ink";
                return (
                <tr key={r.route.slug} className="group">
                  {cols.map((c) => {
                    const text = pad(cellText(r, c.key), c.width);
                    return (
                      <td key={c.key} className={clsx("w-px pr-2.5 align-middle whitespace-nowrap md:pr-6 lg:pr-8", c.show === "lg" && "hidden lg:table-cell", c.show === "sm" && "hidden sm:table-cell")}>
                        <span className="sr-only">{srText(r, c.key)}</span>
                        <span aria-hidden className="flex gap-[2px] sm:gap-[3px]">
                          {[...text].map((ch, i) => (
                            <Flap key={i} ch={glyph(ch, ri, i + (c.key === "fare" ? 14 : 0))} accent={c.key === "fare"} />
                          ))}
                        </span>
                      </td>
                    );
                  })}
                  <td className="w-full text-right align-middle">
                    {link.external ? (
                      <a href={link.href} rel="sponsored noopener" target="_blank" aria-label={label} className={arrowCls}>
                        <ArrowRight className="size-[1.125rem]" weight="bold" aria-hidden />
                      </a>
                    ) : (
                      <Link href={link.href} aria-label={label} className={arrowCls}>
                        <ArrowRight className="size-[1.125rem]" weight="bold" aria-hidden />
                      </Link>
                    )}
                  </td>
                </tr>
                );
              })}
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
