import { FC } from "react";
import { Modal } from "@mantine/core";
import Button from "../buttons/Button";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import cautionImg from "../../assets/images/caution.png";

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  text: string;
}

const ErrorModal: FC<ViewModalProps> = ({ open, opened, close, text }) => {
  return (
    <>
      <Modal radius={"md"} size="md" opened={opened} onClose={close}>
        <div className="space-y-6 pb-6">
          <div className="flex flex-row items-center justify-center">
            <img src={cautionImg} alt="caution image" />
          </div>
          <div className="text-center text-[18px] font-lekton font-semibold mb-12">
            {text}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ErrorModal;
