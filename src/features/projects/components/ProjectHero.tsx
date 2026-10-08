// src/features/projects/components/ProjectHero.tsx
import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import type { Project } from "../../../domain/models/Project";
import type { HeroThemeData } from "../../../domain/models/HeroTheme";
import { useViewport } from "../../../hooks/useViewport";
import { useScrollLock } from "../../../hooks/useScrollLock";
import { HeroScene, SCENE_H, SCENE_W } from "./HeroScene";

/** Phone frame the mobile hero is drawn to (Figma: Hero, 390×560). */
const PHONE_W = 390;
const PHONE_H = 560;

/** Timing (seconds): the art plays, a short pause, then the title rises in. */
const ART_S = 2.6;
const PAUSE_S = 0.25;
const REVEAL_S = 0.7;

interface ProjectHeroProps {
  project: Project;
  theme: HeroThemeData;
  /** Called as the hero passes under the header (true while it's behind it). */
  onBehindHeader?: (behind: boolean) => void;
}

/**
 * The project hero (Figma: Project Heroes — Start / End frames). It plays by
 * itself when the page opens: the art animates from its start frame to its
 * end frame, then, after a short pause, the scrim (the seam into the page)
 * and the title rise in. Scrolling is locked until it finishes, and the hero
 * then holds its end frame; it plays again the next time the page is opened.
 */
export const ProjectHero = ({ project, theme, onBehindHeader }: ProjectHeroProps) => {
  const section = useRef<HTMLElement>(null);
  const { width, height } = useViewport();
  const desktop = width >= 1024;

  const art = useMotionValue(0);
  const reveal = useMotionValue(0);
  const titleY = useTransform(reveal, [0, 1], [48, 0]);
  const { lock, unlock } = useScrollLock();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      art.set(1);
      reveal.set(1);
      return;
    }
    window.scrollTo(0, 0);
    lock();
    let cancelled = false;
    const controls: { stop: () => void }[] = [];
    (async () => {
      const a = animate(art, 1, { duration: ART_S, ease: [0.45, 0, 0.2, 1] });
      controls.push(a);
      await a;
      if (cancelled) return;
      const r = animate(reveal, 1, { duration: REVEAL_S, delay: PAUSE_S, ease: "easeOut" });
      controls.push(r);
      await r;
      if (!cancelled) unlock();
    })();
    return () => {
      cancelled = true;
      controls.forEach((c) => c.stop());
      unlock();
    };
  }, [art, reveal, lock, unlock]);

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
      className="relative isolate overflow-hidden"
      style={{ height: stageH, background: theme.heroBackground }}
      aria-label={project.name}
    >
      <HeroScene layers={theme.layers} progress={art} scale={scale} offsetX={offsetX} className="z-0" />
      {/* Below the art on viewports taller than the scene */}
      <div className="absolute inset-x-0 bottom-0 z-0" style={{ top: sceneH, background: theme.seam }} />

      {/* Scrim → seam: rises in after the art settles; keeps the title at 4.5:1 */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 z-10"
        style={{
          opacity: reveal,
          top: (364 / SCENE_H) * sceneH,
          height: (680 / SCENE_H) * sceneH + 2,
          background: `linear-gradient(180deg, color-mix(in srgb, ${theme.seam} 0%, transparent) 0%, color-mix(in srgb, ${theme.seam} 82%, transparent) 55%, ${theme.seam} 100%)`,
        }}
      />

      <motion.div
        className="absolute z-20 flex flex-col gap-2.5 lg:gap-3.5"
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
    </section>
  );
};
