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
import WellFieldList from "../../pages/Well";
import WellProjectList from "../../pages/Project";
import Settings from "../../pages/Settings";
import SettingsOutlet from "../../pages/SettingsOutlet";
import ChangePassword from "../../pages/ChangePassword";
import ReportList from "../../pages/Report";
import ViewReportComponent from "../../pages/ViewReport";
import ErrorPage from "../../pages/ErrorPage";
import Tokenized from "../../pages/Tokenized";
import UpdateAccount from "../../pages/UpdateAccount";

const AppRoutes = () => {
  const { user } = useAuth((state) => state);

  return (
    <>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route
          path="/home"
          element={
            user?.email ? (
              <Tokenized children={<Home />} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route
            path="client"
            element={<Tokenized children={<ClientOutlet />} />}
          >
            <Route index element={<ClientListUi />} />
            <Route path="field" element={<ClientFieldList />} />
            <Route path="well" element={<WellFieldList />} />
            <Route path="project" element={<WellProjectList />} />
            <Route path="report" element={<ReportList />} />
            <Route path="report/view" element={<ViewReportComponent />} />
          </Route>
          <Route path="field" element={<FieldListUI />} />
          <Route path="settings" element={<Settings />}>
            <Route path="set" element={<SettingsOutlet />}>
              <Route index element={<ChangePassword />} />
              <Route path="update-account" element={<UpdateAccount />} />
              <Route path="password" element={<ChangePassword />} />
            </Route>
            <Route path="*" element={<>No Route Here</>} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
