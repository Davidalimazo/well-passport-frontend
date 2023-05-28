import { FC } from 'react';
import { Modal, Avatar } from '@mantine/core';
import Button from '../buttons/Button';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { ClientDataProp } from '@/pages/client';
import Image, { StaticImageData } from 'next/image';
import useSetField from '@/hooks/useSetField';
import router from 'next/router';
import { format } from 'date-fns';

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title: string;
  clientData: ClientDataProp | null;
}

const ViewModal: FC<ViewModalProps> = ({
  open,
  opened,
  close,
  title,
  clientData,
}) => {
  const setFieldFun = useSetField();
  const setFielD = (
    clientId: string | undefined,
    clientName: string | undefined
  ) => {
    setFieldFun.setField(clientId, clientName);
    router.push('/field');
  };

  const formattedDate = clientData?.createdDate
    ? format(new Date(clientData?.createdDate as string), 'dd-MM-yyyy')
    : '';
  return (
    <>
      <Modal radius={'md'} size="lg" opened={opened} onClose={close}>
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            {title}
          </div>
          <div className="flex flex-row items-center justify-center pb-8">
            {clientData?.image ? (
              <Image
                alt={clientData.name}
                src={clientData.image}
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
              children="Close"
              variant="filled"
              className="font-lekton h-[28px] w-[122px]"
              onClick={close}
            />
            <Button
              onClick={() => {
                setFielD(clientData?.id, clientData?.name);
                close();
              }}
              children="Fields"
              variant="outline_black"
              className="text-black font-lekton h-[28px] w-[122px]"
            />
          </div>
          <div className="pt-8 px-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <BsFillBuildingsFill className="text-gray-500" />
                  <span className="text-gray-400">Client Name</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.name}
                </div>
              </div>
              <div className="space-y-4 w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">Contact Person</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.contactPerson}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Mobile Number</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.mobile}
                </div>
              </div>
              <div className="space-y- w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Website</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8 underline">
                  {clientData?.website}
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Email</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.email}
                </div>
              </div>
              <div className="space-y-4 w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
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
                  <IoCall className="text-gray-500" />
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
