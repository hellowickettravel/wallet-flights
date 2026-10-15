import Link from "next/link";
import type { ReactNode } from "react";
import { destinations } from "@/content/destinations";

const byCity = new Map(destinations.map((d) => [d.city, d.slug]));
const pattern = new RegExp(`\\b(${[...byCity.keys()].sort((a, b) => b.length - a.length).join("|")})\\b`, "g");

/**
 * Turns the first mention of each destination in a guide into a link to its
 * page. `seen` is shared across the whole guide so a city is linked once.
 */
export function linkDestinations(text: string, seen: Set<string>): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    const city = m[1];
    if (seen.has(city)) continue;
    seen.add(city);
    out.push(text.slice(last, m.index));
    out.push(
      <Link key={`${city}-${m.index}`} href={`/destinations/${byCity.get(city)}`} className="font-medium text-action underline underline-offset-4 hover:text-action-deep">
        {city}
      </Link>,
    );
    last = m.index + city.length;
  }
  out.push(text.slice(last));
  return out;
}
