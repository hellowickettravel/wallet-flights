import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { SmartImage } from "@/components/ui/smart-image";
import { guides } from "@/content/guides";

export const metadata = pageMetadata({
  title: "Travel guides",
  description:
    "Practical advice on booking flights, when to travel and what to pack.",
  path: "/travel-guides",
});

const date = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function GuidesPage() {
  const [lead, ...rest] = guides;
  return (
    <div className="pb-18 md:pb-28">
      <PageHeader title="Travel guides" intro="Practical advice for booking smarter, travelling lighter and picking the right time to go." crumbs={[{ label: "Travel guides", href: "/travel-guides" }]} />
      <div className="container-page mt-10 md:mt-14">
        <Link href={`/travel-guides/${lead.slug}`} className="group grid overflow-hidden rounded-(--radius-frame) bg-ink text-white lg:grid-cols-[1.2fr_1fr]">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]">
            <SmartImage photo={lead.photo} priority sizes="(min-width: 1024px) 700px, 100vw" imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.03]" />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="text-[0.875rem] font-medium text-sun">
              {lead.category} · {lead.minutes} min read
            </p>
            <h2 className="mt-3 font-display-tight text-[1.875rem] leading-[1.12] font-bold md:text-[2.375rem]">{lead.title}</h2>
            <p className="mt-4 leading-relaxed text-white/75">{lead.excerpt}</p>
            <p className="mt-6 text-[0.875rem] text-white/60">{date(lead.published)}</p>
          </div>
        </Link>
        <ul className="mt-8 grid gap-8 md:grid-cols-2">
          {rest.map((g) => (
            <li key={g.slug}>
              <Link href={`/travel-guides/${g.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-(--radius-card)">
                  <SmartImage photo={g.photo} sizes="(min-width: 768px) 600px, 100vw" imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.04]" />
                </div>
                <p className="mt-4 text-[0.875rem] font-medium text-action">
                  {g.category} · {g.minutes} min read
                </p>
                <h2 className="mt-2 font-display-tight text-[1.5rem] leading-tight font-bold text-ink group-hover:text-action">{g.title}</h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{g.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
