import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { whyTrynFeatures } from "@/lib/why-tryn";
import { cn } from "@/lib/utils";

export function WhyTrynSection() {
  return (
    <section className="section-padding section-muted" aria-labelledby="why-heading">
      <div className="container-wide">
        <FadeIn>
          <SectionHeading
            id="why-heading"
            chapter="05"
            eyebrow="Why TRYN"
            title="A venture studio, not an agency roster"
            subtitle="We exist to build and back companies, with the same discipline whether the venture is ours or yours."
          />
        </FadeIn>
        <Stagger className="why-tryn-grid" stagger={0.06}>
          {whyTrynFeatures.map((feature) => (
            <StaggerItem
              key={feature.title}
              className={cn(
                feature.variant === "featured" && "why-tryn-featured",
                feature.variant === "emphasis" && "why-tryn-emphasis",
                feature.variant === "default" && "why-tryn-cell",
              )}
            >
              {feature.eyebrow && (
                <p className="why-tryn-eyebrow">{feature.eyebrow}</p>
              )}
              <h3 className="font-semibold tracking-[-0.01em] text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 body-copy">{feature.description}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-10" delay={0.08}>
          <Link href="/about#how-we-build" className="link-editorial text-sm">
            Studio model &amp; how we build
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
