import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { terms, legalUpdated } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "Terms and conditions for Wallet Flights.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function Page() {
  return <LegalPage title="Terms and conditions" href="/terms-and-conditions" updated={legalUpdated} intro={terms.intro} sections={terms.sections} />;
}
