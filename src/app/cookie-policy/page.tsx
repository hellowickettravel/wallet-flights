import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { cookies, legalUpdated } from "@/content/legal";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "Cookie policy for Wallet Flights.",
  alternates: { canonical: "/cookie-policy" },
};

export default function Page() {
  return <LegalPage title="Cookie policy" href="/cookie-policy" updated={legalUpdated} intro={cookies.intro} sections={cookies.sections} />;
}
