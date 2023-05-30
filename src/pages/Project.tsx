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
import { Link } from "react-router-dom";
import { apiRoutes, projectRoutes } from "../utils/constants/api";
import { BsArrowRight } from "react-icons/bs";
import ViewProjectModal from "../components/modals/ViewProjectModal";
import AddProjectModal from "../components/modals/AddProjectModal";

export interface ProjectDataProp {
  wellId: string;
  adminId: string;
  fieldId: string;
  clientId: string;
  name: string;
  image: string;
  status: string;
  startDate: string;
  endDate: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  description: string;
  rig: string;
}
//@ts-ignore

const WellProjectList = () => {
  const [index, setIndex] = useState(0);
  const [fieldId, setFieldId] = useState("");
  const { token, user } = useAuth((state) => state);
  const yu = JSON.parse(window.localStorage.getItem("well") || "{}");

  const [cachedData, setCachedDta] = useState<Array<ProjectDataProp> | null>(
    []
  );

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(apiRoutes.getWellProjects + `${yu.wellId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => setCachedDta(res.data))
        .catch((err) => console.log(err.message));
    };
    getData();
  }, []);
  const navigate = useNavigate();

  const [currData, setCurrData] = useState<ProjectDataProp | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async (id: string) => {
    await axios
      .delete(projectRoutes + `/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((_) => {
        toast.success("Client deleted succcessfully");
        navigate("/home/client/project", { replace: true });
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
              <Link to="/home/client/well">Well</Link>
              <BsArrowRight />
            </div>
            <div className="flex flex-row items-center gap-1">
              <Link to="#">Project</Link>
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
            {yu.wellName?.toUpperCase()} | PROJECT LIST
          </div>
          {user?.role === "ADMIN" ? (
            <div className="text-center flex flex-row items-center">
              <Button
                children="ADD NEW PROJECT"
                className="text-[13px] sm:text-lg h-[28px] w-3/3"
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
              ({ _id: id, name, status, image, rig, ...rest }, i) => (
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
                      status,
                      image,
                      rig,
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
                        <span className="text-grey-200">Project Name: </span>
                        <span className="font-bold">{name}</span>
                      </div>

                      <div className="">
                        <span className="text-grey-200">Rig: : </span>
                        <span className="font-semibold">{rig}</span>
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
      <ViewProjectModal
        open={open}
        opened={opened}
        close={close}
        title="PROJECT INFORMATION"
        clientData={currData}
      />
      <AddProjectModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD PROJECT FIELD"
        clientData={currData}
      />
      <AddProjectModal
        open={openEditModal}
        opened={openedEditModal}
        close={onCloseEdit}
        title="EDIT PROJECT INFORMATION"
        clientData={currData}
        isEdit
      />
      <DeleteModal
        open={openDeleteModal}
        opened={openedDeleteModal}
        close={onCloseDelete}
        text="Are you sure you want to delete this project"
        id={fieldId}
        onDelete={() => handleDelete(fieldId)}
      />
    </>
  );
};

export default WellProjectList;
