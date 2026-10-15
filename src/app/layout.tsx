import { CONSENT_FLAG_SCRIPT } from "@/lib/consent-flag";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Onest } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { MotionProvider } from "@/components/motion-provider";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { ConsentedAnalytics } from "@/components/consent/consented-analytics";
import { site } from "@/content/site";
import "./globals.css";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script may add data-consent before React loads.
    <html lang="en" className={`${onest.variable} ${bricolage.variable} ${jetbrains.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CONSENT_FLAG_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>
          {/* First in the DOM so keyboard users reach the cookie choice first (it's fixed at the bottom). */}
          <CookieBanner />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </MotionProvider>
        {/* Only on Vercel, where the /_vercel/* endpoints exist, and only after consent. */}
        {process.env.VERCEL && <ConsentedAnalytics />}
      </body>
    </html>
  );
}
