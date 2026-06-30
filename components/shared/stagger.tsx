"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import {
  staggerContainer,
  staggerItemVariants,
  VIEWPORT_DEFAULT,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "ol";
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.06,
  as = "div",
}: StaggerProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const MotionComponent =
    as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEFAULT}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </MotionComponent>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "blockquote";
};

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const MotionComponent =
    as === "li" ? motion.li : as === "blockquote" ? motion.blockquote : motion.div;

  return (
    <MotionComponent className={cn(className)} variants={staggerItemVariants}>
      {children}
    </MotionComponent>
  );
}
