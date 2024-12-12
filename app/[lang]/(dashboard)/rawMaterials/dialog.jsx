"use client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "@/components/ui/input";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFeedDataStore, useRawMaterialDataStore } from "@/store";

const DialogBox = () => {
  const [data, setData] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState(1);
  const [commonfeed, SetCommonFeed] = useState(1);
  const { createIngredient } = useRawMaterialDataStore();
  const { CommonFeed, fetchType, Units, fetchUnits } = useFeedDataStore();

  useEffect(() => {
    fetchType();
    fetchUnits();
  }, []);

  const generateAbbreviation = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleOptionChange = (e) => {
    SetCommonFeed(e.target.value);
  };

  const HandleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleAddNew = () => {
    if (code === "" || name === "" || commonfeed === "") {
      toast.error("All fields must be filled out.");
      return;
    }

    const abbreviation = generateAbbreviation(name);
    let obj = {
      item_code: Number(code),
      name: name,
      short_name: abbreviation,
      unit: unit,
      common_feed_types: Number(commonfeed),
    };
    createIngredient(obj);

    const findData = data.find(
      (item) => item.code === newRow.code || item.name === newRow.name
    );
    if (findData === undefined) {
      setCode("");
      setName("");
      setUnit("");
      SetCommonFeed("");
      toast.success("Ingredient Added Successfully!");
    } else {
      toast.error("Failed to add Ingredient!");
    }
  };

  return (
    <div className="bg-[#1D1D3D]">
      <ToastContainer />
      <Dialog className="bg-[#1D1D3D]">
        <DialogTrigger asChild>
          <Button className="bg-[#1643BB] text-white dark:text-[#7398FC] dark:bg-[#37375E]">
            Add New
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className="text-base font-medium text-[#7398FC] "
              style={{
                borderBottom: "1px solid #7398FC",
              }}
            >
              Ingredients
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500  space-y-4">
            <DialogTitle className="text-base w-full font-medium text-[#7398FC] ">
              ADD NEW
            </DialogTitle>
            <div className="w-full flex flex-row mb-3">
              <div className="w-[20%] ">
                <label className="text-black dark:text-[#9D9BC9] text-[16px]">
                  Code
                </label>
                <Input
                  type="text"
                  placeholder="8942"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="w-[80%] ml-2">
                <label className="text-black dark:text-[#9D9BC9] text-[16px]">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Dry Matter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="w-full flex flex-col mb-3">
              <label className="text-black dark:text-[#9D9BC9] text-[16px]">
                Unit
              </label>
              <select
                className="mt-1 bg-white p-2 text-black border border-gray-300 dark:border-none dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full  rounded-[4px]"
                value={unit}
                onChange={HandleUnitChange}
              >
                <option className="py-2" value="">
                  Select an option
                </option>
                {Units.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.symbol}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex flex-row mb-3">
              <div className="w-[100%] ">
                <label className="text-black dark:text-[#9D9BC9] text-[16px]">
                  Feed Type
                </label>
                <select
                  className="mt-1 bg-white p-2 text-black border border-gray-300 dark:border-none dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full  rounded-[4px]"
                  value={commonfeed}
                  onChange={handleOptionChange}
                >
                  <option className="py-2" value="">
                    Select an option
                  </option>
                  {CommonFeed.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-8 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" color="warning">
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={handleAddNew}>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogBox;
