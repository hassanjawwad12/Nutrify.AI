"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

import { useThemeStore } from "@/store";
import { useRouter, usePathname } from "next/navigation";

const RtlSwitcher = () => {
  const router = useRouter();
  const { isRtl, setRtl } = useThemeStore();
  const pathname = usePathname();

  const handleDirectionChange = (rtl) => {
    const lang = rtl ? "ar" : "en";
    setRtl(rtl);
    router.push(`/${lang}/${pathname.split("/")[2]}`);
  };

  return (
    <div>
      <div className="mb-2 relative inline-block px-3 py-[3px] rounded-md before:bg-primary before:absolute before:top-0 before:left-0 before:w-full  before:h-full before:rounded before:opacity-10 before:z-[-1]  text-[--theme-primary]  text-xs font-medium">
        Direction
      </div>
      <div className="text-muted-foreground font-normal text-xs mb-4">
        Choose your direction
      </div>
      <div className=" grid grid-cols-2 gap-3">
        <button
          className={cn(
            "border  flex  w-full text-center  text-default-400 items-center justify-center py-[14px]  px-10 rounded relative",
            {
              "text-primary border-primary": !isRtl,
            }
          )}
          onClick={() => handleDirectionChange(false)}
        >
          Ltr
        </button>
        <button
          className={cn(
            "border  flex  w-full text-center items-center justify-center py-[14px]  px-10 rounded relative",
            {
              "text-primary border-primary": isRtl,
            }
          )}
          onClick={() => handleDirectionChange(true)}
        >
          Rtl
        </button>
      </div>
    </div>
  );
};

export default RtlSwitcher;
