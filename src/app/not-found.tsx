import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDots, MagnifyingGlass, MapPin, Scales } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** The departure board row: each character flips into place, left to right. */
const BOARD = [
  { label: "Flight", value: "WF404" },
  { label: "To", value: "PAGE NOT FOUND" },
  { label: "Status", value: "DEPARTED", tone: "text-sun" },
].map((cell, k, all) => ({ ...cell, start: all.slice(0, k).reduce((sum, c) => sum + c.value.length, 0) }));

const NEXT = [
  { href: "/", label: "Search flights", text: "Compare live prices, cheapest first", Icon: MagnifyingGlass },
  { href: "/fare-calendar", label: "Fare calendar", text: "The cheapest month and day to fly", Icon: CalendarDots },
  { href: "/destinations", label: "Destinations", text: "Ideas and fares for popular places", Icon: MapPin },
  { href: "/flight-delay-compensation", label: "Delay compensation", text: "Check what you’re owed for a late flight", Icon: Scales },
];

export default function NotFound() {
  return (
    <section className="bg-mist">
      <div className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* Split-flap board: decoration, so screen readers get the heading below instead. */}
          <div aria-hidden className="mx-auto inline-grid max-w-full gap-3 overflow-hidden rounded-(--radius-panel) bg-board p-4 text-left shadow-(--shadow-float) lg:grid-cols-[auto_1fr_auto] sm:gap-5 sm:p-5">
            {BOARD.map((cell) => (
              <div key={cell.label} className="min-w-0">
                <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-white/50 uppercase">{cell.label}</p>
                {/* Words wrap as a whole on narrow screens; letters never split. */}
                <p className={`mt-1.5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.9375rem] font-semibold sm:text-[1.125rem] ${cell.tone ?? "text-white"}`}>
                  {cell.value.split(" ").map((word, w, words) => {
                    const offset = cell.start + words.slice(0, w).join(" ").length + (w ? 1 : 0);
                    return (
                      <span key={w} className="flex gap-[3px]">
                        {[...word].map((ch, i) => (
                          <span key={i} className="flap grid h-7 w-5 place-items-center rounded-[4px] bg-board-tile sm:h-8 sm:w-6" style={{ "--i": offset + i } as React.CSSProperties}>
                            {ch}
                          </span>
                        ))}
                      </span>
                    );
                  })}
                </p>
              </div>
            ))}
          </div>

          <h1 className="mt-10 font-display-tight text-[2.5rem] leading-[1.05] font-extrabold text-balance text-ink md:text-[3.5rem]">This page has already departed</h1>
          <p className="mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
            The page you’re looking for has moved or never existed. Pick a new destination below, or message us on WhatsApp at{" "}
            <a href={site.phone.whatsapp} target="_blank" rel="noopener" className="tabular font-semibold text-action underline-offset-4 hover:underline">
              {site.phone.display}
            </a>
            .
          </p>
        </div>

        <nav aria-label="Where to next" className="mx-auto mt-12 max-w-4xl">
          <ul className="grid gap-3 sm:grid-cols-2">
            {NEXT.map(({ href, label, text, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center gap-4 rounded-(--radius-card) bg-white p-4 ring-1 ring-line transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-pop) active:translate-y-0"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-sun transition-colors group-hover:bg-action group-hover:text-white">
                    <Icon weight="bold" className="size-6" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">{label}</span>
                    <span className="block text-[0.9375rem] text-ink-soft">{text}</span>
                  </span>
                  <ArrowRight weight="bold" className="size-5 shrink-0 text-ink-soft transition-[translate,color] group-hover:translate-x-1 group-hover:text-action" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
