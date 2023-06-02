import { Input } from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import placeholderImg from "../assets/images/reportImage.png";
import { useDisclosure } from "@mantine/hooks";
import Button from "../components/buttons/Button";
import DeleteModal from "../components/modals/DeleteModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import useAuth from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { apiRoutes, reportRoutes } from "../utils/constants/api";
import { BsArrowRight } from "react-icons/bs";
import AddReportModal from "../components/modals/AddReportModal";
import { IoMdDownload } from "react-icons/io";
import GenerateReportModal from "../components/modals/GenerateReportModal";
import useSetReport from "../hooks/useSetReport";

export interface ReportDataProp {
  _id: string;

  fieldId: string;

  clientId: string;

  name: string;

  author: string;

  projectId: string;

  wellId: string;
}
//@ts-ignore

const ReportList = () => {
  const [index, setIndex] = useState(0);
  const [reportId, setReportId] = useState("");
  const { token, user } = useAuth((state) => state);
  const yu = JSON.parse(window.localStorage.getItem("project") || "{}");

  const [cachedData, setCachedDta] = useState<Array<ReportDataProp> | null>([]);
  const { setReport } = useSetReport((state) => state);
  const navigate = useNavigate();

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
      .delete(reportRoutes + `/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((_) => {
        toast.success("Report deleted succcessfully");
        location.reload();
      })
      .catch((err) =>
        toast.error("An error while deleting report " + err.message)
      );
  };

  // const [openedAddModal, { open: openAddModal, close: onClose }] =
  //   useDisclosure(false);

  const [openedDeleteModal, { open: openDeleteModal, close: onCloseDelete }] =
    useDisclosure(false);
  const [
    openedGenerateModal,
    { open: openGenerateModal, close: onCloseGenereateModal },
  ] = useDisclosure(false);

  const hadnleClick = (idx: number, id: string, name: string) => {
    setIndex(idx);
    setReport(id, name);
  };

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
              <Link to="/home/client/project">Project</Link>
              <BsArrowRight />
            </div>
            <div className="flex flex-row items-center gap-1">
              <Link to="#">Report</Link>
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
            {yu.projectName?.toUpperCase()} | REPORT LIST
          </div>
          {user?.role === "ADMIN" || user?.role === "USER" ? (
            <div className="text-center flex flex-col sm:flex-row items-center gap-2">
              <Button
                children="GENERATE REPORT"
                className="text-[10px] sm:text-lg h-[28px] w-3/3 text-black"
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
                className="text-[11px] sm:text-lg h-[28px] w-3/3"
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
        <div className="bg-[#FFFCFC] rounded-lg mx-6 p-6">
          {cachedData &&
            cachedData.map(({ _id: id, name, author }, i) => (
              <div
                className={`cursor-pointer flex flex-row gap-3 justify-between px-4 py-4 rounded-xl mb-6 ${
                  i === index ? "ring-2 ring-red-500" : "ring-2 ring-[#E7E6E6]"
                }`}
                key={id}
                onClick={() => {
                  hadnleClick(i, id, name);
                }}
              >
                <div className="flex flex-row gap-6 items-center">
                  <img
                    src={placeholderImg}
                    width={110}
                    height={80}
                    alt="exxon"
                  />
                  <div className="sm:hidden font-lekton text-md font-bold">
                    {name}
                  </div>
                  <div className="text-lg font-lekton font-semibold hidden sm:block md:block lg:block">
                    <div className="">
                      <span className="text-grey-200">Report Name: </span>
                      <span className="font-bold">{name}</span>
                    </div>

                    <div className="">
                      <span className="text-grey-200">Author: </span>
                      <span className="font-semibold">{author}</span>
                    </div>
                  </div>
                </div>
                {index === i ? (
                  <div className="text-lg flex flex-row gap-3">
                    {user?.role === "ADMIN" ? (
                      <>
                        <AiFillEye
                          onClick={() => navigate("/home/client/report/view")}
                        />

                        <IoMdDownload onClick={() => null} />

                        <MdDeleteForever
                          onClick={() => {
                            openDeleteModal();
                            setReportId(id);
                          }}
                        />
                      </>
                    ) : (
                      <AiFillEye onClick={open} />
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          <div className="my-6 flex flex-row items-center justify-center">
            {cachedData && cachedData.length < 1 ? (
              <p>No Report Available</p>
            ) : null}
          </div>
        </div>
      </div>
      <AddReportModal open={open} opened={opened} close={close} id={reportId} />
      <GenerateReportModal
        open={openGenerateModal}
        opened={openedGenerateModal}
        close={onCloseGenereateModal}
      />
      <DeleteModal
        open={openDeleteModal}
        opened={openedDeleteModal}
        close={onCloseDelete}
        text="Are you sure you want to delete this report"
        id={reportId}
        onDelete={() => handleDelete(reportId)}
      />
    </>
  );
};

export default ReportList;
