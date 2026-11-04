// src/features/case-study/components/Media.tsx
import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { isVideoSrc, type Visual } from "../../../domain/models/Project";
import { useAutoplayInView } from "../../../hooks/useAutoplayInView";

/**
 * A case study image, GIF or video filling its slot. Videos loop silently
 * while on screen; with reduced motion they wait on their poster with
 * controls. `muted` is for a slot that offers sound.
 */
export const Media = ({ visual, muted = true }: { visual: Visual & { src: string }; muted?: boolean }) => {
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const isVideo = isVideoSrc(visual.src);
  useAutoplayInView(video, isVideo && !reduce);

  const fit = visual.fit === "contain" ? "object-contain" : "object-cover";
  return isVideo ? (
    <video
      ref={video}
      src={visual.src}
      poster={visual.poster}
      aria-label={visual.caption}
      muted={muted}
      loop
      playsInline
      preload={visual.poster ? "none" : "metadata"}
      controls={!!reduce}
      className={`size-full ${fit}`}
    />
  ) : (
    <picture className="contents">
      {visual.mobileSrc && <source media="(max-width: 1023px)" srcSet={visual.mobileSrc} />}
      <img src={visual.src} alt={visual.caption} loading="lazy" className={`size-full ${fit}`} />
    </picture>
  );
};
