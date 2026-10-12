import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { privacy, legalUpdated } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Privacy policy for Wallet Flights.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <LegalPage title="Privacy policy" href="/privacy-policy" updated={legalUpdated} intro={privacy.intro} sections={privacy.sections} />;
}
