import { FC } from "react";
import { Modal } from "@mantine/core";
import cautionImg from "../../assets/images/caution.png";

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  text: string;
}

const ErrorModal: FC<ViewModalProps> = ({ opened, close, text }) => {
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
