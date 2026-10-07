// src/components/ui/Icon.tsx
import type { SVGProps } from "react";

/** Line icons on a 24px grid, stroked in currentColor. */
const PATHS = {
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35",
  filters: "M4 7h10M18 7h2M4 17h4M12 17h8M14 4v6M8 14v6",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 8h16M4 16h16",
  chevron: "m9 6 6 6-6 6",
  arrowDown: "M12 5v14m-6-6 6 6 6-6",
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  play: "M8 5.5v13l10-6.5-10-6.5Z",
  video: "M15 10l5-3v10l-5-3M4 6h11v12H4z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 2.5 15.5 0 18-2.5-2.5-2.5-15.5 0-18",
  github:
    "M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  file: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5",
  cube: "M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm-8 4.5 8 4.5m0 0 8-4.5M12 12v9",
  chip: "M9 3v4m6-4v4M9 17v4m6-4v4M3 9h4M3 15h4m10-6h4m-4 6h4M7 7h10v10H7z",
  code: "m8 8-4 4 4 4m8-8 4 4-4 4",
} as const;

export type IconName = keyof typeof PATHS;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export const Icon = ({ name, size = 20, strokeWidth = 1.75, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={name === "play" ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...rest}
  >
    <path d={PATHS[name]} />
  </svg>
);
