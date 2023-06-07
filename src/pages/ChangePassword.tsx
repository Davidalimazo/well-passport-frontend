import axios from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { apiRoutes } from "../utils/constants/api";
import useAuth from "../utils/auth";
import ErrorModal from "../components/modals/ErrorModal";
import { useDisclosure } from "@mantine/hooks";
import { Button, Input, PasswordInput } from "@mantine/core";
import { RiLockPasswordFill } from "react-icons/ri";

interface FieldsValues {
  oldPasswod: string;
  newPassword: string;
}

interface ChangePasswordProps {}

const ChangePassword: FC<ChangePasswordProps> = ({}) => {
  const { register, handleSubmit, formState } = useForm<FieldsValues>();
  const { errors, isDirty, isValid, isSubmitting } = formState;
  const [opened, { open, close }] = useDisclosure(false);

  const [errorText, setErrortext] = useState("");

  const [isError, setIsError] = useState(false);

  const { token, user } = useAuth((state) => state);

  const onSubmit = async (data: FieldsValues) => {
    let { oldPasswod, newPassword } = data;

    await axios
      .patch(
        apiRoutes.changePassword + `${user?._id}`,
        {
          oldPasswod,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((_) => {
        setErrortext("Password changed successfully");
        setIsError(false);
        open();
      })
      .catch((err) => {
        setErrortext("Error changing password: " + err.message);
        setIsError(true);
        open();
      });
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-row items-center justify-center">
        <form
          className="flex bg-white flex-col gap-4 p-8 rounded-md shadow-md w-full sm:w-2/4 mt-24"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <div className="text-center font-jarkata font-bold">
            CHANGE PASSWORD
          </div>
          <Input.Wrapper
            id="oldPasswod"
            error={errors.oldPasswod?.message}
            className="w-full"
          >
            <PasswordInput
              icon={<RiLockPasswordFill />}
              size="xl"
              id="oldPasswod"
              placeholder="Old Passwod"
              radius="xl"
              {...register("oldPasswod", {
                required: {
                  value: true,
                  message: "old passwod is required",
                },
              })}
              error={
                errors.oldPasswod?.message &&
                errors.oldPasswod.message.length > 0
              }
            />
          </Input.Wrapper>
          <Input.Wrapper
            id="oldPasswod"
            error={errors.newPassword?.message}
            className="w-full"
          >
            <PasswordInput
              icon={<RiLockPasswordFill />}
              size="xl"
              id="newPassword"
              placeholder="New Password"
              radius="xl"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "new password is required",
                },
              })}
              error={
                errors.newPassword?.message &&
                errors.newPassword.message.length > 0
              }
            />
          </Input.Wrapper>
          <div className="flex flex-row items-center justify-center">
            <Button
              children="Submit"
              type="submit"
              className={`w-full py-2 rounded-xl bg-red-500 text-white`}
              variant={
                !isDirty || !isValid || isSubmitting ? "pressed" : "default"
              }
              disabled={!isDirty || !isValid || isSubmitting}
            />
          </div>
        </form>
      </div>
      <ErrorModal
        open={open}
        opened={opened}
        close={close}
        isError={isError}
        text={errorText}
      />
    </div>
  );
};

export default ChangePassword;
