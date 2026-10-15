import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/legal-page";
import { cookies, legalUpdated } from "@/content/legal";

export const metadata = pageMetadata({
  title: "Cookie policy",
  description:
    "Which cookies Wallet Flights uses, what each one does, how long it lasts, and how to change your cookie choices at any time.",
  path: "/cookie-policy",
});

export default function Page() {
  return <LegalPage title="Cookie policy" href="/cookie-policy" updated={legalUpdated} intro={cookies.intro} sections={cookies.sections} />;
}
