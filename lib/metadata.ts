import type { Metadata } from "next";
import { siteConfig } from "./site-config";

function ogImageUrl(title: string, subtitle?: string) {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  return `/api/og?${params.toString()}`;
}

const defaultOgImage = (title: string, description: string) => ({
  url: ogImageUrl(title, description),
  width: 1200,
  height: 630,
  alt: formatPageTitle(title),
});

export function formatPageTitle(pageTitle: string) {
  return `${siteConfig.name} | ${pageTitle}`;
}

export type BreadcrumbItem = { name: string; path: string };

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function createServiceJsonLd(service: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "Worldwide",
    url: service.url,
  };
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  /** Override default OG image alt for page-specific context */
  imageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path = "",
  imageAlt,
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = formatPageTitle(title);
  const ogImage = {
    ...defaultOgImage(title, description),
    alt: imageAlt ?? fullTitle,
  };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logo}`,
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        email: siteConfig.contact.email,
        sameAs: [
          siteConfig.social.linkedin,
          siteConfig.social.github,
          siteConfig.social.x,
        ],
        parentOrganization: {
          "@type": "Organization",
          name: siteConfig.parentCompany.legalName,
          url: siteConfig.parentCompany.url,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.contact.email,
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en-US",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}
