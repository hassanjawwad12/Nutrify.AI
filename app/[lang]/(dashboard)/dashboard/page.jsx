"use client";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useTheme } from "next-themes";
import { IoClose } from "react-icons/io5";
import { useTableDataStore } from "@/store";
import { useSidebarDataStore } from "@/store";
import { useResultStore } from "@/store";
import { handleOpenNav, handleCloseNav } from "./Helper/helper";
import Column1 from "./Components/column1";
import Column2 from "./Components/column2";
import Column3 from "./Components/column3";
import Image from "next/image";
import LayoutLoader from "@/components/layout-loader";
import { BeatLoader } from "react-spinners";
import { useAccessId } from "@/store";
import "./styles.css";

const page = () => {
  const { theme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 768);
  const { id, token, useAccessToken } = useAccessId();
  const {
    tabler1,
    nutrientdata1,
    nutrientdata2,
    ingredientdata1,
    ingredientdata2,
    labelNutrient,
    labelIngredient,
  } = useTableDataStore();
  const { navData, fetchSidebarData } = useSidebarDataStore();
  const { resulttable, fetchResultData, loading } = useResultStore();
  const [clickedItem, setClickedItem] = useState(null);
  const [currentItem, setCurrentItem] = useState();
  const [itemDate, setItemDate] = useState(null);
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchSidebarData(storedToken);
    } else {
      window.location.assign("/auth");
      setToken(null);
    }
  }, []);

  useLayoutEffect(() => {
    let title = "";
    let date = "";
    if (navData.length !== 0) {
      const navTitle = navData[0].label;
      const Dates = navData[0].date;

      setCurrentItem(navTitle);
      setItemDate(Dates);
      title = navTitle;
      date = Dates;
    }
    useAccessToken(storedToken, id, title, date);
  }, [navData]);

  //getting the data for the row 1 table
  const fetchUpdatedData = (updatedID) => {
    handleCloseNav();
    fetchResultData(token, id, "noData");
    const navLabel = navData.find((item) => item.id === updatedID);
    useAccessToken(storedToken, updatedID, navLabel.label, navLabel.date);
  };

  //this runs after the run button is clicked for the getting the results
  const fetchResults = (token, objectToSend, str) => {
    fetchResultData(token, objectToSend, str);
  };

  const TrialsComponent = () => {
    const array1 = tabler1.common_nutrients;
    const array2 = tabler1.common_ingredients;
    const objectToSend = {
      user_formulas: tabler1.user_formulas,
      common_ingredients: array2,
      common_nutrients: array1,
    };
    fetchResults(token, objectToSend, "fetchData");
  };

  //sidebar expansion logic goes here for laptop and mobile screens
  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {Object.keys(tabler1).length === 0 ? (
        <LayoutLoader />
      ) : (
        <>
          <div className="flex  items-center mt-4 md:hidden ">
            <button
              className="rounded-md py-2 mr-2 px-4 bg-[#1643BB] text-white dark:bg-[#37375E]"
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
            {currentItem && (
              <p className="text-gray-200 font-semibold text-sm">
                The selected item is {currentItem} {"  "}{" "}
                <span className="text-xl font-bold">-</span>
                {"  "}
                {itemDate}
              </p>
            )}
          </div>
          <div
            className=" w3-sidebar w-[80px] border border-radius-[20px] w3-bar-block w3-card w3-animate-left bg-white dark:bg-[#1F1F45] mt-5"
            style={{ display: "none" }}
            id="mySidebar"
          >
            <button
              onClick={handleCloseNav}
              className={`w3-button w3-bar-item self-center 	 ${
                theme === "light"
                  ? "bg-white hover:text-white hover:bg-[#1643BB] text-[#444444]"
                  : "text-[#9D9BC9] hover:bg-[#37375E] hover:text-[#7398FC]"
              } `}
            >
              <IoClose className="text-xl self-center ml-3" />
            </button>
            {Array.isArray(navData) &&
              navData.map((item) => (
                <div
                  key={item.user_code}
                  className="relative inline-block w-full"
                >
                  <button
                    className={`w3-button tablink align-center w3-bar-item dark:bg-[#1D1D3D]  dark:hover:bg-[#37375E] dark:hover:text-[#7398FC] bg-white hover:text-white hover:bg-[#1643BB]  ${
                      clickedItem === item.user_code
                        ? " text-purple-700 dark:text-yellow-600 dark:bg-gray-300 font-extrabold"
                        : "dark:text-[#9D9BC9] text-[#444444]"
                    } `}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      fetchUpdatedData(item.id);
                      setClickedItem(item.user_code);
                      setCurrentItem(item.label);
                    }}
                  >
                    {item.user_code}
                  </button>
                  {hoveredItem === item && (
                    <div className="absolute z-10 py-3 px-3 w-16 bg-gray-800 text-white text-xs rounded top-full mt-1 ml-2">
                      {item.label.toLowerCase()}
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div
            id="main"
            className="flex lg:flex-row md:flex-wrap flex-col w-full h-full items-center justify-center px-1"
          >
            <div className="lg:w-[60%] md:w-[100%] w-[100%] flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-2 px-1">
              <div className="md:w-[50%] w-full">
                <Column1 tabler1={tabler1} resulttable={resulttable} />
              </div>
              <div className="md:w-[50%] w-full">
                <Column2 tabler1={tabler1} />
              </div>
            </div>
            <div className="lg:w-[40%] md:w-[100%] w-[100%]">
              <Column3
                nutrientdata1={nutrientdata1}
                nutrientdata2={nutrientdata2}
                ingredientdata1={ingredientdata1}
                ingredientdata2={ingredientdata2}
                labelNutrient={labelNutrient}
                labelIngredient={labelIngredient}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default page;
