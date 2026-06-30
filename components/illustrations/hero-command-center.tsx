"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Circle, GitBranch, Layers, Rocket } from "lucide-react";
import { portfolioBrands } from "@/lib/brands";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const pipelineStages = [
  {
    id: "idea",
    label: "Idea",
    detail: "Discovery & scope",
    icon: Circle,
  },
  {
    id: "design",
    label: "Design",
    detail: "Architecture & UX",
    icon: Layers,
  },
  {
    id: "ship",
    label: "Ship",
    detail: "Build & deploy",
    icon: Rocket,
  },
] as const;

const terminalLines = [
  { type: "prompt" as const, text: "$ tryn deploy --env production" },
  { type: "success" as const, text: "✓ Build passed · 47s" },
  { type: "success" as const, text: "✓ Tests 847/847" },
  { type: "output" as const, text: "→ shipping to edge network…" },
  { type: "live" as const, text: "● live · 99.97% uptime" },
];

const liveMetrics = [
  { value: "12", label: "Active builds", trend: "+3 this week" },
  { value: "847", label: "Tests passing", trend: "100%" },
  { value: "47s", label: "Avg deploy", trend: "↓ 18%" },
];

const ventureCards = portfolioBrands.slice(0, 2);

function PipelineStage({
  stage,
  index,
  active,
  reducedMotion,
}: {
  stage: (typeof pipelineStages)[number];
  index: number;
  active: boolean;
  reducedMotion: boolean | null;
}) {
  const Icon = stage.icon;

  const content = (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-xl border px-3 py-3 text-center transition-colors sm:px-4 sm:py-4",
        active
          ? "border-saffron/50 bg-saffron/[0.08]"
          : "border-white/10 bg-white/[0.03]"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg sm:h-9 sm:w-9",
          active ? "bg-saffron/20 text-saffron" : "bg-white/5 text-white/50"
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <p
        className={cn(
          "mt-2 text-[11px] font-semibold sm:text-xs",
          active ? "text-white" : "text-white/70"
        )}
      >
        {stage.label}
      </p>
      <p className="mt-0.5 hidden text-[10px] text-white/40 sm:block">
        {stage.detail}
      </p>
      {active && (
        <span className="absolute -top-1.5 right-2 h-2 w-2 rounded-full bg-saffron shadow-[0_0_8px_rgba(255,140,26,0.6)]" />
      )}
    </div>
  );

  if (reducedMotion) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: EASE_OUT_EXPO }}
    >
      {content}
    </motion.div>
  );
}

export function HeroCommandCenter({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  const wrapper = (children: React.ReactNode, delay = 0) =>
    reducedMotion ? (
      children
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: EASE_OUT_EXPO }}
      >
        {children}
      </motion.div>
    );

  return (
    <div className={cn("relative", className)}>
      <div
        className="pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-saffron/[0.04] blur-2xl"
        aria-hidden="true"
      />

      <div className="hero-command-grid relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1a30]/80 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        {wrapper(
          <div className="border-b border-white/10 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="h-3.5 w-3.5 text-saffron" aria-hidden="true" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Build pipeline
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none" />
                In production
              </span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1 sm:gap-2">
              {pipelineStages.map((stage, i) => (
                <div key={stage.id} className="contents">
                  <PipelineStage
                    stage={stage}
                    index={i}
                    active={i === 2}
                    reducedMotion={reducedMotion}
                  />
                  {i < pipelineStages.length - 1 && (
                    <div className="flex items-center justify-center px-0.5" aria-hidden="true">
                      <ArrowRight className="h-3 w-3 text-white/20 sm:h-3.5 sm:w-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
              <div
                className={cn(
                  "h-full rounded-full bg-gradient-to-r from-white/20 via-saffron to-saffron",
                  !reducedMotion && "hero-pipeline-progress"
                )}
                style={{ width: reducedMotion ? "100%" : undefined }}
              />
            </div>
          </div>,
          0.15
        )}

        <div className="grid gap-px bg-white/5 sm:grid-cols-2">
          {wrapper(
            <div className="bg-[#0a1a30]/80 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex gap-1" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                </span>
                <span className="font-mono text-[10px] text-white/40">tryn-cli</span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px] leading-relaxed sm:text-xs">
                {terminalLines.map((line, i) => (
                  <p
                    key={i}
                    className={cn(
                      line.type === "prompt" && "text-white/70",
                      line.type === "success" && "text-emerald-400/90",
                      line.type === "output" && "text-white/45",
                      line.type === "live" && "text-saffron"
                    )}
                  >
                    {line.text}
                  </p>
                ))}
                {!reducedMotion && (
                  <span className="inline-block h-3.5 w-2 animate-pulse bg-saffron/80 motion-reduce:hidden" />
                )}
              </div>
            </div>,
            0.25
          )}

          {wrapper(
            <div className="grid grid-rows-3 gap-px bg-white/5">
              {liveMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between bg-[#0a1a30]/80 px-4 py-3 sm:px-5"
                >
                  <div>
                    <p className="text-lg font-semibold tabular-nums tracking-tight text-white sm:text-xl">
                      {metric.value}
                    </p>
                    <p className="text-[10px] text-white/45">{metric.label}</p>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-400/80">
                    {metric.trend}
                  </span>
                </div>
              ))}
            </div>,
            0.3
          )}
        </div>

        {wrapper(
          <div className="hidden border-t border-white/10 p-4 sm:p-5 xl:block">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
              Active ventures
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {ventureCards.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-white">
                      {brand.name}
                    </p>
                    <p className="mt-0.5 truncate text-[10px] text-white/40">
                      {brand.industry}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span
                      className="rounded px-1.5 py-0.5 text-[9px] font-semibold text-white"
                      style={{ backgroundColor: brand.accent }}
                    >
                      {brand.role}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400/80">
                      <Check className="h-2.5 w-2.5" aria-hidden="true" />
                      Live
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>,
          0.35
        )}
      </div>
    </div>
  );
}
