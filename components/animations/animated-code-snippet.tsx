"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Token = { text: string; className: string };

const codeLines: Token[][] = [
  [
    { text: "// ", className: "text-muted" },
    { text: "itinero/bookings/route.ts", className: "text-muted" },
  ],
  [
    { text: "export async function ", className: "text-violet-600 dark:text-violet-400" },
    { text: "POST", className: "text-amber-600 dark:text-amber-400" },
    { text: "(req: ", className: "text-foreground/80" },
    { text: "Request", className: "text-emerald-600 dark:text-emerald-400" },
    { text: ") {", className: "text-foreground/80" },
  ],
  [
    { text: "  const ", className: "text-violet-600 dark:text-violet-400" },
    { text: "{ destination, dates }", className: "text-foreground/80" },
    { text: " = await ", className: "text-violet-600 dark:text-violet-400" },
    { text: "req.json", className: "text-foreground/80" },
    { text: "()", className: "text-foreground/80" },
  ],
  [
    { text: "  const ", className: "text-violet-600 dark:text-violet-400" },
    { text: "availability", className: "text-foreground/80" },
    { text: " = await ", className: "text-violet-600 dark:text-violet-400" },
    { text: "searchInventory", className: "text-sky-600 dark:text-sky-400" },
    { text: "({", className: "text-foreground/80" },
  ],
  [
    { text: "    markets: ", className: "text-foreground/80" },
    { text: "['IN', 'AE', 'SG']", className: "text-emerald-600 dark:text-emerald-400" },
    { text: ",", className: "text-foreground/80" },
  ],
  [
    { text: "    destination,", className: "text-foreground/80" },
  ],
  [
    { text: "    checkIn: dates.from,", className: "text-foreground/80" },
  ],
  [
    { text: "  })", className: "text-foreground/80" },
  ],
  [
    { text: "  return ", className: "text-violet-600 dark:text-violet-400" },
    { text: "Response.json", className: "text-sky-600 dark:text-sky-400" },
    { text: "({ bookings: availability })", className: "text-foreground/80" },
  ],
  [{ text: "}", className: "text-foreground/80" }],
];

const fullCode = codeLines
  .map((line) => line.map((t) => t.text).join(""))
  .join("\n");

type AnimatedCodeSnippetProps = {
  className?: string;
  filename?: string;
};

export function AnimatedCodeSnippet({
  className,
  filename = "route.ts",
}: AnimatedCodeSnippetProps) {
  const reducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const displayLines = reducedMotion ? codeLines.length : visibleLines;

  useEffect(() => {
    if (reducedMotion) return;

    let line = 0;
    const interval = setInterval(() => {
      line += 1;
      setVisibleLines(line);
      if (line >= codeLines.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 1200);
      }
    }, 520);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/80 bg-[#0d1117] font-mono text-[10px] leading-[1.65] sm:text-[11px]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-1 truncate text-[10px] text-white/40">{filename}</span>
        <span className="ml-auto text-[9px] font-medium uppercase tracking-wider text-emerald-400/80">
          TypeScript
        </span>
      </div>
      <div className="p-3 sm:p-3.5">
        <pre className="overflow-x-auto" aria-label="Itinero booking API route code">
          {reducedMotion ? (
            <code className="text-white/85">{fullCode}</code>
          ) : (
            <code>
              {codeLines.slice(0, displayLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                  className="whitespace-pre"
                >
                  {line.map((token, j) => (
                    <span key={j} className={token.className}>
                      {token.text}
                    </span>
                  ))}
                  {i === displayLines - 1 && showCursor && (
                    <motion.span
                      className="ml-px inline-block h-[1.1em] w-[5px] translate-y-[1px] bg-saffron"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              ))}
            </code>
          )}
        </pre>
      </div>
    </div>
  );
}
