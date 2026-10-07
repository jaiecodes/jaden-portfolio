// src/components/ui/buttonStyles.ts
// Class builder for the kit's buttons, usable on <button>, <a> or <Link>.
// Lives apart from Button.tsx so that file exports only a component.
import type { Tone } from "./theme";

export type ButtonVariant = "chip" | "pill" | "outline";
export type ButtonSize = "sm" | "md";

interface ButtonStyle {
  variant?: ButtonVariant;
  /** Colour for the outline variant; chip and pill follow the page theme. */
  tone?: Tone;
  size?: ButtonSize;
  /** Pressed / selected state for toggles. */
  active?: boolean;
  className?: string;
}

const BASE =
  "type-button inline-flex shrink-0 items-center justify-center whitespace-nowrap no-underline transition-colors";

/* sm: rails of toggles (categories, filters). md: standalone actions. */
const SIZE: Record<ButtonSize, string> = {
  sm: "h-9 px-4 lg:h-[60px] lg:px-[30px]",
  md: "h-[52px] px-6 lg:h-[60px] lg:px-[30px]",
};

/* Literal class names per tone so Tailwind generates them. */
const OUTLINE_TONE: Record<Tone, string> = {
  theme: "border-theme/50 text-theme hover:bg-theme/10",
  primary: "border-primary/50 text-primary hover:bg-primary/10",
  secondary: "border-secondary/50 text-secondary hover:bg-secondary/10",
  accent: "border-accent/50 text-accent hover:bg-accent/10",
  blush: "border-blush/50 text-blush hover:bg-blush/10",
};

/**
 *   chip     square-cornered toggle; fills with the theme colour when active
 *   pill     rounded toggle; tints with the theme colour when active
 *   outline  bordered action in a fixed tone
 */
export function buttonClass({
  variant = "outline",
  tone = "theme",
  size = "sm",
  active = false,
  className = "",
}: ButtonStyle = {}): string {
  let look: string;
  switch (variant) {
    case "chip":
      look = active
        ? "rounded-[10px] bg-theme font-bold text-ink"
        : "rounded-[10px] text-white outline outline-1 -outline-offset-1 outline-white/50 hover:text-theme hover:outline-theme/50";
      break;
    case "pill":
      look = active
        ? "rounded-[29px] bg-theme/10 text-theme outline outline-2 -outline-offset-2 outline-theme"
        : "rounded-[29px] text-white outline outline-2 -outline-offset-2 outline-white/50 hover:outline-white";
      break;
    default:
      look = `rounded-[10px] border ${OUTLINE_TONE[tone]}`;
  }
  return `${BASE} ${SIZE[size]} ${look} ${className}`;
}
