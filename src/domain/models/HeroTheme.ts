// src/domain/models/HeroTheme.ts
import type { CSSProperties } from "react";

export type TransformProperty = "x" | "y" | "rotate" | "scale" | "scaleX" | "scaleY" | "opacity";

export interface LayerTransform {
  property: TransformProperty;
  /** Art progress (0 = start frame, 1 = end frame), increasing within [0, 1]. */
  input: number[];
  output: (string | number)[];
}

export interface HeroLayer {
  src: string;
  zIndex: number;
  /** Start-frame box in the 1800×1044 scene; the SVG keeps its aspect. */
  position: { left?: string; top?: string; width?: string };
  transforms: LayerTransform[];
  /** -1 for layers mirrored in Figma. */
  scaleY?: number;
}

/** A project page's colours (Figma variable modes night/*, text/*, theme/*). */
export interface ProjectPalette {
  bg: string;
  raised: string;
  line: string;
  sunken: string;
  text: string;
  muted: string;
  faint: string;
  primary: string;
  highlight: string;
  accent: string;
}

export interface HeroThemeData {
  /** Fill behind the hero art. */
  heroBackground: string;
  /** Colour the hero fades into at its bottom; the page then fades from it
   *  to the palette background. */
  seam: string;
  /** Whether the hero kicker uses the primary colour or the text colour. */
  heroLabel: "primary" | "text";
  palette: ProjectPalette;
  /**
   * Phone framing, in Figma's 390×560 frame: the scene at `scale`, shifted
   * `x` px. With `startX` the camera pans from `startX` to `x` as the art
   * animates, following a subject that travels across the scene.
   */
  mobile: { scale: number; x: number; startX?: number };
  layers: HeroLayer[];
}

/** CSS variables that re-skin the UI kit with a project's palette. */
export function paletteStyle(p: ProjectPalette): CSSProperties {
  return {
    "--night-bg": p.bg,
    "--night-raised": p.raised,
    "--night-line": p.line,
    "--night-sunken": p.sunken,
    "--text-primary": p.text,
    "--text-muted": p.muted,
    "--text-faint": p.faint,
    "--theme-primary": p.primary,
    "--theme-secondary": p.highlight,
    "--theme-highlight": p.highlight,
    "--theme-accent": p.accent,
    "--theme-on-primary": p.bg,
  } as CSSProperties;
}
