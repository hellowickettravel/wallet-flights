import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { routeOrigins, routePages, routePagesByOrigin } from "@/content/deals";
import { routesHub } from "@/content/routes-hub";
import { itemList, jsonLdHtml, webPage } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: routesHub.seoTitle, description: routesHub.description, path: "/routes" });

const jsonLd = webPage("CollectionPage", "/routes", routesHub.title, routesHub.description, {
  mainEntity: itemList(routePages.map((r) => ({ name: `Flights from ${r.origin.city} to ${r.destination.city}`, path: `/routes/${r.slug}` }))),
});

export default function RoutesHubPage() {
  return (
    <>
      <PageHeader title={routesHub.title} intro={routesHub.intro} crumbs={[{ label: "Routes", href: "/routes" }]} />
      <div className="container-page grid gap-x-8 gap-y-12 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-3">
        {routeOrigins.filter((o) => routePagesByOrigin[o.code].length > 0).map((o) => {
          const list = [...routePagesByOrigin[o.code]].sort((a, b) => a.destination.city.localeCompare(b.destination.city));
          return (
            <section key={o.code} aria-labelledby={`from-${o.slug}`}>
              <h2 id={`from-${o.slug}`} className="font-display-tight text-[1.5rem] font-bold text-ink">
                {routesHub.byCity(o.city)}
              </h2>
              <p className="mt-1 text-[0.875rem] text-ink-soft">{routesHub.count(list.length)}</p>
              <ul className="mt-4 space-y-2">
                {list.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/routes/${r.slug}`} className="text-ink underline decoration-line underline-offset-4 hover:text-action">
                      {o.city} to {r.destination.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <p className="container-page pb-16">
        <Link href="/destinations" className="font-semibold text-action underline-offset-4 hover:underline">
          {routesHub.destinationsLink}
        </Link>
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
    </>
  );
}
