import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarGroup = React.forwardRef(
  ({ className, children, max, total, custom, countClass, ...props }, ref) => {
    const avatars = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn(
          " relative w-max-content flex -space-x-3 avatarGroup items-center",
          className
        )}
        {...props}
      >
        {avatars.slice(0, max).map((avatar, index) => (
          <React.Fragment key={index}>{avatar}</React.Fragment>
        ))}
        {avatars.length > max && (
          <>
            {custom ? (
              <div className=" inline-block">
                <span className="ltr:ml-5 rtl:mr-5 inline-block"> +{avatars.length - max} more</span>
              </div>
            ) : (
              <Avatar
                className={cn(
                  "ring-1 ring-background ring-offset-[2px]  ring-offset-background ",
                  countClass
                )}
              >
                <AvatarFallback className="font-normal">
                  +{total ? total : avatars.length - max}
                </AvatarFallback>
              </Avatar>
            )}
          </>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted font-semibold text-sm",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
