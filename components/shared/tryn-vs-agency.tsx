import { FadeIn } from "@/components/shared/fade-in";
import { Stagger, StaggerItem } from "@/components/shared/stagger";

const comparisons = [
  {
    dimension: "Engagement",
    tryn: "Embedded engineering org with product ownership",
    agency: "Vendor delivering scoped tickets",
  },
  {
    dimension: "Team",
    tryn: "Dedicated engineers on your product only",
    agency: "Shared resources across client projects",
  },
  {
    dimension: "Accountability",
    tryn: "Long-term outcomes, not sprint handoffs",
    agency: "Project-based delivery and turnover",
  },
  {
    dimension: "Partnership",
    tryn: "Equity or hybrid for founder fit",
    agency: "Hourly or fixed-fee billing only",
  },
] as const;

type TrynVsAgencyProps = {
  className?: string;
};

export function TrynVsAgency({ className }: TrynVsAgencyProps) {
  return (
    <div className={className}>
      <FadeIn>
        <h2 className="section-title text-foreground">TRYN vs. traditional agency</h2>
        <p className="mt-3 max-w-2xl body-copy">
          A scannable comparison of how we work differently.
        </p>
      </FadeIn>

      <Stagger className="comparison-table mt-8" stagger={0.06}>
        <StaggerItem className="comparison-header" aria-hidden="true">
          <span />
          <span className="comparison-col-label">TRYN Studios</span>
          <span className="comparison-col-label comparison-col-muted">Typical agency</span>
        </StaggerItem>
        {comparisons.map((row) => (
          <StaggerItem key={row.dimension} className="comparison-row">
            <span className="comparison-dimension">{row.dimension}</span>
            <span className="comparison-tryn">{row.tryn}</span>
            <span className="comparison-agency">{row.agency}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
