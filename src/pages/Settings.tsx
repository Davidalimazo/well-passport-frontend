import { FC, useState } from "react";
import { Helmet } from "react-helmet-async";
import { sidebarActions } from "../assets/JsonData/menu";
import { Link } from "react-router-dom";
import SettingsOutlet from "./SettingsOutlet";

interface SettingsProps {}

const Settings: FC<SettingsProps> = ({}) => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <Helmet>
        <title key="pagetitle">Zamam Well Passport | Wells</title>
        <meta
          name="description"
          content="Zamam Well Passport application"
          key="metadescription"
        />
      </Helmet>
      <div className="overflow-x-hidden bg-[#E7E6E6]">
        <div className="mt-8 flex flex-row gap-3 px-3 sm:px-6">
          <div className="w-[20%] bg-white rounded-md shadow-md hidden sm:block min-h-3/4">
            <div className="px-3 pt-6 flex flex-col gap-4">
              {sidebarActions.map(({ id, text, icon, link }) => (
                <div
                  className={`py-2 flex flex-row items-center gap-2 text-lg px-2 ${
                    index === id ? "bg-red-500 text-white rounded-md" : ""
                  }`}
                  key={id}
                  onClick={() => setIndex(id)}
                >
                  {icon}
                  <Link to={link} className="font-urbanist">
                    {text}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full min-h-[80vh] sm:w-[80%] bg-[#F5F5F5] p-3 rounded-md shadow-md overflow-hidden">
            <SettingsOutlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
