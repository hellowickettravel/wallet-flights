import type { Metadata } from "next";
import { Suspense } from "react";
import { FlightResults } from "@/components/results/flight-results";
import { ResultsSkeleton } from "@/components/results/results-skeleton";

export const metadata: Metadata = {
  title: "Flight results",
  description: "Compare flight prices from airlines and travel sites, sorted cheapest first.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/flights" },
};

export default function FlightsPage() {
  return (
    <div className="min-h-[70dvh] bg-mist">
      <Suspense fallback={<ResultsSkeleton />}>
        <FlightResults />
      </Suspense>
    </div>
  );
}
