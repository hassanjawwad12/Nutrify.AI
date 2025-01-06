import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { translate } from "@/lib/utils";
const SingleIconMenu = ({ index, activeIndex, item, locationName, trans }) => {
  const { icon, title, href } = item;
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {href ? (
              <Link
                href={href}
                className={cn(
                  "h-12 w-12 mx-auto rounded-md  transition-all duration-300 flex flex-col items-center justify-center cursor-pointer relative",
                  {
                    "bg-primary/10  text-primary": locationName === href,
                    "text-default-500 dark:text-default-400 hover:bg-primary/10  hover:text-primary ":
                      locationName !== href,
                  }
                )}
              >
                <item.icon className="w-8 h-8" />
              </Link>
            ) : (
              <button
                className={cn(
                  "h-12 w-12 mx-auto rounded-md transition-all duration-300 flex flex-col items-center justify-center cursor-pointer relative  ",
                  {
                    "bg-primary/10 dark:bg-primary dark:text-primary-foreground  text-primary data-[state=delayed-open]:bg-primary/10 ":
                      activeIndex === index,
                    " text-default-500 dark:text-default-400 data-[state=delayed-open]:bg-primary/10  data-[state=delayed-open]:text-primary":
                      activeIndex !== index,
                  }
                )}
              >
                <item.icon className="w-6 h-6" />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent side="right" className=" capitalize">
            {translate(title, trans)}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default SingleIconMenu;
