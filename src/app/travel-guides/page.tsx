import { blogId, itemList, jsonLdHtml, orgRef, webPage } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/page-header";
import { FeaturedGuides } from "@/components/guides/featured-guides";
import { TopicBoard } from "@/components/guides/topic-board";
import { GuideArchive } from "@/components/guides/guide-archive";
import { DestinationBand } from "@/components/guides/destination-band";
import { site } from "@/content/site";
import { archivePage, featuredCount, guides, guidesHub, pageCount, topics } from "@/content/guides";

export const metadata = pageMetadata({
  title: guidesHub.seoTitle,
  description: guidesHub.description,
  path: "/travel-guides",
});

const jsonLd = {
  "@graph": [
    webPage("CollectionPage", "/travel-guides", guidesHub.title, guidesHub.description, {
      mainEntity: itemList(guides.map((g) => ({ name: g.title, path: `/travel-guides/${g.slug}` }))),
    }),
    {
      "@type": "Blog",
      "@id": blogId,
      name: `${guidesHub.title} from Wallet Flights`,
      description: guidesHub.description,
      url: `${site.url}/travel-guides`,
      inLanguage: "en-GB",
      publisher: orgRef,
    },
  ],
};

export default function GuidesPage() {
  const present = topics.filter((t) => guides.some((g) => g.topic === t.id));
  return (
    <div className="pb-18 md:pb-28">
      <PageHeader title={guidesHub.title} intro={guidesHub.intro} crumbs={[{ label: "Travel guides", href: "/travel-guides" }]} />

      <nav aria-label="Guide topics" className="container-page mt-6">
        <ul className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          {present.map((t) => (
            <li key={t.id}>
              <a href={`#topic-${t.id}`} className="inline-flex h-11 items-center rounded-full px-5 font-semibold whitespace-nowrap text-ink ring-1 ring-line hover:bg-mist">
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-page mt-10 md:mt-12">
        <FeaturedGuides guides={guides.slice(0, featuredCount)} />
      </div>

      {pageCount > 0 && archivePage(1).length > 0 && (
        <div className="container-page mt-16 md:mt-24">
          <GuideArchive page={1} />
        </div>
      )}

      <div className="container-page mt-16 md:mt-24">
        <TopicBoard />
      </div>

      <DestinationBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
    </div>
  );
}
