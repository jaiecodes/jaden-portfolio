// src/components/ui/theme.ts
// UI-kit vocabulary shared by components. Kept free of JSX so the
// components that use it stay single-export (react-refresh lint rule).

/**
 * A page theme sets the semantic colour tokens (night/*, text/*, theme/*)
 * for everything inside it; the values live in index.css under
 * [data-theme="…"]. Project pages set the same tokens inline from their
 * palette instead (paletteStyle()).
 */
export type PageTheme = "home" | "projects" | "about" | "resume";

/** Steps of the 2.0 type scale (see "Type scale" in index.css). */
export type TextVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "lead"
  | "body"
  | "body-sm"
  | "label"
  | "label-lg"
  | "hero-label"
  | "chip"
  | "button"
  | "card-title"
  | "script"
  | "wordmark";

/** Full class names (not built from strings) so Tailwind can see them. */
export const TEXT_CLASS: Record<TextVariant, string> = {
  display: "type-display",
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
  lead: "type-lead",
  body: "type-body",
  "body-sm": "type-body-sm",
  label: "type-label",
  "label-lg": "type-label-lg",
  "hero-label": "type-hero-label",
  chip: "type-chip",
  button: "type-button",
  "card-title": "type-card-title",
  script: "type-script",
  wordmark: "type-wordmark",
};

/**
 * Semantic colours a part can take. All follow the page theme, so the same
 * component reads gold on Projects, green on About, a project's own colour
 * on its case study.
 */
export type Tone = "primary" | "secondary" | "highlight" | "accent" | "fg" | "muted" | "faint";

export const TONE_TEXT: Record<Tone, string> = {
  primary: "text-t-primary",
  secondary: "text-t-secondary",
  highlight: "text-t-highlight",
  accent: "text-t-accent",
  fg: "text-fg",
  muted: "text-muted",
  faint: "text-faint",
};
