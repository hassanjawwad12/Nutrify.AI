"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTheme } from "next-themes";
import CardImage from "@/public/images/social/card.png";
import Expand from "@/components/images/maximize.png";
import Image from "next/image";
import Loader from "@/components/Loader";
import { useResultStore } from "@/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useTableDataStore } from "@/store";

const Column1 = ({ tabler1, resulttable }) => {
  const [expandr1c1, setExpandedr1c1] = useState(false);
  const [expandr2c1, setExpandedr2c1] = useState(false);
  const { theme } = useTheme();
  const { loading } = useResultStore();
  const { handleCustomDataChange } = useTableDataStore();

  const backgroundStyle =
    theme === "light"
      ? { backgroundColor: "white" }
      : { backgroundImage: `url(${CardImage.src})` };

  const ExpansionColumn1Row1 = (e) => {
    if (expandr1c1 === true) {
      setExpandedr1c1(false);
    } else {
      setExpandedr1c1(true);
    }
  };

  const ExpansionColumn1Row2 = (e) => {
    if (expandr2c1 === true) {
      setExpandedr2c1(false);
    } else {
      setExpandedr2c1(true);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedNutrients = [...tabler1.common_nutrients];
    updatedNutrients[index][field] = Number(value);

    if (field === "temp_user_max_percentage") {
      const minValue = Number(updatedNutrients[index].temp_user_min_percentage);
      const maxValue = value;

      // Ensure max value is not smaller than min value
      if (maxValue < minValue) {
        toast.error("Max percentage cannot be smaller than min percentage");
        return;
      }
    }

    if (field === "temp_user_min_percentage") {
      const minValue = value;
      const maxValue = Number(updatedNutrients[index].temp_user_max_percentage);

      // Ensure min value is not larger than max value
      if (minValue > maxValue) {
        toast.error("Min percentage cannot be larger than max percentage");
        return; // Exit the function to prevent updating the state
      }
    }

    let updatedObj = {
      ...tabler1,
      common_nutrients: [...updatedNutrients],
    };
    handleCustomDataChange(updatedObj);
  };

  return (
    <div className="text-xl font-semibold dashboard mt-5 space-y-3 w-full">
      <Card
        className={` ${
          expandr1c1
            ? "md:h-[123vh] h-[116vh] md:w-[97%] w-[100%] card-background"
            : expandr2c1
            ? "w-0 h-0 hidden"
            : "h-[501px] lg:w-[97%] md:w-[100%] w-[100%] card-background"
        }`}
        style={{ ...backgroundStyle }}
      >
        <CardHeader
          className={`border-none py-2 h-[65px]  flex flex-row justify-between items-center text-sm ${
            theme === "light" ? "bg-[#E8EEFF]" : "table-background-dark"
          } text-center`}
          style={{
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        >
          <div
            className={`table-head mt-1.5 md:w-33 w-24 font-semibold ${
              theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
            }`}
          >
            NUTRIENTS
          </div>
          <div className="flex flex-row w-[45%] gap-8 ">
            <div
              className={`table-head w-33 font-semibold ml-3 ${
                theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
              }`}
            >
              MIN %
            </div>
            <div
              className={`table-head w-33 font-semibold  ${
                theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
              }`}
            >
              MAX %
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-1 md:p-5 ">
          <div className="overflow-y-auto max-h-[100vh]">
            {(expandr1c1
              ? tabler1?.common_nutrients
              : Array.isArray(tabler1?.common_nutrients)
              ? tabler1?.common_nutrients.slice(0, 9)
              : []
            ).map((itemsData, index) => (
              <div className="flex  flex-row items-center justify-between w-full" key={index}>
                <TooltipProvider className="w-[55%]">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "table-body w-full truncate mr-3 uppercase text-[#444444] dark:text-[#9D9BC9]"
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
                <div className="flex flex-row justify-between w-[45%] pr-2">
                  <input
                    className={`flex flex-col px-1 items-center text-center justify-center text-[12px] table-body font-normal w-20 mr-3 h-[27px] ${
                      theme === "light"
                        ? "text-[#1643BB] bg-white border border-[#7398FC] mb-2 "
                        : "text-[#7398FC] bg-[#1D1D3D] border border-[#7398FC] mb-2"
                    }`}
                    type="number"
                    name="temp_user_min_percentage"
                    value={itemsData.temp_user_min_percentage}
                    key={index}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "temp_user_min_percentage",
                        e.target.value
                      )
                    }
                  />
                  <input
                    className={`flex flex-col px-1 items-center text-center justify-center text-[12px] table-body font-normal w-20 mr-3 h-[27px] ${
                      theme === "light"
                        ? "text-[#1643BB] bg-white border border-[#7398FC] mb-2 "
                        : "text-[#7398FC] bg-[#1D1D3D] border border-[#7398FC] mb-2"
                    }`}
                    name="temp_user_max_percentage"
                    type="number"
                    key={index}
                    value={itemsData.temp_user_max_percentage}
                    onChange={(event) =>
                      handleInputChange(
                        index,
                        "temp_user_max_percentage",
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-between flex-row items-end">
            <p className="dark:text-gray-300 text-zinc-600 text-sm">
              {!expandr1c1 ? "Expand to see the full data" : null}
            </p>
            {theme === "light" ? (
              <Image
                src="/light.png"
                alt="Logo"
                width={34}
                height={34}
                onClick={(e) => ExpansionColumn1Row1(e)}
                className="flex justify-end items-end text-primary mt-5 cursor-pointer"
              />
            ) : (
              <Image
                src={Expand}
                alt="Logo"
                onClick={(e) => ExpansionColumn1Row1(e)}
                className="flex justify-end items-end text-primary h-8 w-8 mt-5 cursor-pointer"
              />
            )}
          </div>
        </CardContent>
      </Card>
      <Card
        className={` ${
          expandr1c1
            ? " w-0 h-0 hidden"
            : expandr2c1
            ? "md:h-[123vh] h-[110vh] md:w-[97%] w-[100%] card-background"
            : "h-[501px] lg:w-[97%] md:w-[100%]  card-background"
        }`}
        style={{ ...backgroundStyle }}
      >
        <CardHeader
          className={`border-none h-[70px] py-2 pb-0 flex flex-row justify-between items-center ${
            theme === "light" ? "bg-[#E8EEFF]" : "table-background-dark"
          } text-center`}
          style={{
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        >
          <div
            className={`table-head w-25 mr-3 font-bold text-xl ml-[-8px] ${
              theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
            }`}
          >
            RESULTS
          </div>
          {resulttable?.formula_cost ? 
            <div className="flex flex-col gap-1 items-start justify-center pr-5 pb-2">
              <p className="text-[16px] font-semibold text-[#1643BB] dark:text-[#7398FC]">
                Formula cost:{" "}
                <span className="text-[16px] underline dark:text-[#89CFF0] ">
                  {resulttable.formula_cost}
                </span>
              </p>
              <p className="text-[16px] font-semibold text-[#1643BB] dark:text-[#7398FC]">
                Status:{" "}
                <span className="text-[16px] underline dark:text-[#89CFF0] ">
                  {resulttable.formula_status}
                </span>
              </p>
            </div>
            :
            null
          }
        </CardHeader>
        <CardContent className="p-1 md:px-5 md:py-2">
          <div className="overflow-y-auto max-h-[100vh] w-full">
            <div className="flex flex-row  text-md items-center w-[92%] ">
              <div
                className={`table-head w-1/4 font-semibold text-xs  ${
                  theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
                }`}
              >
                INGREDIENTS
              </div>
              <div
                className={`table-head w-[25%]  text-xs font-semibold ml-6  ${
                  theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
                }`}
              >
                QUANTITY/KG
              </div>
              <div
                className={`table-head w-[30%] ml-10 font-semibold   ${
                  theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
                }`}
              >
                <Image src="/col3.png" width={30} height={30} />
              </div>
              <div
                className={`table-head mr-2  font-semibold  ${
                  theme === "light" ? "text-[#1643BB]" : "text-[#7398FC]"
                }`}
              >
                <Image src="/col2.png" width={30} height={30} />
              </div>
            </div>

            {resulttable.length < 1 ? (
              <>
                <div className="w-full h-full flex flex-col items-center justify-center text-3xl text-gray-200 font-semibold">
                  {loading ? <Loader /> : <p className="mt-4"> No results </p>}
                </div>
              </>
            ) : (
              <>
                {(expandr2c1
                  ? resulttable?.common_ingredient
                  : Array.isArray(resulttable?.common_ingredient)
                  ? resulttable?.common_ingredient.slice(0, 8)
                  : []
                ).map((itemsData, index) => (
                  <div className="flex flex-row items-center justify-between" key={index}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "table-body w-40 truncate mr-3 uppercase text-[#444444] dark:text-[#9D9BC9]"
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
                      className={`table-body col-2 w-25 mr-3 flex flex-col items-center justify-center ${
                        theme === "light"
                          ? "text-[#444444] bg-white border border-[#7398FC]"
                          : "text-[#9D9BC9]"
                      }`}
                      value={itemsData.value}
                    />
                    <input
                      className={`table-body col-2 w-25 mr-3 flex flex-col items-center justify-center ${
                        theme === "light"
                          ? "text-[#444444] bg-white border border-[#7398FC]"
                          : "text-[#9D9BC9]"
                      }`}
                      type="text"
                      value={itemsData.bag_value}
                    />
                    <input
                      className={`table-body col-2 w-25 mr-3 flex flex-col items-center justify-center ${
                        theme === "light"
                          ? "text-[#444444] bg-white border border-[#7398FC]"
                          : "text-[#9D9BC9]"
                      }`}
                      type="text"
                      value={itemsData.ton_value}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="w-full flex justify-between flex-row items-end">
            <p className="dark:text-gray-300 text-zinc-600 text-sm">
              {resulttable.length < 1 ? (
                <></>
              ) : (
                <> {!expandr2c1 ? "Expand to see the full data" : null}</>
              )}
            </p>
            {theme === "light" ? (
              <Image
                src="/light.png"
                alt="Logo"
                width={34}
                height={34}
                onClick={(e) => ExpansionColumn1Row2(e)}
                className="flex justify-end items-end text-primary cursor-pointer"
              />
            ) : (
              <Image
                src={Expand}
                alt="Logo"
                onClick={(e) => ExpansionColumn1Row2(e)}
                className="flex justify-end items-end text-primary h-8 w-8 cursor-pointer"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Column1;
