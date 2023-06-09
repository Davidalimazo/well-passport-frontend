import { Input } from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import Button from "../components/buttons/Button";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import useAuth from "../utils/auth";
import { fieldRoutes } from "../utils/constants/api";
import AddFieldModal from "../components/modals/AddFieldModal";
import { fieldColumn } from "../utils/columns/Field";
import Table from "./Table";

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
  const { token, user } = useAuth((state) => state);

  const [cachedData, setCachedDta] = useState<Array<FieldDataProp> | null>([]);

  useEffect(() => {
    const getData = async () => {
      const req = await axios.get(
        user?.role !== "CLIENT"
          ? fieldRoutes
          : fieldRoutes + `/client/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (req.data.length > 0) {
        setCachedDta(req.data);
      }
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
        <div className="px-4">
          <Table
            data={cachedData ? cachedData : []}
            columns={fieldColumn}
            showExport
          />
        </div>
      </div>
      <AddFieldModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD NEW FIELD"
      />
    </>
  );
};

export default FieldListUI;
