"use client";
import { Inter } from "next/font/google";
import { useThemeStore } from "@/store";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { ReactToaster } from "@/components/ui/toaster";
import { Toaster } from "react-hot-toast";
import { SonnToaster } from "@/components/ui/sonner";
import Head from 'next/head'

const inter = Inter({ subsets: ["latin"] });
const Providers = ({ children }) => {
  const { theme, radius } = useThemeStore();

  return (
    <>
      <Head>
        <title>Nutrify.AI</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </Head>
      <body
        className={cn("dash-tail-app ", inter.className, "theme-" + theme)}
        style={{
          "--radius": `${radius}rem`,
        }}
      >
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <div className={cn("h-full  ")}>
            {children}
            <ReactToaster />
          </div>
          <Toaster />
          <SonnToaster />
        </ThemeProvider>
      </body>
    </>
  );
};

export default Providers;
