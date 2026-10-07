// src/features/projects/components/CardTag.tsx

/**
 * The player card's tech tag (Figma: Card Tag): the reddish-brown accent at
 * 38% over the card, gold rim, white caps. White on it passes at 10.5:1.
 */
export const CardTag = ({ children, className = "" }: { children: string; className?: string }) => (
  <span
    className={`type-label inline-flex items-center justify-center whitespace-nowrap rounded-[6px] border border-accent bg-[color-mix(in_srgb,var(--color-ember)_38%,var(--night-bg))] px-2.5 text-fg ${className}`}
  >
    {children}
  </span>
);
