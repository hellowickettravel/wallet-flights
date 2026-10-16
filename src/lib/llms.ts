// /llms.txt and /llms-full.txt (https://llmstxt.org): a plain-text map of the
// site for AI assistants and answer engines. Built from src/content only, so
// it can't drift from what the pages say.
import { aboutEarn, aboutIntro } from "@/content/about";
import { routes } from "@/content/deals";
import { destinationGuides } from "@/content/destination-guides";
import { destinations } from "@/content/destinations";
import { guides, plainText } from "@/content/guides";
import { helpTopics } from "@/content/help";
import { company, companyLine, footerNotice, site } from "@/content/site";
import { routeQuickAnswers, routeTimeDifference } from "@/lib/route-facts";

const url = (path: string) => `${site.url}${path}`;

function header() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.name} (${site.url.replace("https://", "")}) is a flight price comparison site based in London for travellers in the UK and US. It searches airlines and travel sites and lists fares from cheapest to most expensive; travellers then book and pay with the provider they choose, or ask the team on WhatsApp to book a flight for them. Searching is free. ${site.name} is a trading name of ${company.legalName}.`,
    "",
    "## Key facts",
    `- Based in: ${site.location}`,
    `- For: ${site.markets}`,
    `- Contact: ${site.email}, phone or WhatsApp ${site.phone.display} (${site.phone.note.toLowerCase()}). ${site.responseTime}.`,
    `- How it works: ${aboutIntro.paragraphs[2]}`,
    `- Booking by phone: ${footerNotice.manual}`,
    `- Company: ${companyLine}`,
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
    "## Routes (flight time, distance, time difference, airports, passenger rights)",
    ...routes.map((r) => `- [${r.origin.city} to ${r.destination.city}](${url(`/routes/${r.slug}`)})`),
    "",
    "## Travel guides",
    ...guides.map((g) => `- [${g.title}](${url(`/travel-guides/${g.slug}`)}): ${g.excerpt}`),
    "",
    "## Policies",
    `- [Terms and conditions](${url("/terms-and-conditions")})`,
    `- [Privacy policy](${url("/privacy-policy")})`,
    `- [Cookie policy](${url("/cookie-policy")})`,
    `- [Editorial policy](${url("/editorial-policy")})`,
    "",
    "## Optional",
    `- [Full text of help, destinations, routes and guides](${url("/llms-full.txt")})`,
    "",
  ].join("\n");
}

export async function llmsFullTxt() {
  // The time difference reads the clock, so it comes from the cached helper.
  const diffs = await Promise.all(routes.map((r) => routeTimeDifference(r.slug)));
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
        ...(g ? [g.intro, `Best time to visit: ${g.bestTime}.`, g.whenToGo, `Highlights: ${g.highlights.join("; ")}.`, `Flying there: ${g.flying}`, `Tip: ${g.tip}`, `Entry requirements: ${g.entry.label} (${g.entry.url})`] : []),
        "",
      ];
    }),
    "## Routes",
    ...routes.flatMap((r, i) => [
      `### ${r.origin.city} to ${r.destination.city}`,
      `Page: ${url(`/routes/${r.slug}`)}`,
      // Flight times and distances are estimates from the great-circle distance, as on the page.
      ...routeQuickAnswers(r, diffs[i]).flatMap((x) => [`**${x.q}**`, x.a, ""]),
    ]),
    "## Travel guides",
    ...guides.flatMap((g) => [
      `### ${g.title}`,
      `Page: ${url(`/travel-guides/${g.slug}`)} (published ${g.published}${g.updated ? `, updated ${g.updated}` : ""})`,
      ...(g.summary ? ["#### The short answer", ...g.summary.map((x) => `- ${plainText(x)}`), ""] : []),
      ...g.sections.flatMap((s) => [
        `#### ${s.heading}`,
        ...s.paragraphs.map(plainText),
        ...(s.list ?? []).map((li, i) => `${s.ordered ? `${i + 1}.` : "-"} ${plainText(li)}`),
        ...(s.table ? [`| ${s.table.head.join(" | ")} |`, `|${s.table.head.map(() => "---").join("|")}|`, ...s.table.rows.map((r) => `| ${r.map(plainText).join(" | ")} |`)] : []),
        ...(s.tip ? [`Tip: ${plainText(s.tip)}`] : []),
        "",
      ]),
      ...(g.faqs ? ["#### Questions", ...g.faqs.flatMap((f) => [`**${f.q}**`, plainText(f.a), ""])] : []),
      ...(g.sources ? ["#### Sources", ...g.sources.map((s) => `- [${s.label}](${s.url})`), ""] : []),
    ]),
  ].join("\n");
}
