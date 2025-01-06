"use client";
import { Icon } from "@iconify/react";
import { cn, translate } from "@/lib/utils";
import * as HoverCard from "@radix-ui/react-hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";

import CollapsedHoverMenu from "./collapsed-hover-menu";

const SubMenuHandler = ({
  item,
  toggleSubmenu,
  index,
  activeSubmenu,
  collapsed,
  menuTitle,
  trans,
}) => {
  const { title } = item;

  return (
    <>
      {collapsed ? (
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <div className="inline-flex cursor-pointer items-center justify-center data-[state=open]:bg-primary-100 data-[state=open]:text-primary  w-12 h-12  rounded-md">
              <item.icon className="w-6 h-6" />
            </div>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content
              collisionPadding={70}
              sideOffset={5}
              side="right"
              className="  z-50  data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md  bg-popover  shadow-sm data-[state=open]:transition-all"
            >
              <ScrollArea
                className={cn("p-5", {
                  "h-[250px]":
                    item.child.length > 5 ||
                    item.child.some(
                      (childItem) =>
                        childItem.multi_menu && childItem.multi_menu.length > 5
                    ),
                })}
              >
                <CollapsedHoverMenu item={item} menuTitle={menuTitle} />
              </ScrollArea>
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      ) : (
        <div
          onClick={() => toggleSubmenu(index)}
          className={cn(
            "flex  text-default-700 font-medium text-sm capitalize px-[10px] py-3 rounded cursor-pointer transition-all duration-100 hover:bg-primary hover:text-primary-foreground group",
            {
              "bg-primary  text-primary-foreground": activeSubmenu === index,
            }
          )}
        >
          <div className="flex-1  gap-3 flex items-start">
            <span className="inline-flex items-center  text-lg ">
              <item.icon className="w-5 h-5" />
            </span>
            <div className=" ">{translate(title, trans)}</div>
          </div>
          <div className="flex-0">
            <div
              className={cn(
                " text-base rounded-full flex justify-center items-center transition-all duration-300 group-hover:text-primary-foreground",
                {
                  "rotate-90  ": activeSubmenu === index,
                  " text-default-500  ": activeSubmenu !== index,
                }
              )}
            >
              <Icon
                icon="heroicons:chevron-right-20-solid"
                className="h-5 w-5"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubMenuHandler;
