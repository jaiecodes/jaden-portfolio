// src/components/ui/LanternIcon.tsx

/**
 * The lantern from the header (Figma: Icon / Lantern). The body follows the
 * text colour; the flame is gold at night. It is the light / dark switch's
 * icon; light mode isn't designed yet, so for now it only shows the night.
 */
export const LanternIcon = ({ size = 28, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden className={className}>
    <g fill="currentColor">
      <path d="M21.79 20.68v6.68H6.2v-6.68h15.59ZM8.43 25.14h11.13v-2.23H8.43v2.23Z" />
      <path d="M17.34 5.09v5.31c-.01.68.21 1.34.61 1.89l1.67 2.21c.69.93 1.06 2.04 1.06 3.18 0 1.4-.56 2.75-1.55 3.74a5.3 5.3 0 0 1-3.74 1.55h-2.78a5.3 5.3 0 0 1-3.74-1.55 5.3 5.3 0 0 1-1.55-3.74c0-1.14.37-2.25 1.05-3.17l1.68-2.27c.4-.53.61-1.18.61-1.85V5.09h6.68Zm-4.46 5.3c0 1.14-.37 2.25-1.05 3.17l-1.68 2.27c-.4.53-.61 1.18-.61 1.84 0 .81.32 1.59.9 2.16.57.58 1.35.9 2.17.9h2.77c.82 0 1.6-.32 2.17-.9.57-.57.9-1.35.9-2.16l-.01-.25a3.06 3.06 0 0 0-.6-1.6l-1.67-2.21a5.4 5.4 0 0 1-1.06-3.23V7.32h-2.23v3.07Z" />
      <path d="M22.91 10.66a7.8 7.8 0 0 0-7.75-7.8h-2.22a7.8 7.8 0 0 0-7.85 7.8V18l3.01 3.01-.79.79-.79.79-3.34-3.34-.32-.33v-8.25A10.08 10.08 0 0 1 12.95.64h2.22a10.1 10.1 0 0 1 9.96 10.03v8.25l-.33.33-3.34 3.33-1.57-1.57 3.01-3.01v-7.33Z" />
    </g>
    <path
      d="M16.23 19.57a2.23 2.23 0 0 1-4.46 0c0-2.23 2.23-4.4 2.23-4.4s2.23 2.17 2.23 4.4Z"
      fill="var(--color-accent)"
    />
  </svg>
);
