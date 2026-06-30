import type { Metadata } from "next";
import { PitchDeckForm } from "@/components/forms/pitch-deck-form";
import { CalEmbed } from "@/components/shared/cal-embed";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { PartnershipTimeline } from "@/components/shared/partnership-timeline";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { VisualPanel } from "@/components/shared/visual-panel";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Founders Program",
  description:
    "Apply to the TRYN Founders Program. Selected startups may receive technology development through equity or hybrid partnership.",
  path: "/founders-program",
});

const whoShouldApply = [
  "Pre-seed to Series A startups with strong vision",
  "Founders who need a technical co-founder, not an agency",
  "Companies building AI, SaaS, or platform products",
  "Teams with clear market opportunity and execution plan",
] as const;

export default function FoundersProgramPage() {
  return (
    <>
      <PageHero
        eyebrow="Founders Program"
        title="TRYN Founders Program"
        lead="For exceptional startups, TRYN offers an engineering partnership: dedicated engineering, design, and product strategy in exchange for equity or hybrid engagement."
      />

      <section className="section-padding section-muted">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <VisualPanel label="Application process">
                <PartnershipTimeline />
              </VisualPanel>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2 className="section-title text-foreground">Who should apply</h2>
              <Stagger className="mt-6 divided-rows" stagger={0.06}>
                {whoShouldApply.map((item) => (
                  <StaggerItem key={item} className="py-5">
                    <p className="text-sm leading-relaxed text-muted">{item}</p>
                  </StaggerItem>
                ))}
              </Stagger>
              <p className="mt-8 body-copy">
                The program is highly selective. Submission does not guarantee acceptance
                or partnership.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <FadeIn>
              <div className="form-trust-panel h-fit">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  What to expect
                </p>
                <ul className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
                  <li>Response within 14 business days if there is potential fit</li>
                  <li>Confidential review by TRYN leadership</li>
                  <li>Discovery call for shortlisted founders</li>
                  <li>Partnership terms tailored to stage and vision</li>
                </ul>
                <CalEmbed className="mt-8" />
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="zone-panel p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-foreground">
                  Submit your application
                </h2>
                <p className="mt-2 body-copy">
                  Include your pitch deck and a brief description of your vision.
                </p>
                <div className="mt-8">
                  <PitchDeckForm />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
