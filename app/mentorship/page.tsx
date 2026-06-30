import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { PartnershipTimeline } from "@/components/shared/partnership-timeline";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import {
  fellowshipAudience,
  fellowshipPillars,
  fellowshipTimeline,
} from "@/lib/mentorship";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "TRYN Fellowship",
  description:
    "Engineer mentorship and venture studio exposure through the TRYN Fellowship. Learn by building on Itinero, client deliveries, and studio ventures.",
  path: "/mentorship",
});

export default function MentorshipPage() {
  return (
    <>
      <PageHero
        eyebrow="TRYN Fellowship"
        title="Learn by building real ventures"
        lead="A mentorship program for engineers who want production discipline, not another online course. Train on Itinero Travels, client deliveries, and studio infrastructure with senior engineers who ship daily."
      />

      <section className="section-padding section-muted">
        <div className="container-wide">
          <FadeIn>
            <h2 className="section-title text-foreground">Who it&apos;s for</h2>
            <Stagger className="mt-8 divided-rows" stagger={0.06}>
              {fellowshipAudience.map((item) => (
                <StaggerItem key={item} className="py-5">
                  <p className="text-sm leading-relaxed text-muted">{item}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </FadeIn>

          <FadeIn className="mt-16" delay={0.08}>
            <h2 className="section-title text-foreground">What you&apos;ll experience</h2>
            <div className="pillar-grid mt-8">
              {fellowshipPillars.map((pillar, i) => (
                <div key={pillar.title} className="pillar-cell">
                  <p className="pillar-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-semibold text-foreground">{pillar.title}</h3>
                  <p className="mt-2 body-copy">{pillar.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <h2 className="section-title text-foreground">How it works</h2>
              <p className="mt-4 max-w-lg body-copy">
                The fellowship embeds engineers in TRYN&apos;s venture studio model, learning by
                contributing to products that ship.
              </p>
              <Stagger className="mt-8 space-y-6" stagger={0.06}>
                {fellowshipTimeline.map((step) => (
                  <StaggerItem key={step.step}>
                    <div className="border-l-2 border-saffron/40 pl-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        Step {step.step}
                      </p>
                      <h3 className="mt-1 font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted">{step.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>

            <FadeIn delay={0.08}>
              <PartnershipTimeline />
            </FadeIn>
          </div>

          <FadeIn className="mt-16 text-center" delay={0.1}>
            <p className="body-lead max-w-xl mx-auto">
              Not a founder? The Founders Program is for startup equity partnerships.{" "}
              <Link href="/founders-program" className="link-editorial">
                Learn about Founders Program
              </Link>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href={`mailto:${siteConfig.contact.email}?subject=TRYN%20Fellowship%20Application`}>
                  Apply to the Fellowship
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about#how-we-build">See how we build</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
