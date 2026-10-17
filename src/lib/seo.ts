// Page metadata in one place, so every page gets the same complete set:
// canonical, og:url (always equal to the canonical), og:title/description,
// site name, locale and matching Twitter tags. Next merges metadata shallowly,
// so a page that set only `openGraph.images` used to lose everything else.
import type { Metadata } from "next";
import { site } from "@/content/site";

type Image = { url: string; width: number; height: number; alt: string };

type PageSeo = {
  /** Page title; the layout template adds " | Wallet Flights" when it fits in 60 characters. */
  title: string | { absolute: string };
  description: string;
  /** Path from the site root, e.g. "/deals". Becomes the canonical and og:url. */
  path: string;
  /** Page-specific share image; otherwise the site's generated image is used. */
  image?: Image;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  robots?: Metadata["robots"];
};

// The site's generated share card (src/app/opengraph-image.tsx). A page that
// sets its own openGraph no longer inherits it, so it's named explicitly.
const defaultImage: Image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: compare cheap flights in one place` };

/** Google cuts titles at about 60 characters; past that, the brand suffix gives way to the page's own words. */
const TITLE_MAX = 60;

export function pageMetadata({ title: given, description, path, image, type = "website", publishedTime, modifiedTime, robots }: PageSeo): Metadata {
  const title = typeof given === "string" && `${given} | ${site.name}`.length > TITLE_MAX ? { absolute: given } : given;
  const shareTitle = typeof title === "string" ? `${title} | ${site.name}` : title.absolute;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots,
    openGraph: {
      type,
      url: path,
      title: shareTitle,
      description,
      siteName: site.name,
      locale: "en_GB",
      alternateLocale: ["en_US"],
      ...(type === "article" && { publishedTime, modifiedTime }),
      images: [image ?? defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image ? { url: image.url, alt: image.alt } : { url: "/twitter-image", alt: defaultImage.alt }],
    },
  };
}

/** A 1200×630 crop of an Unsplash photo, for share cards. */
export const unsplashShareImage = (photo: { id: string; alt: string }): Image => ({
  url: `https://images.unsplash.com/${photo.id}?auto=format&fit=crop&w=1200&h=630&q=70`,
  width: 1200,
  height: 630,
  alt: photo.alt,
});
