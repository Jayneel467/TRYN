"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EASE_OUT, staggerContainer, staggerItemVariants } from "@/lib/motion";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const links = navLinks.map((link) => {
    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={onClose}
        className={cn(
          "block rounded-md px-4 py-3 text-[15px] font-medium transition-colors",
          isActive
            ? "bg-soft-gray text-foreground"
            : "text-foreground/75 hover:bg-soft-gray hover:text-foreground",
        )}
      >
        {link.label}
      </Link>
    );
  });

  const ctaBlock = (
    <div className="mt-4 space-y-2 border-t border-border px-4 pb-4 pt-4">
      <Button variant="outline" className="w-full" asChild>
        <Link href={siteConfig.ctas.founders.href} onClick={onClose}>
          {siteConfig.ctas.founders.label}
        </Link>
      </Button>
      <Button className="w-full" asChild>
        <Link href={siteConfig.ctas.hire.href} onClick={onClose}>
          {siteConfig.ctas.hire.label}
        </Link>
      </Button>
    </div>
  );

  return (
    <AnimatePresence>
      {open &&
        (reducedMotion ? (
          <div key="mobile-menu" className="header-surface border-t border-border lg:hidden">
            <nav className="container-wide flex flex-col px-0 py-2" aria-label="Mobile navigation">
              {links}
              {ctaBlock}
            </nav>
          </div>
        ) : (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="header-surface overflow-hidden border-t border-border lg:hidden"
          >
            <motion.nav
              className="container-wide flex flex-col py-2"
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.04, 0.05)}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <motion.div key={link.href} variants={staggerItemVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "block px-4 py-3 text-[15px] font-medium transition-colors",
                        isActive
                          ? "bg-soft-gray text-foreground"
                          : "text-foreground/75 hover:bg-soft-gray hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div variants={staggerItemVariants}>{ctaBlock}</motion.div>
            </motion.nav>
          </motion.div>
        ))}
    </AnimatePresence>
  );
}
