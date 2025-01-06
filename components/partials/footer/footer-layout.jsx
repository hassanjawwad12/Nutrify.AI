import React from "react";
import { cn } from "@/lib/utils";
const FooterLayout = ({ children, className }) => {
  return (
    <footer className={cn("bg-card relative py-4 px-6  border-t", className)}>
      {children}
    </footer>
  );
};

export default FooterLayout;
