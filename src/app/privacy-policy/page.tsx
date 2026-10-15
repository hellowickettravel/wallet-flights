import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/legal-page";
import { privacy, legalUpdated } from "@/content/legal";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How Wallet Flights collects and uses personal data, which cookies and partners are involved, how long we keep data and your rights under UK GDPR.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage title="Privacy policy" href="/privacy-policy" updated={legalUpdated} intro={privacy.intro} sections={privacy.sections} />;
}
