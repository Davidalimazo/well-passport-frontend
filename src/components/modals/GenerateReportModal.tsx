import { FC } from 'react';
import { Modal, Input } from '@mantine/core';
import Button from '../buttons/Button';
import { ProjectDataProp } from '@/pages/project';
import { HiDocumentText } from 'react-icons/hi';
import { MdDateRange } from 'react-icons/md';
import { GiField, GiHobbitDwelling } from 'react-icons/gi';
import { GrStatusUnknown } from 'react-icons/gr';

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
}

const GenerateReportModal: FC<ViewModalProps> = ({ open, opened, close }) => {
  return (
    <>
      <Modal radius={'md'} size="lg" opened={opened} onClose={close}>
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            GENERATE REPORT
          </div>
          <div className="pt-8 px-2 sm:px-6 md:px-6 lg:px-6">
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GiField className="text-gray-500" />
                  <span className="text-gray-400">Name</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input radius="lg" size="md" />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3 w-full">
                  <GrStatusUnknown className="text-gray-500" />
                  <span className="text-gray-400">Status</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input radius="lg" size="md" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">Start Date</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input radius="lg" size="md" />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3 w-full">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">End Date</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input radius="lg" size="md" />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GiHobbitDwelling className="text-gray-500" />
                  <span className="text-gray-400">Save As</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input radius="lg" size="md" />
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

export default GenerateReportModal;
