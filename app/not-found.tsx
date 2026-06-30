import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <section className="section-padding section-surface flex min-h-[70vh] items-center">
      <div className="container-wide max-w-2xl text-center">
        <FadeIn>
          <div className="mx-auto mb-8 h-0.5 w-10 bg-saffron" aria-hidden="true" />
          <p className="section-eyebrow">404</p>
          <h1 className="display-heading mt-4 text-foreground">Page not found</h1>
          <p className="body-lead mx-auto mt-6 max-w-md text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/">Back to home</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={siteConfig.ctas.founders.href}>
                {siteConfig.ctas.founders.label}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
