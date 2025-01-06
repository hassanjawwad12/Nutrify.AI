import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const paginationVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0   disabled:opacity-50  disabled:cursor-not-allowed ",
  {
    variants: {
      color: {
        primary: "bg-primary text-primary-foreground hover:bg-primary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success: "bg-success text-success-foreground hover:bg-success/90",
        info: "bg-info text-info-foreground hover:bg-info/90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        secondary:
          "bg-secondary text-foreground-foreground hover:bg-secondary/90",

        dark: "bg-accent-foreground text-accent hover:bg-accent-foreground/90",
      },
      variant: {
        outline: "border border-current bg-background  hover:text-card",
        soft: "text-current bg-opacity-10  hover:text-primary-foreground",
        ghost: "bg-transparent text-current hover:text-primary-foreground",
      },
      size: {
        default: "h-10 px-4 py-[10px]",
        sm: "h-8 px-3",
        lg: "h-11 px-[18px] py-[10px] text-base",
        xl: "h-12 px-6 py-3 text-base",
        md: "h-9 px-4 py-2",
        xs: "h-7 px-[14px] py-[6px]",
        icon: "h-10 w-10",
      },
      radius: {
        default: "rounded-md",
        xs: "rounded-sm",
        sm: "rounded",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    compoundcolors: [
      {
        variant: "outline",
        color: "destructive",
        className: "text-destructive",
      },
      {
        variant: "outline",
        color: "success",
        className: "text-success",
      },
      {
        variant: "outline",
        color: "info",
        className: "text-info",
      },
      {
        variant: "outline",
        color: "warning",
        className: "text-warning",
      },
      {
        variant: "outline",
        color: "dark",
        className: "text-accent-foreground",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "text-muted-foreground hover:bg-muted-foreground border-muted-foreground",
      },
      {
        variant: "outline",
        color: "default",
        className: "text-primary",
      },
      // soft button variant
      {
        variant: "soft",
        color: "info",
        className: "text-info",
      },
      {
        variant: "soft",
        color: "warning",
        className: "text-warning",
      },
      {
        variant: "soft",
        color: "destructive",
        className: "text-destructive",
      },
      {
        variant: "soft",
        color: "success",
        className: "text-success",
      },
      {
        variant: "soft",
        color: "secondary",
        className: "text-card-foreground bg-opacity-40",
      },
      {
        variant: "soft",
        color: "default",
        className: "text-primary",
      },
    ],

    defaultVariants: {
      color: "primary",
      size: "default",
      radius: "default",
    },
  }
);
const Pagination = ({ isDisabled, className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", isDisabled, className)}
    {...props}
  />
);

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef(
  ({ className, radius, ...props }, ref) => (
    <li ref={ref} className={cn("", className, radius)} {...props} />
  )
);
PaginationItem.displayName = "PaginationItem";

const PaginationLink = ({
  className,
  isDisabled,
  isActive,
  color,
  variant,
  size = "icon",
  ...props
}) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      paginationVariants({
        color: isActive ? color : "secondary",
        variant: isActive ? variant : "",
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 ltr:pl-2.5 rtl:pr-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4 rtl:rotate-180" />
  </PaginationLink>
);

const PaginationEllipsis = ({ className, ...props }) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
