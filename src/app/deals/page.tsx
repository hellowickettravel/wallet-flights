import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { DealsExplorer } from "@/components/deals/deals-explorer";
import { FareBoard } from "@/components/home/fare-board";

export const metadata: Metadata = {
  title: "Flight deals",
  description: "Example round-trip fares from New York, London, Los Angeles, Manchester, Chicago and Atlanta. Pick a deal to compare live prices.",
  alternates: { canonical: "/deals" },
};

export default function DealsPage() {
  return (
    <>
      <PageHeader
        title="Flight deals from the US and UK"
        intro="Example fares to popular destinations. Filter by departure city or region, then compare live prices for your dates."
        crumbs={[{ label: "Deals", href: "/deals" }]}
      />
      <section aria-label="Deals" className="container-page mt-10 pb-18 md:mt-14 md:pb-24">
        <DealsExplorer />
      </section>
      <FareBoard />
    </>
  );
}
