import Link from "next/link";
import { AirplaneTilt } from "@phosphor-icons/react/dist/ssr";
import { Marquee } from "@/components/ui/marquee";
import { formatPrice, type Route } from "@/content/deals";
import { heroCopy } from "@/content/home";
import type { Fare } from "@/lib/travelpayouts";

const copy = heroCopy.lowFares;

/**
 * The hero's departure-board ticker: real round trips found recently on our
 * featured routes, each linking to its route page. A sun label and a pulsing
 * dot set it apart from the intro; the strip itself is a pausable marquee.
 * Renders nothing without fare data, so it never shows a made-up price.
 */
export function FareTicker({ fares }: { fares: { route: Route; fare: Fare }[] }) {
  if (fares.length === 0) return null;
  return (
    <div data-testid="hero-from-prices">
      <div className="relative flex h-12 items-stretch rounded-full bg-board shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_10px_30px_-12px_rgb(0_0_0/0.5)] ring-1 ring-white/15">
        <p className="relative z-10 flex shrink-0 items-center gap-2.5 rounded-full bg-sun pr-4 pl-3.5 text-[0.8125rem] font-bold text-ink shadow-[6px_0_14px_-4px_rgb(0_0_0/0.45)] sm:text-[0.875rem]">
          <span className="ticker-dot" aria-hidden />
          <span className="sm:hidden">{copy.short}</span>
          <span className="hidden sm:inline">{copy.label}</span>
        </p>
        <Marquee label={copy.label} tone="dark" duration={Math.max(24, fares.length * 5)} className="-ml-6 min-w-0 flex-1 pr-12">
          {fares.map(({ route, fare }) => {
            const price = formatPrice(fare.price, fare.currency);
            return (
              <Link
                key={route.slug}
                href={`/routes/${route.slug}`}
                aria-label={copy.item(route.origin.city, route.destination.city, price)}
                className="group flex h-12 shrink-0 items-center gap-2 pr-2 pl-8 text-[0.9375rem] whitespace-nowrap"
              >
                <span className="font-medium text-white/75 transition-colors group-hover:text-white">{route.origin.city}</span>
                <AirplaneTilt weight="fill" className="size-4 rotate-45 text-sun transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                <span className="font-semibold text-white underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-sun">
                  {route.destination.city}
                </span>
                <span className="tabular ml-1 rounded-full bg-sun/12 px-2.5 py-0.5 font-bold text-sun ring-1 ring-sun/35 transition-colors group-hover:bg-sun group-hover:text-ink">
                  {price}
                </span>
              </Link>
            );
          })}
        </Marquee>
      </div>
      <p className="mt-2 px-1 text-[0.8125rem] text-white/60">
        <span className="sm:hidden">{copy.noteShort}</span>
        <span className="hidden sm:inline">{copy.note}</span>
      </p>
    </div>
  );
}
