import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdDeleteForever, MdOutlineUpdate, MdRecycling } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";

export const settingsData = ["View Profile", "KYC"];

export const AdminMenu = [
  {
    id: 0,
    icon: <IoMdSettings />,
    text: "Settings",
    color: "",
    link: "/home/settings/set/",
  },
  {
    id: 1,
    icon: <FaUser />,
    text: "Create Account",
    color: "",
    link: "/home/register",
  },
  {
    id: 2,
    icon: <MdRecycling />,
    text: "Recycle Bin",
    color: "",
    link: "/home/recycle",
  },
  {
    id: 3,
    icon: <AiOutlineLogin />,
    text: "Log Out",
    color: "#D72617",
    link: "/login",
  },
];
export const authMenu = [
  {
    id: 0,
    icon: <IoMdSettings />,
    text: "Settings",
    color: "",
    link: "/home/settings",
  },
  {
    id: 1,
    icon: <AiOutlineLogin />,
    text: "Log Out",
    color: "#D72617",
    link: "/login",
  },
];

export const sidebarActions = [
  {
    id: 0,
    icon: <RiLockPasswordFill />,
    text: "Change Password",
    link: "/home/settings/set",
  },
  {
    id: 1,
    icon: <MdOutlineUpdate />,
    text: "Update Account",
    link: "/home/settings/set/update-account",
  },
  {
    id: 3,
    icon: <MdDeleteForever />,
    text: "Delete Account",
    link: "/home/settings/set/delete-account",
  },
];
