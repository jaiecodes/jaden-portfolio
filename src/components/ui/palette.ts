// src/components/ui/palette.ts
import type { CSSProperties } from "react";
import type { ProjectPalette } from "../../domain/models/HeroTheme";

/** CSS variables that re-skin the UI kit with a project's palette. */
export function paletteStyle(p: ProjectPalette): CSSProperties {
  return {
    "--night-bg": p.bg,
    "--night-raised": p.raised,
    "--night-line": p.line,
    "--night-sunken": p.sunken,
    "--text-primary": p.text,
    "--text-muted": p.muted,
    "--text-faint": p.faint,
    "--theme-primary": p.primary,
    "--theme-secondary": p.highlight,
    "--theme-highlight": p.highlight,
    "--theme-accent": p.accent,
    "--theme-on-primary": p.bg,
  } as CSSProperties;
}

/**
 * The mobile menu over a project page, in both screen modes: the palette,
 * a glass panel of the page background at 60% (16px blur) with a line-colour
 * bottom rim, a sunken-colour backdrop at 55%, and primary-colour accents.
 */
export function menuStyle(p: ProjectPalette): CSSProperties {
  return {
    ...paletteStyle(p),
    "--glass": `color-mix(in srgb, ${p.bg} 60%, transparent)`,
    "--menu-blur": "16px",
    "--menu-rim": p.line,
    "--scrim": `color-mix(in srgb, ${p.sunken} 55%, transparent)`,
    "--menu-scrim-blur": "4px",
    "--menu-kicker": p.primary,
    "--switch-on": p.primary,
    "--menu-close": `color-mix(in srgb, ${p.raised} 60%, transparent)`,
    "--paint-underline": `linear-gradient(90deg, transparent, ${p.primary} 50%, transparent)`,
  } as CSSProperties;
}
