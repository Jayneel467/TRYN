import { AnimatedCounter } from "@/components/shared/animated-counter";
import { trustStats } from "@/lib/trust-stats";

type FormTrustPanelProps = {
  title?: string;
  subtitle?: string;
};

export function FormTrustPanel({
  title = "Why founders choose TRYN",
  subtitle = "Embedded engineering with venture-studio discipline, not another vendor.",
}: FormTrustPanelProps) {
  return (
    <aside className="form-trust-panel" aria-label="Trust indicators">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        Track record
      </p>
      <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-foreground">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>
      <ul className="mt-8 space-y-6 border-t border-border pt-6">
        {trustStats.slice(0, 3).map((stat) => (
          <li key={stat.label}>
            <p className="stat-value text-2xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="stat-label">{stat.label}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-border pt-6 text-xs leading-relaxed text-muted">
        Typical response within 24 hours on business days.
      </p>
    </aside>
  );
}
