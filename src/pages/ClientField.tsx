import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import Button from "../components/buttons/Button";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import useAuth from "../utils/auth";
import { Link } from "react-router-dom";
import { fieldRoutes } from "../utils/constants/api";
import AddClientFieldModal from "../components/modals/AddClientFieldModal";
import { BsArrowRight } from "react-icons/bs";
import useSetClient from "../hooks/useSetClient";
import Table from "./Table";
import { fieldColumn } from "../utils/columns/Field";

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

const ClientFieldList = () => {
  const { token, user } = useAuth((state) => state);
  const { clientId, clientName } = useSetClient((state) => state);

  const [cachedData, setCachedDta] = useState<Array<FieldDataProp> | null>([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(fieldRoutes + `/client/${clientId}`, {
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
        <title key="pagetitle">Zamam Well Passport | Fields</title>
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
              <Link to="#">Field</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mb-12"></div>
        <div className="flex flex-row items-center justify-between px-6 pb-2">
          <div className="text-[15px] sm:text-[20px] tracking-wide font-bold font-lekton">
            {clientName?.toUpperCase()} FIELD LIST
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
        <div className="px-4">
          <Table
            data={cachedData ? cachedData : []}
            columns={fieldColumn}
            showExport
          />
        </div>
      </div>
      <AddClientFieldModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD NEW FIELD"
      />
    </>
  );
};

export default ClientFieldList;
