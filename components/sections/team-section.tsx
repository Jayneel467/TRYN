import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { studioPods } from "@/lib/team";

export function TeamSection() {
  return (
    <section className="section-padding section-muted" aria-labelledby="team-heading">
      <div className="container-wide">
        <FadeIn>
          <SectionHeading
            id="team-heading"
            eyebrow="Studio structure"
            title="How we're organized"
            subtitle="Four pods embedded on every build. Dedicated capacity for product, engineering, AI, and design."
          />
        </FadeIn>
        <Stagger
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.07}
        >
          {studioPods.map((pod) => (
            <StaggerItem
              key={pod.name}
              className="bg-soft-gray p-6 transition-colors duration-300 hover:bg-background sm:p-7"
            >
              <p className="section-eyebrow">{pod.initials}</p>
              <h3 className="mt-3 font-semibold tracking-[-0.01em] text-foreground">
                {pod.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-foreground/75">{pod.role}</p>
              <p className="mt-3 body-copy">{pod.bio}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
