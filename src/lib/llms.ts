// /llms.txt and /llms-full.txt (https://llmstxt.org): a plain-text map of the
// site for AI assistants and answer engines. Built from src/content only, so
// it can't drift from what the pages say.
import { aboutEarn, aboutIntro } from "@/content/about";
import { routes } from "@/content/deals";
import { destinationGuides } from "@/content/destination-guides";
import { destinations } from "@/content/destinations";
import { guides } from "@/content/guides";
import { helpTopics } from "@/content/help";
import { footerNotice, site } from "@/content/site";

const url = (path: string) => `${site.url}${path}`;

function header() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.name} (${site.url.replace("https://", "")}) is a flight price comparison site based in London for travellers in the UK and US. It searches airlines and travel sites and lists fares from cheapest to most expensive; travellers then book and pay with the provider they choose. Searching is free.`,
    "",
    "## Key facts",
    `- Based in: ${site.location}`,
    `- For: ${site.markets}`,
    `- Contact: ${site.email}, phone or WhatsApp ${site.phone.display} (${site.phone.note.toLowerCase()}). ${site.responseTime}.`,
    `- How it works: ${aboutIntro.paragraphs[2]}`,
    `- How we make money: ${aboutEarn.paragraphs.join(" ")}`,
    `- Prices: ${footerNotice.prices}`,
    `- Reviews: ${site.trustpilot}`,
    "",
  ];
}

export function llmsTxt() {
  return [
    ...header(),
    "## About and help",
    `- [How ${site.name} works and how we make money](${url("/about")})`,
    `- [Help centre: comparing, booking, changes and refunds, fare alerts](${url("/help")})`,
    `- [Contact](${url("/contact")})`,
    "",
    "## Destinations (best time to visit, airports, flight times)",
    ...destinations.map((d) => `- [${d.city}, ${d.country}](${url(`/destinations/${d.slug}`)}): ${d.blurb}`),
    "",
    "## Flight deals",
    `- [Flight deals from the US and UK](${url("/deals")})`,
    `- [Airlines we compare](${url("/airlines")})`,
    "",
    "## Travel guides",
    ...guides.map((g) => `- [${g.title}](${url(`/travel-guides/${g.slug}`)}): ${g.excerpt}`),
    "",
    "## Policies",
    `- [Terms and conditions](${url("/terms-and-conditions")})`,
    `- [Privacy policy](${url("/privacy-policy")})`,
    `- [Cookie policy](${url("/cookie-policy")})`,
    "",
    "## Optional",
    `- [Full text of help, destinations and guides](${url("/llms-full.txt")})`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  return [
    ...header(),
    "## Help centre",
    ...helpTopics.flatMap((t) => [`### ${t.title}`, ...t.items.flatMap((i) => [`**${i.q}**`, i.a, ""])]),
    "## Destinations",
    ...destinations.flatMap((d) => {
      const g = destinationGuides[d.slug];
      return [
        `### ${d.city}, ${d.country}`,
        `Page: ${url(`/destinations/${d.slug}`)}`,
        `Main airport: ${d.airport}`,
        ...(g ? [g.intro, `Best time to visit: ${g.bestTime}.`, `Highlights: ${g.highlights.join("; ")}.`, `Tip: ${g.tip}`] : []),
        "",
      ];
    }),
    "## Routes with their own page",
    ...routes.map((r) => `- [${r.origin.city} to ${r.destination.city}](${url(`/routes/${r.slug}`)})`),
    "",
    "## Travel guides",
    ...guides.flatMap((g) => [
      `### ${g.title}`,
      `Page: ${url(`/travel-guides/${g.slug}`)} (published ${g.published})`,
      ...g.sections.flatMap((s) => [`#### ${s.heading}`, ...s.paragraphs, ...(s.list ?? []).map((li) => `- ${li}`), ""]),
    ]),
  ].join("\n");
}
