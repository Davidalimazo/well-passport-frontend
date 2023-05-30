import { FC } from "react";
import { Outlet } from "react-router-dom";

interface SettingsOutletProps {}

const SettingsOutlet: FC<SettingsOutletProps> = ({}) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default SettingsOutlet;
