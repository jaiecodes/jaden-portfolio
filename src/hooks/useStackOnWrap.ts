import { useEffect, useRef, useState } from "react";

interface StackOnWrapOptions {
  /** Content frame cap in px (the design width the columns are drawn to). */
  contentMax: number;
  /** Horizontal page padding on desktop, per side, in px. */
  pad: number;
  /** Gap between the two columns in px. */
  columnGap: number;
  /** Stack once the copy would wrap to this many lines or more. */
  maxLines: number;
  /** Viewport width from which the two-column layout applies. */
  desktopFrom?: number;
}

/**
 * Decides whether a two-column hero should stack, based on how many lines
 * its copy would take in the two-column layout. The copy is measured on a
 * hidden probe sized to the two-column text width, so the decision never
 * depends on — and never oscillates with — the current layout.
 *
 * Attach `probeRef` to an off-screen element carrying the same text and
 * type style as the visible copy.
 */
export function useStackOnWrap({
  contentMax,
  pad,
  columnGap,
  maxLines,
  desktopFrom = 1024,
}: StackOnWrapOptions) {
  const probeRef = useRef<HTMLParagraphElement>(null);
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const probe = probeRef.current;
    if (!probe) return;

    const measure = () => {
      const isDesktop = window.innerWidth >= desktopFrom;
      const contentW = Math.min(window.innerWidth, contentMax) - pad * 2;
      const columnW = Math.max(0, (contentW - columnGap) / 2);
      probe.style.width = `${columnW}px`;
      const lineHeight = parseFloat(getComputedStyle(probe).lineHeight) || 1;
      const lines = Math.round(probe.scrollHeight / lineHeight);
      setStacked(isDesktop && lines >= maxLines);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [contentMax, pad, columnGap, maxLines, desktopFrom]);

  return { probeRef, stacked };
}
