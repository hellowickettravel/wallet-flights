import { ForkKnife } from "@phosphor-icons/react/dist/ssr";
import type { Food } from "@/content/destination-depth/types";

/** What to eat (Batch 22): compact cards, the dish and one line on where to try it. */
export function FoodList({ foods }: { foods: Food[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {foods.map((f) => (
        <li key={f.name} className="rounded-(--radius-card) bg-white p-5 ring-1 ring-line">
          <h3 className="flex items-center gap-2.5 font-display-tight text-[1.1875rem] leading-snug font-bold text-ink">
            <ForkKnife className="size-5 shrink-0 text-action" weight="duotone" aria-hidden />
            {f.name}
          </h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{f.text}</p>
        </li>
      ))}
    </ul>
  );
}
