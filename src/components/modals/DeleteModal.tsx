import { FC } from 'react';
import { Modal, Avatar } from '@mantine/core';
import Button from '../buttons/Button';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import cautionImg from '@/assets/images/caution.png';
import Image from 'next/image';

interface ViewModalProps {
  open: () => void;
  close: () => void;
  onDelete: (id: string) => void;
  opened: boolean;
  text: string;
  id: string;
}

const DeleteModal: FC<ViewModalProps> = ({
  open,
  opened,
  close,
  text,
  onDelete,
  id,
}) => {
 
  return (
    <>
      <Modal radius={'md'} size="lg" opened={opened} onClose={close}>
        <div className="space-y-6 pb-6">
          <div className="flex flex-row items-center justify-center">
            <Image src={cautionImg} alt="caution image" />
          </div>
          <div className="text-center text-[18px] font-lekton font-semibold mb-12">
            {text}
          </div>

          <div className="space-x-4 flex flex-row items-center justify-center">
            <Button
              children="Cancel"
              variant="filled"
              className="w-[150px]"
              onClick={close}
            />
            <Button
              children="Proceed"
              variant="outline_red"
              className="text-red-500 w-[150px]"
              onClick={() => onDelete(id)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
