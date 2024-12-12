"use client";
import React, { useState, useEffect, useCallback } from "react";
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
import { useSidebarDataStore, useTableDataStore } from "@/store";
import { useFeedDataStore } from "@/store";
import Ingredient from "./Ingredient";
import Nutrient from "./Nutrient";
import toast, { Toaster } from "react-hot-toast";

const Edit = ({ rowData }) => {
  const { CommonFeed, fetchType } = useFeedDataStore();
  const { fetchData, tabler1 } = useTableDataStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const { UpdateFormula,fetchSidebarData } = useSidebarDataStore();

  // Memoize the fetch functions to avoid re-creating them on every render
  const memoizedFetchData = useCallback(() => {
    const storedToken = localStorage.getItem("token");
    if (rowData?.id) {
      fetchData(storedToken, rowData?.id);
    }
  }, [fetchData, rowData?.id]);

  const memoizedFetchType = useCallback(() => {
    fetchType();
  }, [fetchType]);

  useEffect(() => {
    memoizedFetchData();
    memoizedFetchType();
  }, [memoizedFetchData, memoizedFetchType]);

  const [formData, setFormData] = useState({
    user_formulas: {
      id: rowData.id,
      feed_category: rowData.feed_category,
      user_code: rowData.user_code,
      label: rowData.label,
      breed: rowData.breed,
      age: rowData.age,
      date: rowData.date,
    },
    common_ingredients: [],
    common_nutrients: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      user_formulas: {
        ...prevState.user_formulas,
        [name]: value,
      },
    }));
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    setIsOpen(false);
    //removed the name from the FormData
    const updatedFormData = {
      ...formData,
      common_ingredients: formData.common_ingredients.map(
        ({ name, ...rest }) => rest
      ),
      common_nutrients: formData.common_nutrients.map(
        ({ name, ...rest }) => rest
      ),
    };
    //response from zustand
    const response = await UpdateFormula(updatedFormData);

    if (response?.name) {
      const storedToken = localStorage.getItem("token");
      setIsOpen(false);
      fetchSidebarData(storedToken);
      toast.success("Formula edited successfully!");
      closeDialog();
    } else {
      toast.error("Failed editing Formula");
    }
  };

  return (
    <div>
      <Dialog
        className="bg-[#1D1D3D] w-full overflow-y-auto h-full flex flex-col items-start justify-start"
        open={isOpen}
      >
        <DialogTrigger asChild>
          <Button type="submit" onClick={openDialog}>
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent
          className="bg-white dark:bg-[#1D1D3D] md:h-[701px] h-[90vh] overflow-y-auto w-[90%] flex flex-col justify-start"
          size="6xl"
          closeDialog={closeDialog}
        >
          <DialogHeader>
            <DialogTitle
              className="text-base font-[24px] text-[#7398FC] p-2 text-[24px] "
              style={{
                borderBottom: "1px solid #7398FC",
              }}
            >
              Edit Formula
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col w-full md:h-full h-[70vh] overflow-y-auto">
            <div className="flex flex-wrap md:gap-2 gap-3 w-[100%]">
              <div className="flex flex-col items-start gap-2 md:w-[15%] w-[48%]">
                <label className="text-black dark:text-[#9D9BC9]">Code</label>
                <input
                  className="bg-white text-black border dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full p-1 rounded-[4px] border-gray-300 dark:border-none"
                  type="text"
                  name="user_code"
                  value={formData.user_formulas.user_code}
                  onChange={handleInputChange}
                  placeholder="Code"
                />
              </div>
              <div className="flex flex-col items-start gap-2 md:w-[15%] w-[48%]">
                <label className="text-black dark:text-[#9D9BC9]">
                  Feed Category
                </label>
                <select
                  className="bg-white text-black border dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full p-1 rounded-[4px] border-gray-300 dark:border-none"
                  name="feed_category"
                  value={formData.user_formulas.feed_category}
                  onChange={handleInputChange}
                  placeholder="Feed Category"
                >
                  <option value="">Select an option</option>
                  {CommonFeed.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-start gap-2 md:w-[25%] w-[48%]">
                <label className="text-black dark:text-[#9D9BC9]">Label</label>
                <input
                  className="bg-white text-black border dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full p-1 rounded-[4px] border-gray-300 dark:border-none"
                  type="text"
                  name="label"
                  value={formData.user_formulas.label}
                  onChange={handleInputChange}
                  placeholder="Label"
                />
              </div>
              <div className="flex flex-col items-start gap-2 md:w-[20%] w-[48%]">
                <label className="text-black dark:text-[#9D9BC9]">Breed</label>
                <input
                  className="bg-white text-black border dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full p-1 rounded-[4px] border-gray-300 dark:border-none"
                  type="text"
                  name="breed"
                  value={formData.user_formulas.breed}
                  onChange={handleInputChange}
                  placeholder="Breed"
                />
              </div>
              <div className="flex flex-col items-start gap-2 md:w-[20%] w-[48%]">
                <label className="text-black dark:text-[#9D9BC9]">Age</label>
                <input
                  className="bg-white text-black border dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full p-1 rounded-[4px] border-gray-300 dark:border-none"
                  type="number"
                  name="age"
                  value={formData.user_formulas.age}
                  onChange={handleInputChange}
                  placeholder="Age"
                />
              </div>
            </div>
            {tabler1?.length !== 0 && (
              <>
                <div className="flex md:flex-row flex-col w-full gap-2 overflow-x-auto overflow-y-auto h-auto items-center mt-2">
                  <Ingredient
                    setFormData={setFormData}
                    formData={formData}
                    tabler1={tabler1}
                  />
                  <Nutrient
                    setFormData={setFormData}
                    formData={formData}
                    tabler1={tabler1}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline" color="warning" onClick={closeDialog}>
                Close
              </Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Edit;
