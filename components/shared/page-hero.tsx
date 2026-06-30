import { FadeIn } from "@/components/shared/fade-in";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  className,
  align = "left",
}: PageHeroProps) {
  return (
    <div
      className={cn(
        "page-hero section-surface px-4 pb-16 pt-[calc(var(--header-height)+2rem)] sm:px-6 sm:pb-20 sm:pt-[calc(var(--header-height)+2.5rem)] lg:px-8 lg:pb-24",
        align === "center" && "text-center",
        className,
      )}
    >
      <div className={cn("container-wide", align === "center" && "mx-auto max-w-3xl")}>
        <FadeIn>
          <div
            className={cn(
              "mb-6 h-0.5 w-10 bg-saffron sm:mb-8",
              align === "center" && "mx-auto",
            )}
            aria-hidden="true"
          />
          {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
          <h1 className={cn("display-heading mt-4 text-foreground", align === "center" && "mx-auto")}>
            {title}
          </h1>
          {lead && (
            <p
              className={cn(
                "body-lead mt-6 max-w-3xl text-muted",
                align === "center" && "mx-auto",
              )}
            >
              {lead}
            </p>
          )}
          {children}
        </FadeIn>
      </div>
    </div>
  );
}
