// src/components/ui/Fireflies.tsx
import { useMemo, type CSSProperties } from "react";
import { useScreenMode } from "../../hooks/useScreenMode";

/** Deterministic pseudo-random numbers, so the field is the same every render. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface FirefliesProps {
  /** Dots per 1800×1044 screen (Figma: 22). Day shows 34 petals per 22 dots. */
  count?: number;
  seed?: number;
  /** Pin to the viewport instead of scrolling with the page. */
  fixed?: boolean;
  className?: string;
}

const PETALS = ["/v2/day/petal-1.svg", "/v2/day/petal-2.svg", "/v2/day/petal-3.svg"];

/**
 * Ambient fireflies (Figma: Ambient / Fireflies, Night): small dots in the
 * page's primary colour with a soft glow, drifting and pulsing slowly. By day
 * (Ambient / Petals) they become cherry petals falling down and to the right,
 * the larger ones blurred as if nearer. They sit behind content and ignore
 * the pointer. Reduced motion stills them.
 */
export const Fireflies = ({ count = 22, seed = 7, fixed = false, className = "" }: FirefliesProps) => {
  const { day } = useScreenMode();

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

  const petals = useMemo(() => {
    const r = seeded(seed + 101);
    return Array.from({ length: Math.round((count * 34) / 22) }, () => {
      const size = 9 + Math.round(r() * 17);
      const o = 0.55 + r() * 0.4;
      return {
        src: PETALS[Math.floor(r() * PETALS.length)],
        style: {
          left: `${(r() * 110 - 10).toFixed(2)}%`,
          top: `${(r() * 100 - 10).toFixed(2)}%`,
          width: size,
          opacity: o.toFixed(2),
          filter: size > 21 ? `blur(${((size - 20) / 4).toFixed(1)}px)` : undefined,
          "--o": o.toFixed(2),
          "--dx": `${Math.round(120 + r() * 160)}px`,
          "--dy": `${Math.round(240 + r() * 220)}px`,
          "--sway": `${Math.round(16 + r() * 26)}px`,
          "--rot": `${Math.round((r() - 0.3) * 420)}deg`,
          animation: `petal-fall ${(11 + r() * 10).toFixed(1)}s linear ${(-r() * 20).toFixed(1)}s infinite`,
        } as CSSProperties,
      };
    });
  }, [count, seed]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none inset-0 overflow-hidden ${fixed ? "fixed" : "absolute"} ${className}`}
    >
      {day
        ? petals.map((p, i) => <img key={i} src={p.src} alt="" className="absolute h-auto max-w-none" style={p.style} />)
        : dots.map((d, i) => (
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
