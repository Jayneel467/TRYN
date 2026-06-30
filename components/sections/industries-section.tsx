import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { industries } from "@/lib/industries";

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="section-padding section-surface"
      aria-labelledby="industries-heading"
    >
      <div className="container-wide">
        <FadeIn>
          <SectionHeading
            id="industries-heading"
            eyebrow="Industries"
            title="Deep domain expertise"
            subtitle="Healthcare, fintech, travel, AI, and enterprise. We bring sector context to every build."
          />
        </FadeIn>
        <Stagger as="ul" className="flex flex-wrap gap-2" stagger={0.04}>
          {industries.map((industry) => (
            <StaggerItem
              key={industry.name}
              as="li"
              className="rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-[border-color] duration-200 hover:border-foreground/20"
            >
              {industry.name}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
