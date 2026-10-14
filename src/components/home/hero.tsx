import Link from "next/link";
import { ArrowUpRight, Bed, Car, MapPin, Tag } from "@phosphor-icons/react/dist/ssr";
import { SearchPanel } from "@/components/search/search-panel";
import { crossSell, ownerLinks } from "@/content/cross-sell";
import { heroCopy } from "@/content/home";
import { affiliateUrl } from "@/lib/affiliate";
import { Reveal } from "./reveal";

/** Hotels / car hire shortcut: the owner's own link when set, otherwise the interim partner. */
function partnerHref(kind: "hotels" | "cars") {
  const own = ownerLinks[kind];
  if (own) return own.replace("{city}", "");
  const item = crossSell.find((c) => c.kind === kind)!;
  return affiliateUrl(item.program, item.url("", ""), `home_hero_${kind}`);
}

const pill =
  "inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-[0.9375rem] font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/20";

/**
 * Search-first hero on a full-bleed ink band (Skyscanner-style): headline,
 * trip type, one joined search bar, then shortcuts to the other verticals.
 */
export function Hero() {
  return (
    <section id="search" aria-labelledby="hero-title" className="bg-ink">
      <div className="container-page pt-10 pb-12 md:pt-16 md:pb-16 lg:pt-20 lg:pb-20">
        <Reveal>
          <h1 id="hero-title" className="max-w-[46rem] font-display-tight text-[2.5rem] leading-[1.04] font-extrabold text-balance text-white sm:text-[3.5rem] lg:text-[4rem]">
            {heroCopy.title}
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-[40rem] text-[1.0625rem] leading-relaxed text-pretty text-white/80 md:text-[1.1875rem]">{heroCopy.intro}</p>
        </Reveal>

        <Reveal delay={0.16} className="mt-8 md:mt-10">
          <SearchPanel subId="home_hero" />
        </Reveal>

        <nav aria-label="More ways to plan" className="mt-6 md:mt-8">
          <ul className="flex flex-wrap gap-2.5">
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
              <a href={partnerHref("hotels")} rel="sponsored noopener" target="_blank" className={pill}>
                <Bed className="size-[1.125rem] text-sun" weight="bold" aria-hidden />
                Hotels
                <ArrowUpRight className="size-3.5 text-white/60" weight="bold" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={partnerHref("cars")} rel="sponsored noopener" target="_blank" className={pill}>
                <Car className="size-[1.125rem] text-sun" weight="bold" aria-hidden />
                Car hire
                <ArrowUpRight className="size-3.5 text-white/60" weight="bold" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
