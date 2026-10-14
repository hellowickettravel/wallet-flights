import { Marquee } from "@/components/ui/marquee";
import { logoStrip } from "@/content/airlines";

/**
 * Airline logos as stops along a dashed flight path, drifting left to right.
 * The path stays still while the stops move along it.
 */
export function AirlineStrip() {
  return (
    <section aria-labelledby="airlines-caption" className="border-b border-line py-10 md:py-12">
      <div className="container-page flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        <p id="airlines-caption" className="max-w-[15rem] shrink-0 font-display-tight text-[1.25rem] leading-snug font-bold text-ink">
          {logoStrip.caption}
        </p>
        <div className="relative min-w-0 flex-1">
          <div aria-hidden className="marquee-fade absolute inset-x-0 top-1/2 border-t-2 border-dashed border-action/25" />
          <Marquee label="Airlines we compare" duration={60}>
            {logoStrip.airlines.map((a) => (
              <div key={a.code} className="pr-8 md:pr-12">
                <div className="grid h-14 w-36 place-items-center rounded-full bg-white px-5 ring-1 ring-line md:h-16 md:w-44">
                  {/* Plain img: a fixed-size remote logo needs no resizing pipeline. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoStrip.logoUrl(a.code)} alt={a.name} width={240} height={80} loading="lazy" decoding="async" className="max-h-8 w-auto object-contain md:max-h-9" />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
