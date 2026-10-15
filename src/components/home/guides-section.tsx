import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { guides, guidesIntro, readingMinutes } from "@/content/guides";

export function GuidesSection() {
  const [lead, ...rest] = guides;
  return (
    <section aria-labelledby="guides-title" className="py-18 md:py-28">
      <div className="container-page">
        <SectionHeading id="guides-title" title="Travel guides" intro={guidesIntro}>
          <Link href="/travel-guides" className="text-[0.9375rem] font-semibold text-action underline-offset-4 hover:underline">
            Read all guides
          </Link>
        </SectionHeading>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <Link href={`/travel-guides/${lead.slug}`} className="group block rounded-(--radius-card) focus-visible:outline-offset-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-(--radius-card)">
              <SmartImage
                photo={lead.photo}
                sizes="(min-width: 1024px) 700px, 100vw"
                imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-5 text-[0.875rem] font-medium text-action">
              {lead.category} · {readingMinutes(lead)} min read
            </p>
            <h3 className="mt-2 font-display-tight text-[1.75rem] leading-[1.15] font-bold text-ink group-hover:text-action md:text-[2rem]">
              {lead.title}
            </h3>
            <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{lead.excerpt}</p>
          </Link>

          <ul className="grid content-start gap-8">
            {rest.map((g) => (
              <li key={g.slug}>
                <Link href={`/travel-guides/${g.slug}`} className="group grid grid-cols-[8.5rem_1fr] gap-5 rounded-(--radius-card) focus-visible:outline-offset-4 sm:grid-cols-[11rem_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-(--radius-card) sm:aspect-[4/3.4]">
                    <SmartImage
                      photo={g.photo}
                      sizes="176px"
                      imgClassName="transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="self-center">
                    <p className="text-[0.8125rem] font-medium text-action">
                      {g.category} · {readingMinutes(g)} min read
                    </p>
                    <h3 className="mt-1.5 text-[1.125rem] leading-snug font-semibold text-ink group-hover:text-action md:text-[1.25rem]">
                      {g.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[0.9375rem] text-ink-soft max-sm:hidden">{g.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
