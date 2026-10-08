// src/components/ui/VineDivider.tsx
import { useEffect, useId, useRef, useState } from "react";
import { useScreenMode } from "../../hooks/useScreenMode";

const PERIOD = 120; // px per wave, as drawn in Figma
const MID = 14.8;
const AMP = 2.3;
const LEAF_EVERY = 115;
const LEAF_START = 70;
const SPEED = 180; // px per second

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

const vineY = (x: number) => MID + AMP * Math.sin((x / PERIOD) * Math.PI * 2 - Math.PI / 2);

const SPRIG_EVERY = 46;
const SPRIG_START = 26;

/** Day: a short twig off the branch, ending in a blossom or a bud. */
const Sprig = ({ x, up, blossom }: { x: number; up: boolean; blossom: boolean }) => {
  const y0 = vineY(x);
  const tx = x + 7;
  const ty = y0 + (up ? -8 : 8);
  return (
    <g>
      <path d={`M${x} ${y0}Q${x + 2} ${ty} ${tx} ${ty}`} stroke="#8a6558" strokeWidth={1.1} fill="none" strokeLinecap="round" />
      {blossom ? (
        <g transform={`translate(${tx} ${ty})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={0} cy={-2.6} rx={1.9} ry={2.7} fill="#f4abba" transform={`rotate(${a})`} />
          ))}
          <circle r={1.3} fill="#ea596e" />
        </g>
      ) : (
        <ellipse cx={tx} cy={ty} rx={1.9} ry={2.6} fill="#ea596e" transform={`rotate(${up ? 30 : -30} ${tx} ${ty})`} />
      )}
    </g>
  );
};

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The header's vine (Figma: Vine Divider, Night). A firefly flies left to
 * right in an endless loop, painting the vine behind it: the trail fades from
 * transparent through green and yellow-green to the firefly's gold, and
 * nothing ahead of it is drawn. As it leaves the right edge it re-enters at
 * the left while its tail finishes crossing, so the loop never pauses.
 *
 * The vine itself stays still; a moving window reveals it. The window and the
 * trail's paint are drawn twice — at the firefly and one width ahead of it,
 * for the previous lap's tail — so the wrap is seamless.
 *
 * By day (Vine Divider, Day) it is a cherry branch: bark warming to blossom
 * pink, with twigs alternating blossoms and buds, and an amber firefly.
 */
export const VineDivider = ({ className = "" }: { className?: string }) => {
  const id = useId().replace(/:/g, "");
  const wrap = useRef<HTMLDivElement>(null);
  const windows = useRef<(SVGRectElement | null)[]>([]);
  const grads = useRef<(SVGLinearGradientElement | null)[]>([]);
  const fly = useRef<SVGGElement>(null);
  const [width, setWidth] = useState(0);
  const { day } = useScreenMode();

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => setWidth(Math.round(el.getBoundingClientRect().width));
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, []);

  const trail = Math.min(width * 0.6, 1100);

  useEffect(() => {
    if (!width) return;
    const place = (tip: number) => {
      // This lap's trail, and the last lap's tail still crossing the right edge.
      [tip, tip + width].forEach((end, i) => {
        windows.current[i]?.setAttribute("x", String(end - trail));
        grads.current.slice(i * 2, i * 2 + 2).forEach((g) => {
          g?.setAttribute("x1", String(end - trail));
          g?.setAttribute("x2", String(end));
        });
      });
      fly.current?.setAttribute("transform", `translate(${tip} ${vineY(tip)})`);
    };
    if (reducedMotion()) {
      place(width * 0.6);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      place((((now - t0) / 1000) * SPEED) % width);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [width, trail]);

  const leaves: { x: number; below: boolean }[] = [];
  for (let i = 0, x = LEAF_START; x < width; i++, x += LEAF_EVERY) leaves.push({ x, below: i % 2 === 1 });
  const sprigs: { x: number; up: boolean; blossom: boolean }[] = [];
  for (let i = 0, x = SPRIG_START; x < width - 8; i++, x += SPRIG_EVERY) sprigs.push({ x, up: i % 2 === 0, blossom: i % 2 === 0 });
  const path = vinePath(width);
  // Night: green vine warming to a gold firefly. Day: bark to blossom pink to an amber firefly.
  const paint = day ? ["#7a5a4f", "#c9748a", "#ea596e", "#f2b441"] : ["#4db36f", "#76b85c", "#9ebd4a", "#efc139"];
  const stops = day ? [0, 0.45, 0.82, 1] : [0, 0.36, 0.72, 1];
  const flyColor = day ? "#f2b441" : "#efc139";

  return (
    // Width comes from the caller (e.g. absolute inset-x-0), so it can bleed past padding.
    <div ref={wrap} className={`pointer-events-none h-7 ${className}`} aria-hidden>
      {width > 0 && (
        <svg width={width} height={28} viewBox={`0 0 ${width} 28`} overflow="visible">
          <defs>
            {[0, 1].map((i) => (
              <g key={i}>
                {/* Reveal: transparent at the tail, opaque at the firefly */}
                <linearGradient
                  ref={(el) => void (grads.current[i * 2] = el)}
                  id={`vine-fade-${id}-${i}`}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#fff" stopOpacity="0" />
                  <stop offset="0.35" stopColor="#fff" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#fff" />
                </linearGradient>
                <mask id={`vine-mask-${id}-${i}`} maskUnits="userSpaceOnUse" x={-trail} y={-20} width={width + 2 * trail} height={68}>
                  <rect
                    ref={(el) => void (windows.current[i] = el)}
                    y={-20}
                    width={trail}
                    height={68}
                    fill={`url(#vine-fade-${id}-${i})`}
                  />
                </mask>
                {/* Paint: green along the trail, warming to gold at the firefly */}
                <linearGradient
                  ref={(el) => void (grads.current[i * 2 + 1] = el)}
                  id={`vine-paint-${id}-${i}`}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor={paint[0]} />
                  <stop offset={stops[1]} stopColor={paint[1]} />
                  <stop offset={stops[2]} stopColor={paint[2]} />
                  <stop offset="1" stopColor={paint[3]} />
                </linearGradient>
              </g>
            ))}
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
          {[0, 1].map((i) => (
            <g key={i} mask={`url(#vine-mask-${id}-${i})`}>
              <path d={path} stroke={`url(#vine-paint-${id}-${i})`} strokeWidth={1.8} strokeLinecap="round" fill="none" />
              {day
                ? sprigs.map((s) => <Sprig key={s.x} {...s} />)
                : leaves.map(({ x, below }) => <path key={x} d={leafPath(x, below)} fill={`url(#leaf-${id})`} />)}
            </g>
          ))}
          <g ref={fly} filter={`url(#glow-${id})`}>
            {day && <circle r={7} fill="#f5a623" opacity={0.35} />}
            <circle r={4.5} fill={flyColor} />
            <circle cx={-12.5} cy={-4.5} r={1.5} fill={day ? "#ea596e" : flyColor} opacity={0.8} />
            <circle cx={-29} cy={8} r={1} fill={flyColor} opacity={0.7} />
            <circle cx={17} cy={-7} r={1} fill={day ? "#ea596e" : flyColor} opacity={0.7} />
          </g>
        </svg>
      )}
    </div>
  );
};
