import { programs, travelpayouts, type ProgramId } from "@/content/affiliates";

/**
 * Sub IDs name the placement a click came from, so Travelpayouts reports
 * (Group by SubID) show which button earns. Travelpayouts allows Latin
 * letters, digits and `_` only (support article 203955653), so anything else,
 * including the `-` in our slugs, becomes `_`: "destination_new-york_hotels" →
 * "destination_new_york_hotels". Used for links and the live search's marker alike.
 */
export type SubId = string;
export const cleanSubId = (s: SubId) => s.toLowerCase().replace(/[^a-z0-9_]+/g, "_").slice(0, 64) || "site";

/**
 * Affiliate link in the exact format the dashboard's link generator produces:
 * https://tp.media/r?campaign_id=…&marker=…&p=…&sub_id=…&trs=…&u=<encoded url>
 */
export function affiliateUrl(program: ProgramId, destination: string, subId: SubId) {
  const pr = programs[program];
  return (
    `https://tp.media/r?campaign_id=${pr.campaignId}&marker=${travelpayouts.marker}&p=${pr.p}` +
    `&sub_id=${encodeURIComponent(cleanSubId(subId))}&trs=${travelpayouts.trs}&u=${encodeURIComponent(destination)}`
  );
}

/** True when `url` is https and on one of the program's own hosts. */
export function isProgramUrl(program: ProgramId, url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && programs[program].hosts.includes(u.hostname);
  } catch {
    return false;
  }
}

export const isProgramId = (v: string | null | undefined): v is ProgramId => !!v && Object.hasOwn(programs, v);

/** Aviasales search page for a Data API `link` ("/search/LON2611NYC0312?t=…"). */
export const aviasalesUrl = (path: string) => `https://www.aviasales.com${path.startsWith("/") ? path : `/${path}`}`;

/** Attributes every outbound affiliate anchor should carry. */
export const sponsoredLink = { rel: "sponsored noopener", target: "_blank" } as const;
