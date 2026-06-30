"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { technologyCategories } from "@/lib/technologies";

const allTechnologies = technologyCategories.flatMap((cat) => cat.technologies);

export function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !trackRef.current || !containerRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 60,
      ease: "none",
      repeat: -1,
    });

    const container = containerRef.current;
    const pause = () => gsap.to(tween, { timeScale: 0, duration: 0.4, ease: "power2.out" });
    const play = () => gsap.to(tween, { timeScale: 1, duration: 0.6, ease: "power2.inOut" });
    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", play);
    container.addEventListener("focusin", pause);
    container.addEventListener("focusout", play);

    return () => {
      tween.kill();
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", play);
      container.removeEventListener("focusin", pause);
      container.removeEventListener("focusout", play);
    };
  }, []);

  const items = [...allTechnologies, ...allTechnologies];

  return (
    <div
      ref={containerRef}
      className="relative mb-0 overflow-hidden border-y border-border/80 bg-background py-3.5"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div ref={trackRef} className="flex w-max gap-3 px-4 will-change-transform">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="shrink-0 rounded-full border border-border/80 bg-background px-5 py-2 text-sm font-medium text-foreground/80"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
