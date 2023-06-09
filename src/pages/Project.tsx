import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import Button from "../components/buttons/Button";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import useAuth from "../utils/auth";
import { Link } from "react-router-dom";
import { apiRoutes } from "../utils/constants/api";
import { BsArrowRight } from "react-icons/bs";
import AddProjectModal from "../components/modals/AddProjectModal";
import Table from "./Table";
import { projectColumn } from "../utils/columns/Project";

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
        .then((res) => {
          setCachedDta(res.data);
        })
        .catch((err) => console.log(err.message));
    };
    getData();
  }, []);

  const [openedAddModal, { open: openAddModal, close: onClose }] =
    useDisclosure(false);

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
            {user?.role !== "CLIENT" && (
              <div className="flex flex-row items-center gap-1">
                <Link to="/home/client">Client</Link>
                <BsArrowRight />
              </div>
            )}
            <div className="flex flex-row items-center gap-1">
              <Link
                to={`${
                  user?.role !== "CLIENT" ? "/home/client/field" : "/home/field"
                }`}
              >
                Field
              </Link>
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
        <div className="flex flex-row items-center justify-center mb-12"></div>

        <div className="flex flex-row items-center justify-between px-6 pb-2">
          <div className="text-[15px] sm:text-[20px] tracking-wide font-bold font-lekton">
            {yu.wellName?.toUpperCase()} | PROJECT LIST
          </div>
          {user?.role === "ADMIN" || user?.role === "USER" ? (
            <div className="text-center flex flex-row items-center">
              <Button
                children="ADD NEW PROJECT"
                className="text-sm sm:text-[15px] md:text-sm lg:text-sm h-[28px] w-3/3"
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
        <div className="px-4">
          <Table
            data={cachedData ? cachedData : []}
            columns={projectColumn}
            showExport
          />
        </div>
      </div>
      <AddProjectModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD PROJECT FIELD"
      />
    </>
  );
};

export default WellProjectList;
