import { siteConfig } from "@/lib/site-config";

type CalEmbedProps = {
  className?: string;
};

export function CalEmbed({ className }: CalEmbedProps) {
  const url = siteConfig.contact.calEmbedUrl;
  if (!url) return null;

  return (
    <div className={className}>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        Book a discovery call
      </p>
      <iframe
        src={url}
        title="Schedule a call with TRYN Studios"
        className="h-[32rem] w-full rounded-lg border border-border bg-background"
        loading="lazy"
      />
    </div>
  );
}
