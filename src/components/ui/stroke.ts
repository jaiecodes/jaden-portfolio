// src/components/ui/stroke.ts
import type { CSSProperties } from "react";

export type Edge = number | string;
export type Edges = { top?: Edge; right?: Edge; bottom?: Edge; left?: Edge };
export type EdgeInput = Edge | Edges;

export interface StrokeOptions {
  /**
   * Rim thickness. A number is px.
   *   stroke: 3                                   -> all four sides
   *   stroke: { bottom: 1.5 }                     -> bottom only
   *   stroke: { left: 1.5, right: 1.5, bottom: 1.5 } -> three sides, open top
   * Any side you omit is 0, and a side at 0 renders no rim at all.
   */
  stroke?: EdgeInput;
  /**
   * Padding measured from the INSIDE edge of the rim, so the rendered
   * inset is stroke + pad. Matches Figma, where an inside stroke does
   * not eat into the frame's padding.
   */
  pad?: EdgeInput;
  /** Any CSS background value: a colour, a linear or a conic gradient. */
  paint?: string;
  /** Flat colour used where mask-composite is unsupported. */
  fallback?: string;
}

const len = (v?: Edge): string | undefined =>
  v === undefined ? undefined : typeof v === "number" ? `${v}px` : v;

const toEdges = (v?: EdgeInput): Edges => {
  if (v === undefined) return {};
  if (typeof v === "object") return v;
  return { top: v, right: v, bottom: v, left: v };
};

/**
 * Builds the custom properties consumed by the `.stroke` utility.
 *
 *   <div className="stroke stroke-angular" style={strokeStyle({ stroke: 3, pad: 6 })} />
 *   <ul  className="stroke" style={strokeStyle({ stroke: { left: 1.5, right: 1.5, bottom: 1.5 }, pad: 4 })} />
 *
 * Sides are independent: the utility reads one custom property per side,
 * so a missing side simply has no rim. There is no all-sides special case.
 */
export function strokeStyle(options: StrokeOptions = {}): CSSProperties {
  const s = toEdges(options.stroke);
  const p = toEdges(options.pad);

  const vars: Record<string, string> = {};
  const set = (name: string, value?: string) => {
    if (value !== undefined) vars[name] = value;
  };

  set("--s-top", len(s.top));
  set("--s-right", len(s.right));
  set("--s-bottom", len(s.bottom));
  set("--s-left", len(s.left));
  set("--p-top", len(p.top));
  set("--p-right", len(p.right));
  set("--p-bottom", len(p.bottom));
  set("--p-left", len(p.left));
  set("--stroke-paint", options.paint);
  set("--stroke-fallback", options.fallback);

  return vars as CSSProperties;
}
