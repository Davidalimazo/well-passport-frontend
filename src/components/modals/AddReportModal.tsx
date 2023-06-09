import { FC, useState } from "react";
import { Modal, Input } from "@mantine/core";
import Button from "../buttons/Button";

import { IoDocumentText } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../utils/auth";
import axios from "axios";
import { reportRoutes } from "../../utils/constants/api";
import { toast } from "react-hot-toast";
import useSetField from "../../hooks/useSetField";
import useSetClient from "../../hooks/useSetClient";
import useSetProject from "../../hooks/useSetProject";
import useSetWells from "../../hooks/useSetWells";
import UploadDocs from "../UploadDoc";

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
}

interface ReportValues {
  name: string;

  author: string;
}

const AddReportModal: FC<ViewModalProps> = ({ opened, close }) => {
  const { register, handleSubmit, formState, reset } = useForm<ReportValues>();

  const { errors, isDirty, isValid, isSubmitting } = formState;
  const { token } = useAuth((state) => state);
  const { fieldId } = useSetField((state) => state);
  const { clientId } = useSetClient((state) => state);
  const { projectId } = useSetProject((state) => state);
  const { wellId } = useSetWells((state) => state);
  const [file, setFile] = useState<any>(null);

  const onSubmit = async (data: ReportValues) => {
    try {
      if (file?.file) {
        await axios
          .post(
            reportRoutes,
            {
              file: file.file,
              name: data.name,
              author: data.author,
              fieldId: fieldId,
              clientId: clientId,
              projectId: projectId,
              wellId: wellId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((_) => {
            toast.success("Report created successfully");
            reset();
            location.reload();
          });
      } else {
        alert("Please upload file");
      }
    } catch (error) {
      toast.error("An error occurred, please try again");
    }
  };

  return (
    <>
      <Modal radius={"md"} size="lg" opened={opened} onClose={close}>
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            ADD NEW REPORT
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-8 px-2 sm:px-6 md:px-6 lg:px-6"
            autoComplete="off"
          >
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <IoDocumentText className="text-gray-500" />
                  <span className="text-gray-400">Name</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input.Wrapper id="name" error={errors.name?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Report name is required",
                        },
                      })}
                      error={
                        errors.name?.message && errors.name.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3 w-full">
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">Auhor</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="author" error={errors.author?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      {...register("author", {
                        required: {
                          value: true,
                          message: "Author name is required",
                        },
                      })}
                      error={
                        errors.author?.message &&
                        errors.author.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="space-y-4 bg-[#F0F0F0] h-[151px] w-full flex flex-row items-center justify-center">
                <div className="text-center space-y-1 text-sm font-lekton cursor-pointer">
                  {/* <div className="">Click here to upload logo</div>
                  <div className="">OR</div>
                  <div className="">Drag Logo Here</div> */}
                  <UploadDocs name={``} setFile={setFile} file={file} />
                </div>
              </div>
            </div>

            <div className="mb-4 w-full flex flex-row items-center justify-center mt-8">
              <Button
                children="Submit"
                className="font-lekton"
                type="submit"
                variant={
                  !isDirty || !isValid || isSubmitting ? "pressed" : "default"
                }
                disabled={!isDirty || !isValid || isSubmitting}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddReportModal;
