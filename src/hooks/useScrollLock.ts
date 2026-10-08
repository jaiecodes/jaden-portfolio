import { useCallback } from "react";

const KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
const block = (e: Event) => e.preventDefault();
const blockKeys = (e: KeyboardEvent) => KEYS.has(e.key) && e.preventDefault();

/**
 * Locks page scrolling (wheel, touch, keys and the scrollbar) until unlocked.
 * Used while a hero animation plays.
 */
export function useScrollLock() {
  const lock = useCallback(() => {
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", blockKeys);
  }, []);
  const unlock = useCallback(() => {
    document.documentElement.style.overflow = "";
    window.removeEventListener("wheel", block);
    window.removeEventListener("touchmove", block);
    window.removeEventListener("keydown", blockKeys);
  }, []);
  return { lock, unlock };
}
