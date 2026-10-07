// src/components/ui/Text.tsx
import { createElement } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { TEXT_CLASS, TONE_TEXT, type TextVariant, type Tone } from "./theme";

/** The element each step renders as unless `as` says otherwise. */
const DEFAULT_TAG: Record<TextVariant, ElementType> = {
  display: "h1",
  h1: "h2",
  h2: "h2",
  h3: "h3",
  lead: "p",
  body: "p",
  "body-sm": "p",
  label: "p",
  "label-lg": "p",
  "hero-label": "p",
  chip: "span",
  button: "span",
  "card-title": "h3",
  script: "h1",
  wordmark: "span",
};

type TextProps = HTMLAttributes<HTMLElement> & {
  variant: TextVariant;
  /** A themed colour; leave out to inherit or set one in className. */
  tone?: Tone;
  /** Element to render; pick the one that fits the document outline. */
  as?: ElementType;
  children?: ReactNode;
};

/**
 * Text on the type scale. Size, face, weight, case and tracking come from
 * the variant; colour from `tone` (themed) or the caller.
 *
 *   <Text variant="label" tone="primary">The problem</Text>
 *   <Text variant="h2" as="p">Two separate projects had to feel like one boat.</Text>
 */
export const Text = ({ variant, tone, as, className = "", children, ...rest }: TextProps) =>
  /* createElement rather than <Tag>: under React 19's types a JSX tag typed as
     the broad ElementType resolves its props to never. */
  createElement(
    as ?? DEFAULT_TAG[variant],
    {
      className: `${TEXT_CLASS[variant]} ${tone ? TONE_TEXT[tone] : ""} ${className}`,
      ...rest,
    },
    children,
  );
