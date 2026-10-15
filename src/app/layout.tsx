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
  axes: ["opsz", "wdth"],
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["500", "600"] });

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
    <html lang="en" className={`${onest.variable} ${bricolage.variable} ${jetbrains.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
          <CookieBanner />
        </MotionProvider>
        {/* Only on Vercel, where the /_vercel/* endpoints exist, and only after consent. */}
        {process.env.VERCEL && <ConsentedAnalytics />}
      </body>
    </html>
  );
}
