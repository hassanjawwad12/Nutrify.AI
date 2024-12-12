"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRawMaterialDataStore, useFeedDataStore } from "@/store";
import toast from "react-hot-toast";

const History = ({ isOpen, setIsOpen, closeDialog, rowData }) => {
  const { CommonFeed, fetchType } = useFeedDataStore();

  useEffect(() => {
    fetchType();
  }, []);

  const { EditIngredient } = useRawMaterialDataStore();
  const [formData, setFormData] = useState({
    code: "",
    abrivation: "",
    IngredientName: "",
    unit: "",
    common_feed: "",
  });

  useEffect(() => {
    if (isOpen && rowData) {
      setFormData({
        code: rowData.item_code,
        abrivation: rowData.short_name,
        IngredientName: rowData.name,
        unit: rowData.unit,
        common_feed: rowData.common_feed_types,
      });
    }
  }, [isOpen, rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSave = async () => {
    let obj = {
      id: rowData.id,
      item_code: formData.code,
      name: formData.nutrientName,
      short_name: formData.abrivation,
      units: formData.unit,
      common_feed_types: formData.common_feed,
    };
    const response = await EditIngredient(obj);
    if (response?.name !== "AxiosError") {
      toast.success("Ingredient edited successfully!");
      closeDialog();
    } else {
      toast.error("Failed editing ingredient");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent size="5xl" className="overflow-x-auto">
          <DialogHeader>
            <DialogTitle className="text-xl dark:text-[#7398FC] text-black border-b border-[#7398FC]">
              Edit Nutrient
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-default-500 space-y-4">
            <div className="w-full flex flex-row mb-3">
              <div className="w-[20%]">
                <label>Code</label>
                <Input
                  type="number"
                  name="code"
                  placeholder="Code"
                  onChange={handleChange}
                  value={formData.code}
                />
              </div>
              <div className="w-[80%] ml-2">
                <label>Abrivation</label>
                <Input
                  type="text"
                  name="abrivation"
                  placeholder="Abr"
                  onChange={handleChange}
                  value={formData.abrivation}
                />
              </div>
            </div>
            <div className="w-full flex flex-col mb-3">
              <label>Name</label>
              <Input
                type="text"
                name="nutrientName"
                placeholder="Name"
                onChange={handleChange}
                value={formData.IngredientName}
              />
            </div>
            <div className="w-full flex flex-row mb-3">
              <div className="w-[50%] ">
                <label>Common Feed Type</label>
                <select
                  className="bg-white text-black borderborder-gray-300 dark:border-none dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full p-2 rounded-[4px]"
                  type="number"
                  placeholder="23"
                  name="common_feed"
                  onChange={handleChange}
                  value={formData.common_feed}
                >
                  {CommonFeed.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>   
              </div>
              <div className="w-[50%] ml-2">
                <label>Unit</label>
                <Input
                  type="text"
                  name="unit"
                  placeholder="Unit"
                  onChange={handleChange}
                  value={formData.unit}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline" color="warning" onClick={closeDialog}>
                Close
              </Button>
            </DialogClose>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default History;
