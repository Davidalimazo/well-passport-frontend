import { useEffect, useState } from "react";
import placeholderImg from "../assets/images/placeholderImg.png";
import { useDisclosure } from "@mantine/hooks";
import Button from "../components/buttons/Button";
import AddClientModal from "../components/modals/AddClientModal";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import useAuth from "../utils/auth";
import { UPLOADS, clientRoutes } from "../utils/constants/api";
import Table from "./Table";
import { AiOutlinePlus } from "react-icons/ai";
import { clientColumn } from "../utils/columns/Client";

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
        <title key="pagetitle">Zamam Well Passport | Dashboard</title>
        <meta
          name="description"
          content="Zamam Well Passport application"
          key="metadescription"
        />
      </Helmet>
      <div className="overflow-x-hidden bg-[#E7E6E6] mb-2">
        <div className="flex flex-row items-center justify-between px-6 pb-2 mt-16">
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
        <div className="px-4">
          <Table
            data={cachedData ? cachedData : []}
            columns={clientColumn}
            showExport
          />
        </div>
      </div>

      <AddClientModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD NEW CLIENT"
      />
    </>
  );
};

export default ClientListUi;
