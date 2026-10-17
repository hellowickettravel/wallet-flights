import type { MetadataRoute } from "next";
import { routes } from "@/content/deals";
import { destinations } from "@/content/destinations";
import { guides } from "@/content/guides";
import { site } from "@/content/site";
import { updated } from "@/content/updated";

// Google uses only <loc> and an accurate <lastmod>; priority and changefreq are ignored.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified: string) => ({ url: `${site.url}${path}`, lastModified });
  return [
    page("", updated.home),
    page("/deals", updated.deals),
    page("/destinations", updated.destinations),
    ...destinations.map((d) => page(`/destinations/${d.slug}`, updated.destinations)),
    // Every route page answers the flight-time and route questions, so all are listed (fares or not).
    ...routes.map((r) => page(`/routes/${r.slug}`, updated.routes)),
    page("/airlines", updated.airlines),
    page("/fare-calendar", updated.fareCalendar),
    page("/flight-delay-compensation", updated.compensation),
    page("/travel-guides", updated.travelGuides),
    ...guides.map((g) => page(`/travel-guides/${g.slug}`, g.updated ?? g.published)),
    page("/about", updated.about),
    page("/contact", updated.contact),
    page("/help", updated.help),
    page("/editorial-policy", updated.editorial),
    page("/privacy-policy", updated.legal),
    page("/terms-and-conditions", updated.legal),
    page("/cookie-policy", updated.legal),
    page("/photo-credits", updated.photoCredits),
  ];
}
