import { FC } from "react";
import logo from "../assets/images/zaman.png";
import CustomMenu from "./CustomMenu";
import { AdminMenu, authMenu } from "../assets/JsonData/menu";
import { Avatar } from "@mantine/core";
import useAuth from "../utils/auth";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const user = useAuth((state) => state.user);
  let menu = user?.email
    ? user.email === "Admin"
      ? AdminMenu
      : authMenu
    : null;
  return (
    <>
      <div className="h-[87px] bg-white px-6 w-full flex flex-row items-center justify-between">
        <img src={logo} height={46} width={133} alt="Zamam logo" />
        <div className="flex flex-row items-center justify-between gap-3">
          <span className="font-semibold text-lg font-lekton">
            {user?.email ? (
              `${user.firstName + " " + user.lastName}`
            ) : (
              <Link to="/login" className="no-underline">
                Log In
              </Link>
            )}
          </span>
          {menu && (
            <CustomMenu
              button={
                <Avatar
                  radius="xl"
                  size="lg"
                  color="blue"
                  className="cursor-pointer uppercase"
                >
                  {user?.firstName[0] + "" + user?.lastName[0]}
                </Avatar>
              }
              options={menu}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
