"use client";

import { FadeIn } from "@/components/shared/fade-in";
import { Stagger, StaggerItem } from "@/components/shared/stagger";

export type PartnershipStep = {
  step: string;
  title: string;
  detail: string;
};

export const foundersProgramSteps: readonly PartnershipStep[] = [
  {
    step: "01",
    title: "Submit",
    detail: "Pitch deck and company details.",
  },
  {
    step: "02",
    title: "Review",
    detail: "Market, vision, and execution fit.",
  },
  {
    step: "03",
    title: "Discovery",
    detail: "Meet our leadership team.",
  },
  {
    step: "04",
    title: "Partner",
    detail: "Equity or hybrid when aligned.",
  },
];

export const hireTrynSteps: readonly PartnershipStep[] = [
  {
    step: "01",
    title: "Scope",
    detail: "Roadmap and success metrics.",
  },
  {
    step: "02",
    title: "Team",
    detail: "Dedicated embedded squad.",
  },
  {
    step: "03",
    title: "Ship",
    detail: "In-market delivery.",
  },
  {
    step: "04",
    title: "Scale",
    detail: "Capacity as you grow.",
  },
];

type PartnershipTimelineProps = {
  steps?: readonly PartnershipStep[];
  variant?: "timeline" | "compact";
  ariaLabel?: string;
  delay?: number;
  className?: string;
};

export function PartnershipTimeline({
  steps = foundersProgramSteps,
  variant = "timeline",
  ariaLabel = "Partnership process",
  delay = 0.06,
  className,
}: PartnershipTimelineProps) {
  if (variant === "compact") {
    return (
      <Stagger
        as="ol"
        className={className}
        stagger={0.06}
        delayChildren={delay}
        aria-label={ariaLabel}
      >
        {steps.map((item) => (
          <StaggerItem key={item.step} as="li" className="partnership-step-compact-item">
            <span className="partnership-step-compact-num" aria-hidden="true">
              {item.step}
            </span>
            <p className="mt-1 text-sm font-semibold text-foreground">{item.title}</p>
            <p className="partnership-step-compact-detail mt-0.5 text-xs leading-snug text-muted">
              {item.detail}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    );
  }

  return (
    <FadeIn delay={delay} className={className}>
      <Stagger
        as="ol"
        className="partnership-timeline"
        stagger={0.1}
        delayChildren={0.08}
        aria-label={ariaLabel}
      >
        {steps.map((item) => (
          <StaggerItem key={item.step} as="li" className="partnership-timeline-item">
            <span className="partnership-step-num" aria-hidden="true">
              {item.step}
            </span>
            <p className="font-semibold text-foreground">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </FadeIn>
  );
}
