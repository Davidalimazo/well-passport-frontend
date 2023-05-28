"use client";

import { useState, useEffect } from "react";

const useWindowSize = () => {
  let WINDOW;
  if (typeof window !== "undefined") {
    WINDOW = window;
  }
  const [state, setstate] = useState(WINDOW?.innerWidth || 1024);
  const setWidth = () => {
    setstate(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", setWidth);
    return () => window.removeEventListener("resize", setWidth);
  });
  return state;
};

export default useWindowSize;
