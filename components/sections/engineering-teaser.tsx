import { Cloud, GitBranch, Layers, Monitor, Server } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { HoverLift } from "@/components/shared/hover-lift";
import { MotionPressable } from "@/components/shared/motion-pressable";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { Button } from "@/components/ui/button";
import { technologyCategories } from "@/lib/technologies";
import { cn } from "@/lib/utils";

const studioBackbone = [
  {
    label: "Auth, design systems, and shared libraries",
    icon: Layers,
  },
  {
    label: "CI/CD with preview deploys on every merge",
    icon: GitBranch,
  },
  {
    label: "Delivery patterns reused across ventures",
    icon: Cloud,
  },
] as const;

const patternHighlights = ["RAG agents", "Webhook handlers", "CI gates"] as const;

const studioStackRows = [
  {
    category: technologyCategories[0].category,
    technologies: technologyCategories[0].technologies.slice(0, 3),
    icon: Monitor,
    dotClass: "category-dot-applications",
  },
  {
    category: technologyCategories[1].category,
    technologies: technologyCategories[1].technologies.slice(0, 4),
    icon: Server,
    dotClass: "category-dot-engineering",
  },
  {
    category: "Platform",
    technologies: ["AWS", "Docker", "Kubernetes", "PostgreSQL"],
    icon: Cloud,
    dotClass: "category-dot-platforms",
  },
] as const;

export function EngineeringTeaser() {
  return (
    <section
      className="section-padding-frame section-surface section-editorial"
      aria-labelledby="engineering-teaser-heading"
    >
      <div className="container-wide">
        <div className="engineering-teaser-grid">
          <div className="engineering-teaser-copy">
            <FadeIn>
              <div
                className="mb-6 h-0.5 w-10 bg-saffron lg:mb-8"
                aria-hidden="true"
              />
              <SectionHeading
                id="engineering-teaser-heading"
                chapter="06"
                eyebrow="Venture ops"
                title="Shared infrastructure that lets us ship ventures faster"
                subtitle="The studio backbone behind Itinero and every build we take on."
                frame
                className="mb-0 max-w-xl"
              />
            </FadeIn>

            <Stagger className="engineering-backbone mt-6 lg:mt-7" stagger={0.06}>
              {studioBackbone.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.label} className="engineering-backbone-item">
                    <span
                      className="engineering-backbone-icon"
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span>{item.label}</span>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <FadeIn className="mt-7 lg:mt-8" delay={0.1}>
              <MotionPressable>
                <Button size="lg" asChild>
                  <Link href="/engineering#snippets">See our patterns</Link>
                </Button>
              </MotionPressable>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                Production code from TRYN deliveries:{" "}
                {patternHighlights.map((pattern, index) => (
                  <span key={pattern}>
                    {index > 0 && (
                      <span className="text-border" aria-hidden="true">
                        {" · "}
                      </span>
                    )}
                    <span className="font-medium text-foreground">{pattern}</span>
                  </span>
                ))}
                .
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.08} className="engineering-teaser-panel-wrap">
            <HoverLift className="w-full">
              <div className="engineering-stack-panel">
                <div className="engineering-stack-panel-header">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] section-navy-muted">
                    Studio stack
                  </p>
                </div>
                <div className="engineering-stack-panel-body">
                  <Stagger className="engineering-stack-categories" stagger={0.05}>
                    {studioStackRows.map((row) => {
                      const Icon = row.icon;
                      return (
                        <StaggerItem
                          key={row.category}
                          className="engineering-stack-category"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={cn("category-dot", row.dotClass)}
                              aria-hidden="true"
                            />
                            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                              {row.category}
                            </h3>
                            <Icon
                              className="ml-auto h-3.5 w-3.5 text-muted/50"
                              strokeWidth={1.75}
                              aria-hidden="true"
                            />
                          </div>
                          <ul className="engineering-stack-category-chips">
                            {row.technologies.map((tech) => (
                              <li key={tech}>
                                <span className="engineering-stack-chip">{tech}</span>
                              </li>
                            ))}
                          </ul>
                        </StaggerItem>
                      );
                    })}
                  </Stagger>
                </div>
              </div>
            </HoverLift>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
