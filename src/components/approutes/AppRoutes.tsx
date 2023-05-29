import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import useAuth from "../../utils/auth";
import { Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import SplashScreen from "../SplashScreen";
import Landing from "../../pages/Landing";
import ClientListUi from "../../pages/Client";
import FieldListUI from "../../pages/Fields";
import ClientOutlet from "../../pages/ClientOutlet";
import ClientFieldList from "../../pages/ClientField";

const AppRoutes = () => {
  const { user } = useAuth((state) => state);

  return (
    <>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route
          path="/home"
          element={user?.email ? <Home /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="client" element={<ClientOutlet />}>
            <Route index element={<ClientListUi />} />
            <Route path="field" element={<ClientFieldList />} />
          </Route>
          <Route path="field" element={<FieldListUI />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
