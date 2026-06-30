import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { InteractiveRowLink } from "@/components/shared/interactive-row-link";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { Button } from "@/components/ui/button";
import {
  getServicesByMarketingCategory,
  growthBrandOverview,
  marketingCategoryHooks,
  type MarketingCategory,
} from "@/lib/marketing-services";
import { serviceCategoryDotClass } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Props = {
  category: MarketingCategory;
};

export function MarketingCategoryPage({ category }: Props) {
  const services = getServicesByMarketingCategory(category);
  const hook = marketingCategoryHooks[category];

  return (
    <>
      <PageHero
        eyebrow={category}
        title={`${category} services`}
        lead={hook}
      >
        <nav aria-label="Breadcrumb" className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-saffron">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          <Link href="/services" className="hover:text-saffron">
            Services
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          <Link href={growthBrandOverview.href} className="hover:text-saffron">
            Growth & Brand
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="text-foreground">{category}</span>
        </nav>
      </PageHero>

      <section className="section-padding section-muted border-b border-border">
        <div className="container-wide">
          <FadeIn>
            <p className="max-w-3xl text-muted leading-relaxed">
              {growthBrandOverview.lead} Explore each {category.toLowerCase()} capability below, or
              book a discovery call to discuss which services fit your stage.
            </p>
            <p className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              <span
                className={cn("category-dot", serviceCategoryDotClass[category])}
                aria-hidden="true"
              />
              {services.length} {services.length === 1 ? "service" : "services"} in {category}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-wide">
          <FadeIn>
            <SectionHeading eyebrow={category} title="Capabilities" subtitle={hook} />
          </FadeIn>
          <Stagger className="divided-rows mt-8" stagger={0.06}>
            {services.map((service, index) => (
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
                      {service.intro ?? service.description}
                    </p>
                  </div>
                </InteractiveRowLink>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-padding section-navy">
        <div className="container-wide max-w-2xl">
          <FadeIn>
            <div className="mb-6 h-0.5 w-10 bg-saffron" aria-hidden="true" />
            <h2 className="section-title text-[var(--section-navy-fg)]">
              Ready to grow with TRYN?
            </h2>
            <p className="mt-4 section-navy-muted">
              Pair {category.toLowerCase()} capabilities with product engineering for one studio
              partner from build to market traction.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link href={growthBrandOverview.href}>All Growth & Brand</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
