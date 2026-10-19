"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import clsx from "clsx";
import { fareBoardRoutes, routeBySlug, type Route } from "@/content/deals";
import { formatMoney, moneySymbol, type DisplayCurrency } from "@/lib/currency";
import { useDisplayCurrency, useToDisplay } from "@/components/currency/currency-provider";
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

type Row = { route: Route; city: string; fare?: Fare; fareText: string; fareFull: string };
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
      return r.fareText;
  }
}
/** A board-length number: "247", "1240", "113K", "3.5M" (at most four characters). */
function compact(n: number) {
  if (n < 10_000) return String(Math.round(n));
  if (n < 999_500) return `${Math.round(n / 1000)}K`;
  const m = n / 1_000_000;
  return `${m < 9.95 ? m.toFixed(1).replace(/\.0$/, "") : Math.round(m)}M`;
}
/** One-character symbols ride on the tiles ("£247", "₹21K"); longer ones ("PKR", "CA$") go in the column header. */
const tileSymbol = (c: DisplayCurrency) => {
  const sym = moneySymbol(c);
  return [...sym].length === 1 ? sym : "";
};
// Screen readers get the full price ("Rs 68,600"), not the board's short form.
const srText = (r: Row, key: (typeof cols)[number]["key"]) =>
  (key === "fare" ? r.fareFull : cellText(r, key)) || (key === "fare" ? "No recent price" : key === "month" ? "Any month" : "");

/**
 * Split-flap departure board: the homepage's one signature motion moment.
 * Each character cycles through random glyphs and settles left to right,
 * row by row, once when the board scrolls into view.
 */
export function FareBoard({ fares, subPrefix = "home_board" }: { fares: FareMap; subPrefix?: string }) {
  const shown = useDisplayCurrency();
  const toDisplay = useToDisplay();
  const rows: Row[] = fareBoardRoutes.map((b) => {
    const fare = fares[b.route];
    const v = fare && toDisplay(fare.price, fare.currency);
    return { route: routeBySlug[b.route], city: b.city, fare, fareText: v ? `${tileSymbol(v.currency)}${compact(v.amount)}` : "", fareFull: v ? formatMoney(v.amount, v.currency) : "" };
  });
  // Four tiles fit "£247"; at most five ("₹113K"), so the board still fits a 320px phone.
  const fareWidth = Math.max(4, ...rows.map((r) => [...r.fareText].length));
  // Prices shown in a currency whose symbol is longer than a tile: name it once, in the header.
  const headerCode = shown && !tileSymbol(shown) ? shown : null;
  const ref = useRef<HTMLDivElement>(null);

  // The server HTML holds the final characters. The animation writes glyphs
  // straight into the tiles on animation frames and flips them with the Web
  // Animations API, so React never re-renders (it used to re-render the whole
  // board 46 times: about 2 s of main-thread work on a mid-range phone).
  useEffect(() => {
    const board = ref.current;
    if (!board || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiles = [...board.querySelectorAll<HTMLElement>("[data-flap]")].map((el) => ({
      el,
      target: el.dataset.flap!,
      settleAt: 8 + Number(el.dataset.row) * 4 + Number(el.dataset.index) * 1.2,
      seed: Number(el.dataset.index) * 13 + Number(el.dataset.row) * 5,
    }));
    let raf = 0;
    const run = () => {
      let tick = 0;
      let last = 0;
      const step = (now: number) => {
        if (now - last >= 55) {
          last = now;
          tick += 1;
          for (const t of tiles) {
            if (t.target === " ") continue;
            const next = tick > 46 || tick >= t.settleAt ? t.target : GLYPHS[(tick * 7 + t.seed) % GLYPHS.length];
            if (t.el.textContent === next) continue;
            t.el.textContent = next;
            t.el.animate([{ transform: "rotateX(-80deg)", opacity: 0.4 }, { transform: "none", opacity: 1 }], { duration: 90, easing: "ease-out" });
          }
          if (tick > 46) return;
        }
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0.35 },
    );
    io.observe(board);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // A new currency means new tiles: flip them in again.
  }, [shown, toDisplay]);

  return (
    <section aria-labelledby="board-title" className="bg-board py-18 text-white md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="board-title" className="font-display-tight text-[2rem] leading-[1.08] font-bold md:text-[2.75rem]">
              Departures worth a look
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/75">
              Recent cheapest round trips from the US and UK. Search to compare live prices across providers.
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
                    {c.key === "fare" && headerCode ? `${c.label} (${headerCode})` : c.label}
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
                const label = `${link.external ? "Book" : "Compare flights"} ${r.route.origin.city} to ${r.route.destination.city}${link.external ? " (opens in a new tab)" : ""}`;
                const arrowCls =
                  "inline-grid size-10 place-items-center rounded-full text-white/70 ring-1 ring-white/15 transition-colors group-hover:bg-white/10 group-hover:text-white hover:bg-sun hover:text-ink";
                return (
                <tr key={r.route.slug} className="group">
                  {cols.map((c) => {
                    const text = pad(cellText(r, c.key), c.key === "fare" ? fareWidth : c.width);
                    return (
                      <td key={c.key} className={clsx("w-px pr-1.5 align-middle whitespace-nowrap min-[360px]:pr-2.5 md:pr-6 lg:pr-8", c.show === "lg" && "hidden lg:table-cell", c.show === "sm" && "hidden sm:table-cell")}>
                        <span className="sr-only">{srText(r, c.key)}</span>
                        <span aria-hidden data-nosnippet className="flex gap-[2px] sm:gap-[3px]">
                          {[...text].map((ch, i) => (
                            <Flap key={i} ch={ch} row={ri} index={i + (c.key === "fare" ? 14 : 0)} accent={c.key === "fare"} />
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

function Flap({ ch, row, index, accent }: { ch: string; row: number; index: number; accent?: boolean }) {
  return (
    // Fixed-size tile with contained layout: changing its glyph never reflows the table.
    <span className="relative grid [contain:layout_paint] h-[clamp(1.6rem,4.6vw,2.6rem)] w-[clamp(0.9375rem,3.3vw,1.85rem)] min-[360px]:w-[clamp(1.05rem,3.3vw,1.85rem)] place-items-center overflow-hidden rounded-[4px] bg-board-tile font-mono text-[clamp(0.875rem,2.6vw,1.5rem)] font-semibold shadow-[inset_0_-1px_0_rgb(0_0_0/0.35)] [perspective:200px]">
      <span data-flap={ch} data-row={row} data-index={index} className={clsx("inline-block origin-top", accent ? "text-sun" : "text-white")}>
        {ch === " " ? " " : ch}
      </span>
      {/* the hinge line across the middle of a split-flap tile */}
      <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/45" />
    </span>
  );
}
