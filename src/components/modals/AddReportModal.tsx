import { FC } from 'react';
import { Modal, Input } from '@mantine/core';
import Button from '../buttons/Button';
import { ProjectDataProp } from '@/pages/project';
import { HiDocumentText } from 'react-icons/hi';
import { MdDateRange } from 'react-icons/md';
import { GiField, GiHobbitDwelling } from 'react-icons/gi';
import { IoDocumentText } from 'react-icons/io5';
import { FaCloudUploadAlt, FaUser } from 'react-icons/fa';

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
}

const AddReportModal: FC<ViewModalProps> = ({ open, opened, close }) => {
  return (
    <>
      <Modal radius={'md'} size="lg" opened={opened} onClose={close}>
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            ADD NEW REPORT
          </div>
          <div className="pt-8 px-2 sm:px-6 md:px-6 lg:px-6">
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <IoDocumentText className="text-gray-500" />
                  <span className="text-gray-400">Name</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input radius="lg" size="md" />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3 w-full">
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">Auhor</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input radius="lg" size="md" />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="space-y-4 bg-[#F0F0F0] h-[151px] w-full flex flex-row items-center justify-center">
                <div className="text-center space-y-1 text-sm font-lekton">
                  <div className="flex flex-row items-center justify-center">
                    <FaCloudUploadAlt className="" size={30} />
                  </div>
                  <div className="">Click here to upload logo</div>
                  <div className="">OR</div>
                  <div className="">Drag Logo Here</div>
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

export default AddReportModal;
