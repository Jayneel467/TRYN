import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import {
  homepageServiceCategories,
  serviceCategoryDotClass,
} from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="section-padding-frame section-muted scroll-mt-24"
      aria-labelledby="services-heading"
    >
      <div className="container-wide">
        <FadeIn>
          <div className="mb-6 h-0.5 w-10 bg-saffron lg:mb-8" aria-hidden="true" />
          <SectionHeading
            id="services-heading"
            chapter="03"
            eyebrow="How we build"
            title="The craft behind every venture"
            subtitle="The engineering disciplines TRYN applies when building ventures, from Itinero to client deliveries and founder partnerships."
            frame
            className="mb-0 max-w-3xl"
          />
        </FadeIn>

        <Stagger className="services-grid services-grid-frame mt-8 lg:mt-9" stagger={0.08}>
          {homepageServiceCategories.map((band) => (
            <StaggerItem key={band.category} className="h-full min-w-0">
              <Link href={band.href} className="services-cell group">
                <h3 className="flex items-center gap-2 font-semibold tracking-[-0.01em] text-foreground transition-colors duration-200 group-hover:text-saffron">
                  <span
                    className={cn("category-dot", serviceCategoryDotClass[band.category])}
                    aria-hidden="true"
                  />
                  {band.category}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{band.hook}</p>
                <ul className="services-discipline-list" aria-label={`${band.category} capabilities`}>
                  {band.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="services-explore">Explore discipline</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-7 text-center" delay={0.08}>
          <Link href="/services" className="link-editorial text-sm">
            Full capabilities overview
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
