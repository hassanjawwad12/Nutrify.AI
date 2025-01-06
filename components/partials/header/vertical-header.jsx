import React, { useEffect } from "react";
import { useSidebar, useThemeStore } from "@/store";
import { cn } from "@/lib/utils";
import Logo from "@/components/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTableDataStore } from "@/store";
import { useTheme } from "next-themes";
import {
  handleOpenNav,
  handleCloseNav,
} from "../../../app/[lang]/(dashboard)/dashboard/Helper/helper";
import { BeatLoader } from "react-spinners";
import { useResultStore } from "@/store";
import { useAccessId } from "@/store";

const MenuBar = ({ collapsed, setCollapsed }) => {
  return (
    <button
      className="relative group  disabled:cursor-not-allowed opacity-50"
      onClick={() => setCollapsed(!collapsed)}
    >
      <div>
        <div
          className={cn(
            "flex flex-col justify-between w-[20px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden",
            {
              "-translate-x-1.5 rotate-180": collapsed,
            }
          )}
        >
          <div
            className={cn(
              "bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150",
              {
                "rotate-[42deg] w-[11px]": collapsed,
                "w-7": !collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-card-foreground h-[2px] w-7 rounded transform transition-all duration-300",
              {
                "translate-x-10": collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150",
              {
                "-rotate-[43deg] w-[11px]": collapsed,
                "w-7": !collapsed,
              }
            )}
          ></div>
        </div>
      </div>
    </button>
  );
};

const VerticalHeader = ({ handleOpenSearch }) => {
  const { collapsed, setCollapsed, subMenu, sidebarType } = useSidebar();
  const { layout } = useThemeStore();
  const { fetchData , handleEmptyData} = useTableDataStore();

  const href = window.location.href;
  const URL = href.split("/")[4];

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isMobile = useMediaQuery("(min-width: 768px)");
  let LogoContent = null;
  const { id, token, label,date } = useAccessId();
  let menuBarContent = null;
  let searchButtonContent = null;
  const { theme } = useTheme();
  const { resulttable, fetchResultData, loading } = useResultStore();
  const {
    tabler1,
  } = useTableDataStore();

  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
    handleEmptyData({})

      fetchData(storedToken, id);
    } else {
      window.location.assign("/auth");
      setToken(null);
    }
  }, [token, id]);

  const fetchUpdatedData = (updatedID) => {
    setId(updatedID);
    handleCloseNav();
    fetchResultData(token, id, "noData");
  };

  const MainLogo = (
    <Link href="/dashboard" className=" text-primary ">
      <Image src={Logo} alt="Logo" className="h-7 w-7" />
    </Link>
  );

  //this runs after the run button is clicked for the getting the results
  const fetchResults = (token, objectToSend, str) => {
    fetchResultData(token, objectToSend, str);
  };

  const TrialsComponent = () => {
    const array1 = tabler1.common_ingredients;
    const array2 = tabler1.common_nutrients;

    const objectToSend = {
      user_formulas: tabler1.user_formulas,
      common_ingredients: array1,
      common_nutrients: array2,
     
    };
    fetchResults(token, objectToSend, "fetchData");
  };

  const SearchButton = (
    <>
      {URL === "dashboard" ? (
        <div className="flex justify-center items-center">
          <button
            className={` rounded-md py-2 mr-2 px-4 ${
              theme === "light" ? "bg-[#1643BB] text-white" : "bg-[#37375E] "
            }`}
            onClick={handleOpenNav}
            id="openNav"
          >
            ☰
          </button>

          <button
            onClick={TrialsComponent}
            disabled={loading}
            className=" rounded-md py-2  mr-2 px-4 bg-[#1643BB] dark:bg-[#37375E]"
          >
            {loading ? (
              <BeatLoader color="#7398FC" size={6} />
            ) : (
              <Image src="/play.png" width={20} height={20} />
            )}
          </button>
          <p className="dark:text-gray-200 text-zinc-800 font-semibold text-sm">
            The selected item is {label} <span className="text-xl font-bold">-</span> {date} 
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
  if (layout === "semibox" && !isDesktop) {
    LogoContent = MainLogo;
  }
  if (
    layout === "vertical" &&
    !isDesktop &&
    isMobile &&
    sidebarType === "module"
  ) {
    LogoContent = MainLogo;
  }
  if (layout === "vertical" && !isDesktop && sidebarType !== "module") {
    LogoContent = MainLogo;
  }

  // menu bar content condition
  if (isDesktop && sidebarType !== "module") {
    menuBarContent = (
      <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
    );
  }
  if (sidebarType === "module") {
    menuBarContent = (
      <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
    );
  }
  if (sidebarType === "classic") {
    menuBarContent = null;
  }
  if (subMenu && isDesktop) {
    menuBarContent = null;
  }
  if (sidebarType === "module" && isMobile) {
    searchButtonContent = SearchButton;
  }
  if (sidebarType === "classic" || sidebarType === "popover") {
    searchButtonContent = SearchButton;
  }
  return (
    <>
      <div className="flex items-center md:gap-6 gap-3">
        {LogoContent}
        {menuBarContent}
        {searchButtonContent}
      </div>
    </>
  );
};

export default VerticalHeader;
