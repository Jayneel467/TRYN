"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TerminalLine = {
  text: string;
  type: "command" | "success" | "info" | "deploy";
};

const pipelineLines: TerminalLine[] = [
  { text: "$ tryn deploy itinero-platform --env production", type: "command" },
  { text: "✓ Typecheck passed: 0 errors (1.2s)", type: "success" },
  { text: "✓ Test suite: 847 passed, 0 failed", type: "success" },
  { text: "✓ Next.js 16 build: compiled in 4.1s", type: "success" },
  { text: "✓ Edge functions: 12 regions active", type: "success" },
  { text: "✓ Postgres migrations: 3 applied", type: "success" },
  { text: "→ itinero.travel live, 99.97% uptime", type: "deploy" },
];

const lineColors: Record<TerminalLine["type"], string> = {
  command: "text-white/90",
  success: "text-emerald-400",
  info: "text-sky-400",
  deploy: "text-saffron",
};

type DeployPipelineTerminalProps = {
  className?: string;
};

export function DeployPipelineTerminal({ className }: DeployPipelineTerminalProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const [visibleCount, setVisibleCount] = useState(0);
  const displayCount = reducedMotion ? pipelineLines.length : visibleCount;

  useEffect(() => {
    if (reducedMotion || !isInView) return;

    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setVisibleCount(count);
      if (count >= pipelineLines.length) clearInterval(interval);
    }, 420);

    return () => clearInterval(interval);
  }, [isInView, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden rounded-2xl border border-border/80 bg-[#0a0e14] font-mono text-xs shadow-[0_24px_48px_-24px_rgba(11,31,58,0.25)] dark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[11px] text-white/50">tryn-ci: deploy pipeline</span>
        </div>
        <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
          production
        </span>
      </div>

      <div className="space-y-1.5 p-4 sm:p-5" aria-label="Deploy pipeline output">
        {pipelineLines.slice(0, displayCount).map((line, i) => (
          <motion.div
            key={line.text}
            initial={reducedMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className={cn("leading-relaxed", lineColors[line.type])}
          >
            {line.text}
            {i === displayCount - 1 &&
              displayCount < pipelineLines.length &&
              !reducedMotion && (
                <motion.span
                  className="ml-1 inline-block h-[1em] w-[6px] bg-saffron/80"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  aria-hidden="true"
                />
              )}
          </motion.div>
        ))}
      </div>

      <div className="border-t border-white/[0.06] bg-white/[0.02] px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-white/40">
          <span>
            <span className="text-white/60">stack</span> Next.js · Postgres · Vercel
          </span>
          <span>
            <span className="text-white/60">venture</span> Itinero Travels
          </span>
          <span>
            <span className="text-white/60">by</span> TRYN Studios
          </span>
        </div>
      </div>
    </div>
  );
}
