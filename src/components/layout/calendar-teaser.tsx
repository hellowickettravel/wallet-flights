"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Airplane, ArrowRight, CalendarDots, CaretRight, Storefront, TrendDown, X } from "@phosphor-icons/react";
import type { CalendarStart } from "@/app/api/fare-calendar/start/route";
import { SmartImage } from "@/components/ui/smart-image";

import { fareCalendarCopy, teaserCopy as copy } from "@/content/fare-calendar";
import { photos } from "@/content/images";
import { useMoney } from "@/components/currency/currency-provider";

/**
 * The flight path, in the card's own coordinates (22rem wide): up from below
 * the screen at the bottom left, along the card's top edge, unrolling it like
 * a banner, then away to the top right. The plane and its dashed trail share it.
 */
const PATH = "M -120 520 C -80 280, -30 60, 30 6 C 110 -26, 250 -2, 330 -18 C 390 -30, 440 -90, 520 -170";

const pointIcons = [CalendarDots, TrendDown, Storefront];

/**
 * The fare calendar suggestion: a clean white card with the calendar's photo,
 * in solid colours only. A little plane flies in from the bottom left on a
 * dashed route line and tows the card open. It's a complementary region, not
 * a dialog: it never takes focus or blocks the page. Escape (when focus is
 * inside) or the close button folds it away. With reduced motion it simply
 * fades in.
 */
export function CalendarTeaser({ start, onClose }: { start: CalendarStart | null; onClose: () => void }) {
  const money = useMoney();
  const titleId = useId();
  const maskId = useId();
  const [leaving, setLeaving] = useState(false);
  const routes = start?.from ? start.destinations.slice(0, 3) : [];
  const from = start?.from?.code;
  const calendarHref = from ? `/fare-calendar?from=${from}` : "/fare-calendar";

  const close = () => setLeaving(true);

  useEffect(() => {
    if (!leaving) return;
    // After the fold-away animation (instant with reduced motion).
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(onClose, reduced ? 0 : 320);
    return () => clearTimeout(t);
  }, [leaving, onClose]);

  const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

  return (
    <aside
      aria-labelledby={titleId}
      data-leaving={leaving || undefined}
      data-testid="calendar-teaser"
      onKeyDown={(e) => e.key === "Escape" && close()}
      className="teaser fixed bottom-3 left-3 z-50 w-[min(22rem,calc(100vw-1.5rem))] sm:bottom-6 sm:left-6"
    >
      {/* The route line and the plane fly ahead of the card; both are decoration. */}
      <svg className="teaser-trail pointer-events-none absolute top-0 left-0 overflow-visible" width="1" height="1" aria-hidden>
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="-200" y="-300" width="900" height="800">
            <path d={PATH} pathLength={1} className="teaser-trail-draw" fill="none" stroke="#fff" strokeWidth="8" />
          </mask>
        </defs>
        <path d={PATH} fill="none" stroke="var(--color-action)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 8" mask={`url(#${maskId})`} />
      </svg>
      <span
        style={{ offsetPath: `path("${PATH}")` }}
        className="teaser-plane pointer-events-none absolute top-0 left-0 grid size-11 place-items-center rounded-full bg-white text-action shadow-(--shadow-pop) ring-1 ring-line"
        aria-hidden
      >
        <Airplane weight="fill" className="size-6 rotate-90" />
      </span>

      <div className="teaser-card relative rounded-(--radius-panel) bg-white p-4 shadow-(--shadow-pop) ring-1 ring-ink/12 sm:p-5">
        <button
          type="button"
          onClick={close}
          aria-label={copy.close}
          className="absolute top-2.5 right-2.5 grid size-9 cursor-pointer place-items-center rounded-full text-ink-soft transition-[background-color,color,scale] hover:bg-mist hover:text-ink active:scale-90"
        >
          <X weight="bold" className="size-[1.125rem]" aria-hidden />
        </button>

        {/* Photo, badge and title side by side: compact enough for a phone. */}
        <div className="flex items-center gap-4 pr-8">
          <div className="teaser-in relative size-[4.5rem] shrink-0 overflow-hidden rounded-2xl sm:size-20" style={step(0)}>
            <SmartImage photo={photos.fareCalendar} sizes="80px" />
          </div>
          <div className="min-w-0">
            <p className="teaser-in inline-flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-1 text-[0.75rem] font-semibold text-action" style={step(1)}>
              <CalendarDots weight="bold" className="size-3.5" aria-hidden />
              {copy.badge}
            </p>
            <h2 id={titleId} className="teaser-in mt-1.5 font-display-tight text-[1.125rem] leading-[1.2] font-extrabold text-balance text-ink" style={step(2)}>
              {copy.title}
            </h2>
          </div>
        </div>

        {routes.length > 0 ? (
          <div className="teaser-in mt-4" style={step(3)}>
            <p className="text-[0.8125rem] text-ink-soft">{copy.routesLead(start!.from!.city)}</p>
            <ul className="mt-1.5 divide-y divide-line rounded-xl bg-mist px-3">
              {routes.map((r) => {
                const price = money(r.price, start!.currency);
                return (
                  <li key={r.to.code} className="nth-3:hidden sm:nth-3:block">
                    <Link
                      href={`/fare-calendar?from=${from}&to=${r.to.code}`}
                      onClick={close}
                      aria-label={copy.route(r.to.city, price)}
                      className="group flex h-11 items-center gap-2 text-[0.9375rem]"
                    >
                      <span className="min-w-0 flex-1 truncate font-semibold text-ink transition-colors group-hover:text-action">{r.to.city}</span>
                      <span className="text-[0.8125rem] text-ink-soft">from</span>
                      <span className="tabular font-bold text-fare">{price}</span>
                      <CaretRight weight="bold" className="size-3.5 text-ink-soft transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <ul className="teaser-in mt-4 grid gap-2" style={step(3)}>
            {fareCalendarCopy.points.map((label, i) => {
              const Icon = pointIcons[i];
              return (
                <li key={label} className="flex items-center gap-3 text-[0.9375rem] text-ink">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-mist text-action">
                    <Icon weight="bold" className="size-4" aria-hidden />
                  </span>
                  {label}
                </li>
              );
            })}
          </ul>
        )}

        <Link
          href={calendarHref}
          onClick={close}
          className="teaser-in group mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-action font-semibold text-white transition-[background-color,scale] hover:bg-action-deep active:scale-[0.98]"
          style={step(4)}
        >
          {copy.cta}
          <ArrowRight weight="bold" className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
