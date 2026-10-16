import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { destinations } from "@/content/destinations";
import { guidesDestinations } from "@/content/guides";

/** Links to destination guides: a scroll row of photo tiles on a mist band. */
export function DestinationBand() {
  const list = guidesDestinations.slugs.map((s) => destinations.find((d) => d.slug === s)).filter((d) => !!d);
  return (
    <section aria-labelledby="dest-band-title" className="mt-16 bg-mist py-14 md:mt-24 md:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="dest-band-title" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
              {guidesDestinations.title}
            </h2>
            <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink-soft">{guidesDestinations.intro}</p>
          </div>
          <Link href="/destinations" className="font-semibold text-action underline-offset-4 hover:underline">
            {guidesDestinations.all}
          </Link>
        </div>
        <ul className="scrollbar-none -mx-5 mt-8 flex snap-x scroll-px-5 gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:px-0 lg:grid-cols-6">
          {list.map((d) => (
            <li key={d.slug} className="w-40 shrink-0 snap-start md:w-auto">
              <Link href={`/destinations/${d.slug}`} className="group block rounded-(--radius-card)">
                <div className="relative aspect-[4/5] overflow-hidden rounded-(--radius-card)">
                  <SmartImage photo={d.photo} sizes="(min-width: 1024px) 200px, 160px" imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.05]" />
                </div>
                <p className="mt-3 font-semibold text-ink group-hover:text-action">{d.city}</p>
                <p className="text-[0.875rem] text-ink-soft">{d.country}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
