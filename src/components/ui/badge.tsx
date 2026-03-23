import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary-900 text-white shadow hover:bg-primary-800": variant === "default",
          "border-transparent bg-primary-100 text-primary-900 hover:bg-primary-200": variant === "secondary",
          "text-foreground": variant === "outline",
          "border-transparent bg-green-100 text-green-800": variant === "success",
          "border-transparent bg-amber-100 text-amber-800": variant === "warning",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
