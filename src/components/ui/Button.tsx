// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes } from "react";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./buttonStyles";
import type { Tone } from "./theme";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  tone?: Tone;
  size?: ButtonSize;
  /** Toggle state; also sets aria-pressed. */
  active?: boolean;
};

/**
 * Kit button. For links styled as buttons, put buttonClass() on the <a> or
 * <Link> instead.
 */
export const Button = ({
  variant,
  tone,
  size,
  active,
  className,
  type = "button",
  ...rest
}: ButtonProps) => (
  <button
    type={type}
    aria-pressed={active}
    className={buttonClass({ variant, tone, size, active, className })}
    {...rest}
  />
);
