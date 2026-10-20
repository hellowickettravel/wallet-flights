"use client";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsent } from "@/lib/consent";

/**
 * Analytics, only after the visitor allows the Analytics cookie category.
 * - `vercel`: Vercel Analytics + Speed Insights (need the /_vercel/* endpoints, so Vercel only).
 * - `gaId`: Google Analytics 4. Page changes are counted by GA's enhanced measurement
 *   (browser history events), so client-side navigation needs no extra code.
 */
export function ConsentedAnalytics({ vercel, gaId }: { vercel: boolean; gaId?: string }) {
  const consent = useConsent();
  if (!consent?.analytics) return null;
  return (
    <>
      {vercel && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
      {gaId && <GoogleAnalytics id={gaId} />}
    </>
  );
}

/** The Google tag (gtag.js). Google signals and ad personalisation stay off: the cookie policy says GA isn't used for advertising. */
function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}',{allow_google_signals:false,allow_ad_personalization_signals:false});`}
      </Script>
    </>
  );
}
