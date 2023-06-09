import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import Button from "../components/buttons/Button";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import useAuth from "../utils/auth";
import { Link } from "react-router-dom";
import { wellRoutes } from "../utils/constants/api";
import AddWellModal from "../components/modals/AddWellModal";
import { BsArrowRight } from "react-icons/bs";
import useSetField from "../hooks/useSetField";
import Table from "./Table";
import { wellColumn } from "../utils/columns/Well";

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
  const { fieldName } = useSetField((state) => state);
  const { token, user } = useAuth((state) => state);

  const [cachedData, setCachedDta] = useState<Array<WellDataProp> | null>([]);

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
              <Link to="#">Well</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mb-12"></div>

        <div className="flex flex-row items-center justify-between px-6 pb-2">
          <div className="text-[15px] sm:text-[20px] tracking-wide font-bold font-lekton">
            {fieldName?.toUpperCase()} WELL LIST
          </div>
          {user?.role === "ADMIN" || user?.role === "USER" ? (
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
        <div className="px-4">
          <Table
            data={cachedData ? cachedData : []}
            columns={wellColumn}
            showExport
          />
        </div>
      </div>
      <AddWellModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD WELL FIELD"
      />
    </>
  );
};

export default WellFieldList;
