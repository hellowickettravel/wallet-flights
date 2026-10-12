import type { Metadata } from "next";
import { EnvelopeSimple, FacebookLogo, InstagramLogo, MapPin, Phone, XLogo, Receipt } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { bookingNote } from "@/content/contact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Questions about a deal, a booking or partnering with ${site.name}? Send us a message. ${site.responseTime}.`,
  alternates: { canonical: "/contact" },
};

const socialIcons = { Instagram: InstagramLogo, X: XLogo, Facebook: FacebookLogo } as const;

const channels = [
  { icon: EnvelopeSimple, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone.display, href: site.phone.href },
  { icon: MapPin, label: "Based in", value: site.location },
];

export default function ContactPage() {
  return (
    <section aria-labelledby="page-title" className="pb-18 md:pb-28">
      <PageHeader title="Get in touch" intro={`Questions about a deal, a booking or working with us? ${site.responseTime}.`} crumbs={[{ label: "Contact", href: "/contact" }]} />

      <div className="container-page mt-10 grid gap-10 md:mt-14 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <ContactForm />

        <aside aria-label="Other ways to reach us" className="space-y-8">
          <div>
            <h2 className="font-display-tight text-[1.5rem] font-bold text-ink">Reach us directly</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {channels.map(({ icon: Icon, label, value, href }) => {
                const body = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mist text-action">
                      <Icon className="size-[1.375rem]" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.8125rem] text-ink-soft">{label}</span>
                      <span className="tabular block truncate text-[1.0625rem] font-semibold text-ink">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="group flex items-center gap-4 py-4 hover:[&_.text-ink]:text-action">
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 py-4">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-[1.0625rem] font-semibold text-ink">Follow us</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {site.social.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.9375rem] font-medium text-ink ring-1 ring-line transition-colors hover:bg-mist"
                    >
                      <Icon className="size-5" aria-hidden />
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-(--radius-card) bg-board p-6 text-white">
            <p className="flex items-center gap-2.5 font-semibold">
              <Receipt className="size-5 text-sun" aria-hidden />
              Already booked a flight?
            </p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/80">{bookingNote}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
