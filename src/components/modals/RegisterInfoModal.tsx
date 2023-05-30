import { FC } from "react";
import { Modal } from "@mantine/core";
import Button from "../buttons/Button";
import successImg from "../../assets/images/success.png";
import { useNavigate } from "react-router-dom";

interface ViewModalProps {
  open: () => void;
  close: () => void;
  onDelete?: (id: string) => void;
  opened: boolean;
  text: string;
}

const RegisterModal: FC<ViewModalProps> = ({ opened, close, text }) => {
  const navigate = useNavigate();

  const refreshPage = () => {
    location.reload()
  };
  return (
    <>
      <Modal radius={"md"} size="lg" opened={opened} onClose={close}>
        <div className="space-y-6 pb-6">
          <div className="flex flex-row items-center justify-center">
            <img src={successImg} alt="caution image" />
          </div>
          <div className="text-center text-[18px] font-lekton font-semibold mb-12">
            {text}
          </div>

          <div className="space-x-4 flex flex-row items-center justify-center">
            <Button
              children="Cancel"
              variant="filled"
              className="w-[150px]"
              onClick={() => {
                close();
                navigate("/home");
              }}
            />
            <Button
              children={`Proceed`}
              variant="outline_red"
              className="w-[150px] text-red-500"
              onClick={() => refreshPage()}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RegisterModal;
