"use client";

import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { InteractiveStep, StepBadge } from "@/components/shared/interactive-step";
import { MotionPressable } from "@/components/shared/motion-pressable";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { TechMarquee } from "@/components/shared/tech-marquee";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/lib/process";
import { technologyCategories } from "@/lib/technologies";

const deliverySteps = [
  { step: "01", title: "Architecture review", detail: "Stack selection aligned to product goals and scale requirements." },
  { step: "02", title: "CI/CD pipeline", detail: "Automated testing, preview environments, and production deploys." },
  { step: "03", title: "Observability", detail: "Monitoring, logging, and incident response from day one." },
  { step: "04", title: "Scale readiness", detail: "Performance tuning, security hardening, and operational runbooks." },
] as const;

const lifecycleSteps = processSteps.filter((s) =>
  ["01", "02", "05", "08"].includes(s.step),
);

export function EngineeringSection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section
      id={showHeading ? "engineering" : undefined}
      className="section-padding section-muted"
      aria-labelledby={showHeading ? "engineering-heading" : undefined}
    >
      <div className="container-wide">
        {showHeading && (
          <FadeIn>
            <p className="section-chapter">06</p>
            <SectionHeading
              id="engineering-heading"
              eyebrow="Engineering"
              title="Technology agnostic. Business focused."
              subtitle="Architecture, delivery discipline, and a structured path from discovery to scale."
            />
          </FadeIn>
        )}

        <FadeIn delay={0.06}>
          <div className="mb-12 overflow-hidden rounded-lg border border-border bg-background">
            <div className="border-b border-border px-6 py-4 sm:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                Engagement lifecycle
              </p>
            </div>
            <ol className="grid divide-y divide-border sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              {lifecycleSteps.map((step) => (
                <li key={step.step} className="p-6 sm:p-8">
                  <StepBadge>{step.step}</StepBadge>
                  <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="delivery-panel">
            <div className="delivery-panel-band">
              <div className="delivery-panel-band-cell lg:col-span-5 lg:border-r section-navy-border">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] section-navy-muted">
                  Delivery discipline
                </p>
              </div>
              <div className="delivery-panel-band-cell lg:col-span-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] section-navy-muted">
                  Technology stack
                </p>
              </div>
            </div>

            <div className="delivery-panel-body">
              <div className="delivery-panel-steps">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
                  Production-grade from the first sprint
                </h3>

                <ol className="delivery-timeline mt-8" aria-label="Delivery steps">
                  {deliverySteps.map((item) => (
                    <InteractiveStep
                      key={item.step}
                      as="li"
                      className="delivery-timeline-item"
                    >
                      <span className="delivery-step-num" aria-hidden="true">
                        {item.step}
                      </span>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
                    </InteractiveStep>
                  ))}
                </ol>

                <p className="mt-8 border-t border-border pt-6 body-copy">
                  Type-safe, tested, and deployable on every merge.
                </p>
              </div>

              <div className="delivery-panel-stack">
                <Stagger stagger={0.05}>
                  {technologyCategories.map((cat) => (
                    <StaggerItem key={cat.category} className="tech-stack-row">
                      <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                        {cat.category}
                      </h4>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {cat.technologies.map((tech) => (
                          <li key={tech}>
                            <span className="tech-chip">{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8">
          <TechMarquee />
        </FadeIn>

        {showHeading && (
          <FadeIn className="mt-4" delay={0.12}>
            <MotionPressable>
              <Button variant="outline" asChild>
                <Link href="/engineering">View engineering capabilities</Link>
              </Button>
            </MotionPressable>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
