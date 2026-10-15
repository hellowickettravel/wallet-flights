import type { MetadataRoute } from "next";
import { routes } from "@/content/deals";
import { destinations } from "@/content/destinations";
import { guides } from "@/content/guides";
import { site } from "@/content/site";
import { updated } from "@/content/updated";
import { routeFares } from "@/lib/fares";

// Google uses only <loc> and an accurate <lastmod>; priority and changefreq are ignored.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Route pages are listed only while they have a fare (they're noindex otherwise).
  const fares = await routeFares();
  const page = (path: string, lastModified: string) => ({ url: `${site.url}${path}`, lastModified });
  return [
    page("", updated.home),
    page("/deals", updated.deals),
    page("/destinations", updated.destinations),
    ...destinations.map((d) => page(`/destinations/${d.slug}`, updated.destinations)),
    ...routes.filter((r) => fares[r.slug]).map((r) => page(`/routes/${r.slug}`, updated.routes)),
    page("/airlines", updated.airlines),
    page("/travel-guides", updated.travelGuides),
    ...guides.map((g) => page(`/travel-guides/${g.slug}`, g.published)),
    page("/about", updated.about),
    page("/contact", updated.contact),
    page("/help", updated.help),
    page("/privacy-policy", updated.legal),
    page("/terms-and-conditions", updated.legal),
    page("/cookie-policy", updated.legal),
    page("/photo-credits", updated.photoCredits),
  ];
}
