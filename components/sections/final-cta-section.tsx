import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { MotionPressable } from "@/components/shared/motion-pressable";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function FinalCtaSection() {
  return (
    <section
      className="section-padding section-navy"
      aria-labelledby="final-cta-heading"
    >
      <div className="container-wide">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="section-chapter text-[var(--section-navy-muted)]/50" aria-hidden="true">
            06
          </p>
          <div className="mx-auto mb-6 h-0.5 w-12 bg-saffron sm:mb-8" aria-hidden="true" />
          <p className="section-eyebrow section-navy-muted opacity-80">Build with us</p>
          <h2 id="final-cta-heading" className="section-title mt-3 text-[var(--section-navy-fg)]">
            The companies of tomorrow need builders, not vendors
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed section-navy-muted sm:text-base">
            Whether you&apos;re a founder with a pitch deck or a company ready for a dedicated
            engineering partner. TRYN is built for long-term ventures, not short-term contracts.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MotionPressable>
              <Button
                size="lg"
                variant="outline"
                className="border-[var(--section-navy-fg)]/30 bg-transparent text-[var(--section-navy-fg)] hover:border-[var(--section-navy-fg)] hover:bg-[var(--section-navy-fg)] hover:text-[var(--section-navy-bg)]"
                asChild
              >
                <Link href={siteConfig.ctas.founders.href}>
                  {siteConfig.ctas.founders.label}
                </Link>
              </Button>
            </MotionPressable>
            <MotionPressable>
              <Button size="lg" asChild>
                <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
              </Button>
            </MotionPressable>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
