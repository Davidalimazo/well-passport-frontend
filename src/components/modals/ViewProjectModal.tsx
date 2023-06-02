import { FC } from "react";
import { Modal, Avatar } from "@mantine/core";
import Button from "../buttons/Button";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { ProjectDataProp } from "../../pages/Project";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import useSetProject from "../../hooks/useSetProject";
import { imageUrlChecker } from "../../pages/Client";

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title: string;
  clientData: ProjectDataProp | null;
}

const ViewProjectModal: FC<ViewModalProps> = ({
  opened,
  close,
  title,
  clientData,
}) => {
  const navigate = useNavigate();
  const { setProject } = useSetProject((state) => state);
  const setFielD = (
    projectId: string | undefined,
    projectName: string | undefined
  ) => {
    setProject(projectId, projectName);
    navigate("/home/client/report");
  };

  const formattedDate = clientData?.createdAt
    ? format(new Date(clientData?.createdAt as string), "dd-MM-yyyy")
    : "";

  return (
    <>
      <Modal radius={"md"} size="lg" opened={opened} onClose={close}>
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            {title}
          </div>
          <div className="flex flex-row items-center justify-center pb-8">
            {clientData?.image ? (
              <img
                alt={clientData.name}
                src={imageUrlChecker(clientData.image)}
                height={99}
                width={99}
                className="rounded-full"
              />
            ) : (
              <Avatar
                radius="xl"
                size="xl"
                color="blue"
                className="text-center rounded-full"
              >
                {clientData?.name.slice(0, 2).toUpperCase()}
              </Avatar>
            )}
          </div>
          <div className="flex flex-row gap-6 items-center justify-center">
            <Button
              onClick={close}
              children="Close"
              variant="filled"
              className="text-white font-lekton h-[28px] w-[122px]"
            />
            <Button
              children="Reports"
              variant="outline_black"
              className="font-lekton h-[28px] w-[122px] text-black"
              onClick={() => setFielD(clientData?._id, clientData?.name)}
            />
          </div>
          <div className="pt-8 px-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <BsFillBuildingsFill className="text-gray-500" />
                  <span className="text-gray-400">Name</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.name}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">Status</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.status}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Rig</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.rig}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <BsFillBuildingsFill className="text-gray-500" />
                  <span className="text-gray-400">Start Date</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.startDate
                    ? format(
                        new Date(clientData?.startDate as string),
                        "dd-MM-yyyy"
                      )
                    : ""}
                  {}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">End Date</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.endDate
                    ? format(
                        new Date(clientData?.endDate as string),
                        "dd-MM-yyyy"
                      )
                    : ""}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Description</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.description}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Created Date</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {formattedDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewProjectModal;
