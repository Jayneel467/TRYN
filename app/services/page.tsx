import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { InteractiveRowLink } from "@/components/shared/interactive-row-link";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import {
  getServiceCategory,
  services,
  serviceCategoryDotClass,
  type ServiceCategory,
} from "@/lib/services";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Full-stack product engineering services: AI, SaaS, mobile, enterprise, and dedicated engineering teams.",
  path: "/services",
});

const categoryOrder: ServiceCategory[] = [
  "Intelligence",
  "Platforms",
  "Applications",
  "Engineering",
];

const partnershipPaths = [
  {
    title: "Founders Program",
    audience: "Startup founders",
    offer: "Equity or hybrid engineering partnership",
    href: "/founders-program",
  },
  {
    title: "Hire TRYN",
    audience: "Companies in market",
    offer: "Dedicated embedded engineering team",
    href: "/contact",
  },
  {
    title: "TRYN Fellowship",
    audience: "Engineers & students",
    offer: "Mentorship with venture studio exposure",
    href: "/mentorship",
  },
] as const;

const engagementModels = [
  {
    title: "Dedicated teams",
    description: "Embedded engineers, PMs, and QA as your product organization.",
    href: "/services/dedicated-engineering-teams",
  },
  {
    title: "Project delivery",
    description: "Scoped builds from MVP to production with clear milestones.",
    href: "/services/saas-platforms",
  },
  {
    title: "Founders Program",
    description: "Equity or hybrid partnerships for aligned early-stage founders.",
    href: "/founders-program",
  },
  {
    title: "Technical advisory",
    description: "Architecture reviews, due diligence, and roadmap planning.",
    href: "/services/technical-consulting",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Everything you need. One engineering partner."
        lead="From AI products to dedicated engineering teams, TRYN covers the complete technology lifecycle."
      />

      <section className="section-padding-sm section-surface border-b border-border">
        <div className="container-wide">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Partnership paths
            </p>
            <div className="mt-6 overflow-hidden rounded-lg border border-border">
              <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {partnershipPaths.map((path) => (
                  <Link
                    key={path.title}
                    href={path.href}
                    className="group bg-background p-6 transition-colors hover:bg-soft-gray/40 sm:p-8"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-saffron">
                      {path.title}
                    </p>
                    <p className="mt-2 font-semibold text-foreground group-hover:text-saffron">
                      {path.audience}
                    </p>
                    <p className="mt-2 text-sm text-muted">{path.offer}</p>
                  </Link>
                ))}
              </div>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted mt-12">
              Engagement models
            </p>
            <div className="engagement-model-grid mt-6">
              {engagementModels.map((model) => (
                <Link key={model.title} href={model.href} className="engagement-model-card group">
                  <h2 className="font-semibold tracking-[-0.02em] text-foreground group-hover:text-saffron">
                    {model.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{model.description}</p>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding section-muted">
        <div className="container-wide space-y-16">
          {categoryOrder.map((category) => {
            const grouped = services.filter((s) => getServiceCategory(s.slug) === category);
            if (grouped.length === 0) return null;

            return (
              <div key={category}>
                <FadeIn>
                  <SectionHeading
                    eyebrow={category}
                    title={`${category} services`}
                  />
                </FadeIn>
                <Stagger className="divided-rows" stagger={0.06}>
                  {grouped.map((service, index) => (
                    <StaggerItem key={service.slug}>
                      <InteractiveRowLink
                        href={`/services/${service.slug}`}
                        className="grid gap-5 py-7 sm:grid-cols-[2.5rem_1fr] sm:gap-8 sm:py-8 lg:items-start"
                      >
                        <span className="service-row-index" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                            <span
                              className={cn("category-dot", serviceCategoryDotClass[category])}
                              aria-hidden="true"
                            />
                            {category}
                          </p>
                          <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                            {service.title}
                          </h2>
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                            {service.description}
                          </p>
                        </div>
                      </InteractiveRowLink>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-padding section-navy">
        <div className="container-wide max-w-2xl">
          <FadeIn>
            <div className="mb-6 h-0.5 w-10 bg-saffron" aria-hidden="true" />
            <h2 className="section-title text-[var(--section-navy-fg)]">Not sure where to start?</h2>
            <p className="mt-4 section-navy-muted">
              Book a discovery call and we&apos;ll help you find the right engagement model.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
