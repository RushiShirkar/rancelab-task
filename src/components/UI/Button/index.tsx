import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Button component – uses Tailwind utility classes.
 * Added `displayName` for easier debugging and React DevTools identification.
 */
const variantStyles = {
  default: "bg-primary text-white hover:bg-primary/90",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "bg-transparent text-primary",
  rounded: "rounded-full bg-[#e33858] text-white shadow-lg shadow-[#e33858]/40 hover:bg-[#c62d47]",
  roundedOutline:
    "rounded-full border border-[#e33858] bg-white text-[#e33858] shadow-sm hover:bg-[#fff4f6]",
};

const sizeStyles = {
  default: "h-8 px-4 py-2 text-sm",
  sm: "h-9 px-3 text-sm",
  lg: "h-11 px-6 text-base",
  icon: "h-10 w-10",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: keyof typeof variantStyles;
  /** Size variant */
  size?: keyof typeof sizeStyles;
}

export const Button = ({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      `inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      disabled:pointer-events-none disabled:opacity-50`,
      variantStyles[variant],
      sizeStyles[size],
      className
    )}
    {...props}
  />
);

Button.displayName = "Button";
export default Button;