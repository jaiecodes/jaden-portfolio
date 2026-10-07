// src/components/ui/ArrowIcon.tsx
import arrowUrl from "@/assets/svg/resume/arrow.svg";

/**
 * The ↗ "open" arrow exported from Figma. Used as a mask so it takes the
 * current text colour — set colour with a text-* class on it or a parent.
 */
export const ArrowIcon = ({ className = "size-[23px]" }: { className?: string }) => (
  <span
    aria-hidden
    className={`inline-block shrink-0 bg-current ${className}`}
    style={{
      maskImage: `url("${arrowUrl}")`,
      WebkitMaskImage: `url("${arrowUrl}")`,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
    }}
  />
);
