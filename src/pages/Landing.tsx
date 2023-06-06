import { FC } from "react";
import { homePageData, homePageDataClient } from "../assets/JsonData/home";
import { Link } from "react-router-dom";
import useAuth from "../utils/auth";

interface LandingProps {}

const Landing: FC<LandingProps> = ({}) => {
  const { user } = useAuth((state) => state);

  let data;

  if (user?.role === "ADMIN" || user?.role === "USER") {
    data = homePageData;
  } else {
    data = homePageDataClient;
  }

  return (
    <div className="mt-10 px-12">
      <div
        className={`flex flex-row items-center justify-center flex-wrap gap-3`}
      >
        {data.map(({ id, img, title, link }) => (
          <Link
            to={link}
            className={`w-full sm:w-[30%] h-[264px] bg-white rounded-md flex flex-col items-center justify-center gap-6 mb-4 hover:ring-1 hover:ring-red-500
            `}
            key={id}
          >
            <img src={img} alt="user image" />
            <p className="font-lekton font-bold text-lg">{title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Landing;
