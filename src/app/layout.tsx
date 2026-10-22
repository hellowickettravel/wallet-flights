import { CONSENT_FLAG_SCRIPT, CURRENCY_FLAG_SCRIPT } from "@/lib/consent-flag";
import { getRates } from "@/lib/rates";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Onest } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { CalendarTeaserLoader } from "@/components/layout/calendar-teaser-loader";
import { NavProgress } from "@/components/layout/nav-progress";
import { SiteOnly } from "@/components/layout/site-only";
import { MotionProvider } from "@/components/motion-provider";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { ConsentedAnalytics } from "@/components/consent/consented-analytics";
import { CurrencyProvider } from "@/components/currency/currency-provider";
import { site } from "@/content/site";
import { travelpayouts } from "@/content/affiliates";
import "./globals.css";

// Travelpayouts Drive: the dashboard's install snippet, which adds its loader to <head>.
const DRIVE_SCRIPT = `(function () {
  var script = document.createElement("script");
  script.async = 1;
  script.setAttribute("data-cmp-ab","2");
  script.src = ${JSON.stringify(travelpayouts.driveScript)};
  document.head.appendChild(script);
})();`;

const onest = Onest({ subsets: ["latin"], variable: "--font-onest", display: "swap" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  // Optical size only: the width axis added 55 KB to a font every page preloads.
  axes: ["opsz"],
});
// Mono is only used below the fold (fare board) and on the 404 page: don't preload it everywhere.
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["500", "600"], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Compare cheap flights in one place`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  // Defaults only. Each page sets its own canonical and og:url through
  // pageMetadata() (src/lib/seo.ts); nothing here may point at "/", or pages
  // without their own value would claim to be the homepage.
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    alternateLocale: ["en_US"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0f1f3d",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Daily exchange rates for showing fares in the visitor's currency (cached; null if unavailable).
  const rates = await getRates();
  return (
    // suppressHydrationWarning: the inline script may add data-consent and data-cur before React loads.
    <html lang="en" className={`${onest.variable} ${bricolage.variable} ${jetbrains.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `${CONSENT_FLAG_SCRIPT};${CURRENCY_FLAG_SCRIPT}` }} />
        {/* Attributes as in the dashboard snippet (they keep WordPress optimisers away; harmless here). */}
        <script
          {...{ nowprocket: "" }}
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          seraph-accel-crit="1"
          data-no-defer="1"
          data-cmp-ab="2"
          dangerouslySetInnerHTML={{ __html: DRIVE_SCRIPT }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>
          <CurrencyProvider rates={rates}>
            <NavProgress />
            <SiteOnly>
              {/* First in the DOM so keyboard users reach the cookie choice first (it's fixed at the bottom). */}
              <CookieBanner />
              <Header />
            </SiteOnly>
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteOnly>
              <Footer />
              <BackToTop />
              <CalendarTeaserLoader />
            </SiteOnly>
          </CurrencyProvider>
        </MotionProvider>
        {/* Both wait for consent. Vercel Analytics only on Vercel (it needs /_vercel/*); Google
            Analytics on production builds, but not Vercel previews, so test deploys don't count. */}
        <ConsentedAnalytics
          vercel={Boolean(process.env.VERCEL)}
          gaId={process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview" ? site.googleAnalyticsId : undefined}
        />
      </body>
    </html>
  );
}
