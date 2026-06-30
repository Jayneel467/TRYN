import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Careers",
  description:
    "TRYN Studios is a selective venture engineering studio. Explore the Fellowship or reach out about future roles.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="A small studio, selective by design"
        lead="TRYN is not a large agency bench. We hire sparingly and invest heavily in engineers through the TRYN Fellowship and future full-time roles."
      />

      <section className="section-padding section-muted">
        <div className="container-wide max-w-3xl">
          <FadeIn>
            <h2 className="section-title text-foreground">TRYN Fellowship</h2>
            <p className="mt-4 body-lead text-muted">
              The fastest path into the studio today is the Fellowship: mentorship, real venture
              exposure, and production discipline alongside senior engineers shipping Itinero and
              client deliveries.
            </p>
            <Button className="mt-8" asChild>
              <Link href="/mentorship">Explore the Fellowship</Link>
            </Button>
          </FadeIn>

          <FadeIn className="mt-16" delay={0.08}>
            <h2 className="section-title text-foreground">Full-time roles</h2>
            <p className="mt-4 body-copy">
              We open full-time seats when a long-term studio need appears. There is no standing
              job board. If you are an exceptional engineer or designer, introduce yourself and
              we will reach out when there is fit.
            </p>
            <Button className="mt-8" variant="outline" asChild>
              <a href={`mailto:${siteConfig.contact.email}?subject=Future role at TRYN Studios`}>
                Introduce yourself
              </a>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
