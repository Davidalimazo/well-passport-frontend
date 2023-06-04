import { FC, useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import useAuth from "../utils/auth";
import axios from "axios";
import UploadDocs from "../components/UploadDoc";
import { apiRoutes, authRoutes } from "../utils/constants/api";
import ErrorModal from "../components/modals/ErrorModal";
import { useDisclosure } from "@mantine/hooks";
import { imageUrlChecker } from "./Client";

interface UpdateAccountProps {}

const UpdateAccount: FC<UpdateAccountProps> = ({}) => {
  const { user, token } = useAuth((state) => state);
  const [file, setFile] = useState<any>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

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
          setErrorMsg("Could not get user image");
          setError(true);
          open();
        });
    };
    getData();
  }, []);

  const handleSubmit = () => {
    if (file?.file) {
      const formData = new FormData();
      formData.append("file", file?.file);

      axios
        .patch(apiRoutes.uploadProfileImg + `${user?._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setErrorMsg(response.data.message);
          setError(false);
          open();
          // Handle successful response
        })
        .catch((error) => {
          setErrorMsg("Could not upload image: " + error.message);
          setError(true);
          open();
        });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        {file?.file ? (
          file.path.map((path: string) => (
            <img
              src={path}
              alt=""
              className="h-[150px] w-[150px] mb-6 rounded-full"
            />
          ))
        ) : (
          <img
            src={imageUrlChecker(imageUrl)}
            alt=""
            className="h-[150px] w-[150px] mb-6 rounded-full"
          />
        )}

        <UploadDocs
          name={`${imageUrl ? "Change Profile Image" : "Upload Profile Image"}`}
          setFile={setFile}
          file={file}
        />

        <Button
          children="Submit"
          variant={`${file?.file ? "outline_black" : "pressed"}`}
          className="text-black mt-4"
          disabled={file?.file ? false : true}
          onClick={handleSubmit}
        />
      </div>
      <ErrorModal
        text={errorMsg}
        open={open}
        opened={opened}
        close={close}
        isError={error}
      />
    </div>
  );
};

export default UpdateAccount;
