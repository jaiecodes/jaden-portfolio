// src/hooks/useHeaderTone.ts
import { useSyncExternalStore } from "react";

/**
 * The header's text colour. Pages leave it unset (the theme's text colour);
 * a project page sets it while its hero is behind the header, so the nav
 * reads on pale hero art too.
 */
let tone: string | null = null;
const listeners = new Set<() => void>();

export function setHeaderTone(next: string | null) {
  if (next === tone) return;
  tone = next;
  listeners.forEach((l) => l());
}

export function useHeaderTone(): string | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => tone,
  );
}
