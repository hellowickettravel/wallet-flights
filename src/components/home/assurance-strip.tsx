import { Headset, Scales, ShieldCheck, ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";

const items = [
  { icon: Headset, title: "Real people on the phone", text: "Travel experts who book, check and follow up." },
  { icon: Scales, title: "Fares compared for you", text: "Routes across many airlines, side by side." },
  { icon: ArrowsClockwise, title: "Help after you book", text: "Changes, cancellations and schedule updates." },
  { icon: ShieldCheck, title: "Secure booking", text: "Encrypted payments, price confirmed before you pay." },
];

export function AssuranceStrip() {
  return (
    <section aria-label="Why book with us" className="container-page mt-10 md:mt-14">
      <ul className="grid grid-cols-1 gap-x-8 gap-y-6 border-b border-line pb-10 sm:grid-cols-2 lg:grid-cols-4 md:pb-14">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mist text-action">
              <Icon className="size-[1.375rem]" aria-hidden />
            </span>
            <span>
              <span className="block font-semibold text-ink">{title}</span>
              <span className="mt-0.5 block text-[0.9375rem] leading-snug text-ink-soft">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
