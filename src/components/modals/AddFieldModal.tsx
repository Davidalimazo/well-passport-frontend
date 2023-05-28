import { FC } from 'react';
import { Modal, Avatar, Input } from '@mantine/core';
import Button from '../buttons/Button';
import { GiField, GiHobbitDwelling } from 'react-icons/gi';
import { FaCloudUploadAlt, FaUser } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { TbWorldLongitude } from 'react-icons/tb';
import { AiTwotoneMail } from 'react-icons/ai';
import { FieldDataProp } from '@/pages/field';
import { Field } from '@prisma/client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import router from 'next/router';

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title?: string;
  isEdit?: boolean;
  clientData?: FieldDataProp | null;
}

interface FieldsValues {
  numberOfWells: number;
  name: string;
  longitude: number;
  latitude: number;
  clientId: string;
  superintendent: {
    name: string;
    mobileNo: string;
    email: string;
  };
}

const AddFieldModal: FC<ViewModalProps> = ({
  open,
  opened,
  close,
  title,
  isEdit,
  clientData,
}) => {
  const {
    register,
    handleSubmit,
    formState,
    setError,
    clearErrors,
    getValues,
    reset,
  } = useForm<FieldsValues>({
    defaultValues: {
      name: isEdit ? clientData?.name : '',
      numberOfWells: isEdit ? clientData?.numberOfWells : 0,
      longitude: isEdit ? clientData?.longitude : 0,
      latitude: isEdit ? clientData?.latitude : 0,
      clientId: isEdit ? clientData?.clientId : '',
      superintendent: {
        email: isEdit ? clientData?.superintendent.email : '',
        mobileNo: isEdit ? clientData?.superintendent.mobileNo : '',
        name: isEdit ? clientData?.superintendent.name : '',
      },
    },
  });

  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = async (data: FieldsValues) => {
    let {
      name,
      numberOfWells,
      latitude,
      longitude,
      clientId,
      superintendent,
    } = data;

    try {
      if (isEdit) {
        const post = await axios.put('http://localhost:3000/api/updatefield', {
          data,
          id: clientData?.id,
        });
        const res = await post.data;
        if (res.data.status === 200) {
          toast.success('field updated successfully');
          reset();
          router.reload();
        } else {
          toast.error('failed to update field');
        }
      } else {
        const post = await axios.post(
          'http://localhost:3000/api/addField',
          data
        );
        const res = await post.data;
        if (res.data.status === 200) {
          toast.success('Field created successfully');
          reset();
          router.reload();
        } else {
          toast.error('failed to create field');
        }
      }
    } catch (error) {
      toast.error('An error occurred, please try again');
    }
  };

  return (
    <>
      <Modal radius={'md'} size="lg" opened={opened} onClose={close}>
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            {title}
          </div>
          <form
            className="pt-8 px-2 sm:px-6 md:px-6 lg:px-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GiField className="text-gray-500" />
                  <span className="text-gray-400">Field Name</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input.Wrapper id="name" error={errors.name?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={isEdit ? clientData?.name : ''}
                      {...register('name', {
                        required: {
                          value: isEdit ? false : true,
                          message: 'name is required',
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
                  <span className="text-gray-400">Number of wells</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper
                    id="numberOfWells"
                    error={errors.numberOfWells?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={
                        isEdit ? String(clientData?.numberOfWells) : '0'
                      }
                      {...register('numberOfWells', {
                        required: {
                          value: isEdit ? false : true,
                          message: 'name is required',
                        },
                      })}
                      error={
                        errors.numberOfWells?.message &&
                        errors.numberOfWells.message.length > 0
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
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input.Wrapper
                    id="longitude"
                    error={errors.longitude?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={isEdit ? String(clientData?.longitude) : '0'}
                      {...register('longitude', {
                        required: {
                          value: isEdit ? false : true,
                          message: 'name is required',
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
                      placeholder={isEdit ? String(clientData?.latitude) : '0'}
                      {...register('latitude', {
                        required: {
                          value: isEdit ? false : true,
                          message: 'name is required',
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
            <div className="my-4 text-gray-400 gap-2 flex flex-row">
              <FaUser /> <span>Superintendent</span>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">Name</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input.Wrapper
                    id="superintendent.name"
                    error={errors.superintendent?.name?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={
                        isEdit ? clientData?.superintendent.name : ''
                      }
                      {...register('superintendent.name', {
                        required: {
                          value: isEdit ? false : true,
                          message: 'name is required',
                        },
                      })}
                      error={
                        errors.superintendent?.name?.message &&
                        errors.superintendent.name.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Mobile Number</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input.Wrapper
                    id="superintendent.mobileNo"
                    error={errors.superintendent?.mobileNo?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={
                        isEdit ? clientData?.superintendent.mobileNo : ''
                      }
                      {...register('superintendent.mobileNo', {
                        required: {
                          value: isEdit ? false : true,
                          message: 'name is required',
                        },
                      })}
                      error={
                        errors.superintendent?.mobileNo?.message &&
                        errors.superintendent.mobileNo.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="mb-4 flex-col sm:flex-row md:flex-row lg:flex-row">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <AiTwotoneMail className="text-gray-500" />
                  <span className="text-gray-400">Email</span>
                </div>
                <div className="text-lg font-lekton sm:pl-8 md:pl-8 lg:pl-8 w-full">
                  <Input.Wrapper
                    id="superintendent.email"
                    error={errors.superintendent?.email?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={
                        isEdit ? clientData?.superintendent.email : ''
                      }
                      {...register('superintendent.email', {
                        onBlur: (e) => {
                          if (
                            !e.target.value ||
                            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                              e.target.value
                            )
                          ) {
                            !isEdit &&
                              setError('superintendent.email', {
                                type: 'pattern',
                                message: 'invalid email format',
                              });
                          } else {
                            clearErrors('superintendent.email');
                          }
                        },
                        required: {
                          value: isEdit ? false : true,
                          message: 'email is required',
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: 'please enter a valid email',
                        },
                      })}
                      error={
                        errors.superintendent?.email?.message &&
                        errors.superintendent.email.message.length > 0
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
                  <div className="">Click here to upload field image</div>
                  <div className="">OR</div>
                  <div className="">Drag Image Here</div>
                </div>
              </div>
            </div>
            <div className="mb-4 w-full flex flex-row items-center justify-center mt-8">
              <Button
                children="Submit"
                className="font-lekton"
                type="submit"
                variant={
                  !isDirty || !isValid || isSubmitting ? 'pressed' : 'default'
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

export default AddFieldModal;
