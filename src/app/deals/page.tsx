import { itemList, jsonLdHtml, webPage } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/page-header";
import { DealsExplorer } from "@/components/deals/deals-explorer";
import { FareBoard } from "@/components/home/fare-board";
import Link from "next/link";
import { origins, routes, routesByOrigin } from "@/content/deals";
import { routeFares } from "@/lib/fares";

const description =
  "Recent cheapest round-trip fares from New York, London, Los Angeles, Manchester, Chicago and Atlanta. Pick a deal to book or compare live prices.";

export const metadata = pageMetadata({
  title: "Cheap flight deals from the US and UK",
  description,
  path: "/deals",
});

const jsonLd = webPage("CollectionPage", "/deals", "Flight deals from the US and UK", description, {
  mainEntity: itemList(routes.map((r) => ({ name: `Flights from ${r.origin.city} to ${r.destination.city}`, path: `/routes/${r.slug}` }))),
});

export default async function DealsPage() {
  const fares = await routeFares();
  return (
    <>
      <PageHeader
        title="Flight deals from the US and UK"
        intro="The cheapest round trips travellers found recently to popular destinations. Filter by departure city or region, then book or compare live prices for your dates."
        crumbs={[{ label: "Deals", href: "/deals" }]}
      />
      <section aria-label="Deals" className="container-page mt-10 pb-18 md:mt-14 md:pb-24">
        <DealsExplorer fares={fares} />
      </section>
      {Object.keys(fares).length > 0 && <FareBoard fares={fares} subPrefix="deals_board" />}
      <section aria-labelledby="route-guides" className="border-t border-line py-14 md:py-20">
        <div className="container-page">
          <h2 id="route-guides" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
            Flight routes by departure city
          </h2>
          <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {origins.map((o) => (
              <div key={o.code}>
                <h3 className="font-semibold text-ink">From {o.city}</h3>
                <ul className="mt-3 space-y-2">
                  {routesByOrigin[o.code].map((r) => (
                    <li key={r.slug}>
                      <Link href={`/routes/${r.slug}`} className="text-ink-soft underline decoration-line underline-offset-4 hover:text-action">
                        {o.city} to {r.destination.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
    </>
  );
}
