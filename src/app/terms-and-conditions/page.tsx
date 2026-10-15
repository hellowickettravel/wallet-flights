import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/legal-page";
import { terms, legalUpdated } from "@/content/legal";

export const metadata = pageMetadata({
  title: "Terms and conditions",
  description:
    "Terms for using Wallet Flights: how our flight comparison works, booking with providers or through our team, affiliate links, liability and governing law.",
  path: "/terms-and-conditions",
});

export default function Page() {
  return <LegalPage title="Terms and conditions" href="/terms-and-conditions" updated={legalUpdated} intro={terms.intro} sections={terms.sections} />;
}
