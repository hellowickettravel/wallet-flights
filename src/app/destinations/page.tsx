import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/page-header";
import { DestinationTile } from "@/components/destinations/destination-tile";
import { destinations, regions } from "@/content/destinations";
import { destinationTileFares } from "@/lib/fares";

export const metadata = pageMetadata({
  title: "Flight destinations: guides and fares",
  description:
    "Travel guides and recent flight prices for 20 popular destinations across Europe, Asia, the Middle East, Africa and the Americas.",
  path: "/destinations",
});

export default async function DestinationsPage() {
  const fares = await destinationTileFares();
  return (
    <div className="pb-18 md:pb-28">
      <PageHeader
        title="Where will you go next?"
        intro="Short guides to popular destinations, with the best time to visit and recent fares from the US and UK."
        crumbs={[{ label: "Destinations", href: "/destinations" }]}
      />
      <nav aria-label="Regions" className="container-page mt-8">
        <ul className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          {regions.map((r) => (
            <li key={r.id}>
              <a href={`#${r.id}`} className="inline-flex h-11 items-center rounded-full px-5 font-semibold whitespace-nowrap text-ink ring-1 ring-line hover:bg-mist">
                {r.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {regions.map((r, ri) => {
        const list = destinations.filter((d) => d.region === r.id);
        return (
          <section key={r.id} id={r.id} aria-labelledby={`${r.id}-title`} className="container-page mt-14 scroll-mt-24 md:mt-20">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <h2 id={`${r.id}-title`} className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
                {r.label}
              </h2>
              <span className="text-[0.9375rem] text-ink-soft">{list.length} destinations</span>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((d, i) => (
                <li key={d.slug} className={i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-1" : undefined}>
                  <DestinationTile d={d} fare={fares[d.slug]} priority={ri === 0 && i < 3} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
