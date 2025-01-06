import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-semibold ring-offset-background transition-colors  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
  {
    variants: {
      variant: {
        default: "bg-primary/60 text-primary-foreground",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-[10px]",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-[18px] py-[10px] text-base",
        xl: "h-12 rounded-md px-6 py-3 text-base",
        md: "h-9 rounded-md px-4 py-2",
        xs: "h-9 rounded-md px-[14px] py-[6px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toggle = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
