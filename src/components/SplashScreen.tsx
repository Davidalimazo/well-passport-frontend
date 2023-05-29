import { useEffect } from "react";
import logoImg from "../assets/images/favicon-plain.png";
import loadingImg from "../assets/images/loading.png";
import Spinner from "../utils/spinner/Spinner";
import useAuth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function SplashScreen() {
  const navigate = useNavigate();

  const auth = useAuth((state) => state.user);

  useEffect(() => {
    const loader = async () => {
      await new Promise(() =>
        setTimeout(() => {
          if (auth?.email) navigate("/home");
          else navigate("/login");
        }, 4000)
      );
    };
    loader();
  }, []);

  return (
    <>
      <Helmet>
        <title key="pagetitle">Zamam Well passport | Welcome</title>
        <meta
          name="description"
          content="Zamam Well passport application"
          key="metadescription"
        />
      </Helmet>
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-center relative">
        <div className="">
          <img
            alt="Zamam Well passport logo"
            className="animate-pulse"
            src={logoImg}
            height={82}
            width={150}
          />
        </div>
        <Spinner imageUri={loadingImg} />
      </div>
    </>
  );
}
