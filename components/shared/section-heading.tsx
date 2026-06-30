import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  chapter?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
  dark?: boolean;
  frame?: boolean;
};

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  chapter,
  align = "left",
  className,
  id,
  dark = false,
  frame = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        frame ? "section-heading-frame" : "mb-10 max-w-2xl lg:mb-12",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {chapter && (
        <p className="section-chapter" aria-hidden="true">
          {chapter}
        </p>
      )}
      {eyebrow && (
        <p className={cn("section-eyebrow", dark && "section-navy-muted opacity-80")}>{eyebrow}</p>
      )}
      <h2
        id={id}
        className={cn(
          frame ? "section-title-frame" : "section-title",
          eyebrow && "mt-3",
          dark ? "text-[var(--section-navy-fg)]" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            frame ? "section-subtitle-frame" : "section-subtitle",
            dark && "section-navy-muted",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
