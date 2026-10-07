// src/features/resume/components/steps.ts
import type { ResumeStep } from "../../../domain/models/Resume";

/**
 * The resume's orange → green ramp (Figma: Resume theme, theme/step-*). Nodes
 * and organisation labels use `accent`; chips use `chip`; skill badges tint
 * their background with `badge`.
 */
export const STEPS: Record<ResumeStep, { accent: string; chip: string }> = {
  1: { accent: "#dd8b2d", chip: "#dd8b2d" },
  2: { accent: "#dd8b2d", chip: "#d9a63a" },
  3: { accent: "#c4c24a", chip: "#a9b44a" },
  4: { accent: "#4db36f", chip: "#4db36f" },
};

/** The track's colour ramp, top to bottom. */
export const TRACK_PAINT = "linear-gradient(180deg, #dd8b2d 0%, #989e4c 50%, #4db36f 100%)";
