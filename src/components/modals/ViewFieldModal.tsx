import { FC } from 'react';
import { Modal, Avatar } from '@mantine/core';
import Button from '../buttons/Button';
import { FaUser } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import Image from 'next/image';
import router from 'next/router';
import { FieldDataProp } from '@/pages/field';
import { TbWorldLongitude } from 'react-icons/tb';
import { AiTwotoneMail } from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';
import { GiField, GiHobbitDwelling } from 'react-icons/gi';
import useSetWells from '@/hooks/useSetWells';

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title: string;
  clientData: FieldDataProp | null;
}

const ViewFieldModal: FC<ViewModalProps> = ({
  open,
  opened,
  close,
  title,
  clientData,
}) => {
  const setFieldFun = useSetWells();
  const setFielD = (field: string | undefined) => {
    setFieldFun.setField(field);
    router.push('/wells');
  };
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
              children="Wells"
              variant="filled"
              className="font-lekton h-[28px] w-[122px]"
              onClick={() => setFielD(clientData?.name)}
            />
            <Button
              onClick={() => null}
              children="Action"
              variant="outline_black"
              className="text-black font-lekton h-[28px] w-[122px]"
            />
          </div>
          <div className="pt-8 px-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GiField className="text-gray-500" />
                  <span className="text-gray-400">Field Name</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.name}
                </div>
              </div>
              <div className="space-y-4 w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <GiHobbitDwelling className="text-gray-500" />
                  <span className="text-gray-400">Number of wells</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.numberOfWells}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Longitude</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.longitude}
                </div>
              </div>
              <div className="space-y-4 w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Latitude</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.latitude}
                </div>
              </div>
            </div>
            <div className="my-4 text-gray-400 gap-2 flex flex-row">
              <FaUser /> <span>Superintendent</span>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">Name</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.superintendent.name}
                </div>
              </div>
              <div className="space-y-4 w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Mobile</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.superintendent.mobileNo}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <AiTwotoneMail className="text-gray-500" />
                  <span className="text-gray-400">Email</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.superintendent.email}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">Created Date</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.createdDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewFieldModal;
