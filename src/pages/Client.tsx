import { Input } from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import { AiFillEye, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import placeholderImg from "../assets/images/placeholderImg.png";
import { useDisclosure } from "@mantine/hooks";
import ViewModal from "../components/modals/ViewModal";
import Button from "../components/buttons/Button";
import AddClientModal from "../components/modals/AddClientModal";
import DeleteModal from "../components/modals/DeleteModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import useAuth from "../utils/auth";
import { Link } from "react-router-dom";
import { UPLOADS, clientRoutes } from "../utils/constants/api";
//import { clientData } from "../assets/JsonData/test_data";

export interface ClientDataProp {
  address: string;
  adminId: string;
  clientId: string;
  contactPerson: string;
  createdAt: string;
  email: string;
  image: string;
  mobile: string;
  name: string;
  ownerId: string;
  updatedAt: string;
  website: string;
  _id: string;
}

export const imageUrlChecker = (url: string | undefined) => {
  if (url) {
    return UPLOADS + url;
  }
  return placeholderImg;
};

//@ts-ignore

const ClientListUi = () => {
  const [index, setIndex] = useState(0);
  const [clientId, setClientId] = useState("");
  const { token, user } = useAuth((state) => state);

  const [cachedData, setCachedDta] = useState<Array<ClientDataProp> | null>([]);

  useEffect(() => {
    const getData = async () => {
      const req = await axios.get(clientRoutes, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (req.data.length > 0) {
        // console.log(req.data);
        // const resData = req.data.map((item: any) => {
        //   return { ...item, image: item?.image?.split("\\")[1] };
        // });
        // console.log(resData);
        setCachedDta(req.data);
      }
    };
    getData();
  }, []);

  const [currData, setCurrData] = useState<ClientDataProp | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async (id: string) => {
    await axios
      .delete(clientRoutes + `/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((_) => {
        toast.success("Client deleted succcessfully");
        location.reload();
      })
      .catch((err) =>
        toast.error("An error while deleting client " + err.message)
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
        <title key="pagetitle">Zamam Well Passport | Dashboard</title>
        <meta
          name="description"
          content="Zamam Well Passport application"
          key="metadescription"
        />
      </Helmet>
      <div className="overflow-x-hidden bg-[#E7E6E6]">
        <div className="flex flex-row items-center justify-center mt-5">
          <Input
            placeholder="Search"
            radius="xl"
            size="lg"
            className="w-full sm:w-1/2 mt-10 mb-10"
            rightSection={
              <>
                <BiSearch />
              </>
            }
          />
        </div>
        <div className="flex flex-row items-center justify-between px-6 pb-2">
          <div className="text-[20px] tracking-wide font-bold font-lekton">
            CLIENT LIST
          </div>
          {user?.role === "ADMIN" ? (
            <div className="text-center flex flex-row items-center">
              <Button
                children="ADD NEW CLIENT"
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
                { _id: id, name, contactPerson, website, image, ...rest },
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
                      contactPerson,
                      website,
                      image,
                      ...rest,
                    });
                  }}
                >
                  <div className="flex flex-row gap-6 items-center">
                    <img
                      src={imageUrlChecker(image)}
                      width={130}
                      height={89}
                      alt="exxon"
                    />
                    <div className="sm:hidden font-lekton text-md font-bold">
                      {name}
                    </div>
                    <div className="text-lg font-lekton font-semibold hidden sm:block md:block lg:block">
                      <div className="">
                        <span className="text-grey-200">Client Name: </span>
                        <span className="font-bold">{name}</span>
                      </div>
                      <div className="">
                        <span className="text-grey-200">Contact Person: </span>
                        <span className="font-semibold">{contactPerson}</span>
                      </div>
                      <div className="">
                        <span className="text-grey-200">Website: </span>
                        <Link
                          to={website}
                          target="_blank"
                          className="font-bold underline"
                        >
                          {website}
                        </Link>
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
                              setClientId(id);
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
              <p>No Clients Available</p>
            ) : null}
          </div>
        </div>
      </div>
      <ViewModal
        open={open}
        opened={opened}
        close={close}
        title="CLIENT INFORMATION"
        clientData={currData}
      />
      <AddClientModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD NEW CLIENT"
      />
      <AddClientModal
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
        id={clientId}
        onDelete={() => handleDelete(clientId)}
      />
    </>
  );
};

export default ClientListUi;
