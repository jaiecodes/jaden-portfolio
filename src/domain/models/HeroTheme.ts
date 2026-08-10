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

export interface HeroThemeData {
  background: string;
  textColor: string;
  titleZIndex: number;
  titleLines?: string[];
  layers: HeroLayer[];
}
