import { FC, useState } from "react";
import { Modal, Input } from "@mantine/core";
import Button from "../buttons/Button";
import { GiField, GiHobbitDwelling } from "react-icons/gi";
import { TbWorldLongitude } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";
import { FcInspection } from "react-icons/fc";
import { GrStatusUnknown } from "react-icons/gr";
import { BiTestTube } from "react-icons/bi";
import { BsEvStationFill } from "react-icons/bs";
import { WellDataProp } from "../../pages/Well";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../../utils/auth";
import { wellRoutes } from "../../utils/constants/api";
import useSetField from "../../hooks/useSetField";
import useSetClient from "../../hooks/useSetClient";
import UploadDocs from "../UploadDoc";

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title?: string;
  isEdit?: boolean;
  clientData?: WellDataProp | null;
}

interface FieldsValues {
  fieldId: string;
  clientId: string;
  name: string;
  treeSpecs: number;
  wellType: string;
  longitude: number;
  latitude: number;
  status: string;
  spudDate: string;
  firstProductionDate: string;
  initialCompletionDate: string;
  bitSize: number;
  casting: number;
  totalDepth: number;
  turbingSize: number;
  flowStation: string;
}

const AddWellModal: FC<ViewModalProps> = ({
  opened,
  close,
  title,
  isEdit,
  clientData,
}) => {
  const { clientId } = useSetClient((state) => state);
  const { fieldId } = useSetField((state) => state);
  const { token } = useAuth((state) => state);
  const [file, setFile] = useState<any>(null);

  const { register, handleSubmit, formState, reset } = useForm<FieldsValues>({
    defaultValues: {
      fieldId: fieldId,
      clientId: clientId,
      name: isEdit ? clientData?.name : "",
      treeSpecs: isEdit ? clientData?.treeSpecs : 0,
      wellType: isEdit ? clientData?.wellType : "",
      longitude: isEdit ? clientData?.longitude : 0,
      latitude: isEdit ? clientData?.latitude : 0,
      status: isEdit ? clientData?.status : "",
      spudDate: isEdit ? clientData?.spudDate : "",
      firstProductionDate: isEdit ? clientData?.firstProductionDate : "",
      initialCompletionDate: isEdit ? clientData?.initialCompletionDate : "",
      bitSize: isEdit ? clientData?.bitSize : 0,
      casting: isEdit ? clientData?.casting : 0,
      totalDepth: isEdit ? clientData?.totalDepth : 0,
      turbingSize: isEdit ? clientData?.turbingSize : 0,
      flowStation: isEdit ? clientData?.flowStation : "",
    },
  });

  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = async (data: FieldsValues) => {
    try {
      if (isEdit) {
        await axios
          .patch(
            wellRoutes + `/${clientData?._id}`,
            {
              name: data.name,

              longitude: data.longitude,

              latitude: data.latitude,

              fieldId: fieldId,

              clientId: clientId,

              treeSpecs: data.treeSpecs,

              status: data.status,

              spudDate: data.spudDate,

              firstProductionDate: data.firstProductionDate,

              initialCompletionDate: data.initialCompletionDate,

              bitSize: data.bitSize,

              casting: data.casting,

              totalDepth: data.totalDepth,

              turbingSize: data.turbingSize,

              flowStation: data.flowStation,

              wellType: data.wellType,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((_) => {
            toast.success("Well update successfully");
            reset();
            location.reload();
          })
          .catch((err) => console.log(err.message));
      } else {
        if (file?.file) {
          await axios
            .post(
              wellRoutes,
              {
                file: file.file,

                name: data.name,

                longitude: data.longitude,

                latitude: data.latitude,

                fieldId: fieldId,

                clientId: clientId,

                treeSpecs: data.treeSpecs,

                status: data.status,

                spudDate: data.spudDate,

                firstProductionDate: data.firstProductionDate,

                initialCompletionDate: data.initialCompletionDate,

                bitSize: data.bitSize,

                casting: data.casting,

                totalDepth: data.totalDepth,

                turbingSize: data.turbingSize,

                flowStation: data.flowStation,

                wellType: data.wellType,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((_) => {
              toast.success("New well created successfully");
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
          location.reload();
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
                  <span className="text-gray-400">Well Name</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="name" error={errors.name?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? clientData?.name : ""}
                      {...register("name", {
                        required: {
                          value: isEdit ? false : true,
                          message: "address is required",
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
                <div className="flex flex-row items-center gap-3">
                  <GiHobbitDwelling className="text-gray-500" />
                  <span className="text-gray-400">Well Type</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="wellType" error={errors.wellType?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? String(clientData?.wellType) : ""}
                      {...register("wellType", {
                        required: {
                          value: isEdit ? false : true,
                          message: "wellType is required",
                        },
                      })}
                      error={
                        errors.wellType?.message &&
                        errors.wellType.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Longitude</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper
                    id="longitude"
                    error={errors.longitude?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? String(clientData?.longitude) : ""}
                      {...register("longitude", {
                        valueAsNumber: true,
                        required: {
                          value: isEdit ? false : true,
                          message: "longitude is required",
                        },
                      })}
                      error={
                        errors.longitude?.message &&
                        errors.longitude.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Latitude</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="latitude" error={errors.latitude?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? String(clientData?.latitude) : ""}
                      {...register("latitude", {
                        valueAsNumber: true,
                        required: {
                          value: isEdit ? false : true,
                          message: "latitude is required",
                        },
                      })}
                      error={
                        errors.latitude?.message &&
                        errors.latitude.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Bit Size</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="bitSize" error={errors.bitSize?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? String(clientData?.bitSize) : ""}
                      {...register("bitSize", {
                        valueAsNumber: true,
                        required: {
                          value: isEdit ? false : true,
                          message: "bitSize is required",
                        },
                      })}
                      error={
                        errors.bitSize?.message &&
                        errors.bitSize.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Casting</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="casting" error={errors.casting?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? String(clientData?.casting) : ""}
                      {...register("casting", {
                        valueAsNumber: true,
                        required: {
                          value: isEdit ? false : true,
                          message: "casting is required",
                        },
                      })}
                      error={
                        errors.casting?.message &&
                        errors.casting.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <FcInspection className="text-gray-500" />
                  <span className="text-gray-400">Tree Specs</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper
                    id="treeSpecs"
                    error={errors.treeSpecs?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? clientData?.treeSpecs : ""}
                      {...register("treeSpecs", {
                        valueAsNumber: true,
                        required: {
                          value: isEdit ? false : true,
                          message: "treeSpecs is required",
                        },
                      })}
                      error={
                        errors.treeSpecs?.message &&
                        errors.treeSpecs.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">First Production Date</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input.Wrapper
                    id="firstProductionDate"
                    error={errors.firstProductionDate?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={
                        isEdit ? clientData?.firstProductionDate : ""
                      }
                      {...register("firstProductionDate", {
                        valueAsDate: true,
                        required: {
                          value: isEdit ? false : true,
                          message: "firstProductionDate is required",
                        },
                      })}
                      error={
                        errors.firstProductionDate?.message &&
                        errors.firstProductionDate.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GrStatusUnknown className="text-gray-500" />
                  <span className="text-gray-400">Current Status</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="status" error={errors.status?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? clientData?.status : ""}
                      {...register("status", {
                        required: {
                          value: isEdit ? false : true,
                          message: "status is required",
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
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <BiTestTube className="text-gray-500" />
                  <span className="text-gray-400">Total Depth</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input.Wrapper
                    id="totalDepth"
                    error={errors.totalDepth?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? clientData?.totalDepth : ""}
                      {...register("totalDepth", {
                        valueAsNumber: true,
                        required: {
                          value: isEdit ? false : true,
                          message: "totalDepth is required",
                        },
                      })}
                      error={
                        errors.totalDepth?.message &&
                        errors.totalDepth.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <BiTestTube className="text-gray-500" />
                  <span className="text-gray-400">Turbing Size</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper
                    id="turbingSize"
                    error={errors.turbingSize?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={
                        isEdit ? String(clientData?.turbingSize) : ""
                      }
                      {...register("turbingSize", {
                        valueAsNumber: true,
                        required: {
                          value: isEdit ? false : true,
                          message: "turbingSize is required",
                        },
                      })}
                      error={
                        errors.turbingSize?.message &&
                        errors.turbingSize.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <BsEvStationFill className="text-gray-500" />
                  <span className="text-gray-400">Flow Station</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input.Wrapper
                    id="flowStation"
                    error={errors.flowStation?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? clientData?.flowStation : ""}
                      {...register("flowStation", {
                        required: {
                          value: isEdit ? false : true,
                          message: "flowStation is required",
                        },
                      })}
                      error={
                        errors.flowStation?.message &&
                        errors.flowStation.message.length > 0
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
                  <span className="text-gray-400">Spud Date</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper
                    id="spudDate"
                    error={errors.flowStation?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? String(clientData?.spudDate) : ""}
                      {...register("spudDate", {
                        valueAsDate: true,
                        required: {
                          value: isEdit ? false : true,
                          message: "spudDate is required",
                        },
                      })}
                      error={
                        errors.spudDate?.message &&
                        errors.spudDate.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">Initial Completion Date</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input.Wrapper
                    id="initialCompletionDate"
                    error={errors.initialCompletionDate?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={
                        isEdit ? clientData?.initialCompletionDate : ""
                      }
                      {...register("initialCompletionDate", {
                        valueAsDate: true,
                        required: {
                          value: isEdit ? false : true,
                          message: "initialCompletionDate is required",
                        },
                      })}
                      error={
                        errors.initialCompletionDate?.message &&
                        errors.initialCompletionDate.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>

            {!isEdit && (
              <div className="mb-4">
                <div className="space-y-4 bg-[#F0F0F0] h-[151px] w-full flex flex-row items-center justify-center">
                  <div className="text-center space-y-1 text-sm font-lekton">
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

export default AddWellModal;
