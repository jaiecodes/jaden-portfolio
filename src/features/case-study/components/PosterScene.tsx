// src/features/case-study/components/PosterScene.tsx
import { useEffect, useRef, useState } from "react";
import { motionValue } from "motion/react";
import type { HeroThemeData } from "../../../domain/models/HeroTheme";
import { HeroScene, SCENE_W } from "./HeroScene";

const END_FRAME = motionValue(1);

/** The hero's end frame, filling its box: the demo's poster until a video exists. */
export const PosterScene = ({ theme }: { theme: HeroThemeData }) => {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className="absolute inset-0" style={{ background: theme.heroBackground }}>
      {width > 0 && <HeroScene layers={theme.layers} progress={END_FRAME} scale={width / SCENE_W} />}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--night-sunken)_30%,transparent)_0%,color-mix(in_srgb,var(--night-sunken)_40%,transparent)_55%,color-mix(in_srgb,var(--night-sunken)_85%,transparent))]" />
    </div>
  );
};
