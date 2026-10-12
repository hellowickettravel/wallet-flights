import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { SmartImage } from "@/components/ui/smart-image";
import { photographerUrl, photos, unsplashHomeUrl } from "@/content/images";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "The photographers whose work appears on Wallet Flights, via Unsplash.",
  alternates: { canonical: "/photo-credits" },
};

export default function PhotoCreditsPage() {
  const list = Object.values(photos);
  return (
    <div className="pb-18 md:pb-28">
      <PageHeader
        title="Photo credits"
        intro="Every photo on this site comes from Unsplash. Thank you to the photographers who share their work."
        crumbs={[{ label: "Photo credits", href: "/photo-credits" }]}
      />
      <ul className="container-page mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <li key={p.id} className="overflow-hidden rounded-(--radius-card) bg-white ring-1 ring-line">
            <div className="relative aspect-[4/3]">
              <SmartImage photo={p} sizes="(min-width: 1024px) 300px, 50vw" />
            </div>
            <p className="p-4 text-[0.875rem] leading-snug text-ink-soft">
              <span className="block text-ink">{p.alt}</span>
              Photo by{" "}
              <a href={photographerUrl(p.user)} target="_blank" rel="noopener noreferrer" className="font-semibold text-action hover:underline">
                {p.by}
              </a>{" "}
              on{" "}
              <a href={unsplashHomeUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-action hover:underline">
                Unsplash
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
