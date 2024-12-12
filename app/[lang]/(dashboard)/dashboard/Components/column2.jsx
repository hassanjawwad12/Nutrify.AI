"use client";
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTheme } from "next-themes";
import CardImage from "@/public/images/social/card.png";
import Expand from "@/components/images/maximize.png";
import Image from "next/image";
import { monthNames, years, Trial } from "./trial";
import BeatLoader from "react-spinners/BeatLoader";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Dialog from "./Dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTableDataStore } from "@/store";
import toast from "react-hot-toast";
import { useAccessId } from "@/store";

const Column2 = ({ tabler1 }) => {
  const { theme } = useTheme();
  const [expandr1c2, setExpandedr1c2] = useState(false);
  const [expandr2c2, setExpandedr2c2] = useState(false);
  const [history, setHistory] = useState(false);
  const [month, setMonth] = useState(false);
  const [number, setNumber] = useState(8);
  const [loadings, setLoadings] = useState(false);
  const containerRef = useRef(null);
  const {handleCustomDataChange, fetchFormulaTrials, load} =useTableDataStore();
  const { token, id } = useAccessId();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const openDialog = (data) => {
    setIsDialogOpen(true);
    setDialogData(data);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };

  const handleMonthClick = () => {
    setMonth(true); // Set month to true on click
    setNumber(6);
  };

  const handleTrials = (data) => {
    toast.success(
      "Trials will be fetched shortly, however reminding you again any edited data will be over-written!"
    );
    fetchFormulaTrials(token, id, data);
    setLoadings(true);
    if (load === false) {
      setTimeout(() => {
        setLoadings(false);
      }, 2000);
    }
    setIsDialogOpen(false);
  };

  const backgroundStyle =
    theme === "light"
      ? { backgroundColor: "white" }
      : { backgroundImage: `url(${CardImage.src})` };

  //second column cards expansion
  const ExpansionColumn2Row1 = (e) => {
    if (expandr1c2 === true) {
      setExpandedr1c2(false);
    } else {
      setExpandedr1c2(true);
    }
  };

  const ExpansionColumn2Row2 = (e) => {
    if (expandr2c2 === true) {
      setExpandedr2c2(false);
    } else {
      setExpandedr2c2(true);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedIngredients = [...tabler1.common_ingredients];
    updatedIngredients[index][field] = Number(value);

    if (field === "temp_user_base_price") {
      const Value = Number(updatedIngredients[index].temp_user_base_price);
      if (Value <= 0) {
        toast.error("Price cannot be 0");
        return;
      }
    }

    if (field === "temp_user_up_bound") {
      const minValue = Number(updatedIngredients[index].temp_user_low_bound);
      const maxValue = value;

      // Ensure max value is not smaller than min value
      if (maxValue < minValue) {
        toast.error("Max percentage cannot be smaller than min percentage");
        return;
      }
    }

    if (field === "temp_user_low_bound") {
      const minValue = value;
      const maxValue = Number(updatedIngredients[index].temp_user_up_bound);

      // Ensure min value is not larger than max value
      if (minValue > maxValue) {
        toast.error("Min percentage cannot be larger than max percentage");
        return; // Exit the function to prevent updating the state
      }
    }

    let updatedObj = {
      ...tabler1,
      common_ingredients: [...updatedIngredients],
    };
    handleCustomDataChange(updatedObj);
  };

  return (
    <>
      <div className="text-2xl font-semibold dashboard mt-5 space-y-3 w-full">
        <Card
          className={` ${
            expandr1c2
              ? "md:h-[123vh] h-[110vh] md:w-[97%] w-[100%]"
              : expandr2c2
              ? "w-0 h-0 hidden"
              : "h-[501px] md:w-[97%] w-[100%] card-background"
          }`}
          style={{ ...backgroundStyle }}
        >
          <CardHeader
            className={`border-none h-[65px] py-2 pb-0 flex flex-row justify-between items-center ${
              theme === "light" ? "bg-[#E8EEFF]" : "table-background-dark"
            } text-center`}
            style={{
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
            }}
          >
            <div
              className={`table-head mt-1.5 w-25 mr-3 font-semibold text-sm  ${
                theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
              }`}
            >
              INGREDIENTS
            </div>
            <div
              className={`table-head ml-4 w-25 mr-3 font-semibold  ${
                theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
              }`}
            >
              COST/KG
            </div>
            <div
              className={`table-head w-25 mr-3 font-semibold ml-1  ${
                theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
              }`}
            >
              MIN %
            </div>
            <div
              className={`table-head w-25 mr-3 font-semibold  ${
                theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
              }`}
            >
              MAX %
            </div>
          </CardHeader>
          <CardContent className="p-1 md:p-5">
            <div className="overflow-y-auto max-h-[100vh]">
              {(expandr1c2
                ? tabler1?.common_ingredients
                : Array.isArray(tabler1?.common_ingredients)
                ? tabler1?.common_ingredients.slice(0, 9)
                : []
              ).map((itemsData, index) => {
                return (
                  <div
                    className="flex flex-row items-center justify-between w-full"
                    key={index}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              `table-body w-28 mr-3 truncate ${
                                theme === "light"
                                  ? "text-[#444444]"
                                  : "text-[#9D9BC9]"
                              }`
                            )}
                          >
                            {itemsData.name}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className=" capitalize">
                          {itemsData.name}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <input
                      className={`flex flex-col px-1 items-center justify-center text-center text-[12px] table-body font-normal w-20 mr-3 h-[27px] ${
                        theme === "light"
                          ? "text-[#1643BB] bg-white border border-[#7398FC] mb-2 "
                          : "text-[#7398FC] bg-[#1D1D3D] border border-[#7398FC] mb-2"
                      }`}
                      type="number"
                      key={index}
                      value={
                        itemsData.temp_user_base_price === null
                          ? "0"
                          : itemsData.temp_user_base_price
                      }
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "temp_user_base_price",
                          e.target.value
                        )
                      }
                    />
                    <input
                      className={`flex flex-col px-1 items-center justify-center text-[12px] text-center table-body font-normal w-20 mr-3 h-[27px] ${
                        theme === "light"
                          ? "text-[#1643BB] bg-white border border-[#7398FC] mb-2 "
                          : "text-[#7398FC] bg-[#1D1D3D] border border-[#7398FC] mb-2"
                      }`}
                      type="number"
                      key={index}
                      value={
                        itemsData.temp_user_low_bound === null
                          ? "0"
                          : itemsData.temp_user_low_bound
                      }
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "temp_user_low_bound",
                          e.target.value
                        )
                      }
                    />
                    <input
                      className={`flex flex-col px-1 items-center justify-center text-[12px] text-center table-body font-normal w-20 mr-3 h-[27px] ${
                        theme === "light"
                          ? "text-[#1643BB] bg-white border border-[#7398FC] mb-2 "
                          : "text-[#7398FC] bg-[#1D1D3D] border border-[#7398FC] mb-2"
                      }`}
                      type="number"
                      key={index}
                      value={
                        itemsData.temp_user_up_bound === null
                          ? "0"
                          : itemsData.temp_user_up_bound
                      }
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "temp_user_up_bound",
                          e.target.value
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-between flex-row items-end">
              <p className="dark:text-gray-300 text-zinc-600 text-sm ">
                {!expandr1c2 ? "Expand to see the full data" : null}
              </p>
              {theme === "light" ? (
                <Image
                  src="/light.png"
                  alt="Logo"
                  width={34}
                  height={34}
                  onClick={(e) => ExpansionColumn2Row1(e)}
                  className="flex justify-end items-end text-primary mt-5 cursor-pointer"
                />
              ) : (
                <Image
                  src={Expand}
                  alt="Logo"
                  onClick={(e) => ExpansionColumn2Row1(e)}
                  className="flex justify-end items-end text-primary h-8 w-8 mt-5 cursor-pointer"
                />
              )}
            </div>
          </CardContent>
        </Card>
        <Card
          className={` ${
            expandr1c2
              ? " w-0 h-0 hidden"
              : expandr2c2
              ? "md:h-[126vh] h-[120vh] md:w-[97%] w-[100%] mb-2"
              : "h-[501px] md:w-[97%] w-[100%] card-background"
          }`}
          style={{ ...backgroundStyle }}
        >
          <CardHeader
            className={`border-none  pb-0 flex flex-col items-start justify-start gap-0 text-sm bg-[#E8EEFF] dark:bg-[#1D1D3D]   ${
              month ? "h-[140px]" : "h-[85px]"
            } text-center`}
            style={{
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
            }}
          >
            <div className="flex flex-row items-start justify-start gap-0 dark:bg-[#24244B] bg-transparent w-full">
              <button
                className={` py-1 w-24 custom-radius ${
                  history
                    ? "  text-[#1643BB] bg-white dark:text-[#7398FC] dark:bg-transparent"
                    : "bg-[#1643BB] text-white dark:text-black dark:bg-[#7398FC]"
                }`}
                onClick={() => {
                  setHistory(false);
                  setNumber(8);
                  setMonth(false);
                }}
              >
                Trials
              </button>
              <button
                className={` py-1 w-24 custom-radius ${
                  history
                    ? "bg-[#1643BB] text-white dark:text-black dark:bg-[#7398FC]"
                    : "text-[#1643BB] bg-white dark:text-[#7398FC] dark:bg-transparent"
                }`}
                onClick={() => setHistory(true)}
              >
                Historical
              </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full overflow-x-auto gap-1 ">
              {!history ? (
                <div className="flex flex-row w-full">
                  <IoIosArrowBack
                    onClick={scrollLeft}
                    className="text-2xl text-blue-500 cursor-pointer z-10"
                  />
                  <div className="flex flex-row z-0 overflow-x-hidden justify-center items-center bg19:w-[500px] bg18:w-[450px] bg17:w-[420px] customS:w-[340px] xxl:w-[370px] xl:w-[310px] lg:w-[310px] md:w-[310px] w-[333px]">
                    <div
                      className="px-1 flex overflow-x-hidden overflow-y-hidden gap-1 w-full "
                      ref={containerRef}
                    >
                      {tabler1?.formula_trials &&
                        Array.isArray(tabler1.formula_trials) &&
                        tabler1.formula_trials
                          .slice()
                          .reverse()
                          .map((item, index) => (
                            <button
                              onClick={() => openDialog(item.id)}
                              key={index}
                              className="w-32 flex justify-center px-4 py-1.5 rounded-md text-xs leading-none text-gray-600 font-inter border border-gray-600 font-extrabold dark:text-[#9D9BC9] dark:border-[#9D9BC9]"
                            >
                              <span className="mr-2">Trial</span>
                              <span>{item.id}</span>
                            </button>
                          ))}
                    </div>
                  </div>
                  <IoIosArrowForward
                    onClick={scrollRight}
                    className="text-2xl text-blue-500 cursor-pointer z-10"
                  />
                  <Dialog
                    isOpen={isDialogOpen}
                    onClose={closeDialog}
                    handleTrials={handleTrials}
                    data={dialogData}
                  />
                </div>
              ) : (
                <>
                  <div className="flex overflow-x-auto gap-1 md:w-[400px] w-[330px]">
                    {years.map((item) => (
                      <button
                        onClick={handleMonthClick}
                        key={item}
                        className="custom-btn-new  font-extrabold dark:text-[#9D9BC9] !important dark:border-[#9D9BC9] !important"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  {month && (
                    <>
                      <div className="flex overflow-x-auto gap-1 md:w-[400px] w-[330px]">
                        {monthNames.map((item) => (
                          <button
                            className="w-full py-1 text-black text-md dark:text-[#9D9BC9] !important "
                            key={item}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                      <div className="flex overflow-x-auto gap-1 md:w-[400px] w-[330px]">
                        {Trial.map((item) => (
                          <button
                            onClick={handleMonthClick}
                            key={item}
                            className="custom-btn-new !important font-extrabold dark:text-[#9D9BC9] !important dark:border-[#9D9BC9] !important"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-1 md:px-3 md:py-1 mb-4">
            <div className="overflow-y-auto max-h-[100vh]">
              <div className="flex flex-row text-md items-center w-[92%] ">
                <div
                  className={`table-head w-1/4 font-semibold text-xs  ${
                    theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
                  }`}
                >
                  INGREDIENTS
                </div>
                <div
                  className={`table-head ml-2 w-[25%] text-xs font-semibold  ${
                    theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
                  }`}
                >
                  QUANTITY/KG
                </div>
                <div
                  className={`table-head ml-12 w-[30%]   font-semibold   ${
                    theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
                  }`}
                >
                  <Image src="/col3.png" width={30} height={30} />
                </div>
                <div
                  className={`table-head mr-3 font-semibold  ${
                    theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
                  }`}
                >
                  <Image src="/col2.png" width={30} height={30} />
                </div>
              </div>
              {loadings ? (
                <div className="w-[390px] h-[35vh] flex flex-col items-center justify-center">
                  <BeatLoader size={20} color="#7398FC" />
                </div>
              ) : (
                <>
                  {(expandr2c2
                    ? tabler1.formula_trial_results
                    : Array.isArray(tabler1.formula_trial_results)
                    ? tabler1.formula_trial_results.slice(0, number)
                    : []
                  ).map((itemsData, index) => {
                    return (
                      <div
                        className="flex flex-row items-center justify-between"
                        key={index}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={cn(
                                  `table-body w-25 mr-3 truncate  ${
                                    theme === "light"
                                      ? "text-[#444444]"
                                      : "text-[#9D9BC9]"
                                  }`
                                )}
                              >
                                {itemsData?.common_ingredient?.name}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              className=" capitalize"
                            >
                              {itemsData?.common_ingredient?.name}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <input
                          className={`table-body col-2 w-25 mr-3 flex flex-col items-center justify-center ${
                            theme === "light"
                              ? "text-[#444444] bg-white border border-[#7398FC]"
                              : "text-[#9D9BC9]"
                          }`}
                          type="text"
                          value={
                            itemsData?.common_ingredient
                              ?.temp_user_base_price || "0"
                          }
                        />
                        <input
                          className={`table-body col-2 w-25 mr-3 flex flex-col items-center justify-center ${
                            theme === "light"
                              ? "text-[#444444] bg-white border border-[#7398FC]"
                              : "text-[#9D9BC9]"
                          }`}
                          type="text"
                          value={
                            itemsData?.common_ingredient?.temp_user_low_bound ||
                            "0"
                          }
                        />
                        <input
                          className={`table-body col-2 w-25 mr-3 flex flex-col items-center justify-center ${
                            theme === "light"
                              ? "text-[#444444] bg-white border border-[#7398FC]"
                              : "text-[#9D9BC9]"
                          }`}
                          type="text"
                          value={
                            itemsData?.common_ingredient?.temp_user_up_bound ||
                            "0"
                          }
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="w-full flex justify-between flex-row items-end mt-1 ">
              <p className="dark:text-gray-300 text-zinc-600 text-sm">
                {!expandr2c2 ? "Expand to see the full data" : null}
              </p>
              {theme === "light" ? (
                <Image
                  src="/light.png"
                  alt="Logo"
                  width={34}
                  height={34}
                  onClick={(e) => ExpansionColumn2Row2(e)}
                  className="flex justify-end items-end text-primary  cursor-pointer"
                />
              ) : (
                <Image
                  src={Expand}
                  alt="Logo"
                  onClick={(e) => ExpansionColumn2Row2(e)}
                  className="flex justify-end items-end text-primary h-8 w-8  cursor-pointer"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Column2;
