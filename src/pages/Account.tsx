import { FC } from "react";
import useAuth from "../utils/auth";
import { Group } from "@mantine/core";
import { UPLOADS } from "../utils/constants/api";

interface AccountProps {}

const Account: FC<AccountProps> = ({}) => {
  const { user } = useAuth((state) => state);

  console.log(UPLOADS + user?.image);
  return (
    <div className="mt-10">
      <Group position="center">
        <div className="bg-white p-10">
          <div className="h-[250px] overflow-hidden">
            <img
              src={UPLOADS + user?.image}
              alt=""
              className="bg-transparent object-cover h-full"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-row items-center justify-between bg-gray-200 p-3 gap-4">
            <div className="font-urbanist">
              <p className="">Role</p>
              <div className="font-bold">{user?.role}</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mt-2 bg-gray-200 p-3 gap-4">
            <div className="font-urbanist">
              <p className="">First Name</p>
              <div className="font-bold">{user?.firstName}</div>
            </div>
            <div className="font-urbanist">
              <p className="">Last Name</p>
              <div className="font-bold">{user?.lastName}</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between bg-gray-200 p-3 gap-4">
            <div className="font-urbanist">
              <p className="">Email</p>
              <div className="font-bold">{user?.email}</div>
            </div>
          </div>
        </div>
      </Group>
    </div>
  );
};

export default Account;
