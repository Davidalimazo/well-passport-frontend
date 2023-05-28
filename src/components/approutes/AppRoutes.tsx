import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import useAuth from "../../utils/auth";
import { Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import SplashScreen from "../SplashScreen";
import Landing from "../../pages/Landing";

const AppRoutes = () => {
  const auth = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route
          path="/home"
          element={
            auth.user?.email ? <Home /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Landing />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
