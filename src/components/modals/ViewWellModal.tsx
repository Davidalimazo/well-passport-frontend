import { FC } from 'react';
import { Modal, Avatar } from '@mantine/core';
import Button from '../buttons/Button';
import { FaUser } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import Image from 'next/image';
import router from 'next/router';
import { TbWorldLongitude } from 'react-icons/tb';
import { MdDateRange } from 'react-icons/md';
import { FcInspection } from 'react-icons/fc';
import { CgSize } from 'react-icons/cg';
import { GrStatusUnknown } from 'react-icons/gr';
import { BiTestTube } from 'react-icons/bi';
import { BsEvStationFill } from 'react-icons/bs';
import { GiField, GiHobbitDwelling } from 'react-icons/gi';
import { WellDataProp } from '@/pages/wells';
import useSetProject from '@/hooks/useSetProject';

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title: string;
  clientData: WellDataProp | null;
}

const ViewWellModal: FC<ViewModalProps> = ({
  open,
  opened,
  close,
  title,
  clientData,
}) => {
  const setFieldFun = useSetProject();
  const setFielD = (field: string | undefined) => {
    setFieldFun.setField(field);
    router.push('/project');
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
              children="Projects"
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
                  <span className="text-gray-400">Well Name</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.name}
                </div>
              </div>
              <div className="space-y-4 w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <GiHobbitDwelling className="text-gray-500" />
                  <span className="text-gray-400">Well Type</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.wellType}
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
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <FcInspection className="text-gray-500" />
                  <span className="text-gray-400">Tree Specs</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.treeSpecs}
                </div>
              </div>
              <div className="space-y-4 w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <CgSize className="text-gray-500" />
                  <span className="text-gray-400">Bit Size</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.bitSize}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GrStatusUnknown className="text-gray-500" />
                  <span className="text-gray-400">Current Status</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.currentStatus}
                </div>
              </div>
              <div className="space-y-4 w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <BiTestTube className="text-gray-500" />
                  <span className="text-gray-400">Tree Depth</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.totalDepth}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <BiTestTube className="text-gray-500" />
                  <span className="text-gray-400">Turbing Size</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.turbingSize}
                </div>
              </div>
              <div className="space-y-4 w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <BsEvStationFill className="text-gray-500" />
                  <span className="text-gray-400">Flow station</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.flowStation}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">Spud Date</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.spudDate}
                </div>
              </div>
              <div className="space-y-4 w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">Initial Completion Date</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.initialCompletionDate}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">First Production Date</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.firstProductionDate}
                </div>
              </div>
              <div className="space-y-4 w-2/5">
                <div className="flex flex-row items-center gap-3">
                  <BiTestTube className="text-gray-500" />
                  <span className="text-gray-400">Casing</span>
                </div>
                <div className="text-lg font-lekton font-bold pl-8">
                  {clientData?.casing}
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

export default ViewWellModal;
