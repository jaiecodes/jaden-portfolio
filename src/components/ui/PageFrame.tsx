// src/components/ui/PageFrame.tsx
import type { ReactNode } from "react";
import { Fireflies } from "./Fireflies";
import type { PageTheme } from "./theme";

interface PageFrameProps {
  /** Sets the page's colour tokens for everything inside. */
  theme: PageTheme;
  /** Pin the fireflies to the viewport (Projects) rather than the page. */
  fixedFireflies?: boolean;
  /** Vertical rhythm between the page's sections (gap-* utilities). */
  className?: string;
  children: ReactNode;
}

/**
 * The shared page shell: the theme, its background and ambient fireflies,
 * and the content frame — 20px gutters on mobile, 90px on desktop, with the
 * header cleared on top. Content caps at 1620px (the 1800px design less its
 * gutters).
 */
export const PageFrame = ({ theme, fixedFireflies = false, className = "", children }: PageFrameProps) => (
  <div data-theme={theme} className="relative min-h-screen overflow-hidden bg-night text-fg">
    <Fireflies fixed={fixedFireflies} />
    <div
      className={`relative mx-auto flex w-full max-w-[1800px] flex-col px-5 pt-[100px] pb-20 lg:px-[90px] lg:pt-[170px] lg:pb-[120px] ${className}`}
    >
      {children}
    </div>
  </div>
);
