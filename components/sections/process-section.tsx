import { FadeIn } from "@/components/shared/fade-in";
import { InteractiveStep, StepBadge } from "@/components/shared/interactive-step";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { processSteps } from "@/lib/process";

export function ProcessSection() {
  return (
    <section className="section-padding section-surface" aria-labelledby="process-heading">
      <div className="container-wide">
        <FadeIn>
          <SectionHeading
            id="process-heading"
            eyebrow="Process"
            title="From discovery to scale"
            subtitle="A structured framework for building companies, not just shipping features."
          />
        </FadeIn>

        <Stagger
          as="ol"
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {processSteps.map((step) => (
            <StaggerItem key={step.step} as="li">
              <InteractiveStep as="div" className="bg-soft-gray p-6 sm:p-8">
                <StepBadge>{String(step.step).padStart(2, "0")}</StepBadge>
                <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </InteractiveStep>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
