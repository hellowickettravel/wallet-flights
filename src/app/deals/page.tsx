import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { DealsExplorer } from "@/components/deals/deals-explorer";
import { FareBoard } from "@/components/home/fare-board";
import { routeFares } from "@/lib/fares";

export const metadata: Metadata = {
  title: "Flight deals",
  description: "Recent cheapest round-trip fares from New York, London, Los Angeles, Manchester, Chicago and Atlanta. Pick a deal to book or compare live prices.",
  alternates: { canonical: "/deals" },
};

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
      <FareBoard fares={fares} subPrefix="deals_board" />
    </>
  );
}
