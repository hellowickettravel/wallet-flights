import { jsonLdHtml, organization, website } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
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
import { destinationTileFares, routeFares, tickerFares } from "@/lib/fares";

export const metadata = pageMetadata({
  title: { absolute: `${site.name} — ${site.tagline}` },
  description: site.description,
  path: "/",
});

const jsonLd = {
  "@graph": [
    organization,
    website,
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
      <Hero lowFares={tickerFares(fares)} />
      <AirlineStrip />
      <AssuranceStrip />
      <DealsRail fares={fares} />
      {/* Only with real fares: a board of "No recent price" rows is empty content. */}
      {Object.keys(fares).length > 0 && <FareBoard fares={fares} />}
      <div className="cv-auto">
        <DestinationsMosaic fares={tileFares} />
      </div>
      <div className="cv-auto">
        <HowItWorksBand />
      </div>
      <div className="cv-auto">
        <ReviewsSection />
      </div>
      <div className="cv-auto">
        <GuidesSection />
      </div>
      <div className="cv-auto">
        <FaqSection />
      </div>
      <FareAlerts />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
    </>
  );
}
