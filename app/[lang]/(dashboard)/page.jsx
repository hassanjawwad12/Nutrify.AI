"use client";
import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    window.location.assign("/dashboard");
  }, []);

  return <></>;
};

export default page;
