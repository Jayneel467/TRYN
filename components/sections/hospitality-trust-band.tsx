import { FadeIn } from "@/components/shared/fade-in";
import { hospitalityGroups } from "@/lib/hospitality-groups";

export function HospitalityTrustBand() {
  return (
    <section
      className="hospitality-trust-band section-padding-sm section-muted"
      aria-labelledby="hospitality-trust-heading"
    >
      <div className="container-wide">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-eyebrow">Hospitality &amp; travel</p>
            <h2
              id="hospitality-trust-heading"
              className="mt-3 text-[clamp(1.25rem,2.4vw,1.625rem)] font-semibold leading-snug tracking-[-0.02em] text-foreground"
            >
              Experiences trusted by millions worldwide
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Built for hospitality and travel at global scale. Itinero is engineered for the
              industry travelers know.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-7 lg:mt-8">
          <ul
            className="hospitality-group-strip"
            aria-label="Representative global hotel groups for industry context"
          >
            {hospitalityGroups.map((group) => (
              <li key={group.id}>
                <span className="hospitality-group-pill">
                  <span className="hospitality-group-monogram" aria-hidden="true">
                    {group.initials}
                  </span>
                  <span className="text-sm font-medium text-foreground/90">{group.name}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-[11px] leading-relaxed text-muted/80">
            Hotel group names shown for industry context only. Not affiliated endorsements.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
