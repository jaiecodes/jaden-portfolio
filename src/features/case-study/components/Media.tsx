// src/features/case-study/components/Media.tsx
import { useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { isVideoSrc, type Visual } from "../../../domain/models/Project";
import { useAutoplayInView } from "../../../hooks/useAutoplayInView";
import { Icon } from "../../../components/ui/Icon";
import { Lightbox } from "./Lightbox";

/**
 * A case study image, GIF or video filling its slot; clicking it opens the
 * expanded view. Videos loop silently while on screen; with reduced motion
 * they wait on their poster with controls, and only the corner button expands
 * them. `muted` is for a slot that offers sound.
 */
export const Media = ({ visual, muted = true }: { visual: Visual & { src: string }; muted?: boolean }) => {
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const isVideo = isVideoSrc(visual.src);
  useAutoplayInView(video, isVideo && !reduce);

  const [expanded, setExpanded] = useState(false);
  const [startAt, setStartAt] = useState(0);
  const expand = () => {
    setStartAt(video.current?.currentTime ?? 0);
    video.current?.pause();
    setExpanded(true);
  };
  const collapse = () => {
    setExpanded(false);
    if (!reduce) video.current?.play().catch(() => {});
  };

  const fit = visual.fit === "contain" ? "object-contain" : "object-cover";
  const hasControls = isVideo && !!reduce;
  return (
    <div className="absolute inset-0">
      {isVideo ? (
        <video
          ref={video}
          src={visual.src}
          poster={visual.poster}
          aria-label={visual.caption}
          muted={muted}
          loop
          playsInline
          preload={visual.poster ? "none" : "metadata"}
          controls={hasControls}
          className={`size-full ${fit}`}
        />
      ) : (
        <picture className="contents">
          {visual.mobileSrc && <source media="(max-width: 1023px)" srcSet={visual.mobileSrc} />}
          <img src={visual.src} alt={visual.caption} loading="lazy" className={`size-full ${fit}`} />
        </picture>
      )}
      <button
        type="button"
        onClick={expand}
        aria-label={`Expand: ${visual.caption}`}
        className={`group/expand absolute ${hasControls ? "top-3 left-3" : "inset-0 cursor-zoom-in"}`}
      >
        <span
          className={`z-10 flex size-9 items-center justify-center rounded-full bg-night/70 text-fg backdrop-blur-sm transition-opacity ${
            hasControls
              ? ""
              : "absolute right-3 bottom-3 lg:opacity-0 lg:group-hover/expand:opacity-100 lg:group-focus-visible/expand:opacity-100"
          }`}
        >
          <Icon name="expand" size={18} />
        </span>
      </button>
      <AnimatePresence>
        {expanded && <Lightbox visual={visual} startAt={startAt} muted={muted} onClose={collapse} />}
      </AnimatePresence>
    </div>
  );
};
