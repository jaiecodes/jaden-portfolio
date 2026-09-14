// src/components/ui/GradientIcon.tsx
import type { CSSProperties } from "react";

interface GradientIconProps {
  /** URL of a single-colour SVG used as the mask (import it or serve from /public). */
  src: string;
  /** Accessible name. Pass "" for a purely decorative icon. */
  label?: string;
  /** Rendered box in px. */
  size?: number;
  /** Any CSS background value. Defaults to the angular brand gradient. */
  paint?: string;
  /**
   * Transform applied to the paint only, never to the shape. Defaults to
   * none: the gradient carries its own start angle, so nothing needs
   * rotating. Pass diagonalStretch() from ./paint for the squashed cone.
   */
  paintTransform?: string;
  className?: string;
}

/**
 * SVG has no conic gradient, so the shape becomes a mask on the wrapper
 * and the gradient is painted on a child. Masking the parent clips the
 * whole subtree, which keeps the paint layer free to be transformed
 * without distorting the artwork.
 */
export const GradientIcon = ({
  src,
  label = "",
  size = 90,
  paint = "var(--paint-angular)",
  paintTransform = "none",
  className = "",
}: GradientIconProps) => {
  const mask: CSSProperties = {
    width: size,
    height: size,
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };

  return (
    <div
      className={`grid shrink-0 ${className}`}
      style={mask}
      role={label ? "img" : "presentation"}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      <span
        className="block h-full w-full"
        style={{
          background: paint,
          transform: paintTransform,
          transformOrigin: "50% 50%",
        }}
      />
    </div>
  );
};
