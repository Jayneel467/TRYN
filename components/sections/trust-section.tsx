import { AnimatedSparkline } from "@/components/animations/animated-sparkline";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { VisualPanel } from "@/components/shared/visual-panel";
import { trustStats } from "@/lib/trust-stats";

export function TrustSection() {
  return (
    <section className="section-padding section-navy" aria-labelledby="trust-heading">
      <div className="container-wide">
        <FadeIn>
          <p className="section-chapter section-navy-muted opacity-60">02</p>
          <div
            className="mb-8 h-0.5 w-10 bg-saffron sm:mb-10"
            aria-hidden="true"
          />
          <SectionHeading
            id="trust-heading"
            eyebrow="Studio focus"
            title="Building Itinero, with room for founder partners"
            subtitle="Early-stage metrics that reflect where TRYN is today: one flagship venture in active development."
            dark
          />
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <Stagger as="ul" className="trust-stat-row border-t-0 pt-0" stagger={0.06} aria-label="Track record metrics">
            {trustStats.map((stat) => (
              <StaggerItem key={stat.label} as="li" className="trust-stat-cell">
                <p className="stat-value-light">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="trust-stat-label">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.1}>
            <VisualPanel variant="navy" label="Itinero Travels · In development">
              <AnimatedSparkline />
            </VisualPanel>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
