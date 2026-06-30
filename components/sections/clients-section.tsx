import { FadeIn } from "@/components/shared/fade-in";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { clientLogos } from "@/lib/client-logos";
import { cn } from "@/lib/utils";

export function ClientsSection() {
  return (
    <section className="clients-band section-padding-sm section-muted" aria-label="Ventures and programs">
      <div className="container-wide">
        <FadeIn>
          <p className="section-chapter text-center sm:mb-2">01</p>
          <p className="section-eyebrow mb-8 text-center sm:mb-10">
            Itinero group &amp; founder partners
          </p>
        </FadeIn>

        <Stagger as="ul" className="clients-venture-strip" stagger={0.05}>
          {clientLogos.map((client) => (
            <StaggerItem
              key={client.name}
              as="li"
              className={cn(
                "client-venture-cell",
                client.name === "TRYN Studios" && "[&_.client-monogram]:border-saffron/30 [&_.client-monogram]:text-foreground",
              )}
            >
              <span className="client-monogram" aria-hidden="true">
                {client.abbr}
              </span>
              <span className="client-venture-name">{client.name}</span>
              <span className="client-venture-role">{client.subtitle}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
