import React from "react";
import Image from "next/image";
import HenLog from "@/components/images/hen.png"

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      <div className="logo-container">
        <Image src={HenLog} alt="" className="logo" width={20} height={20}/>
      </div>
      <div className="circles">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
      </div>
    </div>
  );
};

export default Loader;
