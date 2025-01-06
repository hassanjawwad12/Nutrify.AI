import React, { useState, useEffect } from "react";
import { useSidebar, useThemeStore } from "@/store";
import { Check, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { themes } from "@/config/thems";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { hslToHex, hexToRGB } from "@/lib/utils";
const SidebarImage = () => {
  const { sidebarBg, setSidebarBg } = useSidebar();
  const [selectedFiles, setSelectedFiles] = useState([
    "/images/all-img/img-2.jpeg",
    "/images/all-img/img-1.jpeg",
  ]);
  const { theme: mode } = useTheme();
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const newTheme = themes.find((theme) => theme.name === config);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFiles([...selectedFiles, URL.createObjectURL(file)]);
  };

  const handleClear = () => {
    setSidebarBg("none");
  };
  const hslPrimary = `hsla(${
    newTheme?.cssVars[mode === "dark" ? "dark" : "light"].primary
  })`;

  const hexPrimary = hslToHex(hslPrimary);

  return (
    <div
      style={{
        "--theme-primary": `hsl(${
          newTheme?.cssVars[mode === "dark" ? "dark" : "light"].primary
        })`,
      }}
    >
      <div className="mb-2 relative inline-block px-3 py-[3px] rounded before:bg-[--theme-primary] before:absolute before:top-0 before:left-0 before:w-full  before:h-full before:rounded before:opacity-10 before:z-[-1]  text-[--theme-primary]  text-xs font-medium">
        Sidebar Image
      </div>
      <div className="text-muted-foreground font-normal text-xs mb-4">
        Choose a image of Sidebar.
      </div>
      <div className=" grid grid-cols-7 gap-3">
        <button
          onClick={handleClear}
          className=" h-[72px] border border-border flex items-center justify-center rounded text-default-400"
        >
          {sidebarBg === "none" ? (
            <Icon icon="heroicons:check" className=" h-6 w-6" />
          ) : (
            <Icon icon="heroicons:x-mark" className=" h-6 w-6 " />
          )}
        </button>
        {selectedFiles.map((file, index) => (
          <button
            key={index}
            onClick={() => setSidebarBg(file)}
            className={cn(
              " h-[72px] rounded relative bg-cover bg-no-repeat   bg-blend-multiply ",
              {
                "custom-bg-opacity": sidebarBg === file,
                "": sidebarBg !== file,
              }
            )}
            style={{
              backgroundImage: `url(${file})`,
              backgroundColor:
                sidebarBg === file ? hexToRGB(hexPrimary, 0.5) : "transparent",
            }}
          >
            {sidebarBg === file && (
              <Icon
                icon="heroicons:check-circle-20-solid"
                className=" text-primary-foreground  absolute  top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </button>
        ))}
        <label className=" h-[72px] rounded border border-border bg-border  flex items-center justify-center text-muted-foreground">
          <input type="file" className="hidden" onChange={handleFileChange} />

          <Icon icon="heroicons:cloud-arrow-up" className="w-5 h-5" />
        </label>
      </div>
    </div>
  );
};

export default SidebarImage;
