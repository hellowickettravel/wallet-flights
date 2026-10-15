import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/legal-page";
import { editorial, editorialUpdated } from "@/content/editorial";

export const metadata = pageMetadata({
  title: "Editorial policy",
  description:
    "Who writes Wallet Flights guides, where our fares come from, how results are ordered, how we make money and how to report a mistake.",
  path: "/editorial-policy",
});

export default function Page() {
  return <LegalPage title="Editorial policy" href="/editorial-policy" updated={editorialUpdated} intro={editorial.intro} sections={editorial.sections} />;
}
