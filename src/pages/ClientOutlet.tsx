import { FC } from "react";
import { Outlet } from "react-router-dom";

interface ClientOutletProps {}

const ClientOutlet: FC<ClientOutletProps> = ({}) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ClientOutlet;
