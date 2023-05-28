import { FC } from 'react';
import { Modal, Avatar, Input } from '@mantine/core';
import Button from '../buttons/Button';
import { GiField, GiHobbitDwelling } from 'react-icons/gi';
import { FaCloudUploadAlt, FaUser } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { TbWorldLongitude } from 'react-icons/tb';
import { MdDateRange } from 'react-icons/md';
import { FcInspection } from 'react-icons/fc';
import { CgSize } from 'react-icons/cg';
import { GrStatusUnknown } from 'react-icons/gr';
import { BiTestTube } from 'react-icons/bi';
import { BsEvStationFill } from 'react-icons/bs';
import { WellDataProp } from '@/pages/wells';

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title?: string;
  isEdit?: boolean;
  clientData?: WellDataProp | null;
}

const AddWellModal: FC<ViewModalProps> = ({
  open,
  opened,
  close,
  title,
  isEdit,
  clientData,
}) => {
  return (
    <>
      <Modal radius={'md'} size="lg" opened={opened} onClose={close}>
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            {title}
          </div>
          <div className="pt-8 px-2 sm:px-6 md:px-6 lg:px-6">
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GiField className="text-gray-500" />
                  <span className="text-gray-400">Well Name</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? clientData?.name : ''}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <GiHobbitDwelling className="text-gray-500" />
                  <span className="text-gray-400">Well Type</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? String(clientData?.wellType) : ''}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Longitude</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? String(clientData?.longitude) : ''}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Latitude</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? String(clientData?.latitude) : ''}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <FcInspection className="text-gray-500" />
                  <span className="text-gray-400">Tree Specs</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? clientData?.treeSpecs : ''}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">First Production Date</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? clientData?.firstProductionDate : ''}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GrStatusUnknown className="text-gray-500" />
                  <span className="text-gray-400">Current Status</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? clientData?.currentStatus : ''}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <BiTestTube className="text-gray-500" />
                  <span className="text-gray-400">Total Depth</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? clientData?.totalDepth : ''}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <BiTestTube className="text-gray-500" />
                  <span className="text-gray-400">Turbing Size</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? String(clientData?.turbingSize) : ''}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <BsEvStationFill className="text-gray-500" />
                  <span className="text-gray-400">Flow Station</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? clientData?.flowStation : ''}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">Spud Date</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? String(clientData?.spudDate) : ''}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">Initial Completion Date</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={
                      isEdit ? clientData?.initialCompletionDate : ''
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <BiTestTube className="text-gray-500" />
                  <span className="text-gray-400">Bit Size</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? String(clientData?.bitSize) : ''}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <BiTestTube className="text-gray-500" />
                  <span className="text-gray-400">Casing</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? String(clientData?.casing) : ''}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="space-y-4 bg-[#F0F0F0] h-[151px] w-full flex flex-row items-center justify-center">
                <div className="text-center space-y-1 text-sm font-lekton">
                  <div className="flex flex-row items-center justify-center">
                    <FaCloudUploadAlt className="" size={30} />
                  </div>
                  <div className="">Click here to upload well image</div>
                  <div className="">OR</div>
                  <div className="">Drag Image Here</div>
                </div>
              </div>
            </div>
            <div className="mb-4 w-full flex flex-row items-center justify-center mt-8">
              <Button children="Submit" className="font-lekton" type="submit" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddWellModal;
