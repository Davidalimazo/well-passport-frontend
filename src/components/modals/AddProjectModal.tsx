import { FC, useState } from "react";
import { Modal, Input, Select } from "@mantine/core";
import Button from "../buttons/Button";
import { ProjectDataProp } from "../../pages/Project";
import { HiDocumentText } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { GiField, GiHobbitDwelling } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr";
import useAuth from "../../utils/auth";
import { projectRoutes } from "../../utils/constants/api";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import useSetClient from "../../hooks/useSetClient";
import UploadDocs from "../UploadDoc";
// import useSetField from "../../hooks/useSetField";
// import useSetWells from "../../hooks/useSetWells";

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title?: string;
  isEdit?: boolean;
  clientData?: ProjectDataProp | null;
}

interface FieldsValues {
  fieldId: string;

  clientId: string;

  name: string;

  description: string;

  rig: string;

  startDate: string;

  endDate: string;

  wellId: string;
}

const AddProjectModal: FC<ViewModalProps> = ({
  opened,
  close,
  title,
  isEdit,
  clientData,
}) => {
  const { clientId } = useSetClient((state) => state);
  const field = JSON.parse(window.localStorage.getItem("field") || "{}");
  const well = JSON.parse(window.localStorage.getItem("well") || "{}");
  const [file, setFile] = useState<any>(null);

  const { register, handleSubmit, formState, reset, clearErrors, setError } =
    useForm<FieldsValues>({
      defaultValues: {
        endDate: isEdit ? clientData?.endDate : "",
        startDate: isEdit ? clientData?.startDate : "",
        description: isEdit ? clientData?.description : "",
        name: isEdit ? clientData?.name : "",
        rig: isEdit ? clientData?.rig : "",
        clientId,
        fieldId: field.fieldId,
        wellId: well.wellId,
      },
    });

  const { token } = useAuth((state) => state);

  const { errors, isDirty, isValid, isSubmitting } = formState;
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (data: FieldsValues) => {
    try {
      if (isEdit) {
        await axios.patch(
          projectRoutes + `/${clientData?._id}`,
          {
            name: data.name,

            description: data.description,

            rig: data.rig,

            startDate: data.startDate,

            endDate: data.endDate,

            status: status ? status : clientData?.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Project update successfully");
        reset();
        location.reload();
      } else {
        if (file?.file) {
          await axios
            .post(
              projectRoutes,
              {
                file: file.file,

                fieldId: field.fieldId,

                clientId: clientId,

                name: data.name,

                description: data.description,

                rig: data.rig,

                startDate: data.startDate,

                endDate: data.endDate,

                wellId: well.wellId,

                status: status,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((_) => {
              toast.success("New project update successfully");
              reset();
              location.reload();
            })
            .catch((err) => console.log(err.message));
        } else {
          alert("Please upload picture");
        }
      }
    } catch (error) {
      toast.error("An error occurred, please try again");
    }
  };

  return (
    <>
      <Modal
        radius={"md"}
        size="lg"
        opened={opened}
        onClose={() => {
          close();
        }}
      >
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            {title}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-8 px-2 sm:px-6 md:px-6 lg:px-6"
            autoComplete="off"
          >
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GiField className="text-gray-500" />
                  <span className="text-gray-400">Project Name</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input.Wrapper id="name" error={errors.name?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      placeholder="asaba excavation"
                      defaultValue={isEdit ? clientData?.name : ""}
                      {...register("name", {
                        required: {
                          value: isEdit ? false : true,
                          message: "name is required",
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
                  <GrStatusUnknown className="text-gray-500" />
                  <span className="text-gray-400">Well Id</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="wellId" error={errors.wellId?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={isEdit ? clientData?.wellId : ""}
                      {...register("wellId", {
                        disabled: true,
                        required: {
                          value: isEdit ? false : true,
                          message: "Well Id is required",
                        },
                      })}
                      error={
                        errors.wellId?.message &&
                        errors.wellId.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GiHobbitDwelling className="text-gray-500" />
                  <span className="text-gray-400">Rig</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input.Wrapper id="rig" error={errors.rig?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      placeholder="BLPC76"
                      defaultValue={isEdit ? clientData?.rig : ""}
                      {...register("rig", {
                        required: {
                          value: isEdit ? false : true,
                          message: "Rig is required",
                        },
                      })}
                      error={
                        errors.rig?.message && errors.rig.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0 sm:ml-5">
                <div className="flex flex-row items-center gap-3 w-full sm:ml-6">
                  <GrStatusUnknown className="text-gray-500" />
                  <span className="text-gray-400">Status</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:ml-6">
                  <Select
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? clientData?.status : ""}
                    onChange={setStatus}
                    value={status}
                    data={["IN PROGRESS", "COMPLETED", "PROPOSAL", "PAUSED"]}
                  />
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
                  <Input.Wrapper
                    id="startDate"
                    error={errors.startDate?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      placeholder="2022-05-02"
                      defaultValue={isEdit ? clientData?.startDate : ""}
                      {...register("startDate", {
                        onBlur: (e) => {
                          if (
                            !e.target.value ||
                            !/^\d{4}-\d{1,2}-\d{1,2}/.test(e.target.value)
                          ) {
                            !isEdit &&
                              setError("startDate", {
                                type: "pattern",
                                message: "date must be in yyyy-mm-dd format",
                              });
                          } else {
                            clearErrors("startDate");
                          }
                        },
                        required: {
                          value: isEdit ? false : true,
                          message: "startDate is required",
                        },
                        pattern: {
                          value: /^\d{4}-\d{1,2}-\d{1,2}/,
                          message: "date must be in yyyy-mm-dd format",
                        },
                      })}
                      error={
                        errors.startDate?.message &&
                        errors.startDate.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3 w-full">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">End Date</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="endDate" error={errors.endDate?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      placeholder="2022-05-02"
                      defaultValue={isEdit ? clientData?.endDate : ""}
                      {...register("endDate", {
                        onBlur: (e) => {
                          if (
                            !e.target.value ||
                            !/^\d{4}-\d{1,2}-\d{1,2}/.test(e.target.value)
                          ) {
                            !isEdit &&
                              setError("endDate", {
                                type: "pattern",
                                message: "date must be in yyyy-mm-dd format",
                              });
                          } else {
                            clearErrors("endDate");
                          }
                        },
                        required: {
                          value: isEdit ? false : true,
                          message: "endDate is required",
                        },
                        pattern: {
                          value: /^\d{4}-\d{1,2}-\d{1,2}/,
                          message: "date must be in yyyy-mm-dd format",
                        },
                      })}
                      error={
                        errors.endDate?.message &&
                        errors.endDate.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <HiDocumentText className="text-gray-500" />
                  <span className="text-gray-400">Description</span>
                </div>
                <div className="text-lg font-lekton sm:pl-8 md:pl-8 lg:pl-8 w-full">
                  <Input.Wrapper
                    id="description"
                    error={errors.description?.message}
                  >
                    <Input
                      radius="lg"
                      size="xl"
                      placeholder={isEdit ? clientData?.description : ""}
                      {...register("description", {
                        required: {
                          value: isEdit ? false : true,
                          message: "description is required",
                        },
                      })}
                      error={
                        errors.description?.message &&
                        errors.description.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            {!isEdit && (
              <div className="mb-4">
                <div className="space-y-4 bg-[#F0F0F0] h-[151px] w-full flex flex-row items-center justify-center">
                  <div className="text-center cursor-pointer space-y-1 text-sm font-lekton">
                    {/* <div className="">Click here to upload logo</div>
                  <div className="">OR</div>
                  <div className="">Drag Logo Here</div> */}
                    <UploadDocs name={``} setFile={setFile} file={file} />
                  </div>
                </div>
              </div>
            )}
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

export default AddProjectModal;
