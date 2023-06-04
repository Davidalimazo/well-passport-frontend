import { FC, useState } from "react";
import { Modal, Input, Select } from "@mantine/core";
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
import { DatePickerInput } from "@mantine/dates";
import { AiOutlineCalendar } from "react-icons/ai";

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
  longitude: number;
  latitude: number;
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
  const [wellType, setWellType] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const { register, handleSubmit, formState, reset } = useForm<FieldsValues>({
    defaultValues: {
      fieldId: fieldId,
      clientId: clientId,
      name: isEdit ? clientData?.name : "",
      treeSpecs: isEdit ? clientData?.treeSpecs : 0,
      longitude: isEdit ? clientData?.longitude : 0,
      latitude: isEdit ? clientData?.latitude : 0,
      bitSize: isEdit ? clientData?.bitSize : 0,
      casting: isEdit ? clientData?.casting : 0,
      totalDepth: isEdit ? clientData?.totalDepth : 0,
      turbingSize: isEdit ? clientData?.turbingSize : 0,
      flowStation: isEdit ? clientData?.flowStation : "",
    },
  });

  const { errors, isDirty, isValid, isSubmitting } = formState;

  const [spudDate, setSpudDate] = useState<Date | null>(
    isEdit && clientData?.spudDate ? new Date(clientData.spudDate) : null
  );
  const [firstComDate, setFirstComDate] = useState<Date | null>(
    isEdit && clientData?.firstProductionDate
      ? new Date(clientData.firstProductionDate)
      : null
  );
  const [initialComDate, setInitialComDate] = useState<Date | null>(
    isEdit && clientData?.initialCompletionDate
      ? new Date(clientData.initialCompletionDate)
      : null
  );

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

              status: status,

              spudDate: spudDate ? spudDate : clientData?.spudDate,

              firstProductionDate: firstComDate
                ? firstComDate
                : clientData?.firstProductionDate,

              initialCompletionDate: initialComDate
                ? initialComDate
                : clientData?.initialCompletionDate,

              bitSize: data.bitSize,

              casting: data.casting,

              totalDepth: data.totalDepth,

              turbingSize: data.turbingSize,

              flowStation: data.flowStation,

              wellType: wellType,
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

                status: status,

                spudDate: spudDate,

                firstProductionDate: firstComDate,

                initialCompletionDate: initialComDate,

                bitSize: data.bitSize,

                casting: data.casting,

                totalDepth: data.totalDepth,

                turbingSize: data.turbingSize,

                flowStation: data.flowStation,

                wellType: wellType,
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
            autoComplete="off"
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
                      placeholder="MLQ2"
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
                  <Select
                    radius="lg"
                    size="md"
                    defaultValue={isEdit ? String(clientData?.wellType) : ""}
                    value={wellType}
                    onChange={setWellType}
                    data={["Natural gas", "Crude Oil", "Bitumen"]}
                  />
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
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper>
                    <DatePickerInput
                      valueFormat="YYYY MMM DD"
                      radius="lg"
                      size="md"
                      defaultDate={
                        new Date(clientData?.firstProductionDate as string)
                      }
                      value={firstComDate}
                      onChange={setFirstComDate}
                      error={!firstComDate ? true : false}
                      icon={<AiOutlineCalendar />}
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
                  <Select
                    radius="lg"
                    size="md"
                    data={["DRIED", "DRILLING", "EXPLORING"]}
                    defaultValue={isEdit ? clientData?.status : ""}
                    value={status}
                    onChange={setStatus}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <BiTestTube className="text-gray-500" />
                  <span className="text-gray-400">Total Depth</span>
                </div>
                <div className="text-lg font-lekton font-bold">
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
                  <span className="text-gray-400">Tubing Size</span>
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
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper
                    id="flowStation"
                    error={errors.flowStation?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      placeholder="Asaba Depot"
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
                  <Input.Wrapper id="spudDate">
                    <DatePickerInput
                      radius="lg"
                      valueFormat="YYYY MMM DD"
                      size="lg"
                      defaultDate={new Date(clientData?.spudDate as string)}
                      value={spudDate}
                      onChange={setSpudDate}
                      error={!spudDate ? true : false}
                      className="w-full"
                      icon={<AiOutlineCalendar />}
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <MdDateRange className="text-gray-500" />
                  <span className="text-gray-400">Initial Completion Date</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="initialCompletionDate">
                    <DatePickerInput
                      radius="lg"
                      valueFormat="YYYY MMM DD"
                      size="md"
                      defaultDate={
                        new Date(clientData?.initialCompletionDate as string)
                      }
                      value={initialComDate}
                      onChange={setInitialComDate}
                      error={!initialComDate ? true : false}
                      icon={<AiOutlineCalendar />}
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>

            {!isEdit && (
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
