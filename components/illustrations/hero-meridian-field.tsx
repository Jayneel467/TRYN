"use client";

import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const CX = 260;
const CY = 260;

const ORBIT_PATHS = [
  {
    id: "orbit-a",
    d: "M 80 320 A 180 120 0 0 1 440 200",
    groupClass: "meridian-orbit-1",
    duration: 130,
    direction: 1,
  },
  {
    id: "orbit-b",
    d: "M 60 180 A 200 140 0 0 0 460 340",
    groupClass: "meridian-orbit-2",
    duration: 95,
    direction: -1,
  },
  {
    id: "orbit-c",
    d: "M 150 120 A 110 80 0 0 1 370 400",
    groupClass: "meridian-orbit-3",
    duration: 75,
    direction: 1,
  },
] as const;

const NODES = [
  { cx: 440, cy: 200, className: "meridian-node meridian-node-1" },
  { cx: 460, cy: 340, className: "meridian-node meridian-node-2" },
  { cx: 150, cy: 120, className: "meridian-node meridian-node-3" },
  { cx: 320, cy: 380, className: "meridian-node meridian-node-4" },
] as const;

type HeroMeridianFieldProps = {
  className?: string;
};

export function HeroMeridianField({ className }: HeroMeridianFieldProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !svgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".meridian-trajectory",
        { strokeDashoffset: 520 },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power3.out",
          delay: 0.35,
        }
      );

      gsap.fromTo(
        ".meridian-axis-line",
        { strokeDashoffset: 424 },
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.out",
          delay: 0.55,
        }
      );

      gsap.fromTo(
        ".meridian-axis-accent",
        { strokeDashoffset: 72, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.85,
        }
      );

      gsap.fromTo(
        ".meridian-orbit",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".meridian-axis",
        { opacity: 0 },
        { opacity: 1, duration: 0.01, delay: 0.55 }
      );

      ORBIT_PATHS.forEach((orbit) => {
        gsap.to(`.${orbit.groupClass}`, {
          rotation: orbit.direction * 360,
          duration: orbit.duration,
          repeat: -1,
          ease: "none",
          transformOrigin: `${CX}px ${CY}px`,
        });
      });

      gsap.to(".meridian-node-core", {
        opacity: 0.55,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.35, from: "random" },
      });

      gsap.to(".meridian-node-ring", {
        scale: 1.35,
        opacity: 0,
        duration: 2.8,
        repeat: -1,
        ease: "power1.out",
        stagger: { each: 0.5, from: "random" },
        transformOrigin: "50% 50%",
      });

      gsap.to(".meridian-focal-ring", {
        scale: 1.12,
        opacity: 0.35,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: `${CX}px ${CY}px`,
      });
    }, svgRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 520 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="meridian-dot-grid"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="14" cy="14" r="0.65" fill="white" opacity="0.14" />
        </pattern>
        <radialGradient id="meridian-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8C1A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FF8C1A" stopOpacity="0" />
        </radialGradient>
        <filter id="meridian-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        width="520"
        height="520"
        fill="url(#meridian-dot-grid)"
        opacity={reducedMotion ? 0.35 : 0.5}
      />

      <ellipse
        cx={CX}
        cy={CY}
        rx="200"
        ry="200"
        stroke="white"
        strokeOpacity="0.04"
        strokeWidth="1"
      />

      <g className="meridian-axis" opacity={reducedMotion ? 1 : 0.001}>
        <line
          className="meridian-axis-line"
          x1="48"
          y1={CY}
          x2="472"
          y2={CY}
          stroke="white"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="424"
          strokeDashoffset={reducedMotion ? 0 : 424}
        />
        <line
          className="meridian-axis-accent"
          x1="48"
          y1={CY}
          x2="120"
          y2={CY}
          stroke="#FF8C1A"
          strokeOpacity="0.65"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="72"
          strokeDashoffset={reducedMotion ? 0 : 72}
        />
      </g>

      {ORBIT_PATHS.map((orbit) => (
        <g
          key={orbit.id}
          className={`meridian-orbit ${orbit.groupClass}`}
          opacity={reducedMotion ? 1 : 0}
        >
          <path
            d={orbit.d}
            stroke="white"
            strokeOpacity="0.16"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      ))}

      <path
        className="meridian-trajectory"
        d="M 36 400 C 120 120, 340 80, 484 148"
        stroke="#FF8C1A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="520"
        strokeDashoffset={reducedMotion ? 0 : 520}
        filter="url(#meridian-soft-glow)"
        opacity="0.9"
      />

      <circle
        className="meridian-focal-ring"
        cx={CX}
        cy={CY}
        r="28"
        stroke="#FF8C1A"
        strokeOpacity="0.25"
        strokeWidth="1"
        fill="none"
      />

      <circle cx={CX} cy={CY} r="5" fill="#FF8C1A" opacity="0.95" />
      <circle cx={CX} cy={CY} r="2" fill="white" opacity="0.9" />

      {NODES.map((node) => (
        <g key={node.className} className={node.className}>
          <circle
            className="meridian-node-ring"
            cx={node.cx}
            cy={node.cy}
            r="10"
            stroke="#FF8C1A"
            strokeOpacity="0.4"
            strokeWidth="1"
            fill="none"
          />
          <circle
            className="meridian-node-core"
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill="#FF8C1A"
          />
          <circle
            cx={node.cx}
            cy={node.cy}
            r="1.5"
            fill="white"
            opacity="0.85"
          />
        </g>
      ))}

      <circle cx={CX} cy={CY} r="120" fill="url(#meridian-glow)" opacity="0.35" />
    </svg>
  );
}
