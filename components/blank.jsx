import React from "react";
import { BlankVector } from "./svg";
import { cn } from "@/lib/utils";

const Blank = ({ children, img = <BlankVector />, className }) => {
  return (
    <div className={cn("text-center", className)}>
      {img && <div className=" h-[240px] w-[240px] mx-auto">{img}</div>}
      {children}
    </div>
  );
};

export default Blank;
