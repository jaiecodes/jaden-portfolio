// src/features/projects/components/HeroScene.tsx
import { motion, useTransform, type MotionValue } from "motion/react";
import type { CSSProperties } from "react";
import type { HeroLayer, TransformProperty } from "../../../domain/models/HeroTheme";

export const SCENE_W = 1800;
export const SCENE_H = 1044;

const NEUTRAL: Record<TransformProperty, (string | number)[]> = {
  x: ["0px", "0px"],
  y: ["0px", "0px"],
  rotate: [0, 0],
  scale: [1, 1],
  scaleX: [1, 1],
  scaleY: [1, 1],
  opacity: [1, 1],
};

/** One layer; its own component so every hook runs in the same order. */
const Layer = ({ layer, progress }: { layer: HeroLayer; progress: MotionValue<number> }) => {
  const track = (prop: TransformProperty) => {
    const t = layer.transforms.find((t) => t.property === prop);
    return [t?.input ?? [0, 1], t?.output ?? NEUTRAL[prop]] as const;
  };
  const x = useTransform(progress, ...track("x"));
  const y = useTransform(progress, ...track("y"));
  const rotate = useTransform(progress, ...track("rotate"));
  const scale = useTransform(progress, ...track("scale"));
  const scaleX = useTransform(progress, ...track("scaleX"));
  const scaleYTrack = useTransform(progress, ...track("scaleY"));
  // A mirrored layer keeps its flip while any scaleY animation plays.
  const scaleY = useTransform(scaleYTrack, (v) => Number(v) * (layer.scaleY ?? 1));
  const opacity = useTransform(progress, ...track("opacity"));

  // Placed at its start-frame box, then moved, rotated, scaled and faded
  // towards the end frame, pivoting on its centre as Figma does.
  return (
    <motion.img
      src={layer.src}
      alt=""
      aria-hidden
      draggable={false}
      style={{
        position: "absolute",
        zIndex: layer.zIndex,
        left: layer.position.left ?? 0,
        top: layer.position.top ?? 0,
        width: layer.position.width,
        maxWidth: "none",
        transformOrigin: "50% 50%",
        x,
        y,
        rotate,
        scale,
        scaleX,
        scaleY,
        opacity,
      }}
    />
  );
};

interface HeroSceneProps {
  layers: HeroLayer[];
  /** 0 = start frame, 1 = end frame. */
  progress: MotionValue<number>;
  /** Scene pixels per CSS pixel. */
  scale: number;
  /** Horizontal offset in CSS pixels; a motion value lets the camera pan. */
  offsetX?: number | MotionValue<number>;
  className?: string;
  style?: CSSProperties;
}

/** The 1800×1044 hero art, scaled and positioned, at any point of its animation. */
export const HeroScene = ({ layers, progress, scale, offsetX = 0, className = "", style }: HeroSceneProps) => (
  <motion.div
    aria-hidden
    className={`pointer-events-none absolute top-0 left-0 ${className}`}
    style={{
      width: SCENE_W,
      height: SCENE_H,
      transformOrigin: "top left",
      x: offsetX,
      scale,
      ...style,
    }}
  >
    {layers.map((layer) => (
      <Layer key={layer.src} layer={layer} progress={progress} />
    ))}
  </motion.div>
);
