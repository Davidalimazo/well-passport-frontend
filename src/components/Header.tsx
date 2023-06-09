import { FC, useEffect, useState } from "react";
import logo from "../assets/images/zaman.png";
import CustomMenu from "./CustomMenu";
import { AdminMenu, authMenu } from "../assets/JsonData/menu";
import { Avatar } from "@mantine/core";
import useAuth from "../utils/auth";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { imageUrlChecker } from "../pages/Client";
import { authRoutes } from "../utils/constants/api";
import axios from "axios";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const { user, token } = useAuth((state) => state);
  const [imageUrl, setImageUrl] = useState("");

  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(authRoutes + `/${user?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setImageUrl(response.data.image);
        })
        .catch((_) => {
          console.log("error getting image");
        });
    };
    getData();
  }, []);

  let menu = user?.email
    ? user.role === "ADMIN"
      ? AdminMenu
      : authMenu
    : null;
  return (
    <>
      <div className="h-[87px] bg-white px-6 w-full flex flex-row items-center justify-between">
        <Link to="/home">
          <img
            src={logo}
            height={46}
            width={133}
            alt="Zamam logo"
            className="cursor-pointer"
          />
        </Link>

        <div className="flex flex-row items-center justify-between gap-3">
          {location.pathname !== "/login" ? (
            <>
              <span className="font-semibold text-lg font-lekton hidden sm:block">
                {user?.email ? (
                  `${user?.firstName + " " + user?.lastName}`
                ) : (
                  <Link
                    to="/login"
                    className="no-underline flex items-center gap-2"
                  >
                    <FaUser /> <span>Log In</span>
                  </Link>
                )}
              </span>
              {menu && (
                <CustomMenu
                  button={
                    imageUrl.length > 0 ? (
                      <Avatar
                        radius="xl"
                        size="lg"
                        color="blue"
                        className="cursor-pointer uppercase"
                        src={imageUrlChecker(imageUrl)}
                      />
                    ) : (
                      <Avatar
                        radius="xl"
                        size="lg"
                        color="blue"
                        className="cursor-pointer uppercase"
                      >
                        {user?.firstName[0] + "" + user?.lastName[0]}
                      </Avatar>
                    )
                  }
                  options={menu}
                />
              )}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Header;
