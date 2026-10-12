import { ArrowSquareOut, MagnifyingGlass, SortAscending, Tag } from "@phosphor-icons/react/dist/ssr";

const items = [
  { icon: MagnifyingGlass, title: "One search, many sites", text: "Prices from airlines and travel sites side by side." },
  { icon: SortAscending, title: "Cheapest first", text: "Results sorted from the lowest price to the highest." },
  { icon: ArrowSquareOut, title: "Book with the provider", text: "Pick a deal and book it on the provider’s own site." },
  { icon: Tag, title: "Free to use", text: "No fees and no sign-up to search and compare." },
];

export function AssuranceStrip() {
  return (
    <section aria-label="Why compare with us" className="container-page mt-10 md:mt-14">
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
