// src/components/ui/Chip.tsx
import type { CSSProperties, ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  /** Override the theme primary, e.g. a resume section's step colour. */
  color?: string;
  className?: string;
}

/**
 * Tech tag. Non-interactive, so it has no hover and reads as a label, not a
 * button: a thin rim in the primary colour over the raised surface tinted
 * with 16% of it.
 */
export const Chip = ({ children, color, className = "" }: ChipProps) => (
  <span
    className={`type-chip inline-flex shrink-0 items-center whitespace-nowrap rounded-[6px] border border-(--chip) bg-[color-mix(in_srgb,var(--chip)_16%,var(--night-raised))] px-3 py-1.5 text-fg ${className}`}
    style={{ "--chip": color ?? "var(--theme-primary)" } as CSSProperties}
  >
    {children}
  </span>
);
