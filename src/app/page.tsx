import { Hero } from "@/components/home/hero";
import { AirlineStrip } from "@/components/home/airline-strip";
import { AssuranceStrip } from "@/components/home/assurance-strip";
import { DealsRail } from "@/components/home/deals-rail";
import { FareBoard } from "@/components/home/fare-board";
import { DestinationsMosaic } from "@/components/home/destinations-mosaic";
import { HowItWorksBand } from "@/components/home/how-it-works-band";
import { ReviewsSection } from "@/components/home/reviews-section";
import { GuidesSection } from "@/components/home/guides-section";
import { FaqSection } from "@/components/home/faq-section";
import { FareAlerts } from "@/components/home/fare-alerts";
import { homeFaqs } from "@/content/faqs";
import { site } from "@/content/site";
import { destinationTileFares, routeFares } from "@/lib/fares";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      description: site.description,
      email: site.email,
      telephone: site.phone.display,
      address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
      sameAs: site.social.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
    },
    {
      "@type": "FAQPage",
      mainEntity: homeFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default async function HomePage() {
  const [fares, tileFares] = await Promise.all([routeFares(), destinationTileFares()]);
  return (
    <>
      <Hero />
      <AirlineStrip />
      <AssuranceStrip />
      <DealsRail fares={fares} />
      <FareBoard fares={fares} />
      <DestinationsMosaic fares={tileFares} />
      <HowItWorksBand />
      <ReviewsSection />
      <GuidesSection />
      <FaqSection />
      <FareAlerts />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
