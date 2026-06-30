import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { createPageMetadata } from "@/lib/metadata";
import { insightPosts } from "@/lib/insights";

export const metadata: Metadata = createPageMetadata({
  title: "Insights",
  description:
    "Product engineering and venture studio thinking from TRYN Studios: founders, delivery patterns, and production AI.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="How we think about building ventures"
        lead="Short reads on venture studios, production AI, and what we look for in founder partnerships."
      />

      <section className="section-padding section-muted">
        <div className="container-wide">
          <Stagger className="divided-rows" stagger={0.06}>
            {insightPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="group block py-8 transition-colors hover:bg-soft-gray/30 sm:py-10"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {post.category} · {post.readMinutes} min read
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-foreground group-hover:text-saffron">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-wide">
          <FadeIn>
            <p className="body-copy">
              Want the code behind these patterns?{" "}
              <Link href="/engineering#snippets" className="link-editorial">
                See our engineering snippets
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
