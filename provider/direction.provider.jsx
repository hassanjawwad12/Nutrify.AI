"use client";
import React from "react";
import { useThemeStore } from "@/store";
import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";

const DirectionProvider = ({ children, lang }) => {
  const { isRtl } = useThemeStore();

  const direction = lang === "ar" || isRtl ? "rtl" : "ltr";

  return (
    <div dir={direction}>
      <RadixDirectionProvider dir={direction}>
        {children}
      </RadixDirectionProvider>
    </div>
  );
};

export default DirectionProvider;
