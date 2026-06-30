import type { Transition, Variants } from "framer-motion";

/** Premium easing — Stripe / Linear style deceleration */
export const EASE_OUT = [0.21, 0.47, 0.32, 0.98] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.15,
  normal: 0.4,
  slow: 0.6,
} as const;

export const VIEWPORT_DEFAULT = {
  once: true,
  margin: "-80px" as const,
};

export const fadeUpOffset = 16;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: fadeUpOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export function staggerContainer(
  stagger = 0.08,
  delayChildren = 0.06
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: fadeUpOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const cardHoverTransition: Transition = {
  duration: 0.25,
  ease: EASE_OUT,
};

export const pressableTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};
