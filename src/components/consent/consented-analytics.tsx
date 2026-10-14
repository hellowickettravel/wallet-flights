"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsent } from "@/lib/consent";

/** Vercel Analytics + Speed Insights, only after the visitor allows analytics. */
export function ConsentedAnalytics() {
  const consent = useConsent();
  if (!consent?.analytics) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
