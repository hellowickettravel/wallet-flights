import { SmartImage } from "@/components/ui/smart-image";
import { SearchPanel } from "@/components/search/search-panel";
import { photos } from "@/content/images";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-page pt-3 md:pt-5">
      <div className="relative isolate overflow-hidden rounded-(--radius-frame) bg-ink">
        <SmartImage photo={photos.hero} sizes="(min-width: 1280px) 1216px, 100vw" priority imgClassName="object-[center_62%]" />
        {/* Scrim keeps the headline at AA contrast over any part of the photo. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(100deg,rgb(15_31_61/0.86)_0%,rgb(15_31_61/0.62)_42%,rgb(15_31_61/0.12)_75%),linear-gradient(0deg,rgb(15_31_61/0.55)_0%,transparent_45%)]"
        />
        <div className="relative px-6 pt-14 pb-40 sm:px-10 md:pt-20 md:pb-44 lg:px-14 lg:pt-24 lg:pb-48">
          <div className="max-w-[40rem]">
            <Reveal>
              <h1
                id="hero-title"
                className="font-display-tight text-[2.75rem] leading-[1.02] font-extrabold text-white sm:text-[3.75rem] lg:text-[4.5rem]"
              >
                Where to next? We’ll find the fare.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white/85 md:text-[1.1875rem]">
                Search flights worldwide, then book online or with a travel expert who can sort seats, bags and
                changes for you.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal delay={0.2} className="relative z-10 -mt-28 px-0 sm:px-4 md:-mt-32 lg:px-8">
        <SearchPanel />
      </Reveal>
    </section>
  );
}
