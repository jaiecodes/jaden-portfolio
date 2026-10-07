// src/components/ui/ActionLink.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { isExternalUrl } from "../../domain/models/Link";
import { buttonClass, type ButtonVariant } from "./buttonStyles";

interface ActionLinkProps {
  href: string;
  variant?: ButtonVariant;
  /** Replaces the button look entirely (for bare links). */
  className?: string;
  bare?: boolean;
  children: ReactNode;
  "aria-label"?: string;
  onClick?: () => void;
}

/**
 * A button-styled link that picks the right element: a router <Link> for
 * routes and #anchors, a new-tab <a> for web URLs, a plain <a> for mailto:.
 * An empty href renders a dimmed, non-interactive "coming soon" control, so a
 * link can sit in the data before its destination exists.
 */
export const ActionLink = ({ href, variant = "ghost", className = "", bare, children, onClick, ...aria }: ActionLinkProps) => {
  const cls = bare ? className : buttonClass(variant, className);
  if (!href)
    return (
      <span aria-disabled className={`${cls} cursor-not-allowed opacity-50`} title="Coming soon">
        {children}
      </span>
    );
  if (isExternalUrl(href))
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick} {...aria}>
        {children}
      </a>
    );
  if (href.startsWith("mailto:") || href.startsWith("#"))
    return (
      <a href={href} className={cls} onClick={onClick} {...aria}>
        {children}
      </a>
    );
  return (
    <Link to={href} className={cls} onClick={onClick} {...aria}>
      {children}
    </Link>
  );
};
