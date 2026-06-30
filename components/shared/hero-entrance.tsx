"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

type HeroEntranceProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
} & Pick<ComponentPropsWithoutRef<"div">, "aria-label">;

/** Safe hero motion — content stays visible (opacity: 1), subtle y slide only */
export function HeroEntrance({ children, className, delay = 0, ...rest }: HeroEntranceProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT_EXPO }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
