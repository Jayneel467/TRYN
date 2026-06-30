"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const defaultBars = [38, 52, 45, 61, 58, 72, 68, 84, 78, 92, 88, 96];

type AnimatedBarChartProps = {
  bars?: number[];
  className?: string;
  label?: string;
  period?: string;
};

export function AnimatedBarChart({
  bars = defaultBars,
  className,
  label = "Delivery cadence",
  period = "Rolling 12 months",
}: AnimatedBarChartProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-medium uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
        <span className="font-medium text-saffron">{period}</span>
      </div>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-navy/[0.08] dark:bg-white/[0.08]"
            style={{ height: reducedMotion ? `${h}%` : "100%" }}
          >
            <motion.div
              className="h-full w-full rounded-sm bg-gradient-to-t from-navy/80 to-saffron/70 dark:from-navy-light dark:to-saffron/80"
              initial={reducedMotion ? false : { scaleY: 0, opacity: 0.4 }}
              animate={{ scaleY: h / 100, opacity: i >= 8 ? 1 : 0.35 + i * 0.05 }}
              transition={{
                duration: 0.7,
                delay: reducedMotion ? 0 : 0.4 + i * 0.06,
                ease: EASE_OUT_EXPO,
              }}
              style={{ transformOrigin: "bottom" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
