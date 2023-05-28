import { FC } from "react";
import { Outlet } from "react-router-dom";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  return <Outlet />;
};

export default Home;
