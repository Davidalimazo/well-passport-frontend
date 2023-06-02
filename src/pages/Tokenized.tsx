import { FC, ReactNode, useEffect, useState } from "react";
import useAuth from "../utils/auth";
import { Navigate } from "react-router-dom";

interface TokenizedProps {
  children: ReactNode;
}

const Tokenized: FC<TokenizedProps> = ({ children }) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const { logOut, user } = useAuth((state) => state);
  useEffect(() => {
    // const token = JSON.parse(window.localStorage.getItem("user") || "{}");
    if (user?.email) {
      const expirationTime = (user?.exp || 1) * 1000; // Convert expiration time to milliseconds
      setIsTokenExpired(expirationTime < Date.now());
    }
    if (isTokenExpired) clearToken;
  }, [user?.email]);

  const clearToken = () => {
    logOut();
    location.reload();
  };
  return isTokenExpired ? <Navigate to="/login" /> : <>{children}</>;
};

export default Tokenized;
