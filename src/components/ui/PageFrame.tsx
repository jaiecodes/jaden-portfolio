// src/components/ui/PageFrame.tsx
import type { ReactNode } from "react";
import type { PageTheme } from "./theme";

interface PageFrameProps {
  /** Sets the page's dominant colour and paints for everything inside. */
  theme: PageTheme;
  /** Vertical rhythm between the page's sections (gap-* utilities). */
  className?: string;
  children: ReactNode;
}

/**
 * The shared page shell: ink background, the page theme, and the content
 * frame every page is drawn to — 17px gutters on mobile, 90px on desktop,
 * with the fixed 100px header cleared on top. Content caps at 1800px, the
 * design width.
 */
export const PageFrame = ({ theme, className = "", children }: PageFrameProps) => (
  <div data-theme={theme} className="min-h-screen bg-ink">
    <div
      className={`mx-auto flex w-full max-w-[1800px] flex-col px-[17px] pt-[117px] pb-16 lg:px-[90px] lg:pt-[190px] lg:pb-[90px] ${className}`}
    >
      {children}
    </div>
  </div>
);
