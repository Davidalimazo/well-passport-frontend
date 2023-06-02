import { FC } from "react";
import lost from "../../assets/images/tokenExpiredImg.png";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";

interface TokenExpiredProps {}

const TokenExpired: FC<TokenExpiredProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <img
          src={lost}
          className="w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] hover:animate-bounce"
          alt="token expired"
        />
        <div className="text-center mt-3 font-jarkata font-bold">
          Your token has expired
        </div>
        <Button
          children="Login"
          className="mt-2"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
};

export default TokenExpired;
