import React from "react";
import Link from "next/link";
import { cn, isLocationMatch } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
const LinkButton = ({
  children,
  item,
  toggleMulti,
  index,
  locationName,
  multiIndex,
}) => {
  return (
    <>
      {item.child ? (
        <button
          type="button"
          onClick={() => toggleMulti(index)}
          className={cn(
            "flex items-center justify-between w-full relative before:absolute  before: top-0 before:-left-[14px]  before:w-[2px] before:h-0 before:transition-all before:duration-200 ",
            {
              "text-primary  rounded before:bg-primary   before:h-full":
                multiIndex === index,
            }
          )}
        >
          <span>{children}</span>
          <span
            className={cn(
              "flex-none transition-all duration-200 text-default-500 ",
              {
                " transform rotate-90  text-primary": multiIndex === index,
              }
            )}
          >
            <ChevronRight className="w-3.5 h-3.5 " />
          </span>
        </button>
      ) : (
        <Link
          href={item?.href}
          className={cn("", {
            " text-primary    rounded": isLocationMatch(
              item.href,
              locationName
            ),
            " text-default-700 hover:text-primary ": !isLocationMatch(
              item.href,
              locationName
            ),
          })}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default LinkButton;
