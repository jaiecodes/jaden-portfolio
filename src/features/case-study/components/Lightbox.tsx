// src/features/case-study/components/Lightbox.tsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { isVideoSrc, type Visual } from "../../../domain/models/Project";
import { Icon } from "../../../components/ui/Icon";
import { useDialogFocus } from "../../../hooks/useDialogFocus";
import { Picture } from "./Picture";

interface LightboxProps {
  visual: Visual & { src: string };
  /** Where the slot's video had got to, so playback carries on. */
  startAt: number;
  muted: boolean;
  onClose: () => void;
}

/**
 * The expanded view of a case study image or video: as large as fits, with its
 * caption, over the dimmed page. Esc, the close button or a click outside
 * closes it. Rendered into the page's <article> so it keeps the project's
 * palette, and outside the animated blocks so `fixed` means the screen.
 */
export const Lightbox = ({ visual, startAt, muted, onClose }: LightboxProps) => {
  const panel = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  useDialogFocus(panel, true, onClose, "button, video");

  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    if (video.current) video.current.currentTime = startAt;
  }, [startAt]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const fit = "max-h-[calc(100dvh-136px)] max-w-full rounded-[14px] object-contain";

  return createPortal(
    <motion.div
      ref={panel}
      role="dialog"
      aria-modal
      aria-label={visual.caption}
      onClick={onClose}
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center gap-4 bg-[color-mix(in_srgb,var(--night-sunken)_92%,transparent)] px-4 pt-16 pb-4 backdrop-blur-md lg:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close expanded view"
        className="absolute top-3 right-4 flex size-11 items-center justify-center rounded-[10px] border border-line bg-raised text-fg lg:right-10"
      >
        <Icon name="close" size={22} />
      </button>
      {isVideoSrc(visual.src) ? (
        <video
          ref={video}
          src={visual.src}
          poster={visual.poster}
          aria-label={visual.caption}
          onClick={stop}
          autoPlay={!reduce}
          muted={muted}
          loop
          playsInline
          controls
          className={fit}
        />
      ) : (
        <Picture visual={visual} onClick={stop} className={fit} />
      )}
      <p onClick={stop} className="type-body-sm max-w-[760px] text-center text-muted">
        {visual.caption}
      </p>
    </motion.div>,
    document.getElementById("case-study") ?? document.body,
  );
};
