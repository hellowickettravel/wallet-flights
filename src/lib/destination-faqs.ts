import { depthQuestions, destinationDepth, type AirportGuide, type Transfer } from "@/content/destination-depth";
import type { Destination } from "@/content/destinations";
import type { QuickAnswer } from "@/lib/route-facts";


/** "First visits" → "first visits", keeping proper nouns ("old Tokyo") intact. */
export const lowerFirst = (text: string) => text[0].toLowerCase() + text.slice(1);

/** "From £10 booked in advance" reads "from £10 booked in advance" mid-sentence. */
const midSentence = (text: string) => text.replace(/^(From|About)\b/, (w) => w.toLowerCase());
const transferLine = (t: Transfer) => `${t.name} runs to ${t.to}${t.time ? ` in ${t.time}` : ""}${t.fare ? ` (${midSentence(t.fare.text)})` : ""}.`;

/** One answer covering every way into town from the main airport. */
export function transferAnswer(a: AirportGuide) {
  return a.transfers.map(transferLine).join(" ");
}

/** Where-to-stay answer: the first-visit pick, then two alternatives. */
function stayAnswer(slug: string) {
  const [first, ...rest] = destinationDepth[slug].neighbourhoods;
  const others = rest.slice(0, 2).map((n) => `${n.name} (${lowerFirst(n.bestFor)})`);
  return `For a first visit, ${first.name}. ${first.text}${others.length ? ` Also consider ${others.join(" or ")}.` : ""}`;
}

/**
 * The phase-2 questions for a destination, after the four it already had
 * (best time, airports, flight time, entry). Every answer is shown on the
 * page and used in the FAQPage markup.
 */
export function depthAnswers(d: Destination): QuickAnswer[] {
  const depth = destinationDepth[d.slug];
  if (!depth) return [];
  const main = depth.airports[0];
  return [
    {
      q: depthQuestions.transfer(main.name === d.city ? `${main.name} airport` : main.name, d.city),
      a: transferAnswer(main),
      ...(main.officialPage ? { link: { label: main.officialPage.label, href: main.officialPage.url, external: true } } : {}),
    },
    { q: depthQuestions.stay(d.city), a: stayAnswer(d.slug) },
    { q: depthQuestions.days(d.city), a: depth.daysNeeded },
    { q: depthQuestions.gettingAround(d.city), a: depth.gettingAround },
    ...depth.faqs,
  ];
}
