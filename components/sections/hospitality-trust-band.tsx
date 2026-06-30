import { HospitalityMarquee } from "@/components/shared/hospitality-marquee";

export function HospitalityTrustBand() {
  return (
    <section
      className="hospitality-trust-band border-t border-border bg-background py-8 lg:py-10"
      aria-label="Hospitality and travel industry context"
    >
      <div className="container-wide">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
          Trusted by millions
        </p>
        <HospitalityMarquee />
      </div>
    </section>
  );
}
