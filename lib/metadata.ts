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
  alt: `${title} | ${siteConfig.name}`,
});

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
  const ogTitle = `${title} | ${siteConfig.name}`;
  const ogImage = { ...defaultOgImage(title, description), alt: imageAlt ?? `${title} | ${siteConfig.name}` };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
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
        "@id": `${siteConfig.url}/#parent-organization`,
        name: siteConfig.parentCompany.legalName,
        alternateName: siteConfig.parentCompany.name,
        url: siteConfig.parentCompany.url,
        logo: `${siteConfig.url}${siteConfig.parentCompany.logo}`,
        description: siteConfig.parentCompany.description,
        subOrganization: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
          slogan: siteConfig.tagline,
          parentOrganization: {
            "@id": `${siteConfig.url}/#parent-organization`,
          },
          sameAs: [
            siteConfig.social.linkedin,
            siteConfig.social.github,
            siteConfig.social.x,
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#parent-organization` },
      },
    ],
  };
}
