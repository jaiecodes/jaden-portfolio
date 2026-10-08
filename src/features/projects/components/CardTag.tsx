// src/features/projects/components/CardTag.tsx

/**
 * The player card's tech tag (Figma: Card Tag). Night: the reddish-brown
 * accent at 38% over the card, gold rim, white caps (10.5:1). Day: teal mist
 * with teal caps. Colours come from the --tag-* tokens.
 */
export const CardTag = ({ children, className = "" }: { children: string; className?: string }) => (
  <span
    className={`type-label inline-flex items-center justify-center whitespace-nowrap rounded-[6px] border border-(--tag-rim) bg-(--tag-bg) px-2.5 text-(--tag-text) ${className}`}
  >
    {children}
  </span>
);
