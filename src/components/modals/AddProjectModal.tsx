import { FC } from "react";
import { Modal, Input } from "@mantine/core";
import Button from "../buttons/Button";
import { ProjectDataProp } from "../../pages/Project";
import { HiDocumentText } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { GiField, GiHobbitDwelling } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr";
import useAuth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { projectRoutes } from "../../utils/constants/api";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import useSetClient from "../../hooks/useSetClient";
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

  status: string;
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

  const { register, handleSubmit, formState, reset } = useForm<FieldsValues>({
    defaultValues: {
      endDate: isEdit ? clientData?.endDate : "",
      startDate: isEdit ? clientData?.startDate : "",
      description: isEdit ? clientData?.description : "",
      name: isEdit ? clientData?.name : "",
      status: isEdit ? clientData?.status : "",
      rig: isEdit ? clientData?.rig : "",
      clientId,
      fieldId: field.fieldId,
      wellId: well.wellId,
    },
  });
  console.log(clientData);
  const { token } = useAuth((state) => state);

  const { errors, isDirty, isValid, isSubmitting } = formState;
  const navigate = useNavigate();

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

            status: data.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Client update successfully");
        reset();
        navigate("/home/client/project", { replace: true });
      } else {
        await axios
          .post(
            projectRoutes,
            {
              fieldId: field.fieldId,

              clientId: clientId,

              name: data.name,

              description: data.description,

              rig: data.rig,

              startDate: data.startDate,

              endDate: data.endDate,

              wellId: well.wellId,

              status: data.status,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((_) => {
            toast.success("Client update successfully");
            reset();
            navigate("/home/client/project", { replace: true });
          })
          .catch((err) => console.log(err.message));
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
          navigate("/home/client/project", { replace: true });
        }}
      >
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            {title}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-8 px-2 sm:px-6 md:px-6 lg:px-6"
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
                      placeholder={isEdit ? clientData?.rig : ""}
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
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3 w-full">
                  <GrStatusUnknown className="text-gray-500" />
                  <span className="text-gray-400">Status</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="status" error={errors.status?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={isEdit ? clientData?.status : ""}
                      {...register("status", {
                        required: {
                          value: isEdit ? false : true,
                          message: "status Id is required",
                        },
                      })}
                      error={
                        errors.status?.message &&
                        errors.status.message.length > 0
                      }
                    />
                  </Input.Wrapper>
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
                      placeholder={isEdit ? clientData?.startDate : ""}
                      {...register("startDate", {
                        required: {
                          value: isEdit ? false : true,
                          message: "startDate is required",
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
                      placeholder={isEdit ? clientData?.endDate : ""}
                      {...register("endDate", {
                        required: {
                          value: isEdit ? false : true,
                          message: "endDate is required",
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
