"use client";

import { FC } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { signIn } from "next-auth/react";

interface OAuthProps {
  open: () => void;
}

const OAuth: FC<OAuthProps> = ({ open }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center justify-center space-x-1">
        <span className="h-1 w-[40%] bg-[#C8CCC8]"></span>
        <span className="text-gray-400 w-[20%] text-center">OR With</span>
        <span className="flex-1 h-1 w-w-[40%]  bg-[#C8CCC8]"></span>
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-row items-center justify-center w-full">
          <button
            className="flex flex-row gap-2 items-center justify-center border border-[#C8CCC8] rounded-full p-3 w-full"
            onClick={() => signIn("google")}
          >
            <FcGoogle /> <span>Google</span>
          </button>
        </div>
        {/* <div className="flex flex-row items-center justify-center w-full">
          <button
            className="flex flex-row gap-2 items-center justify-center border border-[#C8CCC8] rounded-full p-3 w-full"
            onClick={open}
          >
            <MdEmail size={20} /> <span>Email</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default OAuth;
