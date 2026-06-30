"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cardHoverTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HoverLiftProps = {
  children: ReactNode;
  className?: string;
  lift?: number;
};

export function HoverLift({
  children,
  className,
  lift = 4,
}: HoverLiftProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      whileHover={{ y: -lift }}
      transition={cardHoverTransition}
    >
      {children}
    </motion.div>
  );
}
