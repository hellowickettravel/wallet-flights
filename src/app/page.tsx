import { Hero } from "@/components/home/hero";
import { AssuranceStrip } from "@/components/home/assurance-strip";
import { DealsRail } from "@/components/home/deals-rail";
import { FareBoard } from "@/components/home/fare-board";
import { DestinationsMosaic } from "@/components/home/destinations-mosaic";
import { AgentBand } from "@/components/home/agent-band";
import { GuidesSection } from "@/components/home/guides-section";
import { FaqSection } from "@/components/home/faq-section";
import { FareAlerts } from "@/components/home/fare-alerts";
import { homeFaqs } from "@/content/faqs";
import { site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      name: site.name,
      url: site.url,
      telephone: site.phone.display,
      email: site.email,
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <AssuranceStrip />
      <DealsRail />
      <FareBoard />
      <DestinationsMosaic />
      <AgentBand />
      <GuidesSection />
      <FaqSection />
      <FareAlerts />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
