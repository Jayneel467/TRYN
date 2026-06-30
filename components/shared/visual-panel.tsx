import { cn } from "@/lib/utils";

type VisualPanelProps = {
  children: React.ReactNode;
  className?: string;
  /** Use on navy/dark section backgrounds */
  variant?: "default" | "navy";
  label?: string;
};

export function VisualPanel({
  children,
  className,
  variant = "default",
  label,
}: VisualPanelProps) {
  return (
    <div
      className={cn(
        "visual-panel",
        variant === "navy" && "visual-panel-navy",
        className,
      )}
      {...(label ? { "aria-label": label } : {})}
    >
      {children}
    </div>
  );
}
