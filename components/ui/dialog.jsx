import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const dialogVariants = cva(
  " fixed  left-1/2 top-1/2 z-[9999] grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2  bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg grid gap-4",
  {
    variants: {
      size: {
        xs: "md:max-w-[332px] w-[90%]",
        sm: "md:max-w-[384px] w-[90%]",
        md: "md:max-w-[444px] w-[90%]",
        lg: "md:max-w-[536px] w-[90%]",
        xl: "md:max-w-[628px] w-[90%]",
        "2xl": "md:max-w-[720px] w-[90%]",
        "3xl": "md:max-w-[812px] w-[90%]",
        "4xl": "md:max-w-[904px] w-[90%]",
        "5xl": "md:max-w-[996px] w-[90%]",
        "6xl": "md:max-w-[1654px] w-[90%] ",
        full: "h-screen max-w-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed  z-[999]  inset-0  bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ",

      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(
  (
    {
      className,
      children,
      size,
      overlayClass,
      overlayScroll = false,
      hiddenCloseIcon = false,
      closeDialog,
      ...props
    },
   
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay className={overlayClass} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(dialogVariants({ size }), className)}
        {...props}
      >
        {children}
        {!hiddenCloseIcon && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" onClick={closeDialog}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, children, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left  relative",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 ",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
