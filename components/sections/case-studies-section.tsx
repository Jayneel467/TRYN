import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { FeaturedSpotlight } from "@/components/shared/featured-spotlight";
import { InteractiveRowLink } from "@/components/shared/interactive-row-link";
import { MotionPressable } from "@/components/shared/motion-pressable";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import {
  clientDeliveries,
  featuredCaseStudy,
  featuredClientCaseStudy,
} from "@/lib/case-studies";

export function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="section-padding-frame section-surface scroll-mt-24"
      aria-labelledby="cases-heading"
    >
      <div className="container-wide">
        <FadeIn>
          <SectionHeading
            id="cases-heading"
            chapter="04"
            eyebrow="Studio proof"
            title="Itinero Travels, built by TRYN"
            subtitle="Our flagship venture is the reference implementation for how we engineer companies, alongside 10+ client deliveries shipped by TRYN Studios."
            frame
            className="max-w-3xl"
          />
        </FadeIn>

        <FeaturedSpotlight
          frame
          href={`/work/${featuredCaseStudy.slug}`}
          category={featuredCaseStudy.category}
          title={featuredCaseStudy.title}
          legalName={featuredCaseStudy.legalName}
          description={featuredCaseStudy.description}
          metrics={featuredCaseStudy.metrics}
          status={featuredCaseStudy.status}
          externalUrl={featuredCaseStudy.externalUrl}
          image={featuredCaseStudy.image}
          imageAlt={`${featuredCaseStudy.title} flagship build by TRYN Studios`}
          badge="Flagship build"
          className="mt-8 lg:mt-9"
        />

        <FadeIn delay={0.08}>
          <InteractiveRowLink
            href={`/work/${featuredClientCaseStudy.slug}`}
            className="featured-spotlight featured-spotlight-frame group mt-4 block"
          >
            <div className="featured-spotlight-rule" aria-hidden="true" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {featuredClientCaseStudy.category}
                  </p>
                  <span className="text-[11px] font-medium text-saffron">Client delivery</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {featuredClientCaseStudy.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                  {featuredClientCaseStudy.summary}
                </p>
              </div>
              <p className="shrink-0 text-sm font-medium text-saffron">Open case study</p>
            </div>
          </InteractiveRowLink>
        </FadeIn>

        <FadeIn className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" delay={0.1}>
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            TRYN Studios has shipped chatbots, generative AI, and analytics across healthcare,
            hospitality, edtech, manufacturing, and more,{" "}
            <Link href="/work#client-deliveries" className="link-editorial">
              view all {clientDeliveries.length} client deliveries
            </Link>
            .
          </p>
          <MotionPressable className="shrink-0">
            <Button variant="outline" asChild>
              <Link href="/work">View all studio work</Link>
            </Button>
          </MotionPressable>
        </FadeIn>
      </div>
    </section>
  );
}
