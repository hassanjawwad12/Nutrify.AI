"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRawMaterialDataStore, useNutrientDataStore } from "@/store";

const AddFormula = ({ isRawMaterial, setFormData, formData, tabler1 }) => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const { TableData } = useRawMaterialDataStore(); //ingrediens
  const { NutrientTableData } = useNutrientDataStore(); //Nutrients

  const handleCheckboxChange = (event, product, index) => {
    const { checked } = event.target;
    const data = {
      id: product.id,
      temp_user_base_price: null,
      temp_user_low_bound: null,
      temp_user_up_bound: null,
      name: product.name,
    };

    const data2 = {
      id: product.id,
      temp_user_min_percentage: null,
      temp_user_max_percentage: null,
      name: product.name,
    };

    if (isRawMaterial) {
      if (checked) {
        setFormData({
          ...formData,
          common_ingredients: [...formData.common_ingredients, data],
        });
      } else {
        const updatedIngredientsData = formData?.common_ingredients?.filter(
          (item) => item.id !== product.id
        );
        setFormData({
          ...formData,
          common_ingredients: updatedIngredientsData,
        });
      }
    } else {
      if (checked) {
        setFormData({
          ...formData,
          common_nutrients: [...(formData.common_nutrients || []), data2],
        });
      } else {
        const updatedNutrientsData = (formData.common_nutrients || []).filter(
          (item) => item.id !== product.id
        );
        setFormData({
          ...formData,
          common_nutrients: updatedNutrientsData,
        });
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredIngredients = TableData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNutrients = NutrientTableData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <Dialog className="bg-[#1D1D3D] w-full overflow-y-auto mr-10 ">
        <DialogTrigger asChild>
          <Button className="bg-[#1643BB] text-white dark:text-[#7398FC] dark:bg-[#37375E]">
            {isRawMaterial ? "Add Ingredient" : "Add Nutrients"}
          </Button>
        </DialogTrigger>
        <DialogContent
          className={`bg-white dark:bg-[#1D1D3D] md:h-[380px] h-[45vh] overflow-y-auto border border-[#7398FC] md:absolute md:mt-10 ${
            isRawMaterial ? "md:left-1/3" : "right-2 md:left-3/4"
          } `}
          size="sm"
        >
          <DialogHeader>
            {/*Serach Field */}
            <div className="border border-[#9D9BC9] mt-4 flex flex-col py-1 items-center justify-center rounded-[0.5px]">
              <input
                type="text"
                className="w-full p-2 bg-transparent focus:outline-none"
                placeholder="Search Field"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </DialogHeader>

          <div className="flex flex-col items-start justify-start gap-2 h-full overflow-y-auto ">
            <div className="flex md:flex-row flex-col  gap-2 items-center w-full  ">
              <button className="bg-[#1643BB] px-2 py-1 text-white dark:text-[#7398FC] dark:bg-[#37375E] md:w-[48%] w-[90%] rounded-[10px]">
                Add
              </button>
              <button className="bg-[#1643BB] px-2 py-1 text-white dark:text-[#7398FC] dark:bg-[#37375E] md:w-[48%] w-[90%] rounded-[10px]">
                Remove
              </button>
            </div>
            <div className="relative overflow-x-auto w-[100%] h-full ">
              <table className="w-full text-sm text-left rtl:text-right overflow-x-auto">
                <tbody>
                  {tabler1?.length !== 0 && (
                    <>
                      {(isRawMaterial
                        ? filteredIngredients
                        : filteredNutrients
                      )?.map((product, index) => {
                        // Find if the current product exists in the correct array
                        const selectedItems = isRawMaterial
                          ? formData?.common_ingredients
                          : formData?.common_nutrients;
                        const isSelected = selectedItems?.some(
                          (item) => item.id === product.id
                        );
                        return (
                          <tr
                            key={index}
                            className="bg-white text-black dark:text-[#9D9BC9] dark:bg-[#1D1D3D]"
                          >
                            <td className="px-2 py-2">
                              <input
                                type="checkbox"
                                name={
                                  isRawMaterial
                                    ? "common_ingredients"
                                    : "common_nutrients"
                                }
                                checked={
                                  isRawMaterial
                                    ? formData?.common_ingredients.some(
                                        (item) => item.id === product.id
                                      )
                                    : formData?.common_nutrients.some(
                                        (item) => item.id === product.id
                                      )
                                }
                                onChange={(e) =>
                                  handleCheckboxChange(e, product, index)
                                }
                                className="w-4 h-4 text-blue-600 bg-transparent rounded dark:bg-transparent dark:border-[#7398FC]"
                              />
                            </td>
                            <td className="px-2 py-2">{product.item_code}</td>
                            <td className="px-2 py-2">{product.name}</td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFormula;
