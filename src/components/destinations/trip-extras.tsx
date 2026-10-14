import { ArrowUpRight, Bed, Car, SimCard, Taxi, Ticket } from "@phosphor-icons/react/dist/ssr";
import { programs } from "@/content/affiliates";
import { crossSell, esimCountry, ownerLinks, ownerSite, type CrossSellKind } from "@/content/cross-sell";
import { affiliateUrl } from "@/lib/affiliate";

const icons: Record<CrossSellKind, typeof Bed> = { hotels: Bed, cars: Car, transfers: Taxi, esim: SimCard, attractions: Ticket };

function hrefFor(kind: CrossSellKind, url: string, program: keyof typeof programs, city: string, subId: string) {
  const own = kind === "hotels" ? ownerLinks.hotels : kind === "cars" ? ownerLinks.cars : null;
  if (own) return { href: own.replace("{city}", encodeURIComponent(city)), partner: ownerSite.name, rel: "noopener" };
  return { href: affiliateUrl(program, url, subId), partner: programs[program].name, rel: "sponsored noopener" };
}

/** "Plan the rest of your trip": hotels, cars, transfers, eSIM and tickets for one city. */
export function TripExtras({ slug, city, subPrefix }: { slug: string; city: string; subPrefix: string }) {
  const country = esimCountry[slug];
  return (
    <section aria-labelledby="extras-title" className="border-t border-line py-14 md:py-20">
      <div className="container-page">
        <h2 id="extras-title" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
          Plan the rest of your trip to {city}
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">Our partners for the rest of the journey. You book and pay with them directly.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {crossSell
            .filter((c) => c.kind !== "esim" || country)
            .map((c) => {
              const Icon = icons[c.kind];
              const { href, partner, rel } = hrefFor(c.kind, c.url(city, country), c.program, city, `${subPrefix}_${c.kind}`);
              return (
                <li key={c.kind}>
                  <a
                    href={href}
                    rel={rel}
                    target="_blank"
                    data-sub={`${subPrefix}_${c.kind}`}
                    className="group flex h-full flex-col rounded-(--radius-card) p-5 ring-1 ring-line transition-colors hover:bg-mist hover:ring-ink/20"
                  >
                    <Icon className="size-7 text-action" weight="duotone" aria-hidden />
                    <span className="mt-4 font-semibold text-ink">{c.title}</span>
                    <span className="mt-1 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{c.text}</span>
                    <span className="mt-4 inline-flex items-center gap-1 text-[0.9375rem] font-semibold text-action group-hover:underline">
                      {c.cta}
                      <ArrowUpRight className="size-4" weight="bold" aria-hidden />
                    </span>
                    {partner && <span className="mt-1 text-[0.8125rem] text-ink-soft">with {partner}</span>}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
