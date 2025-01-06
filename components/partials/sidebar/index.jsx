"use client";
import React from "react";
import { useSidebar, useThemeStore } from "@/store";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import ModuleSidebar from "./module";
import PopoverSidebar from "./popover";
import ClassicSidebar from "./classic";
import MobileSidebar from "./mobile-sidebar";

const Sidebar = ({ trans }) => {
  const { sidebarType, collapsed } = useSidebar();
  const { layout } = useThemeStore();

  const isDesktop = useMediaQuery("(min-width: 1280px)");

  let selectedSidebar = null;

  if (!isDesktop && (sidebarType === "popover" || sidebarType === "classic")) {
    selectedSidebar = <MobileSidebar />;
  } else {
    const sidebarComponents = {
      module: <ModuleSidebar collapsed={collapsed} trans={trans} />,
      popover: <PopoverSidebar collapsed={collapsed} trans={trans} />,
      classic: <ClassicSidebar trans={trans} />,
    };

    selectedSidebar = sidebarComponents[sidebarType] || <ModuleSidebar />;
  }

  return <div>{selectedSidebar}</div>;
};

export default Sidebar;
