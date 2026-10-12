import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Extended with every page as each batch ships (see docs/PLAN.md).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, changeFrequency: "daily", priority: 1 }];
}
