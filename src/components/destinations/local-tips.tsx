import {
  Clock,
  CloudSun,
  Coins,
  Drop,
  FirstAidKit,
  ForkKnife,
  Handshake,
  ShieldCheck,
  SimCard,
  Ticket,
  Train,
  TShirt,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { LocalTip, TipIcon } from "@/content/destination-depth/types";

const icons: Record<TipIcon, Icon> = {
  money: Coins,
  transport: Train,
  safety: ShieldCheck,
  etiquette: Handshake,
  phone: SimCard,
  food: ForkKnife,
  water: Drop,
  weather: CloudSun,
  ticket: Ticket,
  clock: Clock,
  dress: TShirt,
  health: FirstAidKit,
};

/** Know before you go (Batch 22): an icon grid of short, city-specific tips. */
export function LocalTips({ tips }: { tips: LocalTip[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {tips.map((t) => {
        const TipGlyph = icons[t.icon] ?? ShieldCheck;
        return (
          <li key={t.title} className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-mist">
              <TipGlyph className="size-6 text-action" weight="duotone" aria-hidden />
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold leading-snug text-ink">{t.title}</h3>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{t.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
