// src/hooks/useScreenMode.ts
import { useSyncExternalStore } from "react";

/** Night (dark) or Day (light, the sakura garden). */
export type ScreenMode = "night" | "day";

const KEY = "screen-mode";
const listeners = new Set<() => void>();

function read(): ScreenMode {
  try {
    return localStorage.getItem(KEY) === "day" ? "day" : "night";
  } catch {
    return "night";
  }
}

let mode: ScreenMode = typeof window === "undefined" ? "night" : read();
let switching = 0;

/** Puts the mode on <html> so the [data-mode="day"] tokens in index.css apply. */
export function applyScreenMode(next: ScreenMode = mode) {
  document.documentElement.dataset.mode = next;
  document.documentElement.style.colorScheme = next === "day" ? "light" : "dark";
}

export function setScreenMode(next: ScreenMode) {
  if (next === mode) return;
  mode = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // Private mode or blocked storage: the choice just won't persist.
  }
  // Ease the colours across for one switch, without slowing every hover.
  const root = document.documentElement;
  root.classList.add("mode-switching");
  window.clearTimeout(switching);
  switching = window.setTimeout(() => root.classList.remove("mode-switching"), 500);
  applyScreenMode(next);
  listeners.forEach((l) => l());
}

/** The current screen mode and a toggle; the lantern switches it. */
export function useScreenMode() {
  const current = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => mode,
    () => "night" as ScreenMode,
  );
  return {
    mode: current,
    day: current === "day",
    setMode: setScreenMode,
    toggle: () => setScreenMode(current === "day" ? "night" : "day"),
  };
}
