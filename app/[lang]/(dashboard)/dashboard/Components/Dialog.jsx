import React from "react";
import "./style.css";
import { Button } from "@/components/ui/button";

const Dialog = ({ isOpen, onClose, handleTrials, data }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay px-2 z-50 !important">
      <div className="dialog-content dark:bg-gray-600 bg-white z-50 md:mr-5">
        <h2 className="text-black dark:text-white text-xl font-semibold">
          Run the Formula Trial
        </h2>
        <p className="text-md dark:text-white text-black">
          If you click the button it will overwrite the data you have edited
        </p>
        <div className="flex flex-row mt-6 w-full items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            color="warning"
            onClick={onClose}
          >
            Close
          </Button>
          <Button type="submit" onClick={() => handleTrials(data)}>
            Show Trial Results{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
