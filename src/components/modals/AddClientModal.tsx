import { FC } from "react";
import { Modal, Input } from "@mantine/core";
import Button from "../buttons/Button";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaCloudUploadAlt, FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { TbWorldLongitude } from "react-icons/tb";
import { ImLocation } from "react-icons/im";
import { ClientDataProp } from "../../pages/Client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { clientRoutes } from "../../utils/constants/api";
import useAuth from "../../utils/auth";

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title?: string;
  isEdit?: boolean;
  clientData?: ClientDataProp | null;
}

interface FieldsValues {
  name: string;
  contactPerson: string;
  mobile: string;
  website: string;
  address: string;
  email: string;
  ownerId: string;
}

const AddClientModal: FC<ViewModalProps> = ({
  opened,
  close,
  title,
  isEdit,
  clientData,
}) => {
  const { register, handleSubmit, formState, setError, clearErrors, reset } =
    useForm<FieldsValues>({
      defaultValues: {
        address: clientData?.address,
        contactPerson: clientData?.contactPerson,
        email: clientData?.email,
        mobile: clientData?.mobile,
        name: clientData?.name,
        website: clientData?.website,
        ownerId: clientData?.ownerId,
      },
    });
  const { token } = useAuth((state) => state);

  const { errors, isDirty, isValid, isSubmitting } = formState;
  const navigate = useNavigate();
  const onSubmit = async (data: FieldsValues) => {
    try {
      if (isEdit) {
        await axios
          .patch(
            clientRoutes + `/${clientData?._id}`,
            {
              name: data.name,

              contactPerson: data.contactPerson,

              mobile: data.mobile,

              email: data.email,

              address: data.address,

              website: data.website,
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
            navigate(0);
          })
          .catch((err) => console.log(err.message));
      } else {
        await axios
          .post(
            clientRoutes,
            {
              name: data.name,

              contactPerson: data.contactPerson,

              mobile: data.mobile,

              email: data.email,

              address: data.address,

              ownerId: data.ownerId,

              website: data.website,
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
            close();
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
          navigate(0);
        }}
      >
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            {title}
          </div>
          <form
            className="pt-8 px-2 sm:px-6 md:px-6 lg:px-6"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <BsFillBuildingsFill className="text-gray-500" />
                  <span className="text-gray-400">Client Name</span>
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
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">Contact Person</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper
                    id="contactPerson"
                    error={errors.contactPerson?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? clientData?.contactPerson : ""}
                      {...register("contactPerson", {
                        required: {
                          value: isEdit ? false : true,
                          message: "contact person name is required",
                        },
                      })}
                      error={
                        errors.contactPerson?.message &&
                        errors.contactPerson.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Mobile Number</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input.Wrapper id="mobile" error={errors.mobile?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? clientData?.mobile : ""}
                      {...register("mobile", {
                        required: {
                          value: isEdit ? false : true,
                          message: "mobile is required",
                        },
                      })}
                      error={
                        errors.mobile?.message &&
                        errors.mobile.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Website</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="website" error={errors.website?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? clientData?.website : ""}
                      {...register("website", {
                        required: {
                          value: isEdit ? false : true,
                          message: "website is required",
                        },
                      })}
                      error={
                        errors.website?.message &&
                        errors.website.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <MdEmail className="text-gray-500" />
                  <span className="text-gray-400">Email</span>
                </div>
                <div className="text-lg font-lekton sm:pl-8 md:pl-8 lg:pl-8 w-full font-bold">
                  <Input.Wrapper id="email" error={errors.email?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? clientData?.address : ""}
                      {...register("email", {
                        onBlur: (e) => {
                          if (
                            !e.target.value ||
                            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                              e.target.value
                            )
                          ) {
                            !isEdit &&
                              setError("email", {
                                type: "pattern",
                                message: "invalid email format",
                              });
                          } else {
                            clearErrors("email");
                          }
                        },
                        required: {
                          value: isEdit ? false : true,
                          message: "email is required",
                        },
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "please enter a valid email",
                        },
                      })}
                      error={
                        errors.email?.message && errors.email.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>

              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">Client Reprentative Id</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper id="ownerId" error={errors.ownerId?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      defaultValue={isEdit ? clientData?.ownerId : ""}
                      {...register("ownerId", {
                        disabled: isEdit ? true : false,
                        required: {
                          value: isEdit ? false : true,
                          message: "ownerId is required",
                        },
                      })}
                      error={
                        errors.ownerId?.message &&
                        errors.ownerId.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="mb-4"></div>
            <div className="mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <ImLocation className="text-gray-500" />
                  <span className="text-gray-400">Address</span>
                </div>
                <div className="text-lg font-lekton sm:pl-8 md:pl-8 lg:pl-8 w-full">
                  <Input.Wrapper id="address" error={errors.address?.message}>
                    <Input
                      radius="lg"
                      size="xl"
                      defaultValue={isEdit ? clientData?.address : ""}
                      {...register("address", {
                        required: {
                          value: isEdit ? false : true,
                          message: "address is required",
                        },
                      })}
                      error={
                        errors.address?.message &&
                        errors.address.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="space-y-4 bg-[#F0F0F0] h-[151px] w-full flex flex-row items-center justify-center">
                <div className="text-center space-y-1 text-sm font-lekton">
                  <div className="flex flex-row items-center justify-center">
                    <FaCloudUploadAlt className="" size={30} />
                  </div>
                  <div className="">Click here to upload logo</div>
                  <div className="">OR</div>
                  <div className="">Drag Logo Here</div>
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

export default AddClientModal;
