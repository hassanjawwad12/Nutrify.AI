"use client"

import { cn } from "@/lib/utils";
import { Application, Authentication, ChartBar, Components, DashBoard, Map } from "@/components/svg";

const Stats = () => {
  const data = [
    {
      text: "Awesome Dashboards",
      total: "03",
      color: "primary",
      icon: DashBoard
    },
    {
      text: "Ready-made Application",
      total: "06",
      color: "warning",
      icon: Application
    },
    {
      text: "Well Crafted Pages",
      total: "150+",
      color: "success",
      icon: Authentication
    },
    {
      text: "Usable Components",
      total: "200+",
      color: "destructive",
      icon: Components
    },
    {
      text: "Creative Charts",
      total: "04",
      color: "primary",
      icon: ChartBar
    },
    {
      text: "Updated Map",
      total: "04",
      color: "info",
      icon: Map
    },
  ];
  return (
    <div className="container mt-16 2xl:mt-24">
      <div className="grid grid-cols-2  lg:grid-cols-3 2xl:grid-cols-6 gap-6">
        {data.map((item, index) => (
          <div
            key={`reports-state-${index}`}
            className={cn(
              "flex flex-col gap-1.5 p-4 rounded-sm overflow-hidden bg-primary/10  items-start relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground before:hidden ",
              {
                "bg-primary/20  dark:bg-primary/70": item.color === "primary",
                "bg-orange-50 dark:bg-orange-500": item.color === "warning",
                "bg-green-50 dark:bg-green-500": item.color === "success",
                "bg-red-50 dark:bg-red-500 ": item.color === "destructive",
                "bg-cyan-50 dark:bg-cyan-500 ": item.color === "info",
              }
            )}
          >
            <span
              className={cn(
                "h-[95px] w-[95px] rounded-full bg-primary/40 absolute -top-8 -right-8 ring-[20px] ring-primary/30",
                {
                  "bg-primary/50  ring-primary/20 dark:bg-primary dark:ring-primary/40": item.color === "primary",
                  "bg-orange-200 ring-orange-100 dark:bg-orange-300 dark:ring-orange-400": item.color === "warning",
                  "bg-green-200 ring-green-100 dark:bg-green-300 dark:ring-green-400": item.color === "success",
                  "bg-red-200 ring-red-100 dark:bg-red-300 dark:ring-red-400": item.color === "destructive",
                  "bg-cyan-200 ring-cyan-100 dark:bg-cyan-300 dark:ring-cyan-400": item.color === "info",
                }
              )}
            ></span>
            <div className={`w-8 h-8 grid place-content-center rounded-full border border-dashed border-${item.color} dark:border-primary-foreground/60`}>
              <span className={cn(`h-7 w-7 rounded-full grid place-content-center  bg-${item.color}`, {
                "dark:bg-[#EFF3FF]/30": item.color === "primary",
                "dark:bg-[#FFF7ED]/30": item.color === "warning",
                "dark:bg-[#ECFDF4]/30": item.color === "success",
                "dark:bg-[#FEF2F2]/30": item.color === "destructive"
              })}>
                <item.icon className="w-4 h-4 text-primary-foreground" />
              </span>
            </div>
            <div className={`text-3xl font-semibold text-${item.color}  dark:text-primary-foreground mt-2`}>{item.total}</div>
            <div className="text-sm font-medium text-default-900 dark:text-primary-foreground  capitalize relative z-10">
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;