import { useEffect } from "react";
import { useSpring } from "motion/react";

/**
 * The pointer's position as springs, -1…1 on each axis, for gentle parallax.
 * Stays at rest on touch screens and with reduced motion.
 */
export function usePointerParallax() {
  const x = useSpring(0, { stiffness: 60, damping: 20 });
  const y = useSpring(0, { stiffness: 60, damping: 20 });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1);
      y.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  return { x, y };
}
