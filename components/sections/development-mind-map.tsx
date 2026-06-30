"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { EASE_OUT } from "@/lib/motion";
import {
  defaultMindMapNodeId,
  mindMapLanes,
  mindMapNodes,
  type MindMapNode,
} from "@/lib/studio-mind-map";
import { cn } from "@/lib/utils";

function MindMapDetail({ node }: { node: MindMapNode }) {
  return (
    <div className="mind-map-detail rounded-lg border border-border bg-background p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-saffron">
        {mindMapLanes.find((l) => l.id === node.lane)?.label}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-foreground">{node.label}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{node.detail}</p>
    </div>
  );
}

function MindMapNodeButton({
  node,
  active,
  onSelect,
}: {
  node: MindMapNode;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "mind-map-node w-full rounded-lg border px-4 py-3 text-left transition-colors duration-200",
        active
          ? "border-saffron/50 bg-saffron/5"
          : "border-border bg-background hover:border-saffron/30 hover:bg-soft-gray/40",
      )}
      aria-pressed={active}
    >
      <span className="block text-sm font-semibold text-foreground">{node.label}</span>
      <span className="mt-0.5 block text-xs text-muted">{node.summary}</span>
    </button>
  );
}

export function DevelopmentMindMap() {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(defaultMindMapNodeId);
  const activeNode = mindMapNodes.find((n) => n.id === activeId) ?? mindMapNodes[0]!;

  return (
    <section
      id="how-we-build"
      className="section-padding section-muted scroll-mt-24"
      aria-labelledby="mind-map-heading"
    >
      <div className="container-wide">
        <FadeIn>
          <SectionHeading
            id="mind-map-heading"
            eyebrow="Studio model"
            title="How we build companies"
            subtitle="Venture inputs flow through TRYN's studio layers and emerge as products, deliveries, and roadmap ventures."
            className="max-w-3xl"
          />
        </FadeIn>

        {/* Desktop: three-column flow */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-4 lg:items-start">
          {mindMapLanes.map((lane, laneIndex) => {
            const laneNodes = mindMapNodes.filter((n) => n.lane === lane.id);
            return (
              <div key={lane.id} className="contents">
                {laneIndex > 0 && (
                  <div
                    className="flex items-center justify-center pt-16"
                    aria-hidden="true"
                  >
                    <span className="h-px w-6 bg-border" />
                  </div>
                )}
                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {lane.label}
                  </p>
                  <ul className="space-y-2">
                    {laneNodes.map((node) => (
                      <li key={node.id}>
                        <MindMapNodeButton
                          node={node}
                          active={activeId === node.id}
                          onSelect={() => setActiveId(node.id)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical stepped timeline */}
        <div className="mt-10 space-y-8 lg:hidden">
          {mindMapLanes.map((lane) => {
            const laneNodes = mindMapNodes.filter((n) => n.lane === lane.id);
            return (
              <div key={lane.id}>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {lane.label}
                </p>
                <ul className="space-y-2 border-l-2 border-border pl-4">
                  {laneNodes.map((node) => (
                    <li key={node.id}>
                      <MindMapNodeButton
                        node={node}
                        active={activeId === node.id}
                        onSelect={() => setActiveId(node.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <FadeIn className="mt-8" delay={0.06}>
          {reducedMotion ? (
            <MindMapDetail node={activeNode} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                <MindMapDetail node={activeNode} />
              </motion.div>
            </AnimatePresence>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
