"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Stagger, StaggerItem } from "@/components/shared/stagger";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

type ClientDeliveriesListProps = {
  deliveries: CaseStudy[];
};

function primaryMetrics(study: CaseStudy) {
  return study.metrics.slice(0, 2);
}

export function ClientDeliveriesList({ deliveries }: ClientDeliveriesListProps) {
  const categories = useMemo(
    () => ["All", ...new Set(deliveries.map((d) => d.category))],
    [deliveries],
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? deliveries : deliveries.filter((d) => d.category === active);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              active === category
                ? "border-saffron/50 bg-saffron/10 text-foreground"
                : "border-border text-muted hover:border-saffron/30 hover:text-foreground",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted">No deliveries in this category yet.</p>
      ) : (
        <Stagger className="delivery-card-grid" stagger={0.05} key={active}>
          {filtered.map((study) => (
            <StaggerItem key={study.slug}>
              <Link
                href={`/work/${study.slug}`}
                className="delivery-card group h-full"
              >
              <div className="delivery-card-accent" aria-hidden="true" />
              <div className="delivery-card-body">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {study.category}
                  </p>
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-saffron">
                    Delivered
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-saffron">
                  {study.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                  {study.description}
                </p>
                <div className="mt-6 flex gap-8 border-t border-border pt-5">
                  {primaryMetrics(study).map((metric) => (
                    <div key={metric.label}>
                      <p className="text-xl font-semibold tabular-nums tracking-[-0.02em] text-foreground">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm font-medium text-saffron opacity-0 transition-opacity group-hover:opacity-100">
                  Read the build story
                </p>
              </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </>
  );
}
