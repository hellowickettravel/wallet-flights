import { pageMetadata } from "@/lib/seo";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { HelpCenter } from "@/components/help/help-center";
import { helpTopics } from "@/content/help";
import { site } from "@/content/site";

export const metadata = pageMetadata({
  title: "Help centre",
  description:
    "Answers about comparing flights, prices, booking with providers, changes and refunds, and fare alerts.",
  path: "/help",
});

export default function HelpPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: helpTopics.flatMap((t) => t.items).map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <div className="pb-18 md:pb-28">
      <PageHeader title="How can we help?" intro="Quick answers about comparing flights and booking with providers." crumbs={[{ label: "Help centre", href: "/help" }]} />
      <div className="container-page mt-10">
        <HelpCenter />
        <div className="mt-16 flex flex-col gap-5 rounded-(--radius-frame) bg-board p-8 text-white sm:flex-row sm:items-center sm:justify-between md:p-10">
          <div>
            <p className="font-display-tight text-[1.625rem] font-bold">Still need help?</p>
            <p className="mt-1 text-white/75">{site.responseTime}.</p>
          </div>
          <ButtonLink href="/contact" variant="sun" size="lg">
            <EnvelopeSimple className="size-5" aria-hidden />
            Contact us
          </ButtonLink>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </div>
  );
}
