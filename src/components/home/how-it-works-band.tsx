import { EnvelopeSimple, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { SmartImage } from "@/components/ui/smart-image";
import { ButtonLink } from "@/components/ui/button";
import { photos } from "@/content/images";
import { howItWorks } from "@/content/how-it-works";
import { site } from "@/content/site";

export function HowItWorksBand() {
  return (
    <section aria-labelledby="how-title" className="bg-mist py-18 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius-frame) sm:aspect-[5/4] lg:aspect-[4/5]">
            <SmartImage photo={photos.traveller} sizes="(min-width: 1024px) 480px, 90vw" />
          </div>
          <div className="absolute right-4 -bottom-6 left-4 rounded-2xl bg-white p-4 shadow-(--shadow-float) sm:right-auto sm:-left-6 sm:w-72">
            <p className="text-[0.8125rem] text-ink-soft">Questions? {site.responseTime}.</p>
            <a href={`mailto:${site.email}`} className="mt-1.5 flex items-center gap-2.5 text-[1.0625rem] font-bold text-ink hover:text-action">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-action text-white">
                <EnvelopeSimple weight="fill" className="size-[1.125rem]" aria-hidden />
              </span>
              {site.email}
            </a>
          </div>
        </div>

        <div className="pt-6 lg:pt-0">
          <h2 id="how-title" className="font-display-tight text-[2rem] leading-[1.08] font-bold text-ink md:text-[2.75rem]">
            How Wallet Flights works
          </h2>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
            Instead of opening ten tabs, search once. We put prices from airlines and travel sites side by side so the
            best deal is easy to spot.
          </p>

          <ol className="mt-10 space-y-7">
            {howItWorks.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.75rem_1fr] gap-4">
                <span className="grid size-11 place-items-center rounded-full bg-ink font-display-tight text-[1.125rem] font-bold text-sun">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-[1.125rem] font-semibold text-ink">{s.title}</span>
                  <span className="mt-1 block leading-relaxed text-ink-soft">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/#search" size="lg">
              <MagnifyingGlass weight="bold" className="size-5" aria-hidden />
              Start a search
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary" size="lg">
              More about us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
