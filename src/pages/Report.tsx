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
import AddReportModal from "../components/modals/AddReportModal";
import GenerateReportModal from "../components/modals/GenerateReportModal";
import Table from "./Table";
import { reportColumn } from "../utils/columns/Report";

export interface ReportDataProp {
  _id: string;

  fieldId: string;

  clientId: string;

  name: string;

  author: string;

  projectId: string;

  wellId: string;

  image: string;
}
//@ts-ignore

const ReportList = () => {
  const { token, user } = useAuth((state) => state);
  const yu = JSON.parse(window.localStorage.getItem("project") || "{}");
  //const navigate = useNavigate();

  const [cachedData, setCachedDta] = useState<Array<ReportDataProp> | null>([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(apiRoutes.getReportByProjectId + `${yu.projectId}`, {
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

  const [opened, { open, close }] = useDisclosure(false);

  // const [openedAddModal, { open: openAddModal, close: onClose }] =
  //   useDisclosure(false);

  const [
    openedGenerateModal,
    { open: openGenerateModal, close: onCloseGenereateModal },
  ] = useDisclosure(false);

  return (
    <>
      <Helmet>
        <title key="pagetitle">Zamam Well Passport | Report</title>
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
              <Link to="/home/client/project">Project</Link>
              <BsArrowRight />
            </div>
            <div className="flex flex-row items-center gap-1">
              <Link to="#">Report</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mb-12"></div>

        <div className="flex flex-row items-center justify-between px-6 pb-2">
          <div className="text-[15px] sm:text-[20px] tracking-wide font-bold font-lekton">
            {yu.projectName?.toUpperCase()} | REPORT LIST
          </div>
          {user?.role === "ADMIN" || user?.role === "USER" ? (
            <div className="text-center flex flex-col sm:flex-row items-center gap-2">
              <Button
                children="GENERATE REPORT"
                className="text-[10px] sm:text-sm h-[28px] w-3/3 text-black"
                onClick={openGenerateModal}
                variant="outline_black"
                icon={
                  <>
                    <AiOutlinePlus className="text-black font-bold" />
                  </>
                }
              />
              <Button
                children="ADD NEW REPORT"
                className="text-[11px] sm:text-sm h-[28px] w-3/3"
                onClick={open}
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
          <Table data={cachedData ? cachedData : []} columns={reportColumn} />
        </div>
      </div>
      <AddReportModal open={open} opened={opened} close={close} />
      <GenerateReportModal
        open={openGenerateModal}
        opened={openedGenerateModal}
        close={onCloseGenereateModal}
      />
    </>
  );
};

export default ReportList;
