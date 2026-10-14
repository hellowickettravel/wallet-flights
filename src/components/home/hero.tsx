import Link from "next/link";
import { ArrowUpRight, Bed, Car, MapPin, Phone, Tag } from "@phosphor-icons/react/dist/ssr";
import { SearchPanel } from "@/components/search/search-panel";
import { crossSell, ownerLinks } from "@/content/cross-sell";
import { heroCopy } from "@/content/home";
import { site } from "@/content/site";
import { affiliateUrl } from "@/lib/affiliate";
import { Reveal } from "./reveal";

/** Hotels / car hire shortcut: the owner's own link when set, otherwise the interim partner. */
function partnerLink(kind: "hotels" | "cars") {
  const own = ownerLinks[kind];
  if (own) return { href: own.replace("{city}", ""), rel: "noopener" };
  const item = crossSell.find((c) => c.kind === kind)!;
  return { href: affiliateUrl(item.program, item.url("", ""), `home_hero_${kind}`), rel: "sponsored noopener" };
}

const pill =
  "relative inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-white/10 px-3.5 text-[0.875rem] font-semibold whitespace-nowrap text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:px-4 sm:text-[0.9375rem]";

/**
 * Search-first hero on a full-bleed ink band (Skyscanner-style): shortcuts to
 * the other verticals on top, then the headline, then one joined search bar.
 */
export function Hero() {
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

        <Reveal className="mt-6 md:mt-10">
          <h1 id="hero-title" className="max-w-[52rem] font-display-tight text-[2rem] leading-[1.08] font-extrabold text-balance text-white sm:text-[3rem] lg:text-[3.5rem]">
            {heroCopy.title}
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-[40rem] text-[1.0625rem] leading-relaxed text-pretty text-white/80 md:text-[1.1875rem]">
            {heroCopy.intro} <strong className="font-semibold text-white">{heroCopy.lowFares}</strong>
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-8 md:mt-10">
          <SearchPanel subId="home_hero" />
        </Reveal>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem] text-white/75">
          <Phone className="size-5 text-sun" weight="bold" aria-hidden />
          {heroCopy.phoneLead}
          <a href={site.phone.href} className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-sun">
            {heroCopy.phoneAction} <span className="tabular">{site.phone.display}</span>
          </a>
        </p>
      </div>
    </section>
  );
}
