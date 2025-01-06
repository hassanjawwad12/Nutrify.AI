"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Device, Moon, Sun } from "@/components/svg";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { baseURL } from "@/utils/baseURL";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const switchTheme = async (input) => {
    setTheme(input);

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const data = await axios.post(
          `${baseURL}userthemepreferences/`,
          {
            mode: input,
          },
          {
            headers: {
              Authorization: `Token ${storedToken}`,
            },
          }
        );

        const response = await data.json();
      } catch (error) {
        console.error("Error switching theme:", error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative md:h-9 md:w-9 h-8 w-8 hover:bg-default-100 dark:hover:bg-default-200 
          data-[state=open]:bg-default-100  dark:data-[state=open]:bg-default-200 
           hover:text-primary text-default-500 dark:text-default-800  rounded-full 
            "
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2">
        <DropdownMenuItem
          // onClick={() => setTheme("light")}
          onClick={() => switchTheme("light")}
          className={cn(
            "p-2 font-medium text-sm text-default-600 cursor-pointer mb-[2px] ",
            {
              "bg-primary text-primary-foreground": theme === "light",
            }
          )}
        >
          <Sun className="w-5 h-5 mr-2" />
          <span className="mr-2">Light</span>
          <Check
            className={cn("w-4 h-4 flex-none ml-auto ", {
              hidden: theme !== "light",
            })}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          //onClick={() => setTheme("dark")}
          onClick={() => switchTheme("dark")}
          className={cn(
            "p-2 font-medium text-sm text-default-600 hover:bg-primary hover:text-primary-foreground  dark:hover:bg-background cursor-pointer mb-[2px]",
            {
              "bg-primary text-primary-foreground": theme === "dark",
            }
          )}
        >
          <Moon className="w-5 h-5 mr-2" />
          <span className="mr-2">Dark</span>
          <Check
            className={cn("w-4 h-4 flex-none ml-auto text-default-700", {
              hidden: theme !== "dark",
            })}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeButton;
