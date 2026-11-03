import { depthQuestions, destinationDepth, type AirportGuide, type Transfer } from "@/content/destination-depth";
import type { Destination } from "@/content/destinations";
import type { QuickAnswer } from "@/lib/route-facts";

/** "the" before country names that need it in a question ("the United Kingdom"). */
export const countryName = (country: string) => (/^(United|Netherlands)/.test(country) ? `the ${country}` : country);

const transferLine = (t: Transfer) => `${t.name} runs to ${t.to}${t.time ? ` in ${t.time}` : ""}${t.fare ? ` (${t.fare.text})` : ""}.`;

/** One answer covering every way into town from the main airport. */
export function transferAnswer(a: AirportGuide) {
  return a.transfers.map(transferLine).join(" ");
}

/** Where-to-stay answer: the first-visit pick, then two alternatives. */
function stayAnswer(slug: string) {
  const [first, ...rest] = destinationDepth[slug].neighbourhoods;
  const others = rest.slice(0, 2).map((n) => `${n.name} (${n.bestFor.toLowerCase()})`);
  return `For a first visit, ${first.name}: ${first.text}${others.length ? ` Also consider ${others.join(" or ")}.` : ""}`;
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
  const country = countryName(d.country);
  return [
    {
      q: depthQuestions.transfer(main.name === d.city ? `${main.name} airport` : main.name, d.city),
      a: transferAnswer(main),
      ...(main.officialPage ? { link: { label: main.officialPage.label, href: main.officialPage.url, external: true } } : {}),
    },
    { q: depthQuestions.stay(d.city), a: stayAnswer(d.slug) },
    { q: depthQuestions.days(d.city), a: depth.daysNeeded },
    { q: depthQuestions.currency(country), a: `${depth.essentials.currency}.` },
    { q: depthQuestions.plugs(country), a: `${depth.essentials.plugs}. Bring an adapter if your plugs are a different type.` },
    { q: depthQuestions.language(d.city), a: `${depth.essentials.language}.` },
    ...depth.faqs,
  ];
}
