import type { Metadata } from "next";

import { commerceConfig, contactConfig } from "@/lib/contact-config";
import type { AppRoute } from "@/lib/content/navigation";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type PageMetadataInput = {
  title: string;
  description: string;
  path: AppRoute;
  /** Set for pages that should stay out of the index. */
  noindex?: boolean;
};

export function buildMetadata({ title, description, path, noindex }: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = path === "/" ? siteConfig.title : `${title} — ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.ogLocale,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
export type JsonLdObject = { [key: string]: JsonLdValue };

const postalAddress: JsonLdObject = {
  "@type": "PostalAddress",
  streetAddress: contactConfig.street,
  addressLocality: contactConfig.city,
  postalCode: contactConfig.postalCode,
  addressCountry: contactConfig.country,
};

/**
 * Organization + business identity.
 *
 * Deliberately omitted: `openingHours` (not confirmed), `email` (not
 * confirmed), `sameAs` social profiles (not confirmed) and any
 * `aggregateRating` / `review` data (the on-site testimonials are demo
 * content). Publishing those would be unverified structured data.
 */
export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: contactConfig.brand,
    url: siteConfig.url,
    description: siteConfig.description,
    address: postalAddress,
    telephone: contactConfig.phoneHref,
    areaServed: { "@type": "City", name: contactConfig.city },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: contactConfig.phoneHref,
      availableLanguage: ["uk"],
      areaServed: "UA",
    },
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.htmlLang,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

/** Both types apply: a florist that operates as a wholesale supplier. */
export function wholesaleBusinessSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": ["Florist", "WholesaleStore"],
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    image: absoluteUrl("/images/og/cover.webp"),
    address: postalAddress,
    telephone: contactConfig.phoneHref,
    hasMap: contactConfig.mapsUrl,
    currenciesAccepted: commerceConfig.currency,
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
    makesOffer: {
      "@type": "Offer",
      name: "Оптові поставки свіжих квітів",
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: commerceConfig.minimumOrder,
        unitCode: commerceConfig.currency,
      },
      availableAtOrFrom: { "@id": `${siteConfig.url}/#business` },
    },
  };
}

export function breadcrumbSchema(
  trail: readonly { readonly name: string; readonly path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(
  items: readonly { readonly question: string; readonly answer: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
