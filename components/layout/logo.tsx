"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type LogoAsset = {
  src: string;
  width: number;
  height: number;
  className: string;
  alt: string;
};

const logoAssets = {
  full: {
    light: {
      src: "/brand/tryn-logo-light.png",
      width: 718,
      height: 290,
      className: "h-auto w-auto max-w-[min(100%,320px)]",
      alt: "TRYN Studios | Building the Companies of Tomorrow.",
    },
    dark: {
      src: "/brand/tryn-logo-dark.png",
      width: 738,
      height: 310,
      className: "h-auto w-auto max-w-[min(100%,320px)]",
      alt: "TRYN Studios | Building the Companies of Tomorrow.",
    },
  },
  compact: {
    light: {
      src: "/brand/tryn-logo-header-light.png",
      width: 718,
      height: 316,
      className: "h-full w-auto max-w-[8.75rem] sm:max-w-[9.5rem]",
      alt: "TRYN Studios",
    },
    dark: {
      src: "/brand/tryn-logo-header-dark.png",
      width: 738,
      height: 336,
      className: "h-full w-auto max-w-[8.75rem] sm:max-w-[9.5rem]",
      alt: "TRYN Studios",
    },
  },
  nav: {
    light: {
      src: "/brand/tryn-logo-header-light.png",
      width: 718,
      height: 316,
      className: "h-full w-auto max-w-[8rem] sm:max-w-[8.75rem]",
      alt: "TRYN Studios",
    },
    dark: {
      src: "/brand/tryn-logo-header-dark.png",
      width: 738,
      height: 336,
      className: "h-full w-auto max-w-[8rem] sm:max-w-[8.75rem]",
      alt: "TRYN Studios",
    },
  },
} as const satisfies Record<string, Record<string, LogoAsset>>;

type LogoVariant = keyof typeof logoAssets;

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
  /**
   * Which logo asset to show:
   * - `light` — navy text for light backgrounds (header, cards)
   * - `dark` — white text for dark backgrounds (hero overlay, footer)
   * - `system` — follows the active site theme via next-themes
   */
  colorScheme?: "light" | "dark" | "system";
};

function subscribeToTheme() {
  return () => {};
}

function getThemeSnapshot() {
  return true;
}

function getThemeServerSnapshot() {
  return false;
}

function LogoImage({
  logo,
  priority,
}: {
  logo: LogoAsset;
  priority?: boolean;
}) {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      priority={priority}
      className={cn(logo.className, "logo-image block object-contain object-left")}
    />
  );
}

export function Logo({
  variant = "compact",
  className,
  priority,
  colorScheme = "system",
}: LogoProps) {
  const assets = logoAssets[variant];
  const shouldPrioritize = priority ?? (variant === "compact" || variant === "nav");
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getThemeServerSnapshot);

  const resolvedScheme =
    colorScheme === "system"
      ? mounted && resolvedTheme === "dark"
        ? "dark"
        : "light"
      : colorScheme;

  const isHeaderLogo = variant === "compact" || variant === "nav";
  const headerLogoHeight =
    variant === "nav" ? "h-8 sm:h-9" : variant === "compact" ? "h-9 sm:h-10" : undefined;
  const image = <LogoImage logo={assets[resolvedScheme]} priority={shouldPrioritize} />;

  return (
    <Link
      href="/"
      className={cn(
        "flex shrink-0 items-center leading-none",
        isHeaderLogo ? "self-center" : "self-start",
        headerLogoHeight,
        className,
      )}
      aria-label="TRYN Studios home"
    >
      {isHeaderLogo ? (
        <span className="flex h-full items-center">{image}</span>
      ) : (
        image
      )}
    </Link>
  );
}
