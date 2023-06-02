"use client";

import { useState } from "react";
import { Input } from "@mantine/core";
import { RiUser3Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import Button from "../components/buttons/Button";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import PlainSelect from "../components/selectBox/PlainSelect";
import userLogo from "../assets/images/user.png";
import { BiArrowBack } from "react-icons/bi";
import { useDisclosure } from "@mantine/hooks";
import ErrorModal from "../components/modals/ErrorModal";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { authRoutes } from "../utils/constants/api";
import useAuth from "../utils/auth";
import RegisterModal from "../components/modals/RegisterInfoModal";

export interface FieldsValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface loginProps {}

const Register = ({}: loginProps) => {
  const [stateBlurError, setstateBlurError] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const [openedAddModal, { open: openAddModal, close: onCloseAddModal }] =
    useDisclosure(false);
  const [errotText, setErrorText] = useState("");

  const { register, handleSubmit, formState, setError, clearErrors, reset } =
    useForm<FieldsValues>();

  const { token } = useAuth((state) => state);

  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = async (data: FieldValues) => {
    let { firstName, lastName, email } = data;

    const post = await axios.post(
      authRoutes,
      {
        firstName,
        lastName,
        email: email.toLowerCase(),
        role: state,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (post.data.token == "00") {
      toast.success("Account created successfully");
      reset();
      openAddModal();
    } else {
      toast.error("An error occurred, please try again");
      setErrorText(post.data.response);
      open();
    }
  };
  const [state, setState] = useState("");
  const handleStateSlect = (val: string) => {
    setState(val);
  };

  return (
    <>
      <Helmet>
        <title key="pagetitle">Zamam Well Passport | Register</title>
        <meta
          name="description"
          content="Zamam Well Passport application"
          key="metadescription"
        />
      </Helmet>
      <div className="bg-[#E7E6E6] w-screen h-screen overflow-hidden">
        <div className="mt-2 relative w-full h-full">
          <div className="my-4 flex flex-row items-center justify-between px-6 w-full">
            <div className=""></div>
            <div className="flex flex-row items-center gap-2 px-2 sm:px-4 lg:px-6">
              <div className="flex flex-row items-center gap-1">
                <BiArrowBack />
                <Link to="/home">Home</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center mt-8">
            <div className=""></div>
            <div className="bg-white p-8 shadow-md rounded-md">
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <div className="text-center font-bold flex flex-col justify-center items-center">
                  <img src={userLogo} alt="user" />
                  <p className="">CREATE ACCOUNT</p>
                </div>
                <PlainSelect
                  placeholder="Role"
                  Icon={FiUsers}
                  id="role"
                  onBlur={() => {
                    if (state.length < 1) setstateBlurError(true);
                  }}
                  error={stateBlurError}
                  errorMessage={stateBlurError ? "Role is required" : ""}
                  value={state}
                  data={["ADMIN", "USER", "CLIENT"]}
                  onChange={handleStateSlect}
                />

                <Input.Wrapper id="firstName" error={errors.firstName?.message}>
                  <Input
                    id="firstName"
                    icon={<RiUser3Line />}
                    size="xl"
                    placeholder="First Name"
                    radius="xl"
                    {...register("firstName", {
                      required: {
                        value: true,
                        message: "First name is required",
                      },
                    })}
                    error={
                      errors.firstName?.message &&
                      errors.firstName.message.length > 0
                    }
                  />
                </Input.Wrapper>
                <Input.Wrapper id="lastName" error={errors.lastName?.message}>
                  <Input
                    id="lastName"
                    icon={<RiUser3Line />}
                    size="xl"
                    placeholder="Last Name"
                    radius="xl"
                    {...register("lastName", {
                      required: {
                        value: true,
                        message: "last name is required",
                      },
                    })}
                    error={
                      errors.lastName?.message &&
                      errors.lastName.message.length > 0
                    }
                  />
                </Input.Wrapper>
                <Input.Wrapper id="email" error={errors.email?.message}>
                  <Input
                    icon={<AiOutlineMail />}
                    size="xl"
                    placeholder="Email Address"
                    id="email"
                    radius="xl"
                    {...register("email", {
                      onBlur: (e) => {
                        if (
                          !e.target.value ||
                          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                            e.target.value
                          )
                        ) {
                          setError("email", {
                            type: "pattern",
                            message: "invalid email format",
                          });
                        } else {
                          clearErrors("email");
                        }
                      },
                      required: {
                        value: true,
                        message: "email is required",
                      },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: " enter a valid email",
                      },
                    })}
                    error={
                      errors.email?.message && errors.email.message.length > 0
                    }
                  />
                </Input.Wrapper>
                {/* <Input.Wrapper id="password" error={errors.password?.message}>
                  <PasswordInput
                    icon={<RiLockPasswordLine />}
                    placeholder="Password"
                    size="xl"
                    radius="xl"
                    id="password"
                    {...register('password', {
                      onBlur: (e) => {
                        if (
                          !e.target.value ||
                          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/.test(
                            e.target.value
                          )
                        ) {
                          setError('password', {
                            type: 'pattern',
                            message:
                              'Password must contain at least one number, uppercase and lowercase and a special character',
                          });
                        } else {
                          clearErrors('password');
                        }
                      },
                      required: {
                        value: true,
                        message: 'password is required',
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
                        message:
                          'Password must contain at least one number, uppercase and lowercase and special character',
                      },
                    })}
                    error={
                      errors.password?.message &&
                      errors.password.message.length > 0
                    }
                  />
                </Input.Wrapper> */}
                <div className="flex flex-row items-center justify-center">
                  <Button
                    children="Create Account"
                    type="submit"
                    className="w-full"
                    variant={
                      !isDirty || !isValid || isSubmitting
                        ? "pressed"
                        : "default"
                    }
                    disabled={!isDirty || !isValid || isSubmitting}
                  />
                </div>
              </form>
            </div>
            <div className=""></div>
          </div>
        </div>
        <ErrorModal
          close={close}
          open={open}
          opened={opened}
          text={errotText}
          isError
        />
        <RegisterModal
          close={onCloseAddModal}
          open={openAddModal}
          opened={openedAddModal}
          text={"Will you like to add new accounts?"}
        />
      </div>
    </>
  );
};

export default Register;
