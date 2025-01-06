import * as React from "react";
import { cva } from "class-variance-authority";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const breadcrumbItemsVariants = cva(
  " flex gap-1 items-center transition  underline-offset-4 ",
  {
    variants: {
      color: {
        default:
          "text-default-600 hover:default-600/80 data-[state=active]:text-primary aria-[current=page]:text-primary",
        primary:
          "text-primary/80 hover:text-primary/60 data-[state=active]:text-primary aria-[current=page]:text-primary",
        success:
          "text-success/80 hover:text-success/60 data-[state=active]:text-success aria-[current=page]:text-success",
        info: "text-info/80 hover:text-info/60 data-[state=active]:text-info aria-[current=page]:text-info",
        warning:
          "text-warning/80  hover:text-warning/60 data-[state=active]:text-warning aria-[current=page]:text-warning",
        destructive:
          "text-destructive/80  hover:text-destructive/60 data-[state=active]:text-destructive aria-[current=page]:text-destructive",
      },

      underline: {
        none: "no-underline",
        hover: "hover:underline",
        always: "underline",
        active: "active:underline",
        focus: "focus:underline",
      },
      size: {
        md: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      },
    },

    defaultVariants: {
      color: "default",
      size: "sm",
      underline: "none",
    },
  }
);
const breadcrumbsVariants = cva(" flex flex-wrap list-none max-w-fit ", {
  variants: {
    variant: {
      default: "default-style",
      solid: " bg-muted p-3 rounded",
      bordered: "border-2 border-border rounded p-3",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

const Breadcrumbs = React.forwardRef(
  (
    {
      className,
      children,
      maxItems,
      itemsBeforeCollapse,
      itemsAfterCollapse,
      color,
      size,
      disabled,
      separator = <Icon icon="heroicons:chevron-right" className="rtl:rotate-180"/>,
      variant,
      underline,
      renderEllipsis,
      ellipsisClass,
      itemClasses,
      ...props
    },
    ref
  ) => {
    const breadcrumbItems = React.Children.toArray(children);
    const totalItems = breadcrumbItems.length;

    let visibleItems = breadcrumbItems;
    if (maxItems && totalItems > maxItems) {
      const visibleBefore = Math.min(
        itemsBeforeCollapse,
        totalItems - itemsAfterCollapse
      );
      const visibleAfter = Math.min(
        itemsAfterCollapse,
        totalItems - visibleBefore
      );
      visibleItems = [
        ...breadcrumbItems.slice(0, visibleBefore),
        null, // Placeholder for ellipsis
        ...breadcrumbItems.slice(totalItems - visibleAfter),
      ];
    }

    return (
      <ol
        ref={ref}
        className={cn(breadcrumbsVariants({ variant }), className)}
        {...props}
      >
        {visibleItems.map((child, index) => {
          const isLast = index === visibleItems.length - 1;

          const isCurrent = isLast || child?.props?.isCurrent;
          if (child === null) {
            return (
              <li
                key={`breadcrumb-ellipsis-${index}`}
                className={cn("flex items-center", {
                  "  gap-1 text-base": renderEllipsis,
                })}
              >
                {renderEllipsis ? (
                  <div
                    className={cn(
                      "flex gap-1 text-default-600 items-center ",
                      ellipsisClass
                    )}
                  >
                    {renderEllipsis}
                    <span className="separator px-1 self-center">
                      {separator ? (
                        separator
                      ) : (
                        <Icon icon="heroicons:chevron-right" />
                      )}
                    </span>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "flex gap-1 text-default-600  text-base",
                      ellipsisClass
                    )}
                  >
                    <span>
                      <Icon icon="heroicons:ellipsis-horizontal" />
                    </span>
                    <span className="separator px-1 self-center">
                      {separator ? (
                        separator
                      ) : (
                        <Icon icon="heroicons:chevron-right" />
                      )}
                    </span>
                  </div>
                )}
              </li>
            );
          }
          return React.cloneElement(child, {
            ...props,
            isLast,
            isCurrent,
            disabled: disabled && !isLast,
            separator: separator,

            ...child.props,
            className: cn(
              breadcrumbItemsVariants({ color, size, underline }),
              child.props.className,
              itemClasses
            ),
          });
        })}
      </ol>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";

const BreadcrumbItem = React.forwardRef(
  (
    {
      className,
      children,
      color,
      isLast,
      href,
      size,
      disabled,
      underline,
      startContent,
      endContent,
      separator,
      isCurrent,
      onAction,
      modifier,
      ...props
    },
    ref
  ) => {
    const ariaCurrent = isCurrent ? "page" : null;
    const dataState = isCurrent ? "active" : null;
    const dataDisabled = disabled && !isCurrent ? "true" : null;

    const handleClick = () => {
      if (onAction && !isCurrent) {
        onAction(children);
      }
    };

    return (
      <li className="inline-flex items-center">
        <span
          ref={ref}
          className={cn(
            breadcrumbItemsVariants({ color, size, underline }),
            className,
            {
              "cursor-pointer": (!isCurrent && onAction) || !isLast,
              "data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed":
                disabled && !isCurrent,
            }
          )}
          aria-current={ariaCurrent}
          data-state={dataState}
          data-disabled={dataDisabled}
          onClick={handleClick}
          {...props}
        >
          {startContent && <span>{startContent}</span>}
          {href ? <Link href={href}>{children}</Link> : children}
          {endContent && <span>{endContent}</span>}
          {!isLast && separator && (
            <span className="separator px-1 cursor-default">{separator}</span>
          )}
        </span>
      </li>
    );
  }
);

BreadcrumbItem.displayName = "BreadcrumbItem";

export { Breadcrumbs, BreadcrumbItem };
