"use client";
import React from "react";
import { cn } from "@/lib/utils";
import ThemeButton from "./theme-button";
import { useSidebar, useThemeStore } from "@/store";
import ProfileInfo from "./profile-info";
import VerticalHeader from "./vertical-header";
import HorizontalHeader from "./horizontal-header";
import Inbox from "./inbox";
import HorizontalMenu from "./horizontal-menu";
import NotificationMessage from "./notification-message";

import Language from "./language";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileMenuHandler from "./mobile-menu-handler";
import ClassicHeader from "./layout/classic-header";
import FullScreen from "./full-screen";

const NavTools = ({ isDesktop, isMobile, sidebarType }) => {
  return (
    <div className="nav-tools flex items-center  gap-2">
      {isDesktop && <Language />}
      {isDesktop && <FullScreen />}

      <ThemeButton />
      {/* <Inbox /> */}
      {/* <NotificationMessage /> */}

      <div className="ltr:pl-2 rtl:pr-2">
        <ProfileInfo />
      </div>
      {!isDesktop && sidebarType !== "module" && <MobileMenuHandler />}
    </div>
  );
};
const Header = ({ handleOpenSearch, trans }) => {
  const { collapsed, sidebarType, setCollapsed, subMenu, setSidebarType } =
    useSidebar();
  const { layout, navbarType, setLayout } = useThemeStore();

  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const isMobile = useMediaQuery("(min-width: 768px)");

  // set header style to classic if isDesktop
  React.useEffect(() => {
    if (!isDesktop && layout === "horizontal") {
      setSidebarType("classic");
    }
  }, [isDesktop]);

  // if horizontal layout
  if (layout === "horizontal" && navbarType !== "hidden") {
    return (
      <ClassicHeader
        className={cn(" ", {
          "sticky top-0 z-50": navbarType === "sticky",
        })}
      >
        <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
          <div className="flex justify-between items-center h-full">
            <HorizontalHeader handleOpenSearch={handleOpenSearch} />
            <NavTools
              isDesktop={isDesktop}
              isMobile={isMobile}
              sidebarType={sidebarType}
            />
          </div>
        </div>
        {isDesktop && (
          <div className=" bg-card bg-card/90 backdrop-blur-lg  w-full px-6  shadow-md">
            <HorizontalMenu trans={trans} />
          </div>
        )}
      </ClassicHeader>
    );
  }
  if (layout === "semibox" && navbarType !== "hidden") {
    return (
      <ClassicHeader
        className={cn("has-sticky-header rounded-md   ", {
          "ltr:xl:ml-[72px] rtl:xl:mr-[72px] ": collapsed,
          "ltr:xl:ml-[272px] rtl:xl:mr-[272px] ": !collapsed,

          "sticky top-6": navbarType === "sticky",
        })}
      >
        <div className="xl:mx-20 mx-4">
          <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 rounded-md my-6 shadow-md border-b">
            <div className="flex justify-between items-center h-full">
              <VerticalHeader
                sidebarType={sidebarType}
                handleOpenSearch={handleOpenSearch}
              />
              <NavTools
                isDesktop={isDesktop}
                isMobile={isMobile}
                sidebarType={sidebarType}
              />
            </div>
          </div>
        </div>
      </ClassicHeader>
    );
  }
  if (
    sidebarType !== "module" &&
    navbarType !== "floating" &&
    navbarType !== "hidden"
  ) {
    return (
      <ClassicHeader
        className={cn("", {
          "ltr:xl:ml-[248px] rtl:xl:mr-[248px]": !collapsed,
          "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
          "sticky top-0": navbarType === "sticky",
        })}
      >
        <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
          <div className="flex justify-between items-center h-full">
            <VerticalHeader
              sidebarType={sidebarType}
              handleOpenSearch={handleOpenSearch}
            />
            <NavTools
              isDesktop={isDesktop}
              isMobile={isMobile}
              sidebarType={sidebarType}
            />
          </div>
        </div>
      </ClassicHeader>
    );
  }
  if (navbarType === "hidden") {
    return null;
  }
  if (navbarType === "floating") {
    return (
      <ClassicHeader
        className={cn("  has-sticky-header rounded-md sticky top-6  px-6  ", {
          "ltr:ml-[72px] rtl:mr-[72px]": collapsed,
          "ltr:xl:ml-[300px] rtl:xl:mr-[300px]  ":
            !collapsed && sidebarType === "module",
          "ltr:xl:ml-[248px] rtl:xl:mr-[248px] ":
            !collapsed && sidebarType !== "module",
        })}
      >
        <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 rounded-md my-6 shadow-md border-b">
          <div className="flex justify-between items-center h-full">
            <VerticalHeader
              sidebarType={sidebarType}
              handleOpenSearch={handleOpenSearch}
            />
            <NavTools
              isDesktop={isDesktop}
              isMobile={isMobile}
              sidebarType={sidebarType}
            />
          </div>
        </div>
      </ClassicHeader>
    );
  }

  return (
    <ClassicHeader
      className={cn("", {
        "ltr:xl:ml-[300px] rtl:xl:mr-[300px]": !collapsed,
        "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,

        "sticky top-0": navbarType === "sticky",
      })}
    >
      {/* bg-[#242449] */}
      <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b ">
        <div className="flex justify-between items-center h-full">
          <VerticalHeader
            sidebarType={sidebarType}
            handleOpenSearch={handleOpenSearch}
          />
          <NavTools
            isDesktop={isDesktop}
            isMobile={isMobile}
            sidebarType={sidebarType}
          />
        </div>
      </div>
    </ClassicHeader>
  );
};

export default Header;
