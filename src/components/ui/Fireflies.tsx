// src/components/ui/Fireflies.tsx
import { useMemo, type CSSProperties } from "react";

/** Deterministic pseudo-random numbers, so the field is the same every render. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface FirefliesProps {
  /** Dots per 1800×1044 screen (Figma: 22). */
  count?: number;
  seed?: number;
  /** Pin to the viewport instead of scrolling with the page. */
  fixed?: boolean;
  className?: string;
}

/**
 * Ambient fireflies (Figma: Ambient / Fireflies, Night): small dots in the
 * page's primary colour with a soft glow, drifting and pulsing slowly. They
 * sit behind content and ignore the pointer. Reduced motion stills them.
 */
export const Fireflies = ({ count = 22, seed = 7, fixed = false, className = "" }: FirefliesProps) => {
  const dots = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, () => {
      const size = [3, 5, 6, 7, 8][Math.floor(r() * 5)];
      const drift = () => `${Math.round((r() - 0.5) * 60)}px`;
      return {
        left: `${(r() * 100).toFixed(2)}%`,
        top: `${(r() * 100).toFixed(2)}%`,
        size,
        style: {
          "--dx1": drift(),
          "--dy1": drift(),
          "--dx2": drift(),
          "--dy2": drift(),
          "--o-lo": (0.15 + r() * 0.2).toFixed(2),
          "--o-hi": (0.45 + r() * 0.35).toFixed(2),
          animation: `firefly-drift ${(14 + r() * 14).toFixed(1)}s ease-in-out ${(-r() * 20).toFixed(1)}s infinite, firefly-glow ${(3 + r() * 4).toFixed(1)}s ease-in-out ${(-r() * 6).toFixed(1)}s infinite`,
        } as CSSProperties,
      };
    });
  }, [count, seed]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none inset-0 overflow-hidden ${fixed ? "fixed" : "absolute"} ${className}`}
    >
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-t-primary"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            boxShadow: `0 0 ${d.size * 3.2}px 1px color-mix(in srgb, var(--theme-primary) 90%, transparent)`,
            ...d.style,
          }}
        />
      ))}
    </div>
  );
};
