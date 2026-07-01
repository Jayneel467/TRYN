import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { FeaturedSpotlight } from "@/components/shared/featured-spotlight";
import { PageHero } from "@/components/shared/page-hero";
import { ClientDeliveriesList } from "@/components/work/client-deliveries-list";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import {
  clientDeliveries,
  featuredCaseStudy,
  itineroGroupCaseStudies,
} from "@/lib/case-studies";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Our Work",
  description:
    "Case studies from TRYN Studios: AI products, SaaS platforms, and hospitality systems shipped for clients, plus the Itinero flagship build in development.",
  path: "/work",
});

export default function WorkPage() {
  const itineroRoadmap = itineroGroupCaseStudies.filter((s) => s.slug !== featuredCaseStudy.slug);

  return (
    <>
      <PageHero
        eyebrow="TRYN Studios · Work"
        title="What we're building"
        lead="TRYN Studios engineers the Itinero flagship in pre-launch, founded by Jagannath, ships AI products for clients across industries, and partners with selected founders through the Founders Program."
      />

      <section className="section-padding-sm section-surface border-b border-border">
        <div className="container-wide">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
              <span>
                <span className="font-medium text-foreground">Itinero Travels</span>: flagship build
                in development
              </span>
              <span>
                <span className="font-medium text-foreground">Client deliveries</span>:{" "}
                {clientDeliveries.length}+ shipped by TRYN Studios
              </span>
              <span>
                <span className="font-medium text-foreground">Founders Program</span>: open to
                aligned partners
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding section-muted">
        <div className="container-wide">
          <FeaturedSpotlight
            href={`/work/${featuredCaseStudy.slug}`}
            category={featuredCaseStudy.category}
            title={featuredCaseStudy.title}
            legalName={featuredCaseStudy.legalName}
            description={featuredCaseStudy.description}
            metrics={featuredCaseStudy.metrics}
            status={featuredCaseStudy.status}
            externalUrl={featuredCaseStudy.externalUrl}
            badge="Flagship build"
            className="mb-16"
          />

          <div id="client-deliveries" className="scroll-mt-24">
            <FadeIn>
              <SectionHeading
                eyebrow="Client work"
                title="Shipped by TRYN Studios"
                subtitle={`${clientDeliveries.length} production AI systems across healthcare, hospitality, education, manufacturing, and more.`}
                className="mb-8 max-w-3xl"
              />
            </FadeIn>

            <ClientDeliveriesList deliveries={clientDeliveries} />
          </div>

          {itineroRoadmap.length > 0 && (
            <div className="mt-20 border-t border-border pt-16">
              <FadeIn>
                <SectionHeading
                  eyebrow="Itinero group"
                  title="Roadmap & internal"
                  subtitle="Ecosystem extensions and studio tooling sequenced around the Itinero Travels launch."
                  className="mb-8 max-w-3xl"
                />
              </FadeIn>

              <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.06}>
                {itineroRoadmap.map((study) => (
                  <StaggerItem key={study.slug}>
                    <Link
                      href={`/work/${study.slug}`}
                      className="delivery-card group block h-full"
                    >
                      <div className="delivery-card-accent bg-gradient-to-r from-cyan-600/70 to-teal-500/40" aria-hidden="true" />
                      <div className="delivery-card-body">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                            {study.category}
                          </p>
                          <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                            {study.status}
                          </span>
                        </div>
                        <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-foreground group-hover:text-saffron">
                          {study.title}
                        </h2>
                        {study.legalName && (
                          <p className="mt-0.5 text-xs text-muted">{study.legalName}</p>
                        )}
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                          {study.description}
                        </p>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}

          <FadeIn className="mt-16 text-center">
            <Button size="lg" asChild>
              <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
