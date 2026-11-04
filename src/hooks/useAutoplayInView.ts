import { useEffect, type RefObject } from "react";

/**
 * Plays a muted video only while it's on screen, so a page of clips doesn't
 * download and decode them all at once. `enabled: false` leaves it to the
 * viewer's own controls (reduced motion).
 */
export function useAutoplayInView(ref: RefObject<HTMLVideoElement | null>, enabled: boolean) {
  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // A blocked autoplay just leaves the poster showing.
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [ref, enabled]);
}
