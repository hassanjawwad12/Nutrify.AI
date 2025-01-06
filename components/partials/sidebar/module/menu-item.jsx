import React from "react";
import { cn, isLocationMatch, translate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useThemeStore } from "@/store";

function NavLink({ childItem, locationName, trans }) {
  const { href, icon, title, badge } = childItem;
  return (
    <Link
      href={href}
      className={cn(
        "flex  font-medium  text-sm capitalize px-[10px] py-3 gap-3 rounded-md cursor-pointer",
        {
          "bg-primary text-primary-foreground": isLocationMatch(
            href,
            locationName
          ),
          " text-default-600": !isLocationMatch(href, locationName),
        }
      )}
    >
      {icon && (
        <span className="inline-flex items-center   flex-grow-0">
          <childItem.icon className=" h-5 w-5" />
        </span>
      )}
      <div className="flex-grow truncate">{translate(title, trans)}</div>
      {badge && <Badge className="rounded h-min ">{badge}</Badge>}
    </Link>
  );
}

const MenuItem = ({
  childItem,
  toggleNested,
  nestedIndex,
  index,
  locationName,
  trans,
}) => {
  const { icon, title } = childItem;
  const { isRtl } = useThemeStore();
  return (
    <div>
      {childItem?.nested ? (
        <div
          className={cn("flex items-center gap-3 px-[10px] py-3 rounded-md ", {
            "bg-primary  text-primary-foreground": nestedIndex === index,
            "  text-default-600": nestedIndex !== index,
          })}
        >
          <div
            className={cn(
              "flex  font-medium  text-sm capitalize  gap-3 cursor-pointer flex-1 "
            )}
            onClick={() => toggleNested(index)}
          >
            <span className="inline-flex items-center  flex-grow-0">
              <childItem.icon className=" h-5 w-5" />
            </span>
            <span className="flex-grow truncate">
              {translate(title, trans)}
            </span>
          </div>
          {childItem.nested && (
            <div
              className={cn(
                "flex-none transition-all duration-200 text-default-500 ",
                {
                  " transform rotate-90   text-primary-foreground":
                    nestedIndex === index,
                }
              )}
            >
              {isRtl ? (
                <ChevronLeft className="w-3.5 h-3.5 " />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 " />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className=" flex-1">
          <NavLink
            childItem={childItem}
            locationName={locationName}
            trans={trans}
          />
        </div>
      )}
    </div>
  );
};

export default MenuItem;
