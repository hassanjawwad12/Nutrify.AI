"use client";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer relative  inline-flex items-center  [&_.content-box>svg]:h-4  [&_.content-box>svg]:w-4  [&_.content-box]:text-primary-foreground [&_.content-box]:text-[10px] justify-start group  flex-shrink-0  cursor-pointer rounded-full  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-default-300",
  {
    variants: {
      color: {
        primary: "data-[state=checked]:bg-primary ",
        secondary: "data-[state=checked]:bg-secondary ",
        info: "data-[state=checked]:bg-info ",
        warning: "data-[state=checked]:bg-warning ",
        success: "data-[state=checked]:bg-success ",
        destructive: "data-[state=checked]:bg-destructive ",
        dark: "data-[state=checked]:bg-foreground ",
      },
      size: {
        sm: "h-4 w-[30px]  [&_.content-box]:text-[7px] [&_.content-box>svg]:h-2.5  [&_.content-box>svg]:w-2.5 ",
        md: "h-5 w-[38px] ",
        lg: "h-6 w-[42px]",
      },
    },

    defaultVariants: {
      color: "primary",
      size: "md",
    },
  }
);

const Switch = React.forwardRef(
  (
    {
      className,
      size,
      color,
      startContent,
      endContent,
      thumbClass,
      thumbIcon,
      ...props
    },
    ref
  ) => (
    <SwitchPrimitives.Root
      className={cn(switchVariants({ size, color }), className)}
      {...props}
      ref={ref}
    >
      {startContent && (
        <span className="absolute left-1  content-box   text-medium opacity-0 scale-50 transition-transform-opacity group-data-[state=checked]:scale-100 group-data-[state=checked]:opacity-100 ">
          {startContent}
        </span>
      )}
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none z-10 origin-right  h-4 w-4 rounded-full bg-background  shadow-lg ring-0 transition-all  flex items-center justify-center   ltr:data-[state=checked]:ml-5 rtl:data-[state=checked]:mr-5 rtl:data-[state=unchecked]:mr-0.5 ",
          thumbClass,
          {
            "h-3 w-3 data-[state=checked]:ml-4 ": size === "sm",
            "h-4 w-4 ": size === "md",
            "h-5 w-5 ": size === "lg",
          }
        )}
      >
        {thumbIcon ? thumbIcon : null}
      </SwitchPrimitives.Thumb>
      {endContent && (
        <span className="z-0  content-box   absolute right-1  text-medium opacity-100 transition-transform-opacity group-data-[state=checked]:translate-x-3 group-data-[state=checked]:opacity-0  ">
          {endContent}
        </span>
      )}
    </SwitchPrimitives.Root>
  )
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
