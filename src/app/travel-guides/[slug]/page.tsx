import { linkDestinations } from "@/components/guides/linked-text";
import { jsonLdHtml, orgRef } from "@/lib/schema";
import { pageMetadata, unsplashShareImage } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/page-header";
import { SmartImage } from "@/components/ui/smart-image";
import { ButtonLink } from "@/components/ui/button";
import { guideBySlug, guides, readingMinutes } from "@/content/guides";
import { site } from "@/content/site";

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
  });
}

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const date = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function GuidePage({ params }: PageProps<"/travel-guides/[slug]">) {
  const { slug } = await params;
  const g = guideBySlug[slug];
  if (!g) notFound();
  const more = guides.filter((x) => x.slug !== g.slug);
  const linked = new Set<string>();
  // Written by the Wallet Flights team: the organisation is the author until
  // a named person is confirmed (never invent a byline).
  const jsonLd = {
    "@type": "Article",
    headline: g.title,
    description: g.excerpt,
    datePublished: `${g.published}T09:00:00+01:00`,
    dateModified: `${g.updated ?? g.published}T09:00:00+01:00`,
    image: [unsplashShareImage(g.photo).url],
    author: { ...orgRef, "@type": "Organization", name: site.name, url: site.url },
    publisher: orgRef,
    mainEntityOfPage: `${site.url}/travel-guides/${g.slug}`,
    inLanguage: "en-GB",
  };

  return (
    <article className="pb-18 md:pb-28">
      <PageHeader
        title={g.title}
        intro={`${g.category} · ${readingMinutes(g)} min read · ${date(g.published)}`}
        crumbs={[
          { label: "Travel guides", href: "/travel-guides" },
          { label: g.title, href: `/travel-guides/${g.slug}` },
        ]}
      />
      <div className="container-page mt-8 md:mt-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-(--radius-frame) md:aspect-[21/9]">
          <SmartImage photo={g.photo} priority sizes="(min-width: 1280px) 1216px, 100vw" />
        </div>
      </div>

      <div className="container-page mt-12 grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label="In this guide" className="sticky top-28">
            <p className="text-[0.875rem] font-semibold text-ink">In this guide</p>
            <ol className="mt-3 space-y-2 border-l-2 border-line">
              {/* Destinations named in the guide link to their pages, once each. */}
          {g.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${anchor(s.heading)}`} className="-ml-0.5 block border-l-2 border-transparent pl-4 text-[0.9375rem] text-ink-soft hover:border-action hover:text-ink">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="max-w-[68ch]">
          <p className="text-[1.25rem] leading-relaxed text-ink">{g.excerpt}</p>
          {/* Destinations named in the guide link to their pages, once each. */}
          {g.sections.map((s) => (
            <section key={s.heading} aria-labelledby={anchor(s.heading)} className="mt-10">
              <h2 id={anchor(s.heading)} className="scroll-mt-28 font-display-tight text-[1.625rem] leading-tight font-bold text-ink md:text-[1.875rem]">
                {s.heading}
              </h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-[1.0625rem] leading-[1.75] text-ink/85">
                  {linkDestinations(p, linked)}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink/85">
                      <span className="mt-2.5 size-2 shrink-0 rounded-full bg-action" aria-hidden />
                      <span>{linkDestinations(li, linked)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="mt-14 flex flex-col gap-4 rounded-(--radius-panel) bg-mist p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display-tight text-[1.375rem] font-bold text-ink">Ready to compare fares?</p>
            <ButtonLink href="/#search" size="lg">
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

      <section aria-labelledby="more-title" className="container-page mt-16 border-t border-line pt-12">
        <h2 id="more-title" className="font-display-tight text-[1.75rem] font-bold text-ink">More guides</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {more.map((m) => (
            <li key={m.slug}>
              <Link href={`/travel-guides/${m.slug}`} className="group grid grid-cols-[8rem_1fr] gap-5 sm:grid-cols-[10rem_1fr]">
                <div className="relative aspect-square overflow-hidden rounded-(--radius-card)">
                  <SmartImage photo={m.photo} sizes="160px" imgClassName="transition-transform duration-700 group-hover:scale-[1.05]" />
                </div>
                <div className="self-center">
                  <p className="text-[0.8125rem] font-medium text-action">{m.category}</p>
                  <h3 className="mt-1 text-[1.125rem] leading-snug font-semibold text-ink group-hover:text-action">{m.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
    </article>
  );
}
