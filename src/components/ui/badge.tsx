import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
  size?: "sm" | "md";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "sm", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full font-semibold border",
        {
          "bg-slate-100 text-slate-700 border-slate-200": variant === "default",
          "bg-emerald-50 text-emerald-700 border-emerald-200": variant === "success",
          "bg-amber-50 text-amber-700 border-amber-200": variant === "warning",
          "bg-red-50 text-red-700 border-red-200": variant === "danger",
          "bg-blue-50 text-blue-700 border-blue-200": variant === "info",
          "bg-violet-50 text-violet-700 border-violet-200": variant === "purple",
        },
        {
          "px-2 py-0.5 text-[10px] lg:text-xs": size === "sm",
          "px-3 py-1 text-xs lg:text-sm": size === "md",
        },
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge };
