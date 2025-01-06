import * as React from "react";
import { cva } from "class-variance-authority";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg  p-4  flex md:items-center items-start space-x-4 rtl:space-x-reverse ",
  {
    variants: {
      color: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary  text-secondary-foreground",
        success: "bg-success text-success-foreground",
        info: "bg-info text-info-foreground",
        warning: "bg-warning text-warning-foreground",
        destructive: "bg-destructive text-destructive-foreground ",
        dark: "bg-gray-950 text-slate-50 ",
      },
      variant: {
        outline: "border border-current bg-background ",
        soft: "text-current bg-opacity-10 border-current    ",
      },
    },
    compoundVariants: [
      ...["destructive", "success", "info", "warning", "dark"].map((color) => ({
        variant: "outline",
        color,
        className: `text-${color} bg-transparent`,
      })),
      {
        variant: "outline",
        color: "secondary",
        className: " text-default-700 dark:text-default-400  bg-transparent ",
      },

      {
        variant: "outline",
        color: "default",
        className: "text-primary bg-transparent",
      },
      ...["info", "warning", "destructive", "success", "secondary"].map(
        (color) => ({
          variant: "soft",
          color,
          className: `text-${color}`,
        })
      ),
      ...["info", "warning", "destructive", "success", "secondary"].map(
        (color) => ({
          variant: "ghost",
          color,
          className: `text-${color}`,
        })
      ),
      {
        variant: "ghost",
        color: "default",
        className: "text-primary",
      },
      {
        variant: "soft",
        color: "default",
        className: "text-primary",
      },
      {
        variant: "soft",
        color: "secondary",
        className: "text-card-foreground bg-opacity-40",
      },
    ],
    defaultVariants: {
      color: "default",
    },
  }
);

const Alert = React.forwardRef(
  (
    { className, color, variant, dismissible, onDismiss, children, ...props },
    ref
  ) => {
    const [dismissed, setDismissed] = React.useState(false);

    const handleDismiss = () => {
      setDismissed(true);
      if (onDismiss) {
        onDismiss();
      }
    };

    return !dismissed ? (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ color, variant }), className)}
        {...props}
        {...props}
      >
        {children}
        {dismissible && (
          <button onClick={handleDismiss} className=" grow-0">
            <Icon icon="heroicons:x-mark" className="w-5 h-5" />
          </button>
        )}
      </div>
    ) : null;
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-2 font-medium leading-none tracking-tight grow text-lg",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed grow", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
