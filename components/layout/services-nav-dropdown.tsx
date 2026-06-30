"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  engineeringCategoryOrder,
  growthBrandOverview,
  homepageServiceCategoryHref,
  marketingCategoryHref,
  marketingCategoryOrder,
} from "@/lib/services";
import { cn } from "@/lib/utils";

const engineeringPillar = {
  label: "Product Engineering",
  href: "/services",
  categories: engineeringCategoryOrder
    .filter((c) => c !== "Engineering")
    .map((category) => ({
      label: category,
      href: homepageServiceCategoryHref[category as keyof typeof homepageServiceCategoryHref],
    })),
};

const marketingPillar = {
  label: growthBrandOverview.title,
  href: growthBrandOverview.href,
  categories: marketingCategoryOrder.map((category) => ({
    label: category,
    href: marketingCategoryHref[category],
  })),
};

export function ServicesNavDropdown({ heroDarkOverlay }: { heroDarkOverlay?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const isActive = pathname === "/services" || pathname.startsWith("/services/");

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        className={cn(
          heroDarkOverlay ? "nav-link-hero" : "nav-link",
          !heroDarkOverlay && isActive && "nav-link-active",
          heroDarkOverlay && isActive && "nav-link-active-hero",
          "inline-flex items-center gap-1",
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Services
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          className="services-nav-panel absolute left-1/2 top-[calc(100%+0.5rem)] z-[300] w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-border bg-background p-5 shadow-lg"
          role="menu"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {[engineeringPillar, marketingPillar].map((pillar) => (
              <div key={pillar.label}>
                <Link
                  href={pillar.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.14em] text-saffron hover:underline"
                  role="menuitem"
                >
                  {pillar.label}
                </Link>
                <ul className="mt-3 space-y-1">
                  {pillar.categories.map((cat) => (
                    <li key={cat.href}>
                      <Link
                        href={cat.href}
                        className="block rounded px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-soft-gray hover:text-foreground"
                        role="menuitem"
                      >
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border pt-4">
            <Link
              href="/services"
              className="text-sm font-medium text-muted hover:text-saffron"
              role="menuitem"
            >
              View all capabilities
            </Link>
          </div>
        </div>
      )}
    </li>
  );
}
