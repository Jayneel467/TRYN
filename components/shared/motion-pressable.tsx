"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { pressableTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MotionPressableProps = {
  children: ReactNode;
  className?: string;
};

/** Subtle scale micro-interaction for CTAs and buttons */
export function MotionPressable({ children, className }: MotionPressableProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <span className={cn("inline-flex", className)}>{children}</span>;
  }

  return (
    <motion.span
      className={cn("inline-flex", className)}
      whileHover={{ scale: 1.008 }}
      whileTap={{ scale: 0.992 }}
      transition={pressableTransition}
    >
      {children}
    </motion.span>
  );
}
