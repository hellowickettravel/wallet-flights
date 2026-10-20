import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Kept out of crawls: API routes, the admin dashboard and the /go affiliate
// hand-off ("$" = exactly /go, so a future /good-deals page isn't caught). /flights is *not* blocked:
// its pages say noindex, and Google can only see that if it may crawl them.
const disallow = ["/api/", "/admin", "/go$", "/go?"];

// Search engines and AI answer engines are named explicitly, so the policy is
// visible and a future catch-all change can't silently drop them. Training
// crawlers are allowed too (a new brand benefits from being known to models);
// move them to a `disallow: "/"` rule if the owner opts out.
const searchAndAnswerBots = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckDuckBot",
  "DuckAssistBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
];
const trainingBots = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot", "meta-externalagent"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: searchAndAnswerBots, allow: "/", disallow },
      { userAgent: trainingBots, allow: "/", disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
