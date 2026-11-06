import { SmartImage } from "@/components/ui/smart-image";
import { depthCopy, type DestinationDepth } from "@/content/destination-depth";

/** The first sentence of a neighbourhood's description. */
const firstSentence = (text: string) => text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? text;

/**
 * Where to stay (Batch 22): three photo tiles, name and "best for" on the
 * photo, one sentence from the neighbourhood guide below.
 */
export function StayTiles({ stay, neighbourhoods }: { stay: DestinationDepth["visual"]["stay"]; neighbourhoods: DestinationDepth["neighbourhoods"] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-3">
      {stay.map((n) => {
        const text = neighbourhoods.find((x) => x.name === n.name)?.text;
        return (
          <li key={n.name}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-(--radius-card) sm:aspect-[4/3]">
              <SmartImage photo={n.photo} sizes="(min-width: 640px) 400px, 100vw" />
              <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(15_31_61/0.82)_0%,rgb(15_31_61/0.2)_50%,transparent_75%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display-tight text-[1.375rem] leading-tight font-bold text-white">{n.name}</h3>
                <span className="mt-0.5 block text-[0.875rem] text-white/85">
                  {depthCopy.stay.bestFor} {n.bestFor[0].toLowerCase() + n.bestFor.slice(1)}
                </span>
              </div>
            </div>
            {text && <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{firstSentence(text)}</p>}
          </li>
        );
      })}
    </ul>
  );
}
