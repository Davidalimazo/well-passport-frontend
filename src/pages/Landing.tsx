import { FC } from "react";
import { homePageData } from "../assets/JsonData/home";
import { Link } from "react-router-dom";

interface LandingProps {}

const Landing: FC<LandingProps> = ({}) => {
  return (
    <div className="mt-24 px-12">
      <div className={`flex flex-row items-center justify-between flex-wrap `}>
        {homePageData.map(({ id, img, title, link }) => (
          <Link
            to={link}
            className={`w-full sm:w-[40%] h-[294px] bg-white rounded-md flex flex-col items-center justify-center gap-6 mb-4 hover:ring-1 hover:ring-red-500
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
