import * as React from "react";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { cn } from "@/lib/utils";

const CleaveInput = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <div className=" flex-1 w-full">
      <div className=" relative">
        <Cleave
          type={type}
          className={cn(
            "flex h-10 w-full rounded border  border-default-300 bg-background  px-3 py-2 text-sm focus:outline-none focus:border-primary  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-accent-foreground/50  disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary read-only:bg-secondary transition duration-300",
            //"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});
CleaveInput.displayName = "CleaveInput";

export { CleaveInput };
