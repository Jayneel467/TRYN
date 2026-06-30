import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { FeaturedQuote } from "@/components/shared/featured-spotlight";
import { PageHero } from "@/components/shared/page-hero";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import {
  clientTestimonials,
  featuredTestimonial,
  testimonialStats,
} from "@/lib/testimonials";
import { clientPartnerMonograms } from "@/lib/client-partners";

export const metadata: Metadata = createPageMetadata({
  title: "Testimonials",
  description:
    "Stories from leadership and founders who partner with TRYN Studios.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Built with ownership"
        lead="Voices from Itinero leadership, TRYN Studios client partners, and founder collaborators. Real delivery through the studio."
      />

      <section className="section-padding section-muted">
        <div className="container-wide">
          <FadeIn>
            <div className="grid grid-cols-3 gap-6 border-y border-border py-8 sm:gap-8 sm:py-10">
              {testimonialStats.map((stat) => (
                <div key={stat.label}>
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-10" delay={0.05}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Client partners
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {clientPartnerMonograms.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3"
                  title={partner.company}
                >
                  <span className="client-monogram text-sm">{partner.initials}</span>
                  <span className="text-sm text-muted">{partner.company}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-12" delay={0.06}>
            <FeaturedQuote
              quote={featuredTestimonial.quote}
              author={featuredTestimonial.author}
              role={featuredTestimonial.role}
              company={featuredTestimonial.company}
            />
          </FadeIn>

          {clientTestimonials.length > 0 && (
            <FadeIn className="mt-16" delay={0.08}>
              <h2 className="section-title text-foreground">Client partners</h2>
              <p className="mt-2 max-w-2xl body-copy">
                Real outcomes from businesses that worked with TRYN Studios.
              </p>
              <Stagger className="mt-8 grid gap-6 lg:grid-cols-2" stagger={0.06}>
                {clientTestimonials.map((t) => (
                  <StaggerItem key={t.id}>
                    <blockquote className="featured-quote h-full">
                      <div className="featured-spotlight-rule" aria-hidden="true" />
                      <p className="text-sm leading-relaxed text-foreground sm:text-[15px]">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <footer className="featured-quote-footer">
                        <p className="font-semibold text-foreground">{t.author}</p>
                        <p className="mt-1 text-sm text-muted">
                          {t.role}, {t.company}
                        </p>
                        {t.caseStudySlug && (
                          <p className="mt-2">
                            <Link
                              href={`/work/${t.caseStudySlug}`}
                              className="text-sm font-medium text-saffron hover:text-saffron-hover"
                            >
                              Read the build story
                            </Link>
                          </p>
                        )}
                        <p className="mt-2 text-xs text-muted">Engineered by TRYN Studios</p>
                      </footer>
                    </blockquote>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>
          )}

          <FadeIn className="mt-16 text-center" delay={0.12}>
            <Button size="lg" asChild>
              <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
