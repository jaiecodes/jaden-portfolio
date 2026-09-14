// src/components/ui/StrokeFrame.tsx
import { createElement } from "react";
import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { strokeStyle, type StrokeOptions } from "./stroke";

type StrokeFrameProps = StrokeOptions &
  HTMLAttributes<HTMLElement> & {
    /** Element to render. Defaults to div. */
    as?: ElementType;
    children?: ReactNode;
  };

/**
 * A box with a masked rim instead of a border, so the rim can be a
 * gradient and can exist on any subset of sides. Layout size is
 * unaffected because the rim is painted inward.
 *
 * For elements that need their own props (motion.div, Link), call
 * strokeStyle() directly and add the "stroke" class yourself.
 */
export const StrokeFrame = ({
  as: Tag = "div",
  stroke,
  pad,
  paint,
  fallback,
  className = "",
  style,
  children,
  ...rest
}: StrokeFrameProps) =>
  /* createElement rather than <Tag>: under React 19's types a JSX tag whose
     type is the broad `ElementType` resolves its props to `never`, so
     className/style/children fail to type-check. createElement takes the same
     `ElementType` and passes props through without that resolution. */
  createElement(
    Tag,
    {
      className: `stroke ${className}`,
      style: {
        ...strokeStyle({ stroke, pad, paint, fallback }),
        ...style,
      } as CSSProperties,
      ...rest,
    },
    children,
  );
