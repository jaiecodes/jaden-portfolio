// src/components/ui/theme.ts
// UI-kit vocabulary shared by components. Kept free of JSX so the
// components that use it stay single-export (react-refresh lint rule).

/**
 * A page theme names the page's dominant colour and its rim paint. The
 * values live in index.css under [data-theme="…"]; adding a theme means a
 * new block there and a new member here.
 */
export type PageTheme = "projects" | "about" | "resume";

/** Steps of the type scale (see "Type Scale" in index.css). */
export type TextVariant =
  | "display"
  | "h1"
  | "h2"
  | "title"
  | "lead"
  | "callout"
  | "label"
  | "body"
  | "body-sm"
  | "button"
  | "pill"
  | "tag"
  | "overline";

/** Full class names (not built from strings) so Tailwind can see them. */
export const TEXT_CLASS: Record<TextVariant, string> = {
  display: "type-display",
  h1: "type-h1",
  h2: "type-h2",
  title: "type-title",
  lead: "type-lead",
  callout: "type-callout",
  label: "type-label",
  body: "type-body",
  "body-sm": "type-body-sm",
  button: "type-button",
  pill: "type-pill",
  tag: "type-tag",
  overline: "type-overline",
};

/**
 * Named colours a component can be tinted with. `theme` follows the page;
 * the others are fixed brand colours for elements that deliberately stand
 * apart from it (e.g. the gold social buttons on the green About page).
 */
export type Tone = "theme" | "primary" | "secondary" | "accent" | "blush";

export const TONE_TEXT: Record<Tone, string> = {
  theme: "text-theme",
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  blush: "text-blush",
};

/**
 * What a component sits on. `dark` is the default page; `light` is for pale
 * backgrounds (e.g. an overview under a light hero), where text turns ink and
 * accents use the theme's on-light colour (Figma: Surface=Light variants).
 */
export type Surface = "dark" | "light";
