import { Input } from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import { AiFillEye, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import placeholderImg from "../assets/images/placeholderImg.png";
import { useDisclosure } from "@mantine/hooks";

import Button from "../components/buttons/Button";
import DeleteModal from "../components/modals/DeleteModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAuth from "../utils/auth";
import { fieldRoutes } from "../utils/constants/api";
import ViewFieldModal from "../components/modals/ViewFieldModal";
import AddFieldModal from "../components/modals/AddFieldModal";

export interface FieldDataProp {
  _id: string;
  fieldId: string;
  adminId: string;
  clientId: string;
  name: string;
  numberOfWells: number;
  image: string;
  longitude: number;
  latitude: number;
  superintendent: {
    name: string;
    email: string;
    mobileNo: string;
  };
  createdAt: string;
  updatedAt: string;
}

//@ts-ignore

const FieldListUI = () => {
  const [index, setIndex] = useState(0);
  const [fieldId, setFieldId] = useState("");
  const { token, user } = useAuth((state) => state);

  const [cachedData, setCachedDta] = useState<Array<FieldDataProp> | null>([]);

  useEffect(() => {
    const getData = async () => {
      const req = await axios.get(fieldRoutes, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (req.data.length > 0) setCachedDta(req.data);
    };
    getData();
  }, []);
  const navigate = useNavigate();

  const [currData, setCurrData] = useState<FieldDataProp | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async (id: string) => {
    await axios
      .delete(fieldRoutes + `/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((_) => {
        toast.success("Client deleted succcessfully");
        navigate(0);
      })
      .catch((err) =>
        toast.error("An error while deleting post " + err.message)
      );
  };

  const [openedAddModal, { open: openAddModal, close: onClose }] =
    useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: onCloseEdit }] =
    useDisclosure(false);
  const [openedDeleteModal, { open: openDeleteModal, close: onCloseDelete }] =
    useDisclosure(false);

  const hadnleClick = (idx: number) => {
    setIndex(idx);
  };

  return (
    <>
      <Helmet>
        <title key="pagetitle">Zamam Well Passport | Fields</title>
        <meta
          name="description"
          content="Zamam Well Passport application"
          key="metadescription"
        />
      </Helmet>
      <div className="overflow-x-hidden bg-[#E7E6E6]">
        <div className="flex flex-row items-center justify-center mt-">
          <Input
            placeholder="Search"
            radius="xl"
            size="lg"
            className="w-1/2 mt-12 mb-12"
            rightSection={
              <>
                <BiSearch />
              </>
            }
          />
        </div>
        <div className="flex flex-row items-center justify-between px-6 pb-2">
          <div className="text-[20px] tracking-wide font-bold font-lekton">
            FIELD LIST
          </div>
          {user?.role === "ADMIN" ? (
            <div className="text-center flex flex-row items-center">
              <Button
                children="ADD NEW FIELD"
                className="h-[28px] text-sm lg:text-md w-3/3"
                onClick={openAddModal}
                icon={
                  <>
                    <AiOutlinePlus className="text-white font-bold" />
                  </>
                }
              />
            </div>
          ) : null}
        </div>
        <div className="bg-[#FFFCFC] rounded-lg mx-6 p-6">
          {cachedData &&
            cachedData.map(
              (
                {
                  _id: id,
                  name,
                  numberOfWells,
                  image,
                  longitude,
                  latitude,
                  createdAt,
                  ...rest
                },
                i
              ) => (
                <div
                  className={`cursor-pointer flex flex-row gap-3 justify-between px-4 py-4 rounded-xl mb-6 ${
                    i === index
                      ? "ring-2 ring-red-500"
                      : "ring-2 ring-[#E7E6E6]"
                  }`}
                  key={id}
                  onClick={() => {
                    hadnleClick(i);
                    setCurrData({
                      _id: id,
                      name,
                      numberOfWells,
                      longitude,
                      latitude,
                      image,
                      createdAt,
                      ...rest,
                    });
                  }}
                >
                  <div className="flex flex-row gap-6 items-center">
                    <img
                      src={placeholderImg}
                      width={130}
                      height={89}
                      alt="exxon"
                    />
                    <div className="sm:hidden font-lekton text-md font-bold">
                      {name}
                    </div>
                    <div className="text-lg font-lekton font-semibold hidden sm:block md:block lg:block">
                      <div className="">
                        <span className="text-grey-200">Field Name: </span>
                        <span className="font-bold">{name}</span>
                      </div>
                      <div className="">
                        <span className="text-grey-200">Wells: </span>
                        <span className="font-semibold">{numberOfWells}</span>
                      </div>
                      <div className="">
                        <span className="text-grey-200">Superintendent: </span>
                        <span className="font-bold underline">
                          {rest.superintendent.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  {index === i ? (
                    <div className="text-lg flex flex-row gap-3">
                      {user?.role === "ADMIN" ? (
                        <>
                          <AiFillEye onClick={open} />

                          <AiFillEdit onClick={openEditModal} />

                          <MdDeleteForever
                            onClick={() => {
                              openDeleteModal();
                              setFieldId(id);
                            }}
                          />
                        </>
                      ) : (
                        <AiFillEye onClick={open} />
                      )}
                    </div>
                  ) : null}
                </div>
              )
            )}
          <div className="my-6 flex flex-row items-center justify-center">
            {cachedData && cachedData.length < 1 ? (
              <p>No Fields Available</p>
            ) : null}
          </div>
        </div>
      </div>
      <ViewFieldModal
        open={open}
        opened={opened}
        close={close}
        title="FIELD INFORMATION"
        clientData={currData}
      />
      <AddFieldModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD NEW FIELD"
      />
      <AddFieldModal
        open={openEditModal}
        opened={openedEditModal}
        close={onCloseEdit}
        title="EDIT CLIENT INFORMATION"
        clientData={currData}
        isEdit
      />
      <DeleteModal
        open={openDeleteModal}
        opened={openedDeleteModal}
        close={onCloseDelete}
        text="Are you sure you want to delete this client"
        id={fieldId}
        onDelete={() => handleDelete(fieldId)}
      />
    </>
  );
};

export default FieldListUI;
