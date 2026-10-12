import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/page-header";
import { AirlineMark } from "@/components/results/airline-mark";
import { airlines, type Alliance } from "@/content/airlines";

export const metadata: Metadata = {
  title: "Airlines we compare",
  description: "Compare fares from British Airways, Virgin Atlantic, Emirates, Qatar Airways, Turkish Airlines and more, alongside online travel sites.",
  alternates: { canonical: "/airlines" },
};

const groups: { alliance: Alliance; blurb: string }[] = [
  { alliance: "oneworld", blurb: "Includes British Airways, American Airlines, Qatar Airways, Iberia and Japan Airlines." },
  { alliance: "Star Alliance", blurb: "Includes United, Lufthansa, Turkish Airlines, Singapore Airlines and Air Canada." },
  { alliance: "SkyTeam", blurb: "Includes Delta, Air France, KLM and Virgin Atlantic." },
  { alliance: "None", blurb: "Airlines outside the three big alliances, including Emirates and easyJet." },
];

export default function AirlinesPage() {
  return (
    <div className="pb-18 md:pb-28">
      <PageHeader
        title="Airlines we compare"
        intro="We show fares from these airlines and from online travel sites side by side. Alliance partners often share lounges and let you earn miles across each other’s flights."
        crumbs={[{ label: "Airlines", href: "/airlines" }]}
      />
      {groups.map((g) => {
        const list = airlines.filter((a) => a.alliance === g.alliance);
        return (
          <section key={g.alliance} aria-labelledby={`al-${g.alliance}`} className="container-page mt-14 md:mt-16">
            <div className="flex flex-col gap-1 border-b border-line pb-4 md:flex-row md:items-end md:justify-between">
              <h2 id={`al-${g.alliance}`} className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
                {g.alliance === "None" ? "Independent airlines" : g.alliance}
              </h2>
              <p className="text-[0.9375rem] text-ink-soft">{g.blurb}</p>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((a) => (
                <li key={a.code} className="flex items-start gap-4 rounded-(--radius-card) bg-white p-5 ring-1 ring-line">
                  <AirlineMark airline={a} />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-ink">{a.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-[0.875rem] text-ink-soft">
                      <MapPin className="size-4 shrink-0" aria-hidden />
                      Hub: {a.hubCity}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[0.875rem] text-ink-soft">
                      <UsersThree className="size-4 shrink-0" aria-hidden />
                      {a.lowCost ? "Low-cost, short-haul" : a.longHaul ? "Short and long-haul" : "Mostly short and medium-haul"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <div className="container-page mt-14">
        <p className="rounded-(--radius-card) bg-mist p-5 text-[0.9375rem] leading-relaxed text-ink-soft">
          Airline names are shown to help you compare. Wallet Flights is independent and isn’t affiliated with these airlines; baggage rules and fare
          conditions are set by each airline and shown by the provider when you book.{" "}
          <Link href="/#search" className="font-semibold text-action underline underline-offset-4">Search flights</Link>
        </p>
      </div>
    </div>
  );
}
