import { MantineProvider } from "@mantine/core";
import Header from "../Header";
import { useEffect, useState } from "react";
import useAuth from "../../utils/auth";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { user, logOut } = useAuth((state) => state);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  useEffect(() => {
    const expire = (user?.exp || 1) * 1000;
    setIsTokenExpired(expire < Date.now() ? false : true);
 
    if (isTokenExpired) {
      logOut();
      location.reload();
    }
  }, [user?.exp]);

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
