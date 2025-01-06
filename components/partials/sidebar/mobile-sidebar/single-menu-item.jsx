import React from "react";

import { Badge } from "@/components/ui/badge";
import { cn, isLocationMatch } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
const SingleMenuItem = ({ item, collapsed }) => {
  const { badge, href, title } = item;
  const locationName = usePathname();
  return (
    <Link href={href}>
      <>
        {collapsed ? (
          <div>
            <span
              className={cn(
                "h-12 w-12 mx-auto rounded-md  transition-all duration-300 inline-flex flex-col items-center justify-center  relative  ",
                {
                  "bg-primary text-primary-foreground ": isLocationMatch(
                    href,
                    locationName
                  ),
                  " text-default-600  ": !isLocationMatch(href, locationName),
                }
              )}
            >
              <item.icon className="w-6 h-6" />
            </span>
          </div>
        ) : (
          <div
            className={cn(
              "flex gap-3  text-default-700 text-sm capitalize px-[10px] py-3 rounded cursor-pointer hover:bg-primary hover:text-primary-foreground",
              {
                "bg-primary text-primary-foreground": isLocationMatch(
                  href,
                  locationName
                ),
              }
            )}
          >
            <span className="flex-grow-0">
              <item.icon className="w-5 h-5" />
            </span>
            <div className="text-box flex-grow">{title}</div>
            {badge && <Badge className=" rounded">{item.badge}</Badge>}
          </div>
        )}
      </>
    </Link>
  );
};

export default SingleMenuItem;
