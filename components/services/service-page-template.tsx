import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedCapabilityList } from "@/components/animations/animated-capability-list";
import { FadeIn } from "@/components/shared/fade-in";
import { InteractiveRowLink } from "@/components/shared/interactive-row-link";
import { PageHero } from "@/components/shared/page-hero";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { Button } from "@/components/ui/button";
import { services, type Service } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

type Props = {
  service: Service;
};

export function ServicePageTemplate({ service }: Props) {
  const relatedServices = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "Worldwide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero eyebrow="Service" title={service.title} lead={service.description}>
        <nav aria-label="Breadcrumb" className="mt-6 flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-saffron">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/services" className="hover:text-saffron">
            Services
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{service.title}</span>
        </nav>
      </PageHero>

      <section className="section-padding section-muted">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
            <FadeIn>
              <h2 className="section-title text-foreground">What we build</h2>
              <ul className="mt-8 space-y-3">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="flex gap-3 body-copy">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                    {cap}
                  </li>
                ))}
              </ul>

              <h2 className="section-title mt-12 text-foreground">Our approach</h2>
              <ol className="mt-8 space-y-6">
                {service.approach.map((step, i) => (
                  <li key={step.title} className="border-l border-border pl-6">
                    <span className="font-serif text-sm tabular-nums text-saffron">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
                  </li>
                ))}
              </ol>
            </FadeIn>

            <FadeIn delay={0.08}>
              <AnimatedCapabilityList className="mb-8" />
              <div className="rounded-lg border border-border bg-background p-6">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Who it&apos;s for
                </h2>
                <ul className="mt-4 space-y-2">
                  {service.audience.map((a) => (
                    <li key={a} className="text-sm text-muted">
                      {a}
                    </li>
                  ))}
                </ul>
                <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Technologies
                </h2>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.technologies.map((tech) => (
                    <span key={tech} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-16" delay={0.1}>
            <h2 className="section-title text-foreground">Related services</h2>
            <Stagger className="divided-rows mt-8" stagger={0.06}>
              {relatedServices.map((related) => (
                <StaggerItem key={related.slug}>
                  <InteractiveRowLink href={`/services/${related.slug}`} className="py-7 sm:py-8">
                    <h3 className="font-semibold text-foreground">{related.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm text-muted">{related.description}</p>
                  </InteractiveRowLink>
                </StaggerItem>
              ))}
            </Stagger>
          </FadeIn>

          <FadeIn className="mt-12 flex flex-wrap gap-4" delay={0.12}>
            <Button size="lg" asChild>
              <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={siteConfig.ctas.pitchDeck.href}>
                {siteConfig.ctas.pitchDeck.label}
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
