import type { Metadata } from "next";
import { Suspense } from "react";
import { FareAlertConfirm } from "@/components/home/fare-alert-confirm";
import { fareAlertsCopy } from "@/content/home";

export const metadata: Metadata = {
  title: fareAlertsCopy.confirm.title,
  robots: { index: false, follow: false },
};

/** Where the double opt-in email links to (/fare-alerts/confirm?t=…). */
export default function FareAlertConfirmPage() {
  return (
    <div className="min-h-[70dvh] bg-mist px-5 py-12 md:py-20">
      <Suspense fallback={<div className="mx-auto h-80 max-w-lg rounded-(--radius-frame) bg-white" />}>
        <FareAlertConfirm />
      </Suspense>
    </div>
  );
}
