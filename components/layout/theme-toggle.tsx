"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isDark = resolvedTheme === "dark";
  const ariaLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={className ?? "shrink-0"} aria-label="Toggle theme">
        <Moon className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className ?? "shrink-0"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={ariaLabel}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
