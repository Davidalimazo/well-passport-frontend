import React from "react";
import { MantineProvider, Text } from "@mantine/core";
import Header from "../Header";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div
        className="bg-[#E7E6E6]"
        style={{
          maxWidth: "1280px",
          background: "E7E6E6",
          marginLeft: "auto",
          marginRight: "auto",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Header />
        {children}
      </div>
    </MantineProvider>
  );
};
