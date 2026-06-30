import Image from "next/image";
import { FadeIn } from "@/components/shared/fade-in";
import { InteractiveRowLink } from "@/components/shared/interactive-row-link";
import { cn } from "@/lib/utils";

type Metric = { label: string; value: string };

type FeaturedSpotlightProps = {
  href: string;
  category: string;
  title: string;
  legalName?: string;
  description: string;
  metrics: readonly Metric[];
  status?: string;
  externalUrl?: string;
  badge?: string;
  image?: string;
  className?: string;
  frame?: boolean;
};

export function FeaturedSpotlight({
  href,
  category,
  title,
  legalName,
  description,
  metrics,
  status,
  externalUrl,
  badge = "Featured",
  image,
  className,
  frame = false,
}: FeaturedSpotlightProps) {
  const media = image ? (
    <div
      className={cn(
        "relative aspect-[16/10] max-w-md overflow-hidden rounded-lg border border-border bg-soft-gray",
        frame ? "featured-spotlight-media max-w-sm" : "mb-6",
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        sizes="(max-width: 1024px) 100vw, 28rem"
      />
    </div>
  ) : null;

  const meta = (
    <div className="flex flex-wrap items-center gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {category}
      </p>
      <span className="text-[11px] font-medium text-saffron">{badge}</span>
      {status && (
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
          {status}
        </span>
      )}
    </div>
  );

  const metricsBlock = (
    <div
      className={cn(
        "featured-spotlight-metrics",
        frame && "featured-spotlight-metrics-frame",
      )}
    >
      {metrics.map((metric) => (
        <div key={metric.label} className="featured-spotlight-metric">
          <p className="stat-value">{metric.value}</p>
          <p className="stat-label">{metric.label}</p>
        </div>
      ))}
    </div>
  );

  const cta = (
    <p className={cn("text-sm font-medium text-saffron", frame ? "mt-0" : "mt-6")}>
      Read the build story
      {externalUrl ? " · Visit product site" : ""}
    </p>
  );

  return (
    <FadeIn delay={0.06}>
      <InteractiveRowLink
        href={href}
        className={cn(
          "featured-spotlight group block",
          frame && "featured-spotlight-frame",
          className,
        )}
      >
        <div className="featured-spotlight-rule" aria-hidden="true" />
        {frame ? (
          <div className="featured-spotlight-body">
            {media}
            {meta}
            <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
              {title}
            </h3>
            {legalName && <p className="mt-1 text-xs text-muted">{legalName}</p>}
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
              {description}
            </p>
            {metricsBlock}
            {cta}
          </div>
        ) : (
          <div className="featured-spotlight-grid">
            <div className="min-w-0">
              {media}
              {meta}
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
                {title}
              </h3>
              {legalName && <p className="mt-1 text-xs text-muted">{legalName}</p>}
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-[15px]">
                {description}
              </p>
              {cta}
            </div>
            {metricsBlock}
          </div>
        )}
      </InteractiveRowLink>
    </FadeIn>
  );
}

type FeaturedQuoteProps = {
  quote: string;
  author: string;
  role: string;
  company: string;
  className?: string;
};

export function FeaturedQuote({
  quote,
  author,
  role,
  company,
  className,
}: FeaturedQuoteProps) {
  return (
    <FadeIn delay={0.06}>
      <blockquote className={cn("featured-quote", className)}>
        <div className="featured-spotlight-rule" aria-hidden="true" />
        <p className="featured-quote-text">&ldquo;{quote}&rdquo;</p>
        <footer className="featured-quote-footer">
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted">
            {role}, {company}
          </p>
        </footer>
      </blockquote>
    </FadeIn>
  );
}
