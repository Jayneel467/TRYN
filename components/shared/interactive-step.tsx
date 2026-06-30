"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cardHoverTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type InteractiveStepProps = {
  children: ReactNode;
  className?: string;
  as?: "li" | "div";
};

export function InteractiveStep({ children, className, as = "li" }: InteractiveStepProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const MotionComponent = as === "li" ? motion.li : motion.div;

  return (
    <MotionComponent
      className={cn(
        "h-full transition-colors duration-300 hover:bg-background",
        className,
      )}
      whileHover={{ y: -2 }}
      transition={cardHoverTransition}
    >
      {children}
    </MotionComponent>
  );
}

type StepBadgeProps = {
  children: ReactNode;
  className?: string;
};

export function StepBadge({ children, className }: StepBadgeProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <span className={cn("step-badge", className)}>{children}</span>;
  }

  return (
    <motion.span
      className={cn(
        "step-badge inline-flex transition-[border-color,transform]",
        className,
      )}
      whileHover={{ scale: 1.05, borderColor: "rgba(11, 31, 58, 0.25)" }}
      transition={cardHoverTransition}
    >
      {children}
    </motion.span>
  );
}
