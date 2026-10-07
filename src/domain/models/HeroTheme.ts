import { prefersDarkText } from "./Color";

export type TransformProperty = "x" | "y" | "rotate" | "scale" | "opacity";

export interface LayerTransform {
  property: TransformProperty;
  // scrollYProgress values, must be monotonically increasing within [0, 1]
  input: number[];
  output: (string | number)[];
}

export interface HeroLayerPosition {
  left?: string;
  top?: string;
  width?: string;
}

export interface HeroLayer {
  src: string;
  zIndex: number;
  position: HeroLayerPosition;
  transforms: LayerTransform[];
  scaleY?: number;
}

export interface Offset {
  x: number;
  y: number;
}

/**
 * Portrait framing of the hero, from the "Project Hero Page Designs - Mobile"
 * board in Figma. The 1800×1044 scene is scaled by `scale` and offset inside
 * a 375×812 phone frame; the offset moves from `start` to `end` with scroll,
 * so the view can pan across the scene while the layers animate.
 */
export interface MobileHeroFrame {
  scale: number;
  start: Offset;
  end: Offset;
}

/** Which overview components to use under the hero (see overviewSurface). */
export type OverviewSurface = "dark" | "light";

export interface HeroThemeData {
  background: string;
  textColor: string;
  /** The colour the hero artwork ends on. The overview starts in this colour
   *  and fades into the page ink, so the hero flows into the page without a
   *  seam. Falls back to the page ink when absent. */
  foreground?: string;
  mobile?: MobileHeroFrame;
  titleZIndex: number;
  titleLines?: string[];
  layers: HeroLayer[];
}

/**
 * The overview starts in the hero's foreground colour. On pale foregrounds
 * white copy is hard to read, so the overview switches to its light-surface
 * components (ink text, translucent white panel).
 */
export function overviewSurface(theme?: HeroThemeData): OverviewSurface {
  return theme?.foreground && prefersDarkText(theme.foreground) ? "light" : "dark";
}
