import { PageHeader } from "@/components/ui/page-header";

export type LegalSection = { heading: string; body: (string | string[])[] };

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Shared layout for policy pages: header, contents list, readable measure. */
export function LegalPage({ title, href, updated, intro, sections }: { title: string; href: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <div className="pb-18 md:pb-28">
      <PageHeader title={title} intro={`Last updated ${updated}`} crumbs={[{ label: title, href }]} />
      <div className="container-page mt-10 grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <nav aria-label="Contents" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-[0.875rem] font-semibold text-ink">Contents</p>
            <ol className="mt-3 space-y-2">
              {sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${anchor(s.heading)}`} className="text-[0.9375rem] text-ink-soft hover:text-action">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="max-w-[68ch]">
          <p className="text-[1.125rem] leading-relaxed text-ink">{intro}</p>
          {sections.map((s) => (
            <section key={s.heading} aria-labelledby={anchor(s.heading)} className="mt-10">
              <h2 id={anchor(s.heading)} className="scroll-mt-28 font-display-tight text-[1.5rem] font-bold text-ink">
                {s.heading}
              </h2>
              {s.body.map((b, i) =>
                Array.isArray(b) ? (
                  <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink/85 marker:text-action">
                    {b.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i} className="mt-3 leading-[1.75] text-ink/85">
                    {b}
                  </p>
                ),
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
