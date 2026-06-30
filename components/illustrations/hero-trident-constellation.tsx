"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TRIDENT_PATHS = {
  center: "M 200 310 L 200 72",
  left: "M 200 310 L 200 210 L 118 108",
  right: "M 200 310 L 200 210 L 282 108",
  crossbar: "M 118 210 L 282 210",
} as const;

const ORBITS = [
  { rx: 155, ry: 98, rotate: -12, duration: 90 },
  { rx: 188, ry: 118, rotate: 18, duration: 120 },
  { rx: 118, ry: 72, rotate: 42, duration: 70 },
] as const;

const NODES = [
  { angle: 28, orbit: 0, r: 5 },
  { angle: 142, orbit: 1, r: 4 },
  { angle: 248, orbit: 1, r: 5 },
  { angle: 312, orbit: 2, r: 3.5 },
] as const;

const CONSTELLATION_LINES = [
  { x1: 200, y1: 72, x2: 318, y2: 118 },
  { x1: 118, y1: 108, x2: 92, y2: 168 },
  { x1: 282, y1: 108, x2: 308, y2: 248 },
  { x1: 200, y1: 210, x2: 148, y2: 290 },
] as const;

function polarToCartesian(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  angleDeg: number,
  rotateDeg: number
) {
  const rad = (angleDeg * Math.PI) / 180;
  const rot = (rotateDeg * Math.PI) / 180;
  const x = rx * Math.cos(rad);
  const y = ry * Math.sin(rad);
  const xr = x * Math.cos(rot) - y * Math.sin(rot);
  const yr = x * Math.sin(rot) + y * Math.cos(rot);
  return { x: cx + xr, y: cy + yr };
}

function OrbitRing({
  cx,
  cy,
  orbit,
  reducedMotion,
  delay,
}: {
  cx: number;
  cy: number;
  orbit: (typeof ORBITS)[number];
  reducedMotion: boolean | null;
  delay: number;
}) {
  const ring = (
    <ellipse
      cx={cx}
      cy={cy}
      rx={orbit.rx}
      ry={orbit.ry}
      fill="none"
      stroke="rgba(255, 140, 26, 0.14)"
      strokeWidth="1"
      strokeDasharray="4 8"
      transform={`rotate(${orbit.rotate} ${cx} ${cy})`}
    />
  );

  if (reducedMotion) return ring;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay, ease: EASE_OUT_EXPO }}
    >
      {ring}
    </motion.g>
  );
}

function OrbitNodes({
  cx,
  cy,
  reducedMotion,
}: {
  cx: number;
  cy: number;
  reducedMotion: boolean | null;
}) {
  return (
    <>
      {ORBITS.map((orbit, orbitIndex) => {
        const nodesOnOrbit = NODES.filter((n) => n.orbit === orbitIndex);
        const content = nodesOnOrbit.map((node) => {
          const { x, y } = polarToCartesian(
            cx,
            cy,
            orbit.rx,
            orbit.ry,
            node.angle,
            orbit.rotate
          );
          return (
            <g key={`${orbitIndex}-${node.angle}`}>
              <circle
                cx={x}
                cy={y}
                r={node.r + 6}
                fill="rgba(255, 140, 26, 0.08)"
              />
              <circle
                cx={x}
                cy={y}
                r={node.r}
                fill="var(--saffron)"
                className={cn(!reducedMotion && "hero-node-pulse")}
              />
            </g>
          );
        });

        if (reducedMotion) {
          return <g key={orbitIndex}>{content}</g>;
        }

        return (
          <motion.g
            key={orbitIndex}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            animate={{ rotate: 360 }}
            transition={{
              duration: orbit.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {content}
          </motion.g>
        );
      })}
    </>
  );
}

function TridentStroke({
  d,
  delay,
  reducedMotion,
}: {
  d: string;
  delay: number;
  reducedMotion: boolean | null;
}) {
  if (reducedMotion) {
    return (
      <path
        d={d}
        fill="none"
        stroke="var(--saffron)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
      />
    );
  }

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="var(--saffron)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0.4 }}
      animate={{ pathLength: 1, opacity: 0.95 }}
      transition={{ duration: 1.4, delay, ease: EASE_OUT_EXPO }}
    />
  );
}

export function HeroTridentConstellation({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const cx = 200;
  const cy = 200;

  return (
    <div
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hero-trident-glow" cx="50%" cy="42%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 140, 26, 0.22)" />
            <stop offset="55%" stopColor="rgba(255, 140, 26, 0.06)" />
            <stop offset="100%" stopColor="rgba(11, 31, 58, 0)" />
          </radialGradient>
          <filter id="hero-trident-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <circle cx={cx} cy={cy} r="160" fill="url(#hero-trident-glow)" />

        {ORBITS.map((orbit, i) => (
          <OrbitRing
            key={i}
            cx={cx}
            cy={cy}
            orbit={orbit}
            reducedMotion={reducedMotion}
            delay={0.5 + i * 0.12}
          />
        ))}

        {CONSTELLATION_LINES.map((line, i) =>
          reducedMotion ? (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(255, 140, 26, 0.18)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
          ) : (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(255, 140, 26, 0.18)"
              strokeWidth="1"
              strokeDasharray="2 6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 + i * 0.1, ease: EASE_OUT_EXPO }}
            />
          )
        )}

        <g filter="url(#hero-trident-blur)" opacity="0.35">
          <path d={TRIDENT_PATHS.center} stroke="var(--saffron)" strokeWidth="6" />
        </g>

        <TridentStroke d={TRIDENT_PATHS.center} delay={0.15} reducedMotion={reducedMotion} />
        <TridentStroke d={TRIDENT_PATHS.left} delay={0.35} reducedMotion={reducedMotion} />
        <TridentStroke d={TRIDENT_PATHS.right} delay={0.45} reducedMotion={reducedMotion} />
        <TridentStroke d={TRIDENT_PATHS.crossbar} delay={0.55} reducedMotion={reducedMotion} />

        <OrbitNodes cx={cx} cy={cy} reducedMotion={reducedMotion} />

        {!reducedMotion && (
          <motion.circle
            cx={cx}
            cy={148}
            r="4"
            fill="var(--saffron)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.85] }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT_EXPO }}
          />
        )}
      </svg>
    </div>
  );
}
