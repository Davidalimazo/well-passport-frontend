import { FC } from "react";
import useAuth from "../utils/auth";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";

export const checkAuth = (
  expire: number | undefined,
  cb: Function
): boolean => {
  if (expire && expire * 1000 > Date.now()) return true;
  else {
    cb();
    return false;
  }
};

const Tokenized: FC = () => {
  const { logOut, user } = useAuth((state) => state);

  return checkAuth(user?.exp, logOut) ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Tokenized;
