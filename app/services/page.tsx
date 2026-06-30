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
  engineeringCategoryOrder,
  getServiceCategory,
  growthBrandOverview,
  isMarketingCategory,
  marketingCategoryHooks,
  marketingCategoryHref,
  marketingCategoryOrder,
  services,
  serviceCategoryDotClass,
  type EngineeringCategory,
  type MarketingCategory,
} from "@/lib/services";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Product engineering and growth marketing from one venture studio partner: AI, SaaS, brand, SEO, paid media, and dedicated teams.",
  path: "/services",
});

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
    title: "Growth & Brand",
    description: "Marketing, brand, and revenue capabilities alongside product builds.",
    href: "/services/growth-brand",
  },
  {
    title: "Technical advisory",
    description: "Architecture reviews, due diligence, and roadmap planning.",
    href: "/services/technical-consulting",
  },
] as const;

function ServiceCategoryGroup({
  category,
  grouped,
  categoryHref,
}: {
  category: EngineeringCategory | MarketingCategory;
  grouped: typeof services;
  categoryHref?: string;
}) {
  return (
    <div>
      <FadeIn>
        <SectionHeading
          eyebrow={category}
          title={`${category} services`}
          subtitle={isMarketingCategory(category) ? marketingCategoryHooks[category] : undefined}
        />
        {categoryHref && (
          <Link href={categoryHref} className="link-editorial -mt-6 mb-8 inline-block text-sm">
            View {category} overview
          </Link>
        )}
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
                  {service.intro ?? service.description}
                </p>
              </div>
            </InteractiveRowLink>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Build the product. Drive the growth."
        lead="TRYN is a venture studio that engineers products and runs the marketing, brand, and revenue work ventures need to win in market."
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

      <section className="section-padding section-muted border-b border-border">
        <div className="container-wide space-y-16">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-saffron">
                Product Engineering
              </p>
              <h2 className="mt-3 section-title text-foreground">
                The disciplines behind every venture we build
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                AI, platforms, applications, and engineering infrastructure. The same stack
                powering Itinero, client deliveries, and founder partnerships.
              </p>
            </div>
          </FadeIn>
          {engineeringCategoryOrder.map((category) => {
            const grouped = services.filter((s) => getServiceCategory(s.slug) === category);
            if (grouped.length === 0) return null;
            return <ServiceCategoryGroup key={category} category={category} grouped={grouped} />;
          })}
        </div>
      </section>

      <section className="section-padding section-surface" id="growth-brand">
        <div className="container-wide space-y-16">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-saffron">
                {growthBrandOverview.title}
              </p>
              <h2 className="mt-3 section-title text-foreground">
                Marketing and revenue alongside the build
              </h2>
              <p className="mt-4 text-muted leading-relaxed">{growthBrandOverview.lead}</p>
              <Link href={growthBrandOverview.href} className="link-editorial mt-6 inline-block text-sm">
                Growth & Brand overview
              </Link>
            </div>
          </FadeIn>
          {marketingCategoryOrder.map((category) => {
            const grouped = services.filter((s) => getServiceCategory(s.slug) === category);
            if (grouped.length === 0) return null;
            return (
              <ServiceCategoryGroup
                key={category}
                category={category}
                grouped={grouped}
                categoryHref={marketingCategoryHref[category]}
              />
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
