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
import { useNutrientDataStore,useFeedDataStore } from "@/store";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const History = ({ isOpen, setIsOpen, closeDialog, rowData }) => {
  const { EditNutrient ,fetchNutrients} = useNutrientDataStore();
  const { Units, fetchUnits } = useFeedDataStore();

  useEffect(() => {
    fetchUnits();
  }, []);

  const [formData, setFormData] = useState({
    code: "",
    abrivation: "",
    nutrientName: "",
    group: "",
    unit: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen && rowData) {
      setFormData({
        code: rowData.item_code,
        abrivation: rowData.short_name,
        nutrientName: rowData.name,
        group: rowData.type,
        unit: rowData.unit,
        description: rowData.description,
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
      nutrient_id: rowData.id,
      item_code: formData.code,
      name: formData.nutrientName,
      short_name: formData.abrivation,
      type: formData.group,
      units: formData.unit,
      description: formData.description,
    };
    const response = await EditNutrient(obj);
    if (response?.name !== "AxiosError") {
      const storedToken=localStorage.getItem('token')
      toast.success("Nutrient edited successfully!");
      fetchNutrients(storedToken);
      closeDialog();
    } else {
      toast.error("Failed editing nutrient");
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
                value={formData.nutrientName}
              />
            </div>
            <div className="w-full flex flex-row mb-3">
              <div className="w-[50%]">
                <label>Type</label>
                <Input
                  type="number"
                  name="group"
                  placeholder="23"
                  onChange={handleChange}
                  value={formData.group}
                />
              </div>
              <div className="w-[50%] ml-2">
                {/* <label>Unit</label>
                <Input
                  type="text"
                  name="unit"
                  placeholder="Unit"
                  onChange={handleChange}
                  value={formData.unit}
                /> */}
                <label>Unit</label>
                <select
                  className="mt-1 bg-white p-2 text-black border border-gray-300 dark:border-none dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full  rounded-[4px]"
                  name="unit"
                  placeholder="Unit"
                  onChange={handleChange}
                  value={formData.unit}
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
            </div>
            <div className="w-full flex flex-col mb-3">
              <label>Description</label>
              <Textarea
                rows={4}
                name="description"
                placeHolder="Description"
                onChange={(e) => handleChange(e)}
                value={formData.description}
              />
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
