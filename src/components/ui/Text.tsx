// src/components/ui/Text.tsx
import { createElement } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { TEXT_CLASS, type TextVariant } from "./theme";

/** The element each step renders as unless `as` says otherwise. */
const DEFAULT_TAG: Record<TextVariant, ElementType> = {
  display: "h1",
  h1: "h2",
  h2: "h3",
  title: "h3",
  lead: "p",
  callout: "p",
  label: "p",
  body: "p",
  "body-sm": "p",
  button: "span",
  pill: "span",
  tag: "span",
  overline: "p",
};

type TextProps = HTMLAttributes<HTMLElement> & {
  variant: TextVariant;
  /** Element to render; pick the one that fits the document outline. */
  as?: ElementType;
  /** Trim the line box to cap height / baseline (Figma spacing). */
  trim?: boolean;
  children?: ReactNode;
};

/**
 * Text on the type scale. Size, weight, case and tracking come from the
 * variant; colour comes from the caller (or inherits), so the same step
 * reads correctly on every page theme.
 *
 *   <Text variant="h1" className="text-theme">Focus Areas</Text>
 *   <Text variant="label" as="h4" className="text-primary">Brunswick</Text>
 */
export const Text = ({
  variant,
  as,
  trim = false,
  className = "",
  children,
  ...rest
}: TextProps) =>
  /* createElement rather than <Tag>: see StrokeFrame for why. */
  createElement(
    as ?? DEFAULT_TAG[variant],
    {
      className: `${TEXT_CLASS[variant]}${trim ? " cap-trim" : ""} ${className}`,
      ...rest,
    },
    children,
  );
