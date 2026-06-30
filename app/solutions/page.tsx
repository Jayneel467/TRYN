import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import { createPageMetadata } from "@/lib/metadata";
import { solutions } from "@/lib/solutions";

export const metadata: Metadata = createPageMetadata({
  title: "Solutions by industry",
  description:
    "Industry-focused AI and product engineering solutions delivered by TRYN Studios.",
  path: "/solutions",
});

export default function SolutionsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Industry deliveries from the studio"
        lead="Production systems TRYN has shipped across healthcare, education, manufacturing, and more."
      />

      <section className="section-padding section-muted">
        <div className="container-wide">
          <Stagger className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {solutions.map((solution) => (
              <StaggerItem key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-soft-gray/40 sm:p-8"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {solution.category}
                  </p>
                  <h2 className="mt-3 font-semibold text-foreground group-hover:text-saffron">
                    {solution.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted">{solution.description}</p>
                  <p className="mt-4 text-sm font-medium text-saffron">
                    {solution.deliverySlugs.length} deliver
                    {solution.deliverySlugs.length === 1 ? "y" : "ies"}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
