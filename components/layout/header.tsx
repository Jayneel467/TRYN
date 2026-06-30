"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ServicesNavDropdown } from "@/components/layout/services-nav-dropdown";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function subscribeToTheme() {
  return () => {};
}

function getThemeSnapshot() {
  return true;
}

function getThemeServerSnapshot() {
  return false;
}

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const themeMounted = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getThemeServerSnapshot);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const heroOverlay = isHome && !scrolled && !mobileOpen;
  const isDarkTheme = themeMounted && resolvedTheme === "dark";
  const heroDarkOverlay = heroOverlay && isDarkTheme;
  const logoColorScheme = isDarkTheme ? "dark" : "light";

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[200] isolate border-b",
        heroOverlay
          ? cn(
              "header-hero-overlay",
              heroDarkOverlay
                ? "border-white/10 bg-transparent"
                : "header-hero-overlay-light border-border/60",
            )
          : "header-surface border-border",
      )}
    >
      <div className="container-wide site-gutter flex h-16 items-center justify-between gap-6">
        <Logo variant="nav" priority colorScheme={logoColorScheme} className="min-w-0" />

        <nav className="hidden min-w-0 flex-1 items-center justify-center lg:flex" aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              if (link.href === "/services") {
                return <ServicesNavDropdown key={link.href} heroDarkOverlay={heroDarkOverlay} />;
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      heroDarkOverlay ? "nav-link-hero" : "nav-link",
                      !heroDarkOverlay && isActive && "nav-link-active",
                      heroDarkOverlay && isActive && "nav-link-active-hero",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <ThemeToggle
            className={
              heroDarkOverlay ? "text-white/80 hover:bg-white/10 hover:text-white" : undefined
            }
          />
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "h-9 px-4 text-[13px]",
              heroDarkOverlay &&
                "border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy",
            )}
            asChild
          >
            <Link href={siteConfig.ctas.founders.href}>{siteConfig.ctas.founders.label}</Link>
          </Button>
          <Button size="sm" className="h-9 px-4 text-[13px]" asChild>
            <Link href={siteConfig.ctas.hire.href}>{siteConfig.ctas.hire.label}</Link>
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <ThemeToggle
            className={
              heroDarkOverlay ? "text-white/80 hover:bg-white/10 hover:text-white" : undefined
            }
          />
          <Button
            variant="ghost"
            size="icon"
            className={heroDarkOverlay ? "text-white hover:bg-white/10 hover:text-white" : undefined}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
