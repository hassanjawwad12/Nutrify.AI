import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const timelineItemVariants = cva("timeline-item relative pb-10 ", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const timelineVariants = cva(" flex grow  flex-col", {
  variants: {
    position: {
      right: "right",
      left: "left",
      alternate: "alternate",
      "alternate-reverse": "alternate-reverse",
    },
  },

  defaultVariants: {
    position: "right",
  },
});
const dotVariants = cva(
  "  h-4 w-4  rounded-full flex  items-center justify-center",
  {
    variants: {
      color: {
        default: "bg-default-200",
        primary: "bg-primary",
        secondary: "bg-secondary",
        warning: "bg-warning",
        destructive: "bg-destructive",
        success: "bg-success",
        info: "bg-info",
      },
      variant: {
        ghost: "bg-transparent",
        outline: "bg-transparent  border-2 border-current",
        ping:"tm-dot-ping"
      },
    },
    compoundVariants: [
      ...[
        "destructive",
        "success",
        "info",
        "warning",
        "dark",
        "secondary",
        "primary",
      ].map((color) => ({
        variant: "outline",
        color,
        className: `border-${color}`,
      })),
      ...[
        "destructive",
        "success",
        "info",
        "warning",
        "dark",
        "secondary",
        "primary",
      ].map((color) => ({
        variant: "ping",
        className: `before:bg-${color}`,
      })),
    ],

    defaultVariants: {
      color: "default",
    },
  }
);

const Timeline = React.forwardRef(
  (
    {
      className,
      children,
      //activeStep,
      position,
      disabled,

      size,
      current,
      content,
      icon,
      alternativeLabel,
      gap,
      ...props
    },
    ref
  ) => {
    const childItem = React.Children.toArray(children);
    return (
      <ol
        ref={ref}
        className={cn(timelineVariants({ position }), className, {
          "space-y-2": gap,
        })}
        {...props}
      >
        {childItem.map((child, index) => {
          const isLast = index === childItem.length - 1;
          const even = index % 2 === 0; // Check if index is even
          const odd = index % 2 !== 0; // Check if index is odd
          return React.cloneElement(child, {
            ...props,
            isLast,
            //activeStep: activeStep,
            disabled: disabled && !isLast,
            index: index,
            current: current,
            ...child.props,
            gap: gap,
            position: position,
            even: even,
            odd: odd,
            alternativeLabel: alternativeLabel,
            content: content,
          });
        })}
      </ol>
    );
  }
);
Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef(
  (
    {
      className,
      children,
      variant,
      size,
      isLast,

      current,
      index,
      icon,
      gap,
      position,
      alternativeLabel,
      even,
      odd,
      ...props
    },
    ref
  ) => {
    return (
      <li
        ref={ref}
        className={cn(timelineItemVariants({ variant, size }), className, {
          "[&_.tm-separator]:right-0 [&_.tm-separator]:left-[unset]  [&_.tm-content-wrapper]:text-right [&_.tm-content-wrapper]:pr-8":
            position === "left",
          "ltr:[&_.tm-separator]:left-0 ltr:[&_.tm-content-wrapper]:pl-8 rtl:[&_.tm-separator]:right-0 rtl:[&_.tm-separator]:left-[unset]  rtl:[&_.tm-content-wrapper]:text-right rtl:[&_.tm-content-wrapper]:pr-8":
            position === "right" || position === undefined,
          "w-1/2 ":
            position === "alternate" || position === "alternate-reverse",
          "ml-auto rtl:mr-auto   [&_.tm-content-wrapper]:pl-8  rtl:[&_.tm-content-wrapper]:pr-8 ":
            (position === "alternate" && even) ||
            (position === "alternate-reverse" && odd),
          "rtl:mr-auto [&_.tm-separator]:right-[-17px] rtl:[&_.tm-separator]:right-[-8px]  [&_.tm-separator]:left-[unset] [&_.tm-content-wrapper]:text-right [&_.tm-content-wrapper]:pr-4 rtl:[&_.tm-content-wrapper]:pl-4":
            (position === "alternate" && odd) ||
            (position === "alternate-reverse" && even),
          "[&_.tm-connector]:mt-2": gap,
        })}
        {...props}
      >
        {children}
      </li>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

// time line separator

const TimelineSeparator = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute h-full top-[3px]  flex flex-col items-center tm-separator",

          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TimelineSeparator.displayName = "TimelineSeparator";

const TimelineDot = React.forwardRef(
  ({ className, children, color, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dotVariants({ color, variant }), className)}
        {...props}
      >
        <span>{children}</span>
      </div>
    );
  }
);
TimelineDot.displayName = "TimelineDot";

const TimelineConnector = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grow w-[2px] bg-default-200 tm-connector ",

          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineConnector.displayName = "TimelineConnector";

const TimelineContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "tm-content-wrapper",

          className
        )}
        {...props}
      >
        <div className="tm-content">{children}</div>
      </div>
    );
  }
);

TimelineContent.displayName = "TimelineContent";
const TimelineOppositeContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "tm-opposite-content",

          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineOppositeContent.displayName = "TimelineOppositeContent";

export {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineOppositeContent,
};
