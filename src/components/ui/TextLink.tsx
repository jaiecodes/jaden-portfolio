// src/components/ui/TextLink.tsx
import type { Surface } from "./theme";

interface TextLinkProps {
  href: string;
  children: string;
  surface?: Surface;
}

/** Underlined external link with a ↗, in the page theme colour. */
export const TextLink = ({ href, children, surface = "dark" }: TextLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`type-tag border-b-2 pb-1.5 no-underline transition-opacity hover:opacity-75 ${
      surface === "light" ? "border-theme-on-light text-theme-on-light" : "border-theme text-theme"
    }`}
  >
    {children} ↗
  </a>
);
