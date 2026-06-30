import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/shared/fade-in";
import { InteractiveRowLink } from "@/components/shared/interactive-row-link";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { createPageMetadata } from "@/lib/metadata";
import { getSolutionBySlug, solutions } from "@/lib/solutions";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return createPageMetadata({
    title: solution.title,
    description: solution.description,
    path: `/solutions/${slug}`,
  });
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const deliveries = solution.deliverySlugs
    .map((s) => getCaseStudyBySlug(s))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    description: solution.description,
    provider: { "@type": "Organization", name: siteConfig.name },
    areaServed: "Worldwide",
    url: `${siteConfig.url}/solutions/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={solution.category}
        title={solution.title}
        lead={solution.description}
      />

      <section className="section-padding section-muted">
        <div className="container-wide">
          <FadeIn>
            <h2 className="section-title text-foreground">Related deliveries</h2>
          </FadeIn>
          <div className="mt-8 divided-rows">
            {deliveries.map((study) => (
              <InteractiveRowLink
                key={study!.slug}
                href={`/work/${study!.slug}`}
                className="block py-8"
              >
                <h3 className="text-lg font-semibold text-foreground">{study!.title}</h3>
                <p className="mt-2 max-w-2xl text-sm text-muted">{study!.description}</p>
              </InteractiveRowLink>
            ))}
          </div>

          <FadeIn className="mt-12 flex flex-wrap gap-4">
            <Button asChild>
              <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/solutions">All solutions</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
