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
  getServicesByMarketingCategory,
  growthBrandOverview,
  marketingCategoryHooks,
  marketingCategoryHref,
  marketingCategoryOrder,
  serviceCategoryDotClass,
} from "@/lib/services";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Growth & Brand",
  description: growthBrandOverview.lead,
  path: "/services/growth-brand",
});

export default function GrowthBrandPage() {
  return (
    <>
      <PageHero
        eyebrow="Growth & Brand"
        title="Products need audiences. Ventures need momentum."
        lead={growthBrandOverview.lead}
      >
        <nav aria-label="Breadcrumb" className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-saffron">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/services" className="hover:text-saffron">
            Services
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">Growth & Brand</span>
        </nav>
      </PageHero>

      <section className="section-padding section-muted border-b border-border">
        <div className="container-wide">
          <FadeIn>
            <p className="max-w-3xl text-muted leading-relaxed">
              TRYN does not hand off a product and walk away. Brand strategy, demand generation,
              lifecycle marketing, commerce growth, and executive marketing leadership are studio
              capabilities we bring to ventures, founder partnerships, and selected client work.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {marketingCategoryOrder.map((category) => {
                const count = getServicesByMarketingCategory(category).length;
                return (
                  <Link
                    key={category}
                    href={marketingCategoryHref[category]}
                    className="rounded-lg border border-border bg-background p-6 transition-colors hover:border-saffron/40"
                  >
                    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      <span
                        className={cn("category-dot", serviceCategoryDotClass[category])}
                        aria-hidden="true"
                      />
                      {category}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {marketingCategoryHooks[category]}
                    </p>
                    <p className="mt-4 text-xs font-medium text-saffron">
                      {count} {count === 1 ? "service" : "services"}
                    </p>
                  </Link>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-wide space-y-16">
          {marketingCategoryOrder.map((category) => {
            const grouped = getServicesByMarketingCategory(category);
            const anchor = category.toLowerCase().replace(/\s+/g, "-");

            return (
              <div key={category} id={anchor}>
                <FadeIn>
                  <SectionHeading
                    eyebrow={category}
                    title={`${category} services`}
                    subtitle={marketingCategoryHooks[category]}
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
            <h2 className="section-title text-[var(--section-navy-fg)]">
              Building and growing together
            </h2>
            <p className="mt-4 section-navy-muted">
              Pair Growth & Brand with product engineering for a single studio partner from MVP to
              market traction.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <Link href="/services">All services</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
