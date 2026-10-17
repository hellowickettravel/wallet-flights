import { Suspense } from "react";
import Link from "next/link";
import { CalendarDots, Scales, Storefront, TrendDown } from "@phosphor-icons/react/dist/ssr";
import { PhotoHeader } from "@/components/ui/photo-header";
import { FareCalendar } from "@/components/fare-calendar/fare-calendar";
import { fareCalendarCopy as copy } from "@/content/fare-calendar";
import { photos } from "@/content/images";
import { jsonLdHtml, webPage } from "@/lib/schema";
import { pageMetadata, unsplashShareImage } from "@/lib/seo";

export const metadata = pageMetadata({
  title: copy.metaTitle,
  description: copy.metaDescription,
  path: "/fare-calendar",
  image: unsplashShareImage(photos.fareCalendar),
});

const pointIcons = [CalendarDots, TrendDown, Storefront];

const jsonLd = webPage("WebPage", "/fare-calendar", copy.title, copy.metaDescription);

export default function FareCalendarPage() {
  return (
    <>
      <PhotoHeader
        photo={photos.fareCalendar}
        title={copy.title}
        intro={copy.intro}
        crumbs={[{ label: "Fare calendar", href: "/fare-calendar" }]}
        points={copy.points.map((label, i) => {
          const Icon = pointIcons[i];
          return { label, icon: <Icon className="size-4" weight="bold" aria-hidden /> };
        })}
      />
      {/* The calendar reads the route from the URL, so it renders in the browser. */}
      <Suspense fallback={<div className="relative z-10 container-page -mt-20 h-[48rem] md:-mt-24" aria-hidden><div className="h-36 rounded-(--radius-panel) bg-white shadow-(--shadow-float) ring-1 ring-line" /></div>}>
        <FareCalendar />
      </Suspense>
      <section aria-labelledby="tools-more" className="container-page py-12 md:py-16">
        <h2 id="tools-more" className="sr-only">
          More travel tools
        </h2>
        <Link
          href="/flight-delay-compensation"
          className="group flex flex-col gap-4 rounded-(--radius-panel) p-6 ring-1 ring-line transition-colors hover:bg-mist sm:flex-row sm:items-center md:p-8"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-sun">
            <Scales className="size-6" weight="fill" aria-hidden />
          </span>
          <span className="flex-1">
            <span className="block font-display-tight text-[1.25rem] font-bold text-ink">Flight delayed or cancelled?</span>
            <span className="mt-1 block text-ink-soft">Check what you’re owed under UK and EU rules. Free, and it takes a minute.</span>
          </span>
          <span className="font-semibold text-action group-hover:underline">Check compensation</span>
        </Link>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
    </>
  );
}
