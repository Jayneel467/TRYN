"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cardHoverTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type InteractiveRowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function InteractiveRowLink({ href, children, className }: InteractiveRowLinkProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <Link href={href} className={cn("group block", className)}>
        {children}
      </Link>
    );
  }

  return (
    <motion.div className="h-auto" whileHover={{ y: -2 }} transition={cardHoverTransition}>
      <Link
        href={href}
        className={cn(
          "group relative block transition-colors duration-300",
          "before:absolute before:inset-y-0 before:-left-4 before:w-0.5 before:origin-center before:scale-y-0 before:rounded-full before:bg-foreground/20 before:transition-transform before:duration-300 hover:before:scale-y-100 sm:before:-left-6",
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
