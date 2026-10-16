import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/page-header";
import { GuideArchive } from "@/components/guides/guide-archive";
import { guidesHub, pageCount, pagePath } from "@/content/guides";

// /travel-guides/page/2 and up. Page 1 is /travel-guides itself (with the
// featured guides), so /travel-guides/page/1 doesn't exist.
// Cache Components needs at least one param, so page 2 is always listed; it's
// a 404 until there are enough guides to fill it.
export function generateStaticParams() {
  return Array.from({ length: Math.max(1, pageCount - 1) }, (_, i) => ({ n: String(i + 2) }));
}

/** 2 to pageCount, written plainly ("02" or "2.0" don't count). */
function pageNumber(n: string) {
  const v = Number(n);
  return Number.isInteger(v) && String(v) === n && v >= 2 && v <= pageCount ? v : null;
}

export async function generateMetadata({ params }: PageProps<"/travel-guides/page/[n]">): Promise<Metadata> {
  const n = pageNumber((await params).n);
  if (!n) return {};
  return pageMetadata({
    title: guidesHub.pageTitle(n),
    description: `${guidesHub.description.replace(/\.$/, "")}. Page ${n} of ${pageCount}.`.slice(0, 160),
    path: pagePath(n),
  });
}

export default async function GuidesArchivePage({ params }: PageProps<"/travel-guides/page/[n]">) {
  const n = pageNumber((await params).n);
  if (!n) notFound();
  return (
    <div className="pb-18 md:pb-28">
      <PageHeader
        title={guidesHub.pageTitle(n)}
        intro={guidesHub.pageIntro(n, pageCount)}
        crumbs={[
          { label: "Travel guides", href: "/travel-guides" },
          { label: `Page ${n}`, href: pagePath(n) },
        ]}
      />
      <div className="container-page mt-10">
        <GuideArchive page={n} standalone />
      </div>
    </div>
  );
}
