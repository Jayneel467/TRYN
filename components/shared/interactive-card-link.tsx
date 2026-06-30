"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InteractiveCardLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function InteractiveCardLink({ href, children, className }: InteractiveCardLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-[border-color,box-shadow] duration-200 hover:border-foreground/15 hover:shadow-[0_2px_16px_-6px_rgba(11,31,58,0.06)]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
