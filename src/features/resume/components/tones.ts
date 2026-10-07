import type { ResumeTone } from "../../../domain/models/Resume";

interface ToneStyle {
  /** Section heading colour class. */
  heading: string;
  /** Organization line + link arrow colour class. */
  text: string;
  /** Raw colour for inline styles (Board wash, Pill bars). */
  color: string;
}

export const TONE_STYLES: Record<ResumeTone, ToneStyle> = {
  primary: {
    heading: "text-moss",
    text: "text-primary",
    color: "var(--color-primary)",
  },
  accent: {
    heading: "text-citron",
    text: "text-accent",
    color: "var(--color-accent)",
  },
};

/**
 * Column template shared by entry rows and the scroll-leaf overlay, so the
 * leaf's track always lines up with the gap between the dates and the cards.
 * Columns: role + date | leaf gutter | card.
 */
export const ENTRY_GRID =
  "xl:grid xl:grid-cols-[minmax(0,815px)_minmax(0,1fr)_minmax(0,562px)] xl:gap-x-10";
