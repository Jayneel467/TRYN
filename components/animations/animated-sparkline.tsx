"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const chartPoints = [12, 18, 15, 28, 24, 35, 32, 48, 44, 58, 62, 72, 68, 82, 88, 94];
const width = 320;
const height = 64;
const padding = 4;

function buildPath(points: number[]): string {
  const max = Math.max(...points);
  const step = (width - padding * 2) / (points.length - 1);

  return points
    .map((v, i) => {
      const x = padding + i * step;
      const y = height - padding - (v / max) * (height - padding * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

const pathD = buildPath(chartPoints);
const areaD = `${pathD} L${width - padding},${height} L${padding},${height} Z`;

type AnimatedSparklineProps = {
  className?: string;
  title?: string;
  subtitle?: string;
};

export function AnimatedSparkline({
  className,
  title = "Platform growth",
  subtitle = "Deployments & bookings, trailing 16 months",
}: AnimatedSparklineProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    if (areaRef.current) {
      gsap.set(areaRef.current, { opacity: 0 });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      });

      if (areaRef.current) {
        tl.to(
          areaRef.current,
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 sm:px-6 sm:py-5",
        className
      )}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
            {title}
          </p>
          <p className="mt-1 text-sm text-white/70">{subtitle}</p>
        </div>
        <p className="text-2xl font-semibold tabular-nums text-white sm:text-3xl">
          +247<span className="text-saffron">%</span>
        </p>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-4 h-16 w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sparkline-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff8c1a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ff8c1a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          ref={areaRef}
          d={areaD}
          fill="url(#sparkline-fill)"
          opacity={reducedMotion ? 1 : 0}
        />
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="#ff8c1a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            reducedMotion
              ? undefined
              : { strokeDasharray: "none", strokeDashoffset: 0 }
          }
        />
      </svg>
    </div>
  );
}
