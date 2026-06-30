"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
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

type PanelPosition = {
  top: number;
  left: number;
  width: number;
};

function ServicesNavPanel({
  position,
  panelRef,
}: {
  position: PanelPosition;
  panelRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={panelRef}
      className="services-nav-panel fixed z-[300] rounded-lg border border-border bg-background p-5 shadow-lg"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        transform: "translateX(-50%)",
      }}
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
  );
}

export function ServicesNavDropdown({ heroDarkOverlay }: { heroDarkOverlay?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isActive = pathname === "/services" || pathname.startsWith("/services/");

  const updatePosition = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 8,
      left: rect.left + rect.width / 2,
      width: Math.min(672, window.innerWidth - 32),
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <li className="relative">
      <button
        ref={buttonRef}
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

      {mounted &&
        open &&
        position &&
        createPortal(
          <ServicesNavPanel position={position} panelRef={panelRef} />,
          document.body,
        )}
    </li>
  );
}
