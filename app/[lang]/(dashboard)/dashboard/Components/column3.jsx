"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ChartWithDataLabels from "./line-with-datalabels";
import ChartWithPadding from "./linechart-with-padding";
import { Button } from "@/components/ui/button";
const Column3 = ({
  nutrientdata1,
  nutrientdata2,
  ingredientdata1,
  ingredientdata2,
  labelNutrient,
  labelIngredient,
}) => {
  const [nutrientInfo, setNutrientInfo] = useState(true);
  const [buttonStates, setButtonStates] = useState({
    button1: true,
    button2: false,
    button3: false,
  });

  const handleButtonClick = (buttonName) => {
    setButtonStates((prevStates) => ({
      [buttonName]: !prevStates[buttonName],
      button1: buttonName === "button1" ? !prevStates.button1 : false,
      button2: buttonName === "button2" ? !prevStates.button2 : false,
      button3: buttonName === "button3" ? !prevStates.button3 : false,
    }));
  };

  return (
    <div className="text-2xl font-semibold dashboard mt-5  md:w-[100%] w-[100%] mr-10 md:ml-0 ml-[-4px]  space-y-3">
      <Card className="card-data-40 h-[501px] md:w-[100%] w-[100%]">
        <CardHeader className="flex flex-row justify-start items-center">
          <Button
            className={`mt-[5px] ${
              nutrientInfo
                ? "bg-[#1643BB] text-white dark:text-[#7398FC] dark:bg-[#37375E]"
                : "text-[#1643BB] bg-white dark:text-[#7398FC] dark:bg-transparent"
            }`}
            onClick={(e) => setNutrientInfo(true)}
          >
            NUTRIENTS
          </Button>
          <Button
            className={`mt-[5px] ${
              !nutrientInfo
                ? "bg-[#1643BB] text-white dark:text-[#7398FC] dark:bg-[#37375E]"
                : "text-[#1643BB] bg-white dark:text-[#7398FC] dark:bg-transparent"
            }`}
            onClick={(e) => setNutrientInfo(false)}
          >
            INGREDIENTS
          </Button>
        </CardHeader>
        <CardContent className="p-1 md:p-5 width-[100%]">
          {nutrientInfo ? (
            <>
              <ChartWithDataLabels
                nutrientdata1={nutrientdata1}
                nutrientdata2={nutrientdata2}
                labelX={labelNutrient}
              />
            </>
          ) : (
            <>
              <ChartWithDataLabels
                nutrientdata1={ingredientdata1}
                nutrientdata2={ingredientdata2}
                labelX={labelIngredient}
              />
            </>
          )}
        </CardContent>
      </Card>
      <Card className="card-data-40 h-[501px] md:w-[100%] w-[100%]">
        <CardHeader>
          <div className=" flex flex-row items-center justify-start gap-2 w-full text-md">
            <button
              className={`mt-[5px] py-2 px-3 text-[15px] rounded-md ${
                buttonStates.button1
                  ? "bg-[#1643BB] text-white dark:text-[#7398FC] dark:bg-[#37375E]"
                  : "text-[#1643BB] bg-white dark:text-[#7398FC] dark:bg-transparent"
              }`}
              onClick={() => handleButtonClick("button1")}
            >
              Iteration 1
            </button>
            <button
              className={`mt-[5px] py-2 px-3 text-[15px] rounded-md ${
                buttonStates.button2
                  ? "bg-[#1643BB] text-white dark:text-[#7398FC] dark:bg-[#37375E]"
                  : "text-[#1643BB] bg-white dark:text-[#7398FC] dark:bg-transparent"
              }`}
              onClick={() => handleButtonClick("button2")}
            >
              Iteration 2
            </button>
            <button
              className={`mt-[5px] py-2 px-3 text-[15px] rounded-md ${
                buttonStates.button3
                  ? "bg-[#1643BB] text-white dark:text-[#7398FC] dark:bg-[#37375E]"
                  : "text-[#1643BB] bg-white dark:text-[#7398FC] dark:bg-transparent"
              }`}
              onClick={() => handleButtonClick("button3")}
            >
              Iteration 3
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-1 md:p-5 w-[100%] ">
          <ChartWithPadding />
        </CardContent>
      </Card>
    </div>
  );
};

export default Column3;
