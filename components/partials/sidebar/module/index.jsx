import React, { useEffect, useState } from "react";
import { cn, isLocationMatch, getDynamicPath, translate } from "@/lib/utils";
import { menusConfig } from "@/config/menus";
import SingleIconMenu from "./single-icon-menu";
import { useRouter, usePathname } from "next/navigation";
import { useSidebar, useThemeStore } from "@/store";
import MenuItem from "./menu-item";
import NestedMenus from "./nested-menus";
import Image from "next/image";
import Link from "next/link";
import FooterMenu from "./footer-menu";
// import { SiteLogo } from "@/components/svg";
import Logo from "../../../../components/images/Logo.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import LogoutFooter from "./logout-footer";
import { useMediaQuery } from "@/hooks/use-media-query";
import MenuOverlayPortal from "./MenuOverlayPortal";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ModuleSidebar = ({ trans }) => {
  const menus = menusConfig?.sidebarNav?.modern || [];
  const { subMenu, setSubmenu, collapsed, setCollapsed, sidebarBg } =
    useSidebar();
  const { isRtl } = useThemeStore();
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentSubMenu, setCurrentSubMenu] = useState([]);
  const [nestedIndex, setNestedIndex] = useState(null);
  const [multiNestedIndex, setMultiNestedIndex] = useState(null);
  // mobile menu overlay
  const [menuOverlay, setMenuOverlay] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isMobile = useMediaQuery("(min-width: 768px)");

  // location

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);

  const toggleSubMenu = (index) => {
    setActiveIndex(index);
    if (menus[index].child) {
      setCurrentSubMenu(menus[index].child);
      setSubmenu(false);
      setCollapsed(false);
      if (!isDesktop) {
        setMenuOverlay(true);
      }
    } else {
      setSubmenu(true);
      setCollapsed(true);

      if (!isDesktop) {
        // when location match need to close the sub menu
        if (isLocationMatch(menus[index].href, locationName)) {
          setSubmenu(false);
        }
      }
    }
  };
  // for second level  menu
  const toggleNested = (subIndex) => {
    if (nestedIndex === subIndex) {
      setNestedIndex(null);
    } else {
      setNestedIndex(subIndex);
    }
  };

  // for third level menu
  const toggleMultiNested = (index) => {
    if (multiNestedIndex === index) {
      setMultiNestedIndex(null);
    } else {
      setMultiNestedIndex(index);
    }
  };

  function setActiveMenu(menuIndex, childMenu) {
    setActiveIndex(menuIndex);
    setCurrentSubMenu(childMenu);
    setSubmenu(false);
    setCollapsed(false);
  }
  function setActiveNestedMenu(menuIndex, nestedMenuIndex, childMenu) {
    setActiveIndex(menuIndex);
    setNestedIndex(nestedMenuIndex);
    setCurrentSubMenu(childMenu);
    setSubmenu(false);
    setCollapsed(false);
  }
  //
  const getMenuTitle = () => {
    if (activeIndex !== null) {
      return menus[activeIndex].title;
    }
    return "";
  };

  useEffect(() => {
    let isMenuMatched = false;
    menus.forEach((item, i) => {
      if (isLocationMatch(item.href, locationName)) {
        isMenuMatched = true;
        setSubmenu(true);
        const widthCollapse = window.innerWidth
        if(widthCollapse >= 1280){
          setCollapsed(true);
        }else {
          setCollapsed(false);
        }
        setMenuOverlay(false);
      }

      item?.child?.forEach((childItem, j) => {
        if (isLocationMatch(childItem.href, locationName)) {
          setActiveMenu(i, item.child);
          setMenuOverlay(false);
          isMenuMatched = true;
        }

        if (childItem.nested) {
          childItem.nested.forEach((nestedItem) => {
            if (isLocationMatch(nestedItem.href, locationName)) {
              setActiveNestedMenu(i, j, item.child);
              setMenuOverlay(false);
              isMenuMatched = true;
            }
            if (nestedItem.child) {
              nestedItem.child.forEach((multiItem, k) => {
                if (isLocationMatch(multiItem.href, locationName)) {
                  setActiveNestedMenu(i, j, item.child);
                  setMenuOverlay(false);
                  isMenuMatched = true;
                }
              });
            }
          });
        }
      });
    });
    if (!isMenuMatched) {
      setSubmenu(false);
    }
    if (!isDesktop) {
      setSubmenu(true);
    }
  }, [locationName, isDesktop]);

  return (
    <>
      <div className="main-sidebar  pointer-events-none fixed start-0 top-0 z-[60] flex h-full xl:z-10 print:hidden">
        <div
          className={cn(
            "border-default-200  dark:border-default-300 pointer-events-auto relative z-20 flex h-full w-[72px] flex-col border-r border-dashed    bg-card transition-all duration-300",
            {
              "ltr:-translate-x-full rtl:translate-x-full ltr:xl:translate-x-0  rtl:xl:translate-x-0":
                !collapsed && subMenu,
              "translate-x-0": collapsed,
            }
          )}
        >
          <div className=" pt-4 ">
            <Link href="/dashboard">
              {/* <SiteLogo className=" mx-auto text-primary h-8 w-8" /> */}
              <Image
                src={Logo}
                alt="Logo"
                className=" mx-auto text-primary h-12 w-12"
              />
            </Link>
          </div>
          {/* end logo */}

          <ScrollArea className=" pt-6 grow ">
            {menus.map((item, i) => (
              <div
                key={i}
                onClick={() => toggleSubMenu(i)}
                className=" mb-3 last:mb-0"
              >
                <SingleIconMenu
                  index={i}
                  activeIndex={activeIndex}
                  item={item}
                  locationName={locationName}
                  trans={trans}
                />
              </div>
            ))}
          </ScrollArea>
          <FooterMenu />
        </div>
        {/* end small menu */}

        <div
          className={cn(
            "border-default-200 pointer-events-auto relative z-10 flex flex-col h-full w-[228px] border-r  bg-card   transition-all duration-300",
            {
              "rtl:translate-x-[calc(100%_+_72px)] translate-x-[calc(-100%_-_72px)]":
                collapsed || subMenu,
            }
          )}
        >
          {sidebarBg !== "none" && (
            <div
              className=" absolute left-0 top-0   z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
              style={{ backgroundImage: `url(${sidebarBg})` }}
            ></div>
          )}
          <h2 className="text-lg  bg-transparent   z-50   font-semibold  flex gap-4 items-center   text-default-700 sticky top-0 py-4  px-4   capitalize ">
            <span className=" block ">{translate(getMenuTitle(), trans)}</span>
            {!isDesktop && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setCollapsed(true);
                  setSubmenu(true);
                  setMenuOverlay(false);
                }}
                className="rounded-full h-8 w-8"
              >
                <ChevronLeft className="w-5 h-5  " />
              </Button>
            )}
          </h2>
          <ScrollArea className="h-[calc(100%-40px)]  grow ">
            <div className="px-4 " dir={isRtl ? "rtl" : "ltr"}>
              <ul>
                {currentSubMenu?.map((childItem, j) => (
                  <li key={j} className="mb-1.5 last:mb-0">
                    <MenuItem
                      trans={trans}
                      childItem={childItem}
                      toggleNested={toggleNested}
                      index={j}
                      nestedIndex={nestedIndex}
                      locationName={locationName}
                    />
                    <NestedMenus
                      index={j}
                      nestedIndex={nestedIndex}
                      nestedMenus={childItem.nested}
                      locationName={locationName}
                      toggleMulti={toggleMultiNested}
                      multiIndex={multiNestedIndex}
                      trans={trans}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
          <LogoutFooter />
        </div>
        {/* end main panel */}
      </div>
      {!isDesktop && (
        <MenuOverlayPortal
          isOpen={menuOverlay || collapsed}
          onClose={() => {
            setMenuOverlay(false);
            setSubmenu(true);
            setCollapsed(false);
          }}
        />
      )}
    </>
  );
};

export default ModuleSidebar;
