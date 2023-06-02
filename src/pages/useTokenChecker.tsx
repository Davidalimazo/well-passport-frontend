import { useEffect, useState } from "react";
import useAuth from "../utils/auth";

const useExpirationChecker = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const { logOut, user } = useAuth((state) => state);

  useEffect(() => {
    // const token = JSON.parse(window.localStorage.getItem("user") || "{}");
    if (user?.email) {
      const expirationTime = (user?.exp || 1) * 1000; // Convert expiration time to milliseconds
      setIsTokenExpired(expirationTime < Date.now());
      if (isTokenExpired) logOut();
    }
  }, [user?.email]);

  return isTokenExpired;
};

export default useExpirationChecker;
