// src/components/ui/VineDivider.tsx
import { useEffect, useId, useRef, useState } from "react";

const PERIOD = 120; // px per wave, as drawn in Figma
const MID = 14.8;
const AMP = 2.3;
const LEAF_EVERY = 115;
const LEAF_START = 70;
const PAINT_MS = 7000; // phases 1–4: the firefly crosses
const FADE_MS = 1200; // phase 5: the trail fades and a new firefly enters

/** The vine as one path, a gentle sine wave across `width`. */
function vinePath(width: number): string {
  const pts: string[] = [];
  for (let x = 0; x <= width; x += 6) {
    const y = MID + AMP * Math.sin((x / PERIOD) * Math.PI * 2 - Math.PI / 2);
    pts.push(`${x === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(2)}`);
  }
  return pts.join("");
}

/** Leaves alternate below and above the vine. */
function leafPath(x: number, below: boolean): string {
  return below
    ? `M${x} 13.5C${x + 4.8} 18.9 ${x + 12} 20.7 ${x + 21.6} 18.9C${x + 15.6} 18.3 ${x + 8.4} 16.5 ${x} 13.5Z`
    : `M${x} 16C${x + 4.8} 10.6 ${x + 12} 8.8 ${x + 21.6} 10.6C${x + 15.6} 11.2 ${x + 8.4} 13 ${x} 16Z`;
}

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The header's vine (Figma: Vine Divider, Night). A firefly flies left to
 * right and paints the vine behind it — nothing ahead of it is drawn — fading
 * from transparent through green and yellow-green to the firefly's gold. When
 * it reaches the edge the trail fades and a new firefly enters at the left.
 * Leaves and the glow overhang the 28px row; nothing is clipped vertically.
 */
export const VineDivider = ({ className = "" }: { className?: string }) => {
  const id = useId().replace(/:/g, "");
  const wrap = useRef<HTMLDivElement>(null);
  const clip = useRef<SVGRectElement>(null);
  const grad = useRef<SVGLinearGradientElement>(null);
  const fly = useRef<SVGGElement>(null);
  const trail = useRef<SVGGElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!width) return;
    const place = (tip: number, fade: number) => {
      clip.current?.setAttribute("width", String(Math.max(tip, 0)));
      grad.current?.setAttribute("x2", String(Math.max(tip, 1)));
      const y = MID + AMP * Math.sin((tip / PERIOD) * Math.PI * 2 - Math.PI / 2);
      fly.current?.setAttribute("transform", `translate(${tip} ${y})`);
      if (trail.current) trail.current.style.opacity = String(fade);
    };
    if (reducedMotion()) {
      place(width * 0.6, 1);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = (now - t0) % (PAINT_MS + FADE_MS);
      if (t < PAINT_MS) {
        const p = t / PAINT_MS;
        place(width * (1 - Math.pow(1 - p, 1.4)), 1);
      } else {
        place(width, 1 - (t - PAINT_MS) / FADE_MS);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [width]);

  const leaves: { x: number; below: boolean }[] = [];
  for (let i = 0, x = LEAF_START; x < width; i++, x += LEAF_EVERY) leaves.push({ x, below: i % 2 === 1 });

  return (
    <div ref={wrap} className={`pointer-events-none h-7 w-full ${className}`} aria-hidden>
      {width > 0 && (
        <svg width={width} height={28} viewBox={`0 0 ${width} 28`} overflow="visible">
          <defs>
            <clipPath id={`vine-clip-${id}`}>
              <rect ref={clip} x={0} y={-20} width={0} height={68} />
            </clipPath>
            <linearGradient ref={grad} id={`vine-paint-${id}`} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={1} y2={0}>
              <stop offset="0" stopColor="#4db36f" stopOpacity="0" />
              <stop offset="0.35" stopColor="#4db36f" stopOpacity="0.9" />
              <stop offset="0.72" stopColor="#9ebd4a" />
              <stop offset="1" stopColor="#efc139" />
            </linearGradient>
            <linearGradient id={`leaf-${id}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#3e8a57" />
              <stop offset="1" stopColor="#4db36f" />
            </linearGradient>
            <filter id={`glow-${id}`} x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g ref={trail} clipPath={`url(#vine-clip-${id})`}>
            <path d={vinePath(width)} stroke={`url(#vine-paint-${id})`} strokeWidth={1.8} strokeLinecap="round" fill="none" />
            {leaves.map(({ x, below }, i) => (
              <path key={x} d={leafPath(x, below)} fill={`url(#leaf-${id})`} opacity={Math.min(1, 0.16 + i * 0.27)} />
            ))}
          </g>
          <g ref={fly} filter={`url(#glow-${id})`}>
            <circle r={4.5} fill="#efc139" />
            <circle cx={-12.5} cy={-4.5} r={1.5} fill="#efc139" opacity={0.8} />
            <circle cx={-29} cy={8} r={1} fill="#efc139" opacity={0.7} />
            <circle cx={17} cy={-7} r={1} fill="#efc139" opacity={0.7} />
          </g>
        </svg>
      )}
    </div>
  );
};
