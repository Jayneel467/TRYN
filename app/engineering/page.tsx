import type { Metadata } from "next";
import Link from "next/link";
import { CodeSnippetTabs } from "@/components/shared/code-snippet-tabs";
import { EngineeringSection } from "@/components/sections/engineering-section";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Engineering",
  description:
    "Technology agnostic product engineering. We choose the right stack based on your business goals.",
  path: "/engineering",
});

export default function EngineeringPage() {
  return (
    <>
      <PageHero
        eyebrow="Engineering"
        title="Technology agnostic. Business focused."
        lead="Architecture, delivery discipline, and the right stack for your product goals, not our preferences."
      />

      <EngineeringSection showHeading={false} />

      <section
        id="snippets"
        className="section-padding section-surface border-t border-border scroll-mt-24"
      >
        <div className="container-wide">
          <FadeIn>
            <SectionHeading
              eyebrow="Patterns"
              title="Code we ship"
              subtitle="Representative patterns from TRYN deliveries: RAG agents, multi-tenant middleware, WhatsApp handlers, and CI gates."
              className="max-w-3xl"
            />
          </FadeIn>
          <FadeIn className="mt-10" delay={0.06}>
            <CodeSnippetTabs />
          </FadeIn>
        </div>
      </section>

      <section className="section-padding section-surface pb-20">
        <div className="container-wide text-center">
          <FadeIn>
            <Button size="lg" asChild>
              <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
