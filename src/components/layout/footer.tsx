import Link from "next/link";
import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { footerNav, footerNotice, site } from "@/content/site";
import { CurrentYear } from "@/components/ui/current-year";
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { TrustpilotStar } from "@/components/ui/trustpilot-star";
import { Logo } from "./logo";

const socialIcons = { Instagram: InstagramLogo, X: XLogo, Facebook: FacebookLogo } as const;

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-12 pt-16 pb-10 lg:grid-cols-[1.2fr_2fr] lg:gap-16 lg:pt-20">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm leading-relaxed text-white/70">
            Compare flight prices from airlines and travel sites in one search, sorted cheapest first. Based in London,
            for travellers in the US and UK.
          </p>
          <ul className="mt-8 space-y-3 text-[0.9375rem]">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 font-semibold hover:text-sun">
                <EnvelopeSimple className="size-5 text-sun" aria-hidden />
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phone.whatsapp} target="_blank" rel="noopener" className="inline-flex items-center gap-3 text-white/85 hover:text-sun">
                <WhatsappLogo className="size-5 text-sun" aria-hidden />
                <span>
                  <span className="tabular">{site.phone.display}</span>
                  <span className="sr-only"> (opens WhatsApp)</span>
                  <span className="block text-[0.8125rem] text-white/60">{site.phone.note}</span>
                </span>
              </a>
            </li>
            <li className="inline-flex items-center gap-3 text-white/70">
              <MapPin className="size-5 text-sun" aria-hidden />
              {site.location}
            </li>
          </ul>
          <ul className="mt-7 flex gap-2" aria-label="Wallet Flights on social media">
            {site.social.map((s) => {
              const Icon = socialIcons[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="grid size-11 place-items-center rounded-full text-white/80 ring-1 ring-white/20 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href={site.trustpilot}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.9375rem] text-white/80 ring-1 ring-white/20 transition-colors hover:bg-white/10 hover:text-white"
          >
            <TrustpilotStar className="size-5" />
            <span>
              Review us on <span className="font-bold text-white">Trustpilot</span>
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
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
          <div className="max-w-3xl space-y-2">
            <p>{footerNotice.comparison}</p>
            <p>{footerNotice.prices}</p>
            <p id="affiliate-disclosure">
              <strong className="font-semibold text-white/75">Affiliate disclosure:</strong> {footerNotice.affiliate}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 md:items-end">
            <CookieSettingsButton className="cursor-pointer text-left font-semibold text-white/75 underline-offset-4 hover:text-white hover:underline" />
            <p>
              © <CurrentYear /> {site.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

