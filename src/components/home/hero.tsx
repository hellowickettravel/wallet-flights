import Link from "next/link";
import { ArrowUpRight, Bed, Car, MapPin, Tag, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { SearchPanel } from "@/components/search/search-panel";
import { crossSell, ownerLinks, ownerSite } from "@/content/cross-sell";
import type { Route } from "@/content/deals";
import type { Fare } from "@/lib/travelpayouts";
import { heroCopy } from "@/content/home";
import { site } from "@/content/site";
import { TrustpilotStar } from "@/components/ui/trustpilot-star";
import { affiliateUrl } from "@/lib/affiliate";
import { FareTicker } from "./fare-ticker";
import { Reveal } from "./reveal";

/** Hotels / car hire shortcut: the owner's own link when set, otherwise the interim partner. */
function partnerLink(kind: "hotels" | "cars") {
  const own = ownerLinks[kind];
  if (own) return { href: own.replace("{city}", ""), rel: "noopener" };
  const item = crossSell.find((c) => c.kind === kind)!;
  return { href: affiliateUrl(item.program, item.url("", ""), `home_hero_${kind}`), rel: "sponsored noopener" };
}

const pill =
  "relative inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-[0.875rem] font-semibold whitespace-nowrap border border-white text-white transition-colors hover:bg-white/12 sm:px-4 sm:text-[0.9375rem]";

/**
 * Search-first hero on a full-bleed ink band (Skyscanner-style): shortcuts to
 * the other verticals on top, then the headline, then one joined search bar.
 */
export function Hero({ lowFares = [] }: { lowFares?: { route: Route; fare: Fare }[] }) {
  return (
    <section id="search" aria-labelledby="hero-title" className="relative z-10 bg-ink">
      <div className="container-page pt-6 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20">
        {/* One row; on narrow phones it scrolls sideways instead of wrapping. */}
        <nav aria-label="More ways to plan" className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-2 sm:gap-2.5">
            <li>
              <Link href="/deals" className={pill}>
                <Tag className="size-[1.125rem] text-sun" weight="bold" aria-hidden />
                Flight deals
              </Link>
            </li>
            <li>
              <Link href="/destinations" className={pill}>
                <MapPin className="size-[1.125rem] text-sun" weight="bold" aria-hidden />
                Destinations
              </Link>
            </li>
            <li>
              <a {...partnerLink("hotels")} target="_blank" className={pill}>
                <Bed className="size-[1.125rem] text-sun" weight="bold" aria-hidden />
                Hotels
                <ArrowUpRight className="size-3.5 text-white/60" weight="bold" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a {...partnerLink("cars")} target="_blank" className={pill}>
                <Car className="size-[1.125rem] text-sun" weight="bold" aria-hidden />
                Car hire
                <ArrowUpRight className="size-3.5 text-white/60" weight="bold" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <Reveal text className="mt-6 md:mt-10">
          {/* One line from lg up (owner's request); the size follows the viewport so it always fits. */}
          <h1 id="hero-title" className="max-w-[40rem] font-display-tight text-[1.875rem] leading-[1.1] font-extrabold text-balance text-white sm:text-[2.375rem] lg:max-w-none lg:text-[clamp(1.75rem,2.7vw,2.25rem)] lg:tracking-[-0.008em] lg:whitespace-nowrap lg:[font-variation-settings:'opsz'_36]">
            {heroCopy.title}
          </h1>
        </Reveal>
        <Reveal text delay={0.08} className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <p className="max-w-[40rem] text-[1.0625rem] leading-relaxed text-pretty text-white/80 md:text-[1.1875rem]">
            {heroCopy.intro}
          </p>
          <a
            href={site.trustpilot}
            target="_blank"
            rel="noopener"
            className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full bg-white pr-4 pl-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-mist lg:self-auto"
          >
            <TrustpilotStar className="size-5" />
            <span>
              Review us on <span className="font-bold">Trustpilot</span>
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </Reveal>

        {lowFares.length > 0 && (
          <Reveal delay={0.12} className="mt-6 md:mt-8">
            <FareTicker fares={lowFares} />
          </Reveal>
        )}

        <Reveal delay={0.16} className="mt-8 md:mt-10">
          <SearchPanel subId="home_hero" />
        </Reveal>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem] text-white/75">
          <WhatsappLogo className="size-5 text-sun" weight="bold" aria-hidden />
          {heroCopy.phoneLead}
          <a
            href={site.phone.whatsapp}
            target="_blank"
            rel="noopener"
            className="inline-block py-0.5 font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-sun"
          >
            {heroCopy.phoneAction} <span className="tabular">{site.phone.display}</span>
            <span className="sr-only"> (opens WhatsApp)</span>
          </a>
        </p>
        {(ownerLinks.hotels || ownerLinks.cars) && <p className="mt-2 text-[0.875rem] text-white/60">{heroCopy.sisterNote(ownerSite.name)}</p>}
      </div>
    </section>
  );
}
