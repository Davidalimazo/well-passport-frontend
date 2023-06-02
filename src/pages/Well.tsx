import { Input } from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import { AiFillEye, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import Button from "../components/buttons/Button";
import DeleteModal from "../components/modals/DeleteModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import useAuth from "../utils/auth";
import { Link } from "react-router-dom";
import { wellRoutes } from "../utils/constants/api";
import ViewWellModal from "../components/modals/ViewWellModal";
import AddWellModal from "../components/modals/AddWellModal";
import { BsArrowRight } from "react-icons/bs";
import useSetField from "../hooks/useSetField";
import { imageUrlChecker } from "./Client";

export interface WellDataProp {
  wellId: string;
  adminId: string;
  fieldId: string;
  clientId: string;
  name: string;
  treeSpecs: number;
  image: string;
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
  _id: string;
  createdAt: string;
  updatedAt: string;
}
//@ts-ignore

const WellFieldList = () => {
  const [index, setIndex] = useState(0);
  const { fieldName } = useSetField((state) => state);
  const [wellId, setWellId] = useState("");
  const { token, user } = useAuth((state) => state);

  const [cachedData, setCachedDta] = useState<Array<WellDataProp> | null>([]);
  const [currData, setCurrData] = useState<WellDataProp | null>(null);

  useEffect(() => {
    const getData = async () => {
      const yu = JSON.parse(window.localStorage.getItem("field") || "{}");
      await axios
        .get(wellRoutes + `/field/${yu.fieldId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const resData = res.data.map((item: any) => {
            return { ...item, image: item?.image?.split("/")[1] };
          });
          setCachedDta(resData);
        })
        .catch((err) => console.log(err.message));
    };
    getData();
  }, []);

  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async (id: string) => {
    await axios
      .delete(wellRoutes + `/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((_) => {
        toast.success("Well deleted succcessfully");
        location.reload();
      })
      .catch((err) =>
        toast.error("An error while deleting well " + err.message)
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
        <title key="pagetitle">Zamam Well Passport | Wells</title>
        <meta
          name="description"
          content="Zamam Well Passport application"
          key="metadescription"
        />
      </Helmet>
      <div className="overflow-x-hidden bg-[#E7E6E6]">
        <div className="my-4 flex flex-row items-center justify-between px-6 w-full">
          <div className=""></div>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-1">
              <Link to="/home/client">Client</Link>
              <BsArrowRight />
            </div>
            <div className="flex flex-row items-center gap-1">
              <Link to="/home/client/field">Field</Link>
              <BsArrowRight />
            </div>
            <div className="flex flex-row items-center gap-1">
              <Link to="#">Well</Link>
            </div>
          </div>
        </div>
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
          <div className="text-[15px] sm:text-[20px] tracking-wide font-bold font-lekton">
            {fieldName?.toUpperCase()} WELL LIST
          </div>
          {user?.role === "ADMIN" ? (
            <div className="text-center flex flex-row items-center">
              <Button
                children="ADD NEW WELL"
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
              ({ _id: id, name, wellType, image, status, ...rest }, i) => (
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
                      wellType,
                      image,
                      status,
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
                        <span className="text-grey-200">Well Name: </span>
                        <span className="font-bold">{name}</span>
                      </div>
                      <div className="">
                        <span className="text-grey-200">Well Type: </span>
                        <span className="font-semibold">{wellType}</span>
                      </div>
                      <div className="">
                        <span className="text-grey-200">Status: </span>
                        <span className="font-semibold">{status}</span>
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
                              setWellId(id);
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
              <p>No Wells Available</p>
            ) : null}
          </div>
        </div>
      </div>
      <ViewWellModal
        open={open}
        opened={opened}
        close={close}
        title="WELL INFORMATION"
        clientData={currData}
      />
      <AddWellModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD WELL FIELD"
        clientData={currData}
      />
      <AddWellModal
        open={openEditModal}
        opened={openedEditModal}
        close={onCloseEdit}
        title="EDIT WELL INFORMATION"
        clientData={currData}
        isEdit
      />
      <DeleteModal
        open={openDeleteModal}
        opened={openedDeleteModal}
        close={onCloseDelete}
        text="Are you sure you want to delete this well"
        id={wellId}
        onDelete={() => handleDelete(wellId)}
      />
    </>
  );
};

export default WellFieldList;
