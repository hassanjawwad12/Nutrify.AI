"use client";
import React, { useState, useEffect } from "react";
import Other from "./Add/Nutrients";
import Another from "./Add/RawMaterials";
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
import { useSidebarDataStore } from "@/store";
import toast, { Toaster } from "react-hot-toast";
import { useFeedDataStore } from "@/store";
import * as yup from "yup";

// Validation schema
const formSchema = yup.object().shape({
  user_formulas: yup.object().shape({
    feed_category: yup.string().required("Feed category is required"),
    user_code: yup.number().required("User code is required"),
    label: yup.string().required("Label is required"),
    breed: yup.string().nullable().required("Breed is required"),
    age: yup.number().nullable().required("Age is required"),
    date: yup.string().required("Date is required"),
  }),
});

const AddFormula = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { createNewFormula, fetchSidebarData } = useSidebarDataStore();
  const { CommonFeed, fetchType } = useFeedDataStore();

  useEffect(() => {
    fetchType();
  }, []);

  const [formData, setFormData] = useState({
    user_formulas: {
      feed_category: 0,
      user_code: 0,
      label: "",
      breed: null,
      age: null,
      date: new Date().toISOString().split("T")[0],
    },
    common_ingredients: [],
    common_nutrients: [],
  });

  const [errors, setErrors] = useState({
    feed_category: false,
    user_code: false,
    label: false,
    breed: false,
    age: false,
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

  const validateFormData = (formData) => {
    const isValidObject = (obj, requiredFields) => {
      return requiredFields.every(
        (field) => obj[field] !== null && obj[field] !== undefined
      );
    };
    // Validate common_ingredients
    if (
      !Array.isArray(formData.common_ingredients) ||
      formData.common_ingredients.some(
        (ingredient) =>
          !isValidObject(ingredient, [
            "id",
            "temp_user_base_price",
            "temp_user_low_bound",
            "temp_user_up_bound",
          ])
      )
    ) {
      return {
        valid: false,
        message: "Common ingredients array contains invalid objects.",
      };
    }
    // Validate common_nutrients
    if (
      !Array.isArray(formData.common_nutrients) ||
      formData.common_nutrients.some(
        (nutrient) =>
          !isValidObject(nutrient, [
            "id",
            "temp_user_min_percentage",
            "temp_user_max_percentage",
          ])
      )
    ) {
      return {
        valid: false,
        message: "Common nutrients array contains invalid objects.",
      };
    }
    return { valid: true, message: "" };
  };

  const handleSubmit = async () => {
    setIsOpen(false);

    try {
      await formSchema.validate(formData, { abortEarly: false });
      setErrors({
        feed_category: false,
        user_code: false,
        label: false,
        breed: false,
        age: false,
      });
      const validation = validateFormData(formData);
      if (!validation.valid) {
        toast.error("Error adding formula");
        return;
      }

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
      const response = await createNewFormula(updatedFormData);

      if (response?.name !== "AxiosError") {
        const storedToken = localStorage.getItem("token");
        setIsOpen(false);
        toast.success("Formula added successfully!");
        closeDialog();
        fetchSidebarData(storedToken);
      } else {
        toast.error("Failed Adding Formula");
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessages = error.errors
          .map((msg, index) => `${index + 1}. ${msg}`)
          .join("\n");
        toast.error(`Validation Errors:\n${errorMessages}`);

        const newErrors = { ...errors };
        error.inner.forEach((err) => {
          const path = err.path.split(".")[1];
          newErrors[path] = true;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div>
      <Dialog className="bg-[#1D1D3D] w-full overflow-y-auto h-full flex flex-col items-start justify-start" open={isOpen} >
        <DialogTrigger asChild>
          <Button className="bg-[#1643BB] text-white dark:text-[#7398FC] dark:bg-[#37375E]" onClick={openDialog}>
            Add New
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
              Add Formula
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col w-full md:h-full h-[70vh] overflow-y-auto">
            <div className="flex flex-wrap md:gap-2 gap-3 w-[100%]">
              <div className="flex flex-col items-start gap-2 md:w-[15%] w-[48%]">
                <label className="text-black dark:text-[#9D9BC9]">Code</label>
                <input
                  className={`bg-white text-black border ${
                    errors.user_code
                      ? "border-red-600"
                      : "border-gray-300 dark:border-none"
                  } dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full p-1 rounded-[4px]`}
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
                  className={`bg-white text-black border ${
                    errors.feed_category
                      ? "border-red-600"
                      : "border-gray-300 dark:border-none"
                  } dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full p-1 rounded-[4px]`}
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
                  className={`bg-white text-black border ${
                    errors.label
                      ? "border-red-600"
                      : "border-gray-300 dark:border-none"
                  } dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full p-1 rounded-[4px]`}
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
                  className={`bg-white text-black border ${
                    errors.breed
                      ? "border-red-600"
                      : "border-gray-300 dark:border-none"
                  } dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full p-1 rounded-[4px]`}
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
                  className={`bg-white text-black border ${
                    errors.age
                      ? "border-red-600"
                      : "border-gray-300 dark:border-none"
                  } dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full p-1 rounded-[4px]`}
                  type="number"
                  name="age"
                  value={formData.user_formulas.age}
                  onChange={handleInputChange}
                  placeholder="Age"
                />
              </div>
            </div>
            {/*The 2 children section */}
            <div className="flex md:flex-row flex-col w-full gap-2 overflow-x-auto overflow-y-auto h-auto items-center mt-2">
              <Another setFormData={setFormData} formData={formData} />
              <Other setFormData={setFormData} formData={formData} />
            </div>
          </div>
          {/*The footer for the dialog box */}
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

export default AddFormula;
