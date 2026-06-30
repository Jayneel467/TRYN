import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { caseStudies, clientDeliveries, getCaseStudyBySlug } from "@/lib/case-studies";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return createPageMetadata({
    title: study.title,
    description: study.summary,
    path: `/work/${slug}`,
    imageAlt: `${study.title} case study | ${siteConfig.name}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const relatedDeliveries = !study.isInternal
    ? clientDeliveries
        .filter((s) => s.slug !== slug && s.category === study.category)
        .slice(0, 2)
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": study.isInternal ? "Article" : "CreativeWork",
    name: study.title,
    headline: study.title,
    description: study.summary,
    ...(study.image ? { image: `${siteConfig.url}${study.image}` } : {}),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      parentOrganization: {
        "@type": "Organization",
        name: siteConfig.parentCompany.legalName,
      },
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.parentCompany.legalName,
    },
    about: study.title,
    url: `${siteConfig.url}/work/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={study.category}
        title={study.title}
        lead={study.summary}
      >
        <Link
          href="/work"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-saffron"
        >
          <ArrowLeft className="h-4 w-4" />
          All case studies
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {study.featured && <Badge>Featured</Badge>}
          <Badge variant="secondary">{study.status}</Badge>
          {study.isInternal && <Badge variant="outline">Group product</Badge>}
          {!study.isInternal && study.status === "Delivered" && (
            <Badge variant="outline">Engineered by TRYN</Badge>
          )}
        </div>
        {study.externalUrl && (
          <p className="mt-4">
            <a
              href={study.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-saffron hover:text-saffron-hover"
            >
              Visit {study.externalUrl.replace(/^https?:\/\//, "")}
            </a>
          </p>
        )}
        {study.legalName && (
          <p className="mt-2 text-sm text-muted">{study.legalName}</p>
        )}
      </PageHero>

      <section className="section-padding section-muted border-b border-border">
        <div className="container-wide">
          {study.image && (
            <FadeIn className="mb-10">
              <figure>
                <div className="relative aspect-[21/9] max-h-[28rem] overflow-hidden rounded-lg border border-border bg-soft-gray">
                  <Image
                    src={study.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority
                  />
                </div>
                {study.imageCaption && (
                  <figcaption className="mt-2 text-center text-xs text-muted">
                    {study.imageCaption}
                  </figcaption>
                )}
              </figure>
            </FadeIn>
          )}
          <FadeIn>
            <div className="featured-spotlight border-saffron/20">
              <div className="featured-spotlight-rule" aria-hidden="true" />
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="stat-value text-2xl sm:text-3xl">{m.value}</p>
                    <p className="stat-label">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-3">
            <FadeIn className="lg:col-span-2 space-y-12">
              {[
                { title: "The challenge", body: study.challenge },
                { title: "The solution", body: study.solution },
              ].map((section) => (
                <section key={section.title}>
                  <h2 className="section-title text-foreground">{section.title}</h2>
                  <p className="mt-4 body-lead text-muted">{section.body}</p>
                </section>
              ))}
              <section>
                <h2 className="section-title text-foreground">Outcomes</h2>
                <Stagger className="mt-6 divided-rows" stagger={0.06}>
                  {study.outcomes.map((outcome) => (
                    <StaggerItem key={outcome} className="py-5">
                      <p className="text-sm leading-relaxed text-muted">{outcome}</p>
                    </StaggerItem>
                  ))}
                </Stagger>
              </section>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="zone-panel p-6 sm:p-8">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Technologies
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.technologies.map((tech) => (
                    <span key={tech} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="mt-6 body-copy">{study.description}</p>
              </div>
            </FadeIn>
          </div>

          {relatedDeliveries.length > 0 && (
            <FadeIn className="mt-16">
              <h2 className="section-title text-foreground">Related deliveries</h2>
              <div className="mt-6 divided-rows">
                {relatedDeliveries.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/work/${related.slug}`}
                    className="block py-6 transition-colors hover:text-saffron"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {related.category}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{related.title}</p>
                  </Link>
                ))}
              </div>
            </FadeIn>
          )}

          <FadeIn className="mt-16 text-center">
            <p className="body-copy">
              {study.status === "In development" || study.status === "Pre-launch"
                ? "In active development by TRYN Studios."
                : study.status === "Planned"
                  ? "On the Itinero group roadmap, engineered by TRYN Studios."
                  : study.status === "Delivered"
                    ? "Engineered by TRYN Studios."
                    : "Engineered by TRYN Studios."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {study.externalUrl && study.isInternal && (
                <Button size="lg" asChild>
                  <a href={study.externalUrl} target="_blank" rel="noopener noreferrer">
                    Visit pre-launch site
                  </a>
                </Button>
              )}
              <Button size="lg" variant={study.externalUrl ? "outline" : "default"} asChild>
                <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/work">More work</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
