"use client";
import { useState, useEffect } from "react";
import Add from "./Add";
import toast, { Toaster } from "react-hot-toast";

const Table = ({ isRawMaterial, setFormData, formData,tabler1 }) => {
  const [toastShown, setToastShown] = useState({
    minPercentage: false,
    maxPercentage: false,
    basePrice: false,
  });

  useEffect(() => {

    console.log(tabler1)
    setFormData(
      {
        ...formData,
      common_ingredients: [...formData.common_ingredients, ...tabler1.common_ingredients],
      common_nutrients: [...formData.common_nutrients, ...tabler1.common_nutrients]
    }
    )
  }
,[])
  const handleInputChange = (index, field, value) => {
    const updatedNutrients = [...formData.common_nutrients];
    updatedNutrients[index][field] = Number(value);

    if (field === "temp_user_max_percentage") {
      const minValue = Number(updatedNutrients[index].temp_user_min_percentage);
      const maxValue = Number(value);

      if (maxValue < minValue && !toastShown.maxPercentage) {
        toast.error("Max percentage cannot be smaller than min percentage");
        setToastShown({ ...toastShown, maxPercentage: true });
      } else {
        let updatedObj = {
          ...formData,
          common_nutrients: [...updatedNutrients],
        };
        setFormData(updatedObj);
        setToastShown({ ...toastShown, maxPercentage: false }); // Reset toast shown flag
      }
    }

    if (field === "temp_user_min_percentage") {
      const minValue = Number(value);
      const maxValue = Number(updatedNutrients[index].temp_user_max_percentage);

      // Check if maxValue is not zero before displaying the error
      if (minValue > maxValue && maxValue !== 0 && !toastShown.minPercentage) {
        toast.error("Min percentage cannot be larger than max percentage");
        setToastShown({ ...toastShown, minPercentage: true });
      } else {
        let updatedObj = {
          ...formData,
          common_nutrients: [...updatedNutrients],
        };
        setFormData(updatedObj);
        setToastShown({ ...toastShown, minPercentage: false }); // Reset toast shown flag
      }
    }
  };

  const handleInputChangeIngredient = (index, field, value) => {
    const updatedIngredients = [...formData.common_ingredients];
    updatedIngredients[index][field] = Number(value);

    if (field === "temp_user_base_price") {
      const Value = Number(updatedIngredients[index].temp_user_base_price);
      if (Value <= 0 && !toastShown.basePrice) {
        toast.error("Price cannot be 0");
        setToastShown({ ...toastShown, basePrice: true });
        return;
      }
    }

    if (field === "temp_user_up_bound") {
      const minValue = Number(updatedIngredients[index].temp_user_low_bound);
      const maxValue = value;

      if (maxValue < minValue && !toastShown.maxPercentage) {
        toast.error("Max percentage cannot be smaller than min percentage");
        setToastShown({ ...toastShown, maxPercentage: true });
        return;
      } else {
        let updatedObj = {
          ...formData,
          common_ingredients: [...updatedIngredients],
        };
        setFormData(updatedObj);
      }
    }

    if (field === "temp_user_low_bound") {
      const minValue = Number(value);
      const maxValue = Number(updatedIngredients[index].temp_user_up_bound);

      // Check if maxValue is not zero before displaying the error
      if (minValue > maxValue && maxValue !== 0 && !toastShown.minPercentage) {
        toast.error("Min percentage cannot be larger than max percentage");
        setToastShown({ ...toastShown, minPercentage: true });
      } else {
        let updatedObj = {
          ...formData,
          common_nutrients: [...updatedIngredients],
        };
        setFormData(updatedObj);
        setToastShown({ ...toastShown, minPercentage: false }); // Reset toast shown flag
      }
    }
  };

  return (
    <>
      <div className=" px-2 py-4 dark:border-b-2 border border-[gray-100]-[0.2] flex flex-row w-full justify-between bg-white text-black dark:bg-[#161630]">
        <Toaster />
        <p className="text-[18px] dark:text-[#7398FC] text-black ml-4">
          {" "}
          {isRawMaterial ? "Ingredients" : "Nutrients"}
        </p>
        <Add
          isRawMaterial={isRawMaterial}
          setFormData={setFormData}
          formData={formData}
          tabler1={tabler1}
        />
      </div>
      <div className="relative overflow-x-auto w-full md:h-full h-[100vh]">
        <table className="w-full text-sm text-left rtl:text-right overflow-x-auto">
          <thead className="text-[15px] text-black dark:text-[#7398FC] uppercase py-2">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              {isRawMaterial ? (
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              ) : null}
              <th scope="col" className="px-6 py-3">
                Minimum
              </th>
              <th scope="col" className="px-6 py-3">
                Maximum
              </th>
            </tr>
          </thead>
          <tbody>
            {(isRawMaterial
              ? formData?.common_ingredients
              : formData?.common_nutrients
            )?.map((product, index) => (
              <tr
                key={index}
                className={`border-b  bg-white text-black dark:text-[#9D9BC9] ${
                  index % 2 === 0 ? "dark:bg-[#25254C]" : "dark:bg-[#1D1D3D]"
                }`}
              >
                <td className="px-6 py-1">{product.id}</td>
                <td className="px-6 py-1">{product.name}</td>
                {isRawMaterial ? (
                  <>
                    <td className="px-2 py-1">
                      <input
                        type="number"
                        name="temp_user_base_price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-2 dark:bg-[#1D1D3D] dark:border-[#7398FC] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={product.temp_user_base_price}
                        onChange={(e) =>
                          handleInputChangeIngredient(
                            index,
                            "temp_user_base_price",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </>
                ) : null}
                <td className="px-4 py-1">
                  <input
                    type="number"
                    name={
                      isRawMaterial
                        ? "temp_user_low_bound"
                        : "temp_user_min_percentage"
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-2 dark:bg-[#1D1D3D] dark:border-[#7398FC] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={
                      isRawMaterial
                        ? product.temp_user_low_bound
                        : product.temp_user_min_percentage
                    }
                    onChange={
                      isRawMaterial
                        ? (e) =>
                            handleInputChangeIngredient(
                              index,
                              "temp_user_low_bound",
                              e.target.value
                            )
                        : (e) =>
                            handleInputChange(
                              index,
                              "temp_user_min_percentage",
                              e.target.value
                            )
                    }
                  />
                </td>
                <td className="px-4 py-1">
                  <input
                    type="number"
                    name={
                      isRawMaterial
                        ? "temp_user_up_bound"
                        : "temp_user_max_percentage"
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-2 dark:bg-[#1D1D3D] dark:border-[#7398FC] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={
                      isRawMaterial
                        ? product.temp_user_up_bound
                        : product.temp_user_max_percentage
                    }
                    onChange={
                      isRawMaterial
                        ? (e) =>
                            handleInputChangeIngredient(
                              index,
                              "temp_user_up_bound",
                              e.target.value
                            )
                        : (e) =>
                            handleInputChange(
                              index,
                              "temp_user_max_percentage",
                              e.target.value
                            )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
