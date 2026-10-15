import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ResultsSkeleton } from "@/components/results/results-skeleton";
import { WhiteLabel } from "@/components/flights/white-label";
import { demoResults } from "@/lib/flags";

// Demo-only results UI: loaded only when demo mode is on, so the live site
// doesn't ship it (about 30 KB of unused JavaScript on /flights).
const FlightResults = dynamic(() => import("@/components/results/flight-results").then((m) => m.FlightResults));

export const metadata = pageMetadata({
  title: "Compare flight prices",
  description:
    "Compare live flight prices from airlines and travel sites, sorted cheapest first.",
  path: "/flights",
  robots: { index: false, follow: true },
});

export default function FlightsPage() {
  if (demoResults) {
    return (
      <div className="min-h-[70dvh] bg-mist">
        <Suspense fallback={<ResultsSkeleton />}>
          <FlightResults />
        </Suspense>
      </div>
    );
  }
  return (
    <div className="min-h-[70dvh] bg-mist">
      <div className="container-page py-8 md:py-12">
        <h1 className="font-display-tight text-[2rem] leading-tight font-extrabold text-ink md:text-[2.75rem]">Compare live flight prices</h1>
        <p className="mt-2 max-w-2xl text-pretty text-[1.0625rem] text-ink-soft">
          Prices from airlines and travel sites, cheapest first. You book and pay with the provider you choose.
        </p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <WhiteLabel />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
