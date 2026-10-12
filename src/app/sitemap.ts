import type { MetadataRoute } from "next";
import { destinations } from "@/content/destinations";
import { guides } from "@/content/guides";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) => ({
    url: `${site.url}${path}`,
    priority,
    changeFrequency,
  });
  return [
    page("", 1, "daily"),
    page("/deals", 0.9, "daily"),
    page("/destinations", 0.8, "weekly"),
    ...destinations.map((d) => page(`/destinations/${d.slug}`, 0.7, "monthly")),
    page("/airlines", 0.6, "monthly"),
    page("/travel-guides", 0.6, "weekly"),
    ...guides.map((g) => ({ ...page(`/travel-guides/${g.slug}`, 0.6, "monthly"), lastModified: g.published })),
    page("/about", 0.5, "monthly"),
    page("/contact", 0.5, "yearly"),
    page("/help", 0.5, "monthly"),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms-and-conditions", 0.2, "yearly"),
    page("/cookie-policy", 0.2, "yearly"),
    page("/photo-credits", 0.1, "yearly"),
  ];
}
