import React from "react";
import { useSidebar, useThemeStore } from "@/store";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileFooter from "./mobile-footer";
import FooterLayout from "./footer-layout";
import { useMounted } from "@/hooks/use-mounted";

const Footer = ({ handleOpenSearch }) => {
  const { collapsed, sidebarType } = useSidebar();
  const { layout, footerType } = useThemeStore();
  const mounted = useMounted();
  const isMobile = useMediaQuery("(min-width: 768px)");

  if (!mounted) {
    return null;
  }
  if (!isMobile && sidebarType === "module") {
    return <MobileFooter handleOpenSearch={handleOpenSearch} />;
  }

  if (footerType === "hidden") {
    return null;
  }

  if (layout === "semibox") {
    return (
      <div className="xl:mx-20 mx-6">
        <FooterLayout
          className={cn(" rounded-md border", {
            "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
            "ltr:xl:ml-[272px] rtl:xl:mr-[272px]": !collapsed,
            "sticky bottom-0": footerType === "sticky",
          })}
        >
          <FooterContent />
        </FooterLayout>
      </div>
    );
  }
  if (sidebarType !== "module" && layout !== "horizontal") {
    return (
      <FooterLayout
        className={cn("", {
          "ltr:xl:ml-[248px] rtl:xl:mr-[248px]": !collapsed,
          "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
          "sticky bottom-0": footerType === "sticky",
        })}
      >
        <FooterContent />
      </FooterLayout>
    );
  }

  if (layout === "horizontal") {
    return (
      <FooterLayout
        className={cn("", {
          "sticky bottom-0": footerType === "sticky",
        })}
      >
        <FooterContent />
      </FooterLayout>
    );
  }

  return (
    <FooterLayout
      className={cn("", {
        "ltr:xl:ml-[300px] rtl:xl:mr-[300px]": !collapsed,
        "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
        "sticky bottom-0": footerType === "sticky",
      })}
    >
      <FooterContent />
    </FooterLayout>
  );
};

export default Footer;

const FooterContent = () => {
  return (
    <div className="block md:flex md:justify-between text-muted-foreground">
      <p className="sm:mb-0 text-xs md:text-sm">
        COPYRIGHT © {new Date().getFullYear()} Nutrify.ai All rights Reserved
      </p>
      {/* <p className="mb-0 text-xs md:text-sm">
        Hand-crafted & Made by{" "}
        <a
          className="text-primary"
          target="__blank"
          href="https://codeshaper.net"
        >
          Codeshaper
        </a>
      </p> */}
    </div>
  );
};
