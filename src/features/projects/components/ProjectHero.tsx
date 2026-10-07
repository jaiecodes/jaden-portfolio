// src/features/projects/components/ProjectHero.tsx
import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import type { Project } from "../../../domain/models/Project";
import type { HeroThemeData } from "../../../domain/models/HeroTheme";
import { useViewport } from "../../../hooks/useViewport";
import { HeroScene, SCENE_H, SCENE_W } from "./HeroScene";

/** Phone frame the mobile hero is drawn to (Figma: Hero, 390×560). */
const PHONE_W = 390;
const PHONE_H = 560;

interface ProjectHeroProps {
  project: Project;
  theme: HeroThemeData;
  /** Called as the hero passes under the header (true while it's behind it). */
  onBehindHeader?: (behind: boolean) => void;
}

/**
 * The scroll-animated hero (Figma: Project Heroes — Start / End frames). The
 * art animates from its start frame to its end frame first; then, after a
 * short pause, the scrim (the seam into the page) and the title rise in. The
 * stage stays pinned while that plays, then the page scrolls on.
 */
export const ProjectHero = ({ project, theme, onBehindHeader }: ProjectHeroProps) => {
  const section = useRef<HTMLElement>(null);
  const { width, height } = useViewport();
  const desktop = width >= 1024;

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const art = useTransform(scrollYProgress, [0, 0.62], [0, 1], { clamp: true });
  const reveal = useTransform(scrollYProgress, [0.7, 0.9], [0, 1], { clamp: true });
  const titleY = useTransform(reveal, [0, 1], [48, 0]);

  const { scrollY } = useScroll();
  const checkHeader = () => {
    const rect = section.current?.getBoundingClientRect();
    if (rect) onBehindHeader?.(rect.bottom > 112);
  };
  useMotionValueEvent(scrollY, "change", checkHeader);
  useEffect(checkHeader);

  const label = theme.heroLabel === "primary" ? "text-t-primary" : "text-fg";

  // Desktop: the scene spans the viewport width. Phone: the hero fills the
  // screen; the 390×560 Figma framing is scaled to the screen height and kept
  // centred, so wider phones see more of the scene at the sides.
  const fit = height / PHONE_H;
  const scale = desktop ? width / SCENE_W : theme.mobile.scale * fit;
  const stageH = desktop ? Math.max(SCENE_H * scale, Math.min(height, SCENE_H * scale * 1.15)) : height;
  const frameX = (x: number) => (desktop ? 0 : width / 2 + (x - PHONE_W / 2) * fit);
  const offsetX = useTransform(art, [0, 1], [frameX(theme.mobile.startX ?? theme.mobile.x), frameX(theme.mobile.x)]);
  const sceneH = SCENE_H * scale;

  return (
    <section
      ref={section}
      className="relative"
      style={{ height: desktop ? `max(240vh, ${stageH + 1400}px)` : stageH + 700 }}
      aria-label={project.name}
    >
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: stageH, background: theme.heroBackground }}
      >
        <HeroScene layers={theme.layers} progress={art} scale={scale} offsetX={offsetX} />
        {/* Below the art on viewports taller than the scene */}
        <div className="absolute inset-x-0 bottom-0" style={{ top: sceneH, background: theme.seam }} />

        {/* Scrim → seam: rises in after the art settles; keeps the title at 4.5:1 */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0"
          style={{
            opacity: reveal,
            top: (364 / SCENE_H) * sceneH,
            height: (680 / SCENE_H) * sceneH + 2,
            background: `linear-gradient(180deg, color-mix(in srgb, ${theme.seam} 0%, transparent) 0%, color-mix(in srgb, ${theme.seam} 82%, transparent) 55%, ${theme.seam} 100%)`,
          }}
        />

        <motion.div
          className="absolute flex flex-col gap-2.5 lg:gap-3.5"
          style={{
            opacity: reveal,
            y: titleY,
            left: desktop ? (200 / SCENE_W) * width : 20,
            right: 20,
            // Phone: clear of the sticky link bar (≈80px) at the bottom.
            bottom: desktop ? Math.max(0, stageH - sceneH) + (120 / SCENE_H) * sceneH : project.links.length ? 104 : 40,
          }}
        >
          <p className={`${desktop ? "type-hero-label" : "type-label"} ${label}`}>{project.heroLabel}</p>
          <h1 className={desktop ? "type-display text-fg" : "font-display text-[34px] leading-[1.15] font-medium tracking-[-0.01em] text-fg"}>
            {project.name}
          </h1>
          <p className={`${desktop ? "type-lead" : "type-body"} max-w-[1120px] text-muted`}>{project.subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
};
