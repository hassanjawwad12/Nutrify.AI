"use client";
import React, { useState } from "react";
import SubMenuItem from "../common/sub-menu-item";
import MultiMenuHandler from "../common/multi-menu-handler";
import MultiNestedMenu from "../common/multi-nested-menu";
import { cn, isLocationMatch, getDynamicPath } from "@/lib/utils";
import { usePathname } from "next/navigation";

const CollapsedHoverMenu = ({ item, index, menuTitle }) => {
  const [activeMultiMenu, setMultiMenu] = useState(null);

  const toggleMultiMenu = (subIndex) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);
  return (
    <>
      {item?.child ? (
        <ul className="space-y-2 relative before:absolute before:left-4 before:top-0  before:h-[calc(100%-5px)]  before:w-[2px] before:bg-primary/20 before:rounded">
          <li className=" text-primary-foreground bg-primary font-medium px-3 py-3 rounded  relative flex items-center gap-3 ">
            <item.icon className="h-5 w-5 " />
            {menuTitle}
          </li>
          {item.child?.map((subItem, j) => (
            <li
              className={cn(
                "relative block ml-10 first:pt-4  before:absolute first:before:top-4 before: top-0 before:-left-6  before:w-[2px]  before:h-0 before:transition-all before:duration-200",
                {
                  "before:bg-primary first:before:h-[calc(100%-16px)]  before:h-full":
                    isLocationMatch(subItem.href, locationName),
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
                    className="before:-left-6"
                  />
                  <div className="pl-3">
                    <MultiNestedMenu
                      subItem={subItem}
                      subIndex={j}
                      activeMultiMenu={activeMultiMenu}
                    />
                  </div>
                </div>
              ) : (
                <SubMenuItem subItem={subItem} subIndex={j} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>no menu</div>
      )}
    </>
  );
};

export default CollapsedHoverMenu;
