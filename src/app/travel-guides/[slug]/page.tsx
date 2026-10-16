import { richText } from "@/components/guides/linked-text";
import { blogId, breadcrumbList, faqPage, jsonLdHtml, orgRef, websiteId } from "@/lib/schema";
import { pageMetadata, unsplashShareImage } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CaretDown, CaretRight, Lightbulb, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { SmartImage } from "@/components/ui/smart-image";
import { ButtonLink } from "@/components/ui/button";
import { GuideCard } from "@/components/guides/guide-card";
import { ShareBar } from "@/components/guides/share-bar";
import { anchor, longDate } from "@/components/guides/format";
import { guideBySlug, guides, guideTemplate, plainText, readingMinutes, relatedGuides, topicById, wordCount, type GuideSection } from "@/content/guides";
import { site } from "@/content/site";
import { teamAuthor } from "@/content/editorial";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/travel-guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug[slug];
  if (!g) return {};
  return pageMetadata({
    title: g.seoTitle ?? g.title,
    description: g.excerpt,
    path: `/travel-guides/${g.slug}`,
    image: unsplashShareImage(g.photo),
    type: "article",
    publishedTime: g.published,
    modifiedTime: g.updated,
  });
}

const t = guideTemplate;

/** A section's body: paragraphs, then its list, table and tip. */
function SectionBody({ s, linked }: { s: GuideSection; linked: Set<string> }) {
  const List = s.ordered ? "ol" : "ul";
  return (
    <>
      {s.paragraphs.map((p, i) => (
        <p key={i} className="mt-4 text-[1.0625rem] leading-[1.75] text-ink/85">
          {richText(p, linked)}
        </p>
      ))}
      {s.list && (
        <List className="mt-5 space-y-3">
          {s.list.map((li, i) => (
            <li key={li} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink/85">
              {s.ordered ? (
                <span className="tabular mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ink text-[0.875rem] font-bold text-sun" aria-hidden>
                  {i + 1}
                </span>
              ) : (
                <span className="mt-2.5 size-2 shrink-0 rounded-full bg-action" aria-hidden />
              )}
              <span>{richText(li, linked)}</span>
            </li>
          ))}
        </List>
      )}
      {s.table && (
        // Wide tables scroll sideways on phones instead of squashing.
        <div className="mt-6 overflow-x-auto rounded-(--radius-card) ring-1 ring-line" tabIndex={0} role="region" aria-label={s.table.caption}>
          <table className="w-full min-w-[32rem] border-collapse text-left text-[0.9375rem]">
            <caption className="sr-only">{s.table.caption}</caption>
            <thead className="bg-mist">
              <tr>
                {s.table.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-semibold text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-line align-top">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3 font-semibold text-ink">
                        {richText(cell, linked)}
                      </th>
                    ) : (
                      <td key={i} className="px-4 py-3 leading-relaxed text-ink/85">
                        {richText(cell, linked)}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.tip && (
        <aside className="mt-6 flex gap-3 rounded-(--radius-card) bg-mist p-5">
          <Lightbulb className="mt-0.5 size-6 shrink-0 text-action" weight="duotone" aria-hidden />
          <p className="leading-relaxed text-ink">
            <strong className="font-semibold">{t.tip} </strong>
            {richText(s.tip, linked)}
          </p>
        </aside>
      )}
    </>
  );
}

export default async function GuidePage({ params }: PageProps<"/travel-guides/[slug]">) {
  const { slug } = await params;
  const g = guideBySlug[slug];
  if (!g) notFound();
  const topic = topicById[g.topic];
  const url = `${site.url}/travel-guides/${g.slug}`;
  const related = relatedGuides(g);
  const linked = new Set<string>();
  const toc = [...g.sections.map((s) => ({ id: anchor(s.heading), label: s.heading })), ...(g.faqs ? [{ id: "questions", label: t.faqTitle }] : [])];
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Travel guides", href: "/travel-guides" },
    { label: g.title, href: `/travel-guides/${g.slug}` },
  ];

  // Written by the Wallet Flights team: the organisation is the author until
  // a named person is confirmed (never invent a byline).
  const jsonLd = {
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: g.title.length > 110 ? (g.seoTitle ?? g.title) : g.title,
        description: g.excerpt,
        datePublished: `${g.published}T09:00:00+01:00`,
        dateModified: `${g.updated ?? g.published}T09:00:00+01:00`,
        image: [unsplashShareImage(g.photo).url],
        author: { ...orgRef, "@type": "Organization", name: site.name, url: site.url },
        publisher: orgRef,
        mainEntityOfPage: { "@type": "WebPage", "@id": url, isPartOf: { "@id": websiteId } },
        isPartOf: { "@id": blogId },
        articleSection: topic.label,
        wordCount: wordCount(g),
        inLanguage: "en-GB",
        ...(g.keywords && { keywords: g.keywords.join(", ") }),
        ...(g.sources && { citation: g.sources.map((s) => s.url) }),
      },
      breadcrumbList(crumbs),
      ...(g.faqs ? [faqPage(g.faqs.map((f) => ({ q: f.q, a: plainText(f.a) })))] : []),
    ],
  };

  return (
    <article className="pb-18 md:pb-28">
      {/* Reading progress along the bottom of the header (CSS scroll timeline; hidden where unsupported). */}
      <div className="reading-progress" aria-hidden />

      <header className="container-page pt-8 md:pt-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.875rem] text-ink-soft">
            {crumbs.slice(0, -1).map((c) => (
              <li key={c.href} className="flex items-center gap-1.5">
                <Link href={c.href} className="hover:text-action hover:underline">
                  {c.label}
                </Link>
                <CaretRight className="size-3.5" aria-hidden />
              </li>
            ))}
            <li>
              <Link href={`/travel-guides#topic-${topic.id}`} className="font-medium text-action hover:underline">
                {topic.label}
              </Link>
            </li>
          </ol>
        </nav>
        <h1 className="mt-5 max-w-4xl font-display-tight text-[2.25rem] leading-[1.06] font-extrabold text-balance text-ink md:text-[3rem] lg:text-[3.5rem]">
          {g.title}
        </h1>
        <p className="mt-5 max-w-3xl text-pretty text-[1.125rem] leading-relaxed text-ink-soft md:text-[1.3125rem]">{g.excerpt}</p>
        <p data-testid="guide-byline" className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[0.9375rem] text-ink-soft">
          <span>
            By{" "}
            <Link href={teamAuthor.href} className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-action">
              {teamAuthor.name}
            </Link>
          </span>
          <span>
            Published <time dateTime={g.published}>{longDate(g.published)}</time>
          </span>
          {g.updated && (
            <span>
              Updated <time dateTime={g.updated}>{longDate(g.updated)}</time>
            </span>
          )}
          <span>{`${readingMinutes(g)} min read`}</span>
        </p>
      </header>

      <div className="container-page mt-8 md:mt-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-(--radius-frame) md:aspect-[21/9]">
          <SmartImage photo={g.photo} priority sizes="(min-width: 1280px) 1216px, 100vw" />
        </div>
      </div>

      <div className="container-page mt-10 grid gap-10 md:mt-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label={t.tocTitle} className="sticky top-28">
            <p className="text-[0.875rem] font-semibold text-ink">{t.tocTitle}</p>
            <ol className="mt-3 space-y-2 border-l-2 border-line">
              {toc.map((x) => (
                <li key={x.id}>
                  <a href={`#${x.id}`} className="-ml-0.5 block border-l-2 border-transparent pl-4 text-[0.9375rem] leading-snug text-ink-soft hover:border-action hover:text-ink">
                    {x.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="max-w-[68ch]">
          {/* Phones and tablets: the contents fold away above the article. */}
          <details className="group rounded-(--radius-card) ring-1 ring-line lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {t.tocTitle}
              <CaretDown className="size-4 transition-transform group-open:rotate-180" weight="bold" aria-hidden />
            </summary>
            <ol className="space-y-2 px-5 pb-5">
              {toc.map((x) => (
                <li key={x.id}>
                  <a href={`#${x.id}`} className="text-ink-soft underline decoration-line underline-offset-4 hover:text-action">
                    {x.label}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          {g.summary && (
            <section aria-labelledby="short-answer" className="mt-8 rounded-(--radius-panel) border-l-4 border-action bg-mist p-6 lg:mt-0">
              <h2 id="short-answer" className="font-display-tight text-[1.25rem] font-bold text-ink">
                {t.summaryTitle}
              </h2>
              <ul className="mt-3 space-y-2.5">
                {g.summary.map((x) => (
                  <li key={x} className="flex gap-3 leading-relaxed text-ink">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink" aria-hidden />
                    <span>{richText(x, linked)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {g.sections.map((s) => (
            <section key={s.heading} aria-labelledby={anchor(s.heading)} className="mt-12">
              <h2 id={anchor(s.heading)} className="scroll-mt-28 font-display-tight text-[1.625rem] leading-tight font-bold text-ink md:text-[1.875rem]">
                {s.heading}
              </h2>
              <SectionBody s={s} linked={linked} />
            </section>
          ))}

          {g.faqs && (
            <section aria-labelledby="questions" className="mt-14">
              <h2 id="questions" className="scroll-mt-28 font-display-tight text-[1.625rem] leading-tight font-bold text-ink md:text-[1.875rem]">
                {t.faqTitle}
              </h2>
              <div className="mt-6 divide-y divide-line border-y border-line">
                {g.faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <h3 className="text-[1.125rem] leading-snug font-semibold text-ink">{f.q}</h3>
                    <p className="mt-2 leading-relaxed text-ink/85">{richText(f.a, linked)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {g.sources && (
            <section aria-labelledby="sources" className="mt-12 border-t border-line pt-8">
              <h2 id="sources" className="font-display-tight text-[1.25rem] font-bold text-ink">
                Sources
              </h2>
              <ul className="mt-3 space-y-2">
                {g.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-[0.9375rem] text-action hover:underline">
                      {s.label}
                      <ArrowUpRight className="size-3.5" weight="bold" aria-hidden />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.875rem] text-ink-soft">
                {t.sourcesNote}{" "}
                <Link href={teamAuthor.href} className="underline underline-offset-4 hover:text-ink">
                  How we write our guides
                </Link>
              </p>
            </section>
          )}

          <div className="mt-10 border-t border-line pt-8">
            <ShareBar url={url} title={g.title} />
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-(--radius-panel) bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <p className="font-display-tight text-[1.375rem] font-bold">{t.ctaTitle}</p>
              <p className="mt-1 text-white/75">{t.ctaText}</p>
            </div>
            <ButtonLink href="/#search" variant="sun" size="lg" className="shrink-0">
              <MagnifyingGlass weight="bold" className="size-5" aria-hidden />
              Search flights
            </ButtonLink>
          </div>

          <Link href="/travel-guides" className="mt-10 inline-flex items-center gap-2 font-semibold text-action hover:underline">
            <ArrowLeft className="size-4" weight="bold" aria-hidden />
            All travel guides
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="more-title" className="container-page mt-16 border-t border-line pt-12 md:mt-20">
          <h2 id="more-title" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
            {t.relatedTitle}
          </h2>
          <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {related.map((m) => (
              <li key={m.slug}>
                <GuideCard guide={m} />
              </li>
            ))}
          </ul>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
    </article>
  );
}
