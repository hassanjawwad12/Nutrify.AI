import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tooltipVariants = cva(
  "z-50 overflow-hidden  rounded-md  px-3 py-1.5 text-sm  shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ",
  {
    variants: {
      color: {
        secondary: "border bg-popover text-popover-foreground",
        primary: "border border-primary bg-primary text-primary-foreground",
        warning: "border border-warning bg-warning text-warning-foreground",
        info: "border border-info bg-info text-info-foreground",
        success: "border border-success bg-success text-success-foreground",
        destructive:
          "border border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

const TooltipProvider = React.forwardRef(
  ({ delayDuration = 0, ...props }, ref) => (
    <TooltipPrimitive.Provider
      ref={ref}
      {...props}
      delayDuration={delayDuration}
    />
  )
);
TooltipProvider.displayName = TooltipPrimitive.Provider.displayName;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;

const TooltipContent = React.forwardRef(
  ({ className, sideOffset = 4, color, children, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipVariants({ color }), className, {})}
      {...props}
    >
      {children}
    </TooltipPrimitive.Content>
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
};
