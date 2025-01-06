"use client";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import MultiMenuHandler from "./multi-menu-handler";
import MultiNestedMenu from "./multi-nested-menu";
import SubMenuItem from "./sub-menu-item";
import { usePathname } from "next/navigation";
import { isLocationMatch, cn, getDynamicPath } from "@/lib/utils";

const NestedSubMenu = ({
  activeSubmenu,
  item,
  index,
  activeMultiMenu,
  toggleMultiMenu,
  title,
  trans,
}) => {
  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);
  return (
    <Collapsible open={activeSubmenu === index}>
      <CollapsibleContent className="CollapsibleContent">
        <ul className="sub-menu  space-y-4 relative before:absolute before:left-4 before:top-0  before:h-[calc(100%-5px)]  before:w-[3px] before:bg-primary/10 before:rounded">
          {item.child?.map((subItem, j) => (
            <li
              className={cn(
                "block pl-9   first:pt-4 last:pb-4  relative before:absolute first:before:top-4 before:top-0 before:left-4  before:w-[3px]",
                {
                  "before:bg-primary first:before:h-[calc(100%-16px)]  before:h-full":
                    isLocationMatch(subItem.href, locationName),
                  " ": activeSubmenu === index,
                }
              )}
              key={`sub_menu_${j}`}
            >
              {subItem?.multi_menu ? (
                <div>
                  <MultiMenuHandler
                    subItem={subItem}
                    subIndex={j}
                    activeMultiMenu={activeMultiMenu}
                    toggleMultiMenu={toggleMultiMenu}
                    trans={trans}
                  />
                  <MultiNestedMenu
                    subItem={subItem}
                    subIndex={j}
                    activeMultiMenu={activeMultiMenu}
                    trans={trans}
                  />
                </div>
              ) : (
                <SubMenuItem subItem={subItem} subIndex={j} trans={trans} />
              )}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default NestedSubMenu;
