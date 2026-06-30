import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { CredibilityBand } from "@/components/sections/credibility-band";
import { FoundersProgramSection } from "@/components/sections/founders-program-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyTrynSection } from "@/components/sections/why-tryn-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { EngineeringTeaser } from "@/components/sections/engineering-teaser";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { faqItems } from "@/lib/faq";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.tagline.replace(/\.$/, ""),
  description: siteConfig.description,
  path: "/",
  imageAlt: `${siteConfig.name} | ${siteConfig.tagline}`,
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <CredibilityBand />
      <FoundersProgramSection />
      <ServicesSection />
      <CaseStudiesSection />
      <WhyTrynSection />
      <EngineeringTeaser />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
