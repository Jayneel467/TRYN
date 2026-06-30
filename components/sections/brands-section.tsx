import { FadeIn } from "@/components/shared/fade-in";
import { InteractiveRowLink } from "@/components/shared/interactive-row-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { portfolioBrands } from "@/lib/brands";

export function BrandsSection() {
  return (
    <section className="section-padding section-muted" id="brands" aria-labelledby="brands-heading">
      <div className="container-wide">
        <FadeIn>
          <SectionHeading
            id="brands-heading"
            eyebrow="Portfolio"
            title="Itinero Travels, engineered by TRYN"
            subtitle="We're focused on engineering Itinero Travels ahead of launch, with client AI deliveries shipped by TRYN Studios and the Founders Program open to aligned partners."
          />
        </FadeIn>

        <Stagger className="divided-rows" stagger={0.1}>
          {portfolioBrands.map((brand) => (
            <StaggerItem key={brand.id}>
              <InteractiveRowLink
                href={brand.href}
                className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-12"
              >
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-foreground">
                    {brand.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-muted">{brand.role}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {brand.description}
                  </p>
                </div>
                <div className="metric-column lg:pt-1">
                  {brand.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="stat-value">{m.value}</p>
                      <p className="stat-label">{m.label}</p>
                    </div>
                  ))}
                </div>
              </InteractiveRowLink>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
