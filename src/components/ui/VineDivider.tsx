// src/components/ui/VineDivider.tsx
import { useEffect, useId, useRef, useState } from "react";
import { useScreenMode } from "../../hooks/useScreenMode";
import { leafPath, leavesFor, sprigsFor, vineLook, vinePath, vineY, type DividerColors, type Look } from "./vine";

const SPEED = 180; // px per second

/** Day: a short twig off the branch, ending in a blossom or a bud. */
const Sprig = ({ x, up, blossom, look }: { x: number; up: boolean; blossom: boolean; look: Look["sprig"] }) => {
  const y0 = vineY(x);
  const tx = x + 7;
  const ty = y0 + (up ? -8 : 8);
  return (
    <g>
      <path d={`M${x} ${y0}Q${x + 2} ${ty} ${tx} ${ty}`} stroke="#8a6558" strokeWidth={1.1} fill="none" strokeLinecap="round" />
      {blossom ? (
        <g transform={`translate(${tx} ${ty})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={0} cy={-2.6} rx={1.9} ry={2.7} fill={look.petal} transform={`rotate(${a})`} />
          ))}
          <circle r={1.3} fill={look.centre} />
        </g>
      ) : (
        <ellipse cx={tx} cy={ty} rx={1.9} ry={2.6} fill={look.bud} transform={`rotate(${up ? 30 : -30} ${tx} ${ty})`} />
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
 * `colors` re-colours both for a project page.
 */
export const VineDivider = ({ className = "", colors }: { className?: string; colors?: DividerColors }) => {
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

  const leaves = leavesFor(width);
  const sprigs = sprigsFor(width);
  const path = vinePath(width);
  // Night: green vine warming to a gold firefly. Day: bark to blossom pink to an amber firefly.
  const look = vineLook(day, colors);
  const { paint, stops } = look;

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
              <stop offset="0" stopColor={look.leaf[0]} />
              <stop offset="1" stopColor={look.leaf[1]} />
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
                ? sprigs.map((s) => <Sprig key={s.x} {...s} look={look.sprig} />)
                : leaves.map(({ x, below }) => <path key={x} d={leafPath(x, below)} fill={`url(#leaf-${id})`} />)}
            </g>
          ))}
          <g ref={fly} filter={`url(#glow-${id})`}>
            {look.halo && <circle r={7} fill={look.halo} opacity={0.35} />}
            <circle r={4.5} fill={look.fly} />
            <circle cx={-12.5} cy={-4.5} r={1.5} fill={look.sparkle} opacity={0.8} />
            <circle cx={-29} cy={8} r={1} fill={look.fly} opacity={0.7} />
            <circle cx={17} cy={-7} r={1} fill={look.sparkle} opacity={0.7} />
          </g>
        </svg>
      )}
    </div>
  );
};
