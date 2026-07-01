import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { DevelopmentMindMap } from "@/components/sections/development-mind-map";
import { ProcessSection } from "@/components/sections/process-section";
import { TeamSection } from "@/components/sections/team-section";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { TrynVsAgency } from "@/components/shared/tryn-vs-agency";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "TRYN Studios is an early-stage product engineering studio and venture partner, building Itinero Travels and partnering with selected founders.",
  path: "/about",
});

const values = [
  {
    title: "Founder-First",
    description: "Every decision starts with what's best for the founder and their company.",
  },
  {
    title: "Engineering Excellence",
    description: "Production-grade code, security, and architecture from day one.",
  },
  {
    title: "Long-Term Partnership",
    description: "We're in it for the journey, from MVP to IPO and beyond.",
  },
  {
    title: "Ownership Mentality",
    description: "We think and act like co-founders, not contractors.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About TRYN"
        title="We build companies, not just software."
        lead="TRYN Studios is an early-stage venture product engineering team. We're building Itinero Travels, an AI travel platform in pre-launch founded by Jagannath, and bring the same embedded engineering discipline to selected founder partners through our Founders Program."
      >
        <Logo variant="full" className="mb-8 mt-6" />
      </PageHero>

      <DevelopmentMindMap />

      <section className="section-padding section-muted">
        <div className="container-wide">
          <FadeIn>
            <div className="overflow-hidden rounded-lg border border-border bg-background">
              <div className="border-b border-border px-6 py-4 sm:px-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                  Mission
                </p>
              </div>
              <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {[
                  {
                    title: "Not Freelancers",
                    text: "A dedicated team, not individuals juggling multiple clients.",
                  },
                  {
                    title: "Not an Agency",
                    text: "We embed as your engineering org, not a vendor delivering tickets.",
                  },
                  {
                    title: "Product Engineers",
                    text: "We think in products, users, and business outcomes.",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-6 sm:p-8">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 body-copy">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn className="mt-16" delay={0.1}>
            <h2 className="section-title text-foreground">Our values</h2>
            <div className="pillar-grid mt-8">
              {values.map((v, i) => (
                <div key={v.title} className="pillar-cell">
                  <p className="pillar-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 body-copy">{v.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <TrynVsAgency className="mt-16 lg:mt-20" />

          <FadeIn className="mt-16 text-center" delay={0.15}>
            <p className="body-lead">{siteConfig.tagline}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/work/itinero-travels">See our work</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <ProcessSection />

      <TeamSection />
    </>
  );
}
