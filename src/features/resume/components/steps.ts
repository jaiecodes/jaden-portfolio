// src/features/resume/components/steps.ts
import type { ResumeStep } from "../../../domain/models/Resume";

/**
 * The resume's colour ramp (Figma: Resume theme, theme/step-*): orange →
 * green at night, pink → teal by day. Values are the --step-* tokens in
 * index.css. Nodes and organisation labels use `accent`, node rims `ring`,
 * chips and skill badges `chip`.
 */
const step = (n: ResumeStep) => ({
  accent: `var(--step-${n})`,
  chip: `var(--step-${n}-chip)`,
  ring: `var(--step-${n}-ring)`,
});

export const STEPS: Record<ResumeStep, { accent: string; chip: string; ring: string }> = {
  1: step(1),
  2: step(2),
  3: step(3),
  4: step(4),
};

/** The track's colour ramp, top to bottom. */
export const TRACK_PAINT = "var(--step-track)";
