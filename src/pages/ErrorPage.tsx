import { FC } from "react";
import Button from "../components/buttons/Button";
import lost from "../assets/images/lost.png";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {}

const ErrorPage: FC<ErrorPageProps> = ({}) => {
  const naviagte = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full h-screen sm:w-[50vw] sm:h-[100vh] bg-red-500">
        <div className="grid place-content-center mt-10 sm:mt-[50%]">
          <div className="text-[140px] text-white font-lekton font-bold text-center">
            404
          </div>
          <div className="text-center text-1xl text-white mb-2 font-jarkata">
            The page is not found
          </div>
          <Button
            children="Bact to home"
            variant="filled"
            onClick={() => naviagte("/home", { replace: true })}
          />
        </div>
      </div>
      <div className="hidden sm:block w-[50vw] h-[100vh] bg-red-400">
        <div className="grid place-content-center mt-[50%]">
          <div className="text-[140px] text-white font-lekton font-bold text-center">
            <img
              className="hover:animate-bounce ease-in-out 5s"
              src={lost}
              height={250}
              width={250}
              alt="lost smiley"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
