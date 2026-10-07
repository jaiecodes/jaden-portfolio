// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes } from "react";
import { buttonClass, type ButtonVariant } from "./buttonStyles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

/** Kit button. For links styled as buttons, put buttonClass() on the <a> or <Link>. */
export const Button = ({ variant = "ghost", className, type = "button", ...rest }: ButtonProps) => (
  <button type={type} className={buttonClass(variant, className)} {...rest} />
);
