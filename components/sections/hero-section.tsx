import Link from "next/link";
import { HeroEntrance } from "@/components/shared/hero-entrance";
import { MotionPressable } from "@/components/shared/motion-pressable";
import { Button } from "@/components/ui/button";
import { heroStats } from "@/lib/studio-stats";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="hero-authority">
      <div className="container-wide hero-frame">
        <HeroEntrance className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-3 h-0.5 w-12 bg-saffron"
            aria-hidden="true"
          />

          <p className="section-eyebrow text-center">TRYN Studios</p>

          <h1 className="hero-headline">{siteConfig.tagline}</h1>

          <p className="hero-lead mx-auto mt-3 max-w-xl">{siteConfig.description}</p>

          <div className="mt-5 flex flex-wrap justify-center gap-3 sm:mt-6">
            <MotionPressable>
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background dark:border-white/30 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-navy"
                asChild
              >
                <Link href={siteConfig.ctas.founders.href}>
                  {siteConfig.ctas.founders.label}
                </Link>
              </Button>
            </MotionPressable>
            <MotionPressable>
              <Button size="lg" asChild>
                <Link href={siteConfig.ctas.hire.href}>
                  {siteConfig.ctas.hire.label}
                </Link>
              </Button>
            </MotionPressable>
          </div>

          <p className="mx-auto mt-5 max-w-lg text-center text-sm text-muted">
            <Link href="/services" className="link-editorial">
              Explore services
            </Link>
            <span className="text-border" aria-hidden="true">
              {" · "}
            </span>
            <Link href="/work" className="link-editorial">
              See our work
            </Link>
          </p>
        </HeroEntrance>

        <HeroEntrance delay={0.08} className="mt-6 sm:mt-7">
          <div
            className="hero-stat-row"
            role="list"
            aria-label="Company metrics"
          >
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                role="listitem"
                className={cn(
                  "px-4 text-center sm:px-6",
                  index > 0 && "border-l",
                  index > 0 && "[border-color:var(--hero-stat-divider)]",
                )}
              >
                <p className="hero-stat-value">{stat.value}</p>
                <p className="hero-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </HeroEntrance>
      </div>
    </section>
  );
}
