// src/components/ui/Board.tsx
import type { CSSProperties, ReactNode } from "react";
import { StrokeFrame } from "./StrokeFrame";
import type { EdgeInput } from "./stroke";

interface BoardProps {
  /** Accent colour (hex or any CSS colour / var). Drives the background wash
   *  and, unless `rim` is set, the rim. Defaults to the primary green. */
  accent?: string;
  /** Rim paint: any CSS background — a colour or a gradient, e.g.
   *  "var(--paint-card-angular)". Defaults to `accent`. */
  rim?: string;
  /** Flat rim colour where mask-composite is unsupported. Defaults to `accent`. */
  fallback?: string;
  /** Rim thickness in px. */
  borderWidth?: number;
  /** Padding inside the rim (Figma inside-stroke semantics). */
  pad?: EdgeInput;
  /** Background wash strength (percent of `accent` mixed into transparent). */
  tint?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * The recurring panel surface on the resume — a rimmed, faintly tinted card
 * with an inset "lip" shadow. The rim is a StrokeFrame, so it can be a
 * gradient; the fill is a low-alpha wash of `accent` via `color-mix`.
 */
export const Board = ({
  accent = "var(--color-primary)",
  rim,
  fallback,
  borderWidth = 2,
  pad,
  tint = 5,
  className = "",
  style,
  children,
}: BoardProps) => (
  <StrokeFrame
    stroke={borderWidth}
    pad={pad}
    paint={rim ?? accent}
    fallback={fallback ?? accent}
    className={`rounded-[10px] ${className}`}
    style={{
      backgroundColor: `color-mix(in srgb, ${accent} ${tint}%, transparent)`,
      boxShadow: "inset -5px 5px 12.5px rgba(0, 0, 0, 0.25)",
      ...style,
    }}
  >
    {children}
  </StrokeFrame>
);
