import { clientDeliveries } from "@/lib/case-studies";

/** Single source of truth for defensible public metrics on the site. */
export const studioStats = [
  { value: "1", label: "Flagship build" },
  { value: `${clientDeliveries.length}+`, label: "Client deliveries" },
  { value: "Open", label: "Founders program" },
] as const;

export const heroStats = studioStats;
