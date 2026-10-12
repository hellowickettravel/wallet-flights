import { Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { SmartImage } from "@/components/ui/smart-image";
import { ButtonLink } from "@/components/ui/button";
import { photos } from "@/content/images";
import { site } from "@/content/site";

const steps = [
  { title: "Tell us your trip", text: "Call, or send your dates and cities. Flexible dates help us find more." },
  { title: "We compare the options", text: "Your agent checks routes, connections and fares across airlines and explains the trade-offs." },
  { title: "Approve and fly", text: "You confirm the final price, we book it and email your e-ticket. We’re here if plans change." },
];

export function AgentBand() {
  return (
    <section aria-labelledby="agent-title" className="bg-mist py-18 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius-frame) sm:aspect-[5/4] lg:aspect-[4/5]">
            <SmartImage photo={photos.agent} sizes="(min-width: 1024px) 480px, 90vw" imgClassName="object-[center_30%]" />
          </div>
          <div className="absolute right-4 -bottom-6 left-4 rounded-2xl bg-white p-4 shadow-(--shadow-float) sm:right-auto sm:-left-6 sm:w-72 lg:-left-10">
            <p className="text-[0.8125rem] text-ink-soft">{site.hours}</p>
            <a href={site.phone.href} className="mt-1 flex items-center gap-2.5 text-[1.25rem] font-bold text-ink hover:text-action">
              <span className="grid size-9 place-items-center rounded-full bg-fare text-white">
                <Phone weight="fill" className="size-[1.125rem]" aria-hidden />
              </span>
              <span className="tabular">{site.phone.display}</span>
            </a>
          </div>
        </div>

        <div className="pt-6 lg:pt-0">
          <h2 id="agent-title" className="font-display-tight text-[2rem] leading-[1.08] font-bold text-ink md:text-[2.75rem]">
            Prefer to book with a person?
          </h2>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
            Complicated routes, family trips, last-minute changes — some bookings are easier when someone who does this
            every day is on the other end of the line.
          </p>

          <ol className="mt-10 space-y-7">
            {steps.map((s, i) => (
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
            <ButtonLink href={site.phone.href} size="lg">
              <Phone weight="fill" className="size-5" aria-hidden />
              Call {site.phone.display}
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              <EnvelopeSimple className="size-5" aria-hidden />
              Send your trip details
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
