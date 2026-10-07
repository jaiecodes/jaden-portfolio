import { useEffect, useState } from "react";

export interface Viewport {
  width: number;
  height: number;
  /** Taller than wide — phones and portrait tablets. */
  portrait: boolean;
}

const read = (): Viewport => ({
  width: window.innerWidth,
  height: window.innerHeight,
  portrait: window.innerHeight > window.innerWidth,
});

/** The current viewport size, updated on resize and rotation. */
export function useViewport(): Viewport {
  const [viewport, setViewport] = useState(read);
  useEffect(() => {
    const update = () => setViewport(read());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return viewport;
}
