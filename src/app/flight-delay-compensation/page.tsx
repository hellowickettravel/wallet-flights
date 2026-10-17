import { Suspense } from "react";
import Link from "next/link";
import { CalendarDots } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/page-header";
import { Checker } from "@/components/compensation/checker";
import { compensationCopy as copy } from "@/content/compensation";
import { jsonLdHtml, webPage } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: copy.metaTitle,
  description: copy.metaDescription,
  path: "/flight-delay-compensation",
});

const jsonLd = webPage("WebPage", "/flight-delay-compensation", copy.title, copy.metaDescription);

export default function CompensationPage() {
  return (
    <>
      <PageHeader title={copy.title} intro={copy.intro} crumbs={[{ label: "Delay compensation", href: "/flight-delay-compensation" }]} />

      <div className="mt-8 bg-mist py-8 md:mt-12 md:py-14">
        <div className="container-page">
          {/* The checker reads its answers from the URL (share links), so it renders in the browser. */}
          <Suspense fallback={<div className="h-[52rem] rounded-(--radius-panel) bg-white ring-1 ring-line" aria-hidden />}>
            <Checker />
          </Suspense>
        </div>
      </div>

      <section aria-labelledby="rules-title" className="py-14 md:py-20">
        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 id="rules-title" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
              {copy.rules.title}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{copy.rules.intro}</p>
            <Link href="/travel-guides/flight-cancelled-or-delayed-rights" className="mt-5 inline-block font-semibold text-action underline-offset-4 hover:underline">
              {copy.rules.guide}
            </Link>
          </div>
          <div>
            <div className="overflow-x-auto rounded-(--radius-card) ring-1 ring-line" tabIndex={0} role="region" aria-label="Compensation by distance, scrolls sideways">
              <table className="w-full min-w-[28rem] text-left">
                <caption className="sr-only">Compensation per passenger by flight distance</caption>
                <thead className="bg-mist text-[0.875rem] text-ink-soft">
                  <tr>
                    {copy.rules.head.map((h) => (
                      <th key={h} scope="col" className="px-5 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {copy.rules.rows.map(([band, uk, eu]) => (
                    <tr key={band}>
                      <th scope="row" className="px-5 py-4 font-semibold text-ink">
                        {band}
                      </th>
                      <td className="tabular px-5 py-4 font-bold text-fare">{uk}</td>
                      <td className="tabular px-5 py-4 font-bold text-fare">{eu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-6 space-y-3 text-ink">
              {copy.rules.notes.map((n) => (
                <li key={n} className="flex gap-3 leading-relaxed">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-action" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="tools-more" className="container-page pb-14 md:pb-20">
        <h2 id="tools-more" className="sr-only">
          More travel tools
        </h2>
        <Link
          href="/fare-calendar"
          className="group flex flex-col gap-4 rounded-(--radius-panel) p-6 ring-1 ring-line transition-colors hover:bg-mist sm:flex-row sm:items-center md:p-8"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-fare-tint text-fare-deep">
            <CalendarDots className="size-6" weight="fill" aria-hidden />
          </span>
          <span className="flex-1">
            <span className="block font-display-tight text-[1.25rem] font-bold text-ink">Planning the next trip?</span>
            <span className="mt-1 block text-ink-soft">See the cheapest month and day to fly on your route with our fare calendar.</span>
          </span>
          <span className="font-semibold text-action group-hover:underline">Open the fare calendar</span>
        </Link>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(jsonLd)} />
    </>
  );
}
