"use client";
import React from "react";
import ReactDOM from "react-dom";

const MenuOverlayPortal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      onClick={() => {
        onClose();
      }}
      className="bg-black/60 backdrop-filter backdrop-blur-sm fixed w-full h-full flex-1 inset-0 z-50 rounded-md"
    ></div>,
    document.body
  );
};

export default MenuOverlayPortal;
