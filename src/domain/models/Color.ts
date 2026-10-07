/** WCAG relative luminance of a #RRGGBB colour. */
export function luminance(hex: string): number {
  const v = hex.replace("#", "");
  const channel = (i: number) => {
    const c = parseInt(v.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

/** WCAG contrast ratio between two #RRGGBB colours (1–21). */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Page ink (--color-ink) and white, the two text colours we choose between. */
export const INK = "#030A11";
export const WHITE = "#FFFFFF";

/** Whether dark (ink) text reads better than white text on `background`. */
export const prefersDarkText = (background: string): boolean =>
  contrast(background, INK) > contrast(background, WHITE);
