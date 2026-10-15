import { pageMetadata } from "@/lib/seo";
import { Envelope, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/page-header";
import { SmartImage } from "@/components/ui/smart-image";
import { ButtonLink } from "@/components/ui/button";
import { PriceLadder } from "@/components/about/price-ladder";
import { aboutEarn, aboutIntro } from "@/content/about";
import { howItWorks } from "@/content/how-it-works";
import { photos } from "@/content/images";

export const metadata = pageMetadata({
  title: "About us",
  description:
    "Wallet Flights is a London-based flight comparison site for US and UK travellers. We show prices from airlines and travel sites in one list, cheapest first.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="pb-18 md:pb-28">
        <PageHeader title={aboutIntro.title} crumbs={[{ label: "About", href: "/about" }]} />

        <div className="container-page mt-10 grid gap-12 md:mt-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="max-w-[38rem]">
            <div className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft md:text-[1.125rem]">
              {aboutIntro.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-[1.1875rem] text-ink md:text-[1.3125rem]" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8">
              {aboutIntro.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[0.875rem] text-ink-soft">{f.label}</dt>
                  <dd className="mt-1 font-display-tight text-[1.375rem] leading-tight font-bold text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius-frame) lg:aspect-[4/4.4]">
              <SmartImage photo={photos.about} sizes="(min-width: 1024px) 600px, 100vw" priority />
            </div>
            {/* Below lg the card flows under the photo (overlapping its edge) so it can't cover the text above. */}
            <PriceLadder className="relative z-10 mx-3 -mt-20 sm:mr-6 sm:ml-auto sm:w-[22rem] lg:absolute lg:-bottom-10 lg:-left-12 lg:m-0" />
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="bg-mist py-18 md:py-28">
        <div className="container-page">
          <h2 id="how-title" className="max-w-2xl font-display-tight text-[2rem] leading-[1.08] font-bold text-ink md:text-[2.75rem]">
            How Wallet Flights works
          </h2>

          <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {/* dotted flight path linking the steps on wide screens */}
            <span aria-hidden className="absolute top-[1.375rem] right-[16%] left-[16%] hidden border-t-2 border-dashed border-ink/20 md:block" />
            {howItWorks.map((s, i) => (
              <li key={s.title} className="relative grid grid-cols-[2.75rem_1fr] gap-4 md:block md:text-center">
                <span className="relative grid size-11 place-items-center rounded-full bg-ink font-display-tight text-[1.125rem] font-bold text-sun ring-8 ring-mist md:mx-auto">
                  {i + 1}
                </span>
                <span className="md:mt-5 md:block">
                  <span className="block text-[1.1875rem] font-semibold text-ink">{s.title}</span>
                  <span className="mx-auto mt-1.5 block max-w-xs leading-relaxed text-ink-soft">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <div id="how-we-earn" className="mt-16 grid gap-8 rounded-(--radius-frame) bg-board p-8 text-white sm:p-10 md:mt-20 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14 lg:p-14">
            <div>
              <h3 className="font-display-tight text-[1.75rem] leading-tight font-bold md:text-[2.25rem]">{aboutEarn.title}</h3>
              <div className="mt-4 space-y-3 text-[1.0625rem] leading-relaxed text-white/80">
                {aboutEarn.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href="/#search" variant="sun" size="lg">
                <MagnifyingGlass weight="bold" className="size-5" aria-hidden />
                Start a search
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost-light" size="lg">
                <Envelope className="size-5" aria-hidden />
                Contact us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
