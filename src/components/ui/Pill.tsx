// src/components/ui/Pill.tsx
import type { ReactNode } from "react";

export type PillVariant = "tag" | "skill";

interface PillProps {
  /** Accent colour (hex or any CSS colour / var). Defaults to the page theme. */
  accent?: string;
  variant?: PillVariant;
  /** `skill` only: leading icon. Falls back to a gradient dot. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * A small rounded label. Two shapes share one accent:
 *
 *  - `tag`   — compact, with accent bars on the left/right edges. Used for the
 *              tech tags inside an experience Board.
 *  - `skill` — a full rounded-full outline pill with a leading icon (or a
 *              gradient dot). Used in the skills grid.
 */
export const Pill = ({
  accent = "var(--theme-dominant)",
  variant = "tag",
  icon,
  className = "",
  children,
}: PillProps) => {
  if (variant === "skill") {
    return (
      <span
        className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 transition-colors hover:bg-white/[0.04] lg:px-5 lg:py-2.5 ${className}`}
        style={{ borderColor: accent }}
      >
        <span aria-hidden className="flex size-6 shrink-0 items-center justify-center lg:size-[30px]">
          {icon ?? (
            <span
              className="size-4 rounded-full"
              style={{
                background: `linear-gradient(to top right, ${accent}, var(--color-primary))`,
              }}
            />
          )}
        </span>
        <span className="type-pill whitespace-nowrap text-body">
          {children}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`type-tag inline-flex items-center rounded-[7px] px-3 py-1 lg:px-[15px] ${className}`}
      style={{
        color: accent,
        borderLeft: `3px solid ${accent}`,
        borderRight: `3px solid ${accent}`,
      }}
    >
      {children}
    </span>
  );
};
