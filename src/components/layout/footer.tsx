import Link from "next/link";
import { EnvelopeSimple, Phone, Clock } from "@phosphor-icons/react/dist/ssr";
import { footerNav, site } from "@/content/site";
import { CurrentYear } from "@/components/ui/current-year";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-12 pt-16 pb-10 lg:grid-cols-[1.2fr_2fr] lg:gap-16 lg:pt-20">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm leading-relaxed text-white/70">
            Flights worldwide, found and booked by people who answer the phone. Search online or call a travel
            expert any day of the week.
          </p>
          <ul className="mt-8 space-y-3 text-[0.9375rem]">
            <li>
              <a href={site.phone.href} className="inline-flex items-center gap-3 font-semibold hover:text-sun">
                <Phone weight="fill" className="size-5 text-sun" aria-hidden />
                <span className="tabular">{site.phone.display}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-white/85 hover:text-sun">
                <EnvelopeSimple className="size-5 text-sun" aria-hidden />
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-3 text-white/70">
              <Clock className="size-5 text-sun" aria-hidden />
              {site.hours}
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {footerNav.map((col) => (
            <div key={col.title}>
              <h2 className="text-[0.9375rem] font-semibold text-white">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[0.9375rem] text-white/65 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-8 text-[0.8125rem] leading-relaxed text-white/55 md:flex-row md:justify-between">
          <p className="max-w-3xl">
            Fares shown are examples of round-trip economy prices per person, including taxes, and are subject
            to availability. Your final price is confirmed before payment. {site.name} is a travel agency and is not
            an airline.
          </p>
          <p className="shrink-0">© <CurrentYear /> {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
