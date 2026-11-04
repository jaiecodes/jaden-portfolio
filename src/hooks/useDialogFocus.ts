import { useEffect, useRef, type RefObject } from "react";

/**
 * Keyboard behaviour for a modal: while active, focus moves to its first
 * control and Tab stays inside it, Esc closes it, and focus returns to where
 * it was on close. `focusable` selects the controls Tab cycles through.
 */
export function useDialogFocus(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onClose: () => void,
  focusable = "a[href], button:not([aria-disabled])",
) {
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    root?.querySelector<HTMLElement>(focusable)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current();
      if (e.key !== "Tab" || !root) return;
      const items = [...root.querySelectorAll<HTMLElement>(focusable)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [ref, active, focusable]);
}
