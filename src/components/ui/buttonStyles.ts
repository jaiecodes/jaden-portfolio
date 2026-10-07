// src/components/ui/buttonStyles.ts
// Class builders for the kit's buttons and chips, usable on <button>, <a> or
// <Link>. Lives apart from the components so those files export only one
// component each.

export type ButtonVariant = "primary" | "ghost";

/**
 *   primary  filled with the theme primary; the one emphasised action
 *   ghost    outlined in the theme line colour
 */
export function buttonClass(variant: ButtonVariant = "ghost", className = ""): string {
  const look =
    variant === "primary"
      ? "bg-t-primary text-t-on-primary hover:brightness-110"
      : "border border-line text-fg hover:border-t-primary/60 hover:bg-t-primary/5";
  return `type-button inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] px-[22px] py-[13px] no-underline transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-t-primary ${look} ${className}`;
}

/**
 * Category / filter pill. Selected is filled with the theme primary — the one
 * filled thing in a row of chips — and carries an optional count.
 */
export function filterChipClass(selected: boolean, className = ""): string {
  const look = selected
    ? "bg-t-primary text-t-on-primary"
    : "border border-line text-fg hover:border-t-primary/60";
  return `type-button inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 py-[11px] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-t-primary ${look} ${className}`;
}
