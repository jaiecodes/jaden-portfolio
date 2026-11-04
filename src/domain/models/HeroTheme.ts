// src/domain/models/HeroTheme.ts
import { prefersDarkText } from "./Color";

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

/**
 * Vine divider colours for a project page (Figma: Mobile nav menu — every
 * project page). Night: the trail runs `trail` → `mid` → the firefly, with
 * `leaf` → `trail` leaves. Day ("Lit"): a bark branch → `mid` → the firefly,
 * with `blossom` petals and buds in the firefly colour.
 */
export interface ProjectDivider {
  trail: string;
  mid: string;
  leaf: string;
  blossom: string;
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
  /** The menu's vine divider on this project's page (the firefly is `palette.primary`). */
  divider: ProjectDivider;
  /**
   * Phone framing, in Figma's 390×560 frame: the scene at `scale`, shifted
   * `x` px. With `startX` the camera pans from `startX` to `x` as the art
   * animates, following a subject that travels across the scene.
   */
  mobile: { scale: number; x: number; startX?: number };
  layers: HeroLayer[];
}

/** Header text that reads on the hero art: dark on pale heroes. */
export function heroHeaderTone(theme: HeroThemeData): string {
  const { bg, text } = theme.palette;
  if (!prefersDarkText(theme.heroBackground)) return text;
  return prefersDarkText(bg) ? text : bg;
}
