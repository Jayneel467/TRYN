"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const nodes = [
  { id: "next", label: "Next.js 16", x: 50, y: 12, delay: 0 },
  { id: "api", label: "API Layer", x: 18, y: 42, delay: 0.15 },
  { id: "db", label: "Postgres", x: 82, y: 42, delay: 0.25 },
  { id: "edge", label: "Edge CDN", x: 32, y: 78, delay: 0.35 },
  { id: "ai", label: "AI Services", x: 68, y: 78, delay: 0.45 },
] as const;

const edges: [string, string][] = [
  ["next", "api"],
  ["next", "db"],
  ["api", "edge"],
  ["db", "ai"],
  ["edge", "ai"],
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

type ArchitectureDiagramProps = {
  className?: string;
  title?: string;
};

export function ArchitectureDiagram({
  className,
  title = "Reference architecture",
}: ArchitectureDiagramProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const animate = isInView || reducedMotion;

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/80 bg-background p-5 sm:p-6",
        className
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
        {title}
      </p>

      <div className="relative mx-auto mt-4 aspect-[5/3] max-w-md">
        <svg
          viewBox="0 0 100 90"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {edges.map(([from, to], i) => {
            const a = getNode(from);
            const b = getNode(to);
            return (
              <motion.line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y + 4}
                x2={b.x}
                y2={b.y + 4}
                stroke="currentColor"
                strokeWidth="0.4"
                className="text-saffron/30"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={animate ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.1,
                  ease: EASE_OUT_EXPO,
                }}
              />
            );
          })}
        </svg>

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{
              duration: 0.45,
              delay: node.delay,
              ease: EASE_OUT_EXPO,
            }}
          >
            <div className="rounded-lg border border-border/80 bg-card px-2.5 py-1.5 text-center shadow-sm sm:px-3 sm:py-2">
              <span className="whitespace-nowrap text-[10px] font-semibold text-navy dark:text-white sm:text-[11px]">
                {node.label}
              </span>
            </div>
          </motion.div>
        ))}

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.55, ease: EASE_OUT_EXPO }}
        >
          <div className="rounded-full border border-saffron/30 bg-saffron/10 px-3 py-1 text-[9px] font-medium text-saffron">
            TRYN engineered
          </div>
        </motion.div>
      </div>
    </div>
  );
}
