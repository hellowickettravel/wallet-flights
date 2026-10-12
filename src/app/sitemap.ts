import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Extended with every page as each batch ships (see docs/PLAN.md).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
