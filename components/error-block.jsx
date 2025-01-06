"use client";
import Image from "next/image";
import lightImage from "@/public/images/error/light-404.png";
import darkImage from "@/public/images/error/dark-404.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
const ErrorBlock = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen  overflow-y-auto flex justify-center items-center p-10">
      <div className="w-full flex flex-col items-center">
        <div className="max-w-[740px]">
          <Image
            src={theme === "dark" ? darkImage : lightImage}
            alt="error image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-16 text-center">
          <div className="text-2xl md:text-4xl lg:text-5xl font-semibold text-default-900">
            Ops! Page Not Found
          </div>
          <div className="mt-3 text-default-600 text-sm md:text-base">
            The page you are looking for might have been removed had <br /> its
            name changed or is temporarily unavailable.
          </div>
          <Button asChild className="mt-9  md:min-w-[300px]" size="lg">
            <Link href="/dashboard">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBlock;
