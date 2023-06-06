import { FC } from "react";
import { Modal, Input, Select } from "@mantine/core";
import Button from "../buttons/Button";
// import { ProjectDataProp } from '../../pages/Project';
// import { HiDocumentText } from 'react-icons/hi';
import { MdDateRange } from "react-icons/md";
import { GiField, GiHobbitDwelling } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr";
import { useForm } from "react-hook-form";

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
}
interface FieldsValues {
  name: string;
  status: string;
  startDate: string;
  endDate: string;
}
const GenerateReportModal: FC<ViewModalProps> = ({ opened, close }) => {
  const { register, formState, clearErrors, setError } =
    useForm<FieldsValues>();
  const { errors, isDirty, isValid, isSubmitting } = formState;

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
            GENERATE REPORT
          </div>
          <form className="pt-8 px-2 sm:px-6 md:px-6 lg:px-6">
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GiField className="text-gray-500" />
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
                          message: "name is required",
                        },
                      })}
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
                  <Select
                    radius="lg"
                    size="sm"
                    data={["In Progress", "Completed", "Proposed"]}
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
                      {...register("startDate", {
                        onBlur: (e) => {
                          if (
                            !e.target.value ||
                            !/^\d{4}-\d{1,2}-\d{1,2}/.test(e.target.value)
                          ) {
                            setError("startDate", {
                              type: "pattern",
                              message: "date must be in yyyy-mm-dd format",
                            });
                          } else {
                            clearErrors("startDate");
                          }
                        },
                        required: {
                          value: true,
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
                      {...register("endDate", {
                        onBlur: (e) => {
                          if (
                            !e.target.value ||
                            !/^\d{4}-\d{1,2}-\d{1,2}/.test(e.target.value)
                          ) {
                            setError("endDate", {
                              type: "pattern",
                              message: "date must be in yyyy-mm-dd format",
                            });
                          } else {
                            clearErrors("endDate");
                          }
                        },
                        required: {
                          value: true,
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
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GiHobbitDwelling className="text-gray-500" />
                  <span className="text-gray-400">Save As</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Select radius="lg" size="sm" data={["PDF", "Excel"]} />
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

export default GenerateReportModal;
