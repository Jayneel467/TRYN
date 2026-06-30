"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { EASE_OUT, fadeUpOffset, VIEWPORT_DEFAULT } from "@/lib/motion";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  /** Viewport margin override, e.g. "-60px" */
  margin?: string;
};

const directionOffsets = {
  up: { y: fadeUpOffset, x: 0 },
  down: { y: -fadeUpOffset, x: 0 },
  left: { x: fadeUpOffset, y: 0 },
  right: { x: -fadeUpOffset, y: 0 },
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  margin,
}: FadeInProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directionOffsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ ...VIEWPORT_DEFAULT, margin: margin ?? VIEWPORT_DEFAULT.margin }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
