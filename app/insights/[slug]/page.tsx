import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { getInsightBySlug, insightPosts, parseInsightParagraph } from "@/lib/insights";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return insightPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) return {};
  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${slug}`,
  });
}

export default async function InsightPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    url: `${siteConfig.url}/insights/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero eyebrow={post.category} title={post.title} lead={post.description}>
        <p className="mt-4 text-sm text-muted">
          {post.readMinutes} min read ·{" "}
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </PageHero>

      <section className="section-padding section-muted">
        <div className="container-wide max-w-3xl">
          <FadeIn>
            <div className="prose-tryn space-y-6">
              {post.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="body-lead text-muted">
                  {parseInsightParagraph(paragraph, post.inlineLinks).map((segment, index) =>
                    segment.type === "link" ? (
                      <Link
                        key={`${segment.href}-${index}`}
                        href={segment.href}
                        className="link-editorial"
                      >
                        {segment.label}
                      </Link>
                    ) : (
                      <span key={`${segment.value.slice(0, 12)}-${index}`}>{segment.value}</span>
                    ),
                  )}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-12 flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <Link href="/insights">All insights</Link>
            </Button>
            <Button asChild>
              <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
