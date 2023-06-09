import { FC } from "react";
import { Modal, Avatar } from "@mantine/core";
import Button from "../buttons/Button";
import { BsCalendarEvent, BsFillBuildingsFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoCall, IoLocationSharp } from "react-icons/io5";
import { ClientDataProp, imageUrlChecker } from "../../pages/Client";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import useSetClient from "../../hooks/useSetClient";
import { TbWorldLongitude } from "react-icons/tb";
import { MdEmail } from "react-icons/md";

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title: string;
  clientData: ClientDataProp | null;
}

const ViewModal: FC<ViewModalProps> = ({
  opened,
  close,
  title,
  clientData,
}) => {
  const { setClient } = useSetClient((state) => state);
  const navigate = useNavigate();
  const setFielD = (
    clientId: string | undefined,
    clientName: string | undefined
  ) => {
    setClient(clientId, clientName);
    navigate("/home/client/field");
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
          <div className="flex flex-row items-center justify-center pb-4">
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
          <div className="my-4 flex items-center gap-2 text-center justify-center flex-wrap">
            <span className="text-sm">Client Rep Id:</span>
            <span className="font-semibold text-md">{clientData?.ownerId}</span>
          </div>
          <div className="flex flex-row gap-6 items-center justify-center">
            <Button
              children="Close"
              variant="filled"
              className="font-lekton h-[28px] w-[122px]"
              onClick={close}
            />
            <Button
              onClick={() => {
                setFielD(clientData?._id, clientData?.name);
                close();
              }}
              children="Fields"
              variant="outline_black"
              className="text-black font-lekton h-[28px] w-[122px]"
            />
          </div>
          <div className="pt-8 px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <BsFillBuildingsFill className="text-gray-500" />
                  <span className="text-gray-400">Client Name</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.name}
                </div>
              </div>
              <div className="space-y-4 w-full sm:w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">Contact Person</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.contactPerson}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center  justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Mobile Number</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.mobile}
                </div>
              </div>
              <div className="space-y-4 w-full sm:w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Website</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8 underline">
                  {clientData?.website}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <MdEmail className="text-gray-500" />
                  <span className="text-gray-400">Email</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.email}
                </div>
              </div>
              <div className="space-y-4 w-full sm:w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <BsCalendarEvent className="text-gray-500" />
                  <span className="text-gray-400">Created Date</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {formattedDate}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <IoLocationSharp className="text-gray-500" />
                  <span className="text-gray-400">Address</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewModal;
