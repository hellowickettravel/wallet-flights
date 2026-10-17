import type { Metadata } from "next";
import { Suspense } from "react";
import { PriceAlertAction } from "@/components/fare-calendar/price-alert-action";
import { priceAlertCopy } from "@/content/fare-calendar";

export const metadata: Metadata = {
  title: priceAlertCopy.stop.metaTitle,
  robots: { index: false, follow: false },
};

/** Where every price alert email's stop link goes (/price-alerts/stop?t=…). */
export default function PriceAlertStopPage() {
  return (
    <div className="min-h-[70dvh] bg-mist px-5 py-12 md:py-20">
      <Suspense fallback={<div className="skeleton mx-auto h-80 max-w-lg rounded-(--radius-frame)" />}>
        <PriceAlertAction mode="stop" />
      </Suspense>
    </div>
  );
}
