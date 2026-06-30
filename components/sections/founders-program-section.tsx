import Link from "next/link";
import type { ReactNode } from "react";
import { HoverLift } from "@/components/shared/hover-lift";
import { MotionPressable } from "@/components/shared/motion-pressable";
import {
  PartnershipTimeline,
  foundersProgramSteps,
  hireTrynSteps,
} from "@/components/shared/partnership-timeline";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const programHighlights = [
  "Highly selective",
  "Equity or hybrid",
  "Pitch deck review",
] as const;

const hireHighlights = [
  "Dedicated team",
  "Long-term embed",
  "Product in market",
] as const;

type PartnershipPathCardProps = {
  eyebrow: string;
  title: string;
  lead: string;
  highlights: readonly string[];
  steps: readonly (typeof foundersProgramSteps)[number][];
  stepsLabel: string;
  ctaHref: string;
  ctaLabel: string;
  footnote?: ReactNode;
  stepDelay?: number;
  frame?: boolean;
};

function PartnershipPathCard({
  eyebrow,
  title,
  lead,
  highlights,
  steps,
  stepsLabel,
  ctaHref,
  ctaLabel,
  footnote,
  stepDelay = 0.08,
  frame = false,
}: PartnershipPathCardProps) {
  return (
    <HoverLift className="h-full">
      <article
        className={cn(
          "partnership-path-card partnership-path-card-interactive flex h-full flex-col",
          frame && "partnership-path-card-frame",
        )}
      >
        <header>
          <p className="partnership-path-eyebrow">{eyebrow}</p>
          <h3
            className={cn(
              "mt-2.5 font-semibold tracking-[-0.02em] text-foreground",
              frame ? "text-lg sm:text-xl" : "mt-3 text-xl sm:text-2xl",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed text-muted",
              frame ? "mt-2 sm:text-sm" : "mt-3 sm:text-[15px]",
            )}
          >
            {lead}
          </p>
        </header>

        <ul
          className={cn(
            "partnership-path-highlights",
            frame ? "partnership-path-highlights-frame" : "mt-6",
          )}
        >
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <div className={cn("mt-auto", frame ? "pt-4" : "pt-6")}>
          <PartnershipTimeline
            steps={steps}
            variant="compact"
            ariaLabel={stepsLabel}
            delay={stepDelay}
            className={cn("partnership-steps-compact", frame && "partnership-steps-compact-frame")}
          />

          {footnote ? <div className={cn(frame ? "mt-3" : "mt-5")}>{footnote}</div> : null}

          <MotionPressable className={cn(frame ? "mt-4" : "mt-6")}>
            <Button size={frame ? "default" : "lg"} asChild className="w-full sm:w-auto">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </MotionPressable>
        </div>
      </article>
    </HoverLift>
  );
}

export function FoundersProgramSection() {
  return (
    <section
      id="founders-program"
      className="founders-flagship section-padding-frame section-surface section-editorial"
      aria-labelledby="founders-heading"
    >
      <div className="container-wide">
        <div className="founders-flagship-rule mx-auto mb-6 h-0.5 w-12 bg-saffron lg:mx-0 lg:mb-8" aria-hidden="true" />

        <FadeIn className="mb-8 max-w-2xl lg:mb-9">
          <SectionHeading
            id="founders-heading"
            chapter="02"
            eyebrow="How we partner"
            title="Two paths into the studio"
            subtitle="Equity for founders with traction. Embedded teams for companies in market."
            frame
            className="mb-0"
          />
        </FadeIn>

        <Stagger className="partnership-paths-grid" stagger={0.1} delayChildren={0.06}>
          <StaggerItem className="h-full">
            <PartnershipPathCard
              frame
              eyebrow="Founders Program"
              title="Equity-backed technical co-founder"
              lead="Submit your pitch deck. If aligned, TRYN becomes your engineering organization."
              highlights={programHighlights}
              steps={foundersProgramSteps}
              stepsLabel="Founders Program process"
              ctaHref={siteConfig.ctas.pitchDeck.href}
              ctaLabel="Submit your pitch deck"
              footnote={
                <p className="text-xs leading-relaxed text-muted/80">
                  Limited quarterly slots. Engineers:{" "}
                  <Link href="/mentorship" className="link-editorial">
                    TRYN Fellowship
                  </Link>
                </p>
              }
            />
          </StaggerItem>

          <StaggerItem className="h-full">
            <PartnershipPathCard
              frame
              eyebrow="Hire TRYN"
              title="Dedicated engineering, without hiring overhead"
              lead="One embedded team accountable to your roadmap, not a rotating contractor bench."
              highlights={hireHighlights}
              steps={hireTrynSteps}
              stepsLabel="Hire TRYN process"
              ctaHref={siteConfig.ctas.hire.href}
              ctaLabel={siteConfig.ctas.hire.label}
              stepDelay={0.12}
            />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
