import React, { useState } from "react";
import Hen from "@/components/images/hen.png";
import Cow from "@/components/images/cow.png";
import Fish from "@/components/images/fish.png";
import Paw from "@/components/images/paw.png";
import Image from "next/image";
import { useSidebarDataStore, useTableDataStore } from "@/store";
import toast, { Toaster } from "react-hot-toast";

const FooterMenu = () => {
  const { fetchCategoricalData,RefreshDataNav } = useSidebarDataStore();
  const { fetchData ,RefreshData} = useTableDataStore();
  const [buttonStates, setButtonStates] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
  });

  const handleButtonClick = async (buttonName, data) => {
    RefreshDataNav();
    const storedToken = localStorage.getItem("token");
    const result = await fetchCategoricalData(storedToken, data);

    if (result?.name !== "AxiosError") {
      console.log(result);
      if (result?.length!==0) {
        toast.success("Data fetched successfully!");
        RefreshData();
        fetchData(storedToken, result?.[0].id);
      } else {
        toast.error("Failed fetching data!");
        //RefreshData();
      }
    }

    setButtonStates((prevStates) => ({
      button1: buttonName === "button1" ? !prevStates.button1 : false,
      button2: buttonName === "button2" ? !prevStates.button2 : false,
      button3: buttonName === "button3" ? !prevStates.button3 : false,
      button4: buttonName === "button4" ? !prevStates.button4 : false,
    }));
  };

  return (
    <div className="space-y-5 flex flex-col items-center justify-center pb-6">
      <button
        className={`w-11 h-11 mx-auto text-default-500 flex items-center justify-center rounded-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground ${
          buttonStates.button1 ? "bg-primary/20" : ""
        }`}
        onClick={() => handleButtonClick("button1", 1)}
      >
        <Image
          src={Hen}
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />
      </button>
      <button
        className={` w-11 h-11 mx-auto text-default-500 flex items-center justify-center rounded-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground ${
          buttonStates.button2 ? "bg-primary/20" : ""
        }`}
        onClick={() => handleButtonClick("button2", 2)}
      >
        <Image
          src={Cow}
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />
      </button>
      <button
        className={` w-11 h-11 mx-auto text-default-500 flex items-center justify-center rounded-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground ${
          buttonStates.button3 ? "bg-primary/20" : ""
        }`}
        onClick={() => handleButtonClick("button3", 3)}
      >
        <Image
          src={Fish}
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />
      </button>
      <button
        className={` w-11 h-11 mx-auto text-default-500 flex items-center justify-center rounded-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground ${
          buttonStates.button4 ? "bg-primary/20" : ""
        }`}
        onClick={() => handleButtonClick("button4", 4)}
      >
        <Image
          src={Paw}
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />
      </button>
    </div>
  );
};
export default FooterMenu;
