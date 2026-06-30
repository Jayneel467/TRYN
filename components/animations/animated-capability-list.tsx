"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO, staggerContainer, staggerItemVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

const rows = [
  { label: "Product engineering", finalStatus: "Active" },
  { label: "Platform architecture", finalStatus: "Active" },
  { label: "AI & data systems", finalStatus: "Active" },
  { label: "Scale & reliability", finalStatus: "Active" },
] as const;

type AnimatedCapabilityListProps = {
  className?: string;
};

export function AnimatedCapabilityList({ className }: AnimatedCapabilityListProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className={cn(
          "divide-y divide-border/80 rounded-xl border border-border/80 bg-soft-gray/40 dark:bg-navy-light/20",
          className
        )}
      >
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-4 py-2.5 text-[11px]"
          >
            <span className="font-medium text-navy/80 dark:text-white/80">{row.label}</span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {row.finalStatus}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "divide-y divide-border/80 rounded-xl border border-border/80 bg-soft-gray/40 dark:bg-navy-light/20",
        className
      )}
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.12, 0.8)}
    >
      {rows.map((row) => (
        <motion.div
          key={row.label}
          variants={staggerItemVariants}
          className="flex items-center justify-between px-4 py-2.5 text-[11px]"
        >
          <span className="font-medium text-navy/80 dark:text-white/80">{row.label}</span>
          <span className="flex items-center gap-1.5">
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.35, ease: EASE_OUT_EXPO }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.3 }}
              className="text-emerald-600 dark:text-emerald-400"
            >
              {row.finalStatus}
            </motion.span>
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
