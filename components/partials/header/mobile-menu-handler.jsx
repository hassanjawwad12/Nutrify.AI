"use client";
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store";
const MobileMenuHandler = () => {
  const { mobileMenu, setMobileMenu } = useSidebar();
  return (
    <div>
      <Button
        onClick={() => setMobileMenu(!mobileMenu)}
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 hover:bg-primary-100 dark:hover:bg-default-300 hover:text-primary text-default-500 dark:text-default-800  rounded-full "
      >
        <Menu className="h-5 w-5 " />
      </Button>
    </div>
  );
};

export default MobileMenuHandler;
