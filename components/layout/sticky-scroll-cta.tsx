"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type StickyMode = "default" | "work";

export function StickyScrollCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<StickyMode>("default");

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    const onScroll = () => {
      const foundersSection = document.getElementById("founders-program");
      const caseStudies = document.getElementById("case-studies");
      const footer = document.querySelector("footer");
      const ctaClearance = 72;

      let shouldShow = foundersSection
        ? foundersSection.getBoundingClientRect().bottom < 0
        : window.scrollY > window.innerHeight * 0.85;

      if (shouldShow && footer) {
        shouldShow = footer.getBoundingClientRect().top > window.innerHeight - ctaClearance;
      }

      if (caseStudies) {
        const rect = caseStudies.getBoundingClientRect();
        const inCaseStudies = rect.top < window.innerHeight * 0.5 && rect.bottom > 0;
        setMode(inCaseStudies ? "work" : "default");
      }

      setVisible(shouldShow);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname !== "/") return null;

  const headline =
    mode === "work" ? "See how TRYN ships in production" : "Ready to build with TRYN?";
  const subline =
    mode === "work"
      ? "Explore client deliveries and the Itinero flagship build."
      : siteConfig.contact.phoneNote;

  return (
    <div
      className={cn("sticky-scroll-cta", visible && "sticky-scroll-cta-visible")}
      role="region"
      aria-label="Quick actions"
      aria-hidden={!visible}
    >
      <div className="container-wide site-gutter flex items-center justify-between gap-4">
        <div className="hidden min-w-0 sm:block">
          <p className="text-sm font-medium text-foreground">{headline}</p>
          <p className="trust-microcopy mt-0.5 text-muted">{subline}</p>
        </div>
        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
          {mode === "work" ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/work">View all work</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href={siteConfig.ctas.founders.href}>
                  {siteConfig.ctas.founders.label}
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
