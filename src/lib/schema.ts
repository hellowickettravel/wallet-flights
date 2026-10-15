// schema.org building blocks. The organisation and website are defined once,
// with stable @ids, and every other block points at them, so search engines
// and AI engines see one consistent entity. Facts come from src/content only.
import { site } from "@/content/site";

export const orgId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;
export const orgRef = { "@id": orgId };

const telephone = site.phone.href.replace("tel:", ""); // E.164
const countries = [
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Country", name: "United States" },
];

export const organization = {
  "@type": "Organization",
  "@id": orgId,
  name: site.name,
  alternateName: "WalletFlights",
  url: site.url,
  logo: { "@type": "ImageObject", url: `${site.url}/icon-512.png`, width: 512, height: 512 },
  description: site.description,
  email: site.email,
  telephone,
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  areaServed: countries,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone,
    email: site.email,
    areaServed: ["GB", "US"],
    availableLanguage: "English",
  },
  sameAs: [...site.social.map((s) => s.href), site.trustpilot],
};

export const website = {
  "@type": "WebSite",
  "@id": websiteId,
  name: site.name,
  alternateName: "WalletFlights",
  url: site.url,
  inLanguage: "en-GB",
  publisher: orgRef,
};

/** BreadcrumbList for a trail that starts at Home. */
export function breadcrumbList(trail: { label: string; href: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href === "/" ? "" : c.href}`,
    })),
  };
}

/** The script tag content, with "<" escaped so text can't close the tag. */
export const jsonLdHtml = (data: object) => ({ __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") });
