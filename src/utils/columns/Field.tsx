import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { fieldRoutes } from "../constants/api";
import useAuth from "../auth";
import { useDisclosure } from "@mantine/hooks";
import DeleteModal from "../../components/modals/DeleteModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { imageUrlChecker } from "../../pages/Client";
import ViewFieldModal from "../../components/modals/ViewFieldModal";
import AddClientFieldModal from "../../components/modals/AddClientFieldModal";

export const fieldColumn: MRT_ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: "Image",
    size: 200,
    Cell: ({ row }) => (
      <img
        src={imageUrlChecker(row._valuesCache.image)}
        height={50}
        width={100}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Field Name",
    size: 120,
  },
  {
    accessorKey: "numberOfWells",
    header: "Number Of Wells",
    size: 120,
  },
  {
    accessorKey: "superintendent.name",
    header: "Supervisor Name",
    size: 120,
  },
  {
    accessorKey: "superintendent.email",
    header: "Supervisor Email",
  },
  {
    Cell: ({ row }) => {
      return <Action row={row.original} />;
    },
    accessorKey: undefined,
    header: "Action",
    size: 220,
  },
];

interface Props {
  row: any;
}

const Action = ({ row }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: onCloseEdit }] =
    useDisclosure(false);
  const [openedDeleteModal, { open: openDeleteModal, close: onCloseDelete }] =
    useDisclosure(false);
  const { user, token } = useAuth((state) => state);

  const handleDelete = async (id: string) => {
    await axios
      .delete(fieldRoutes + `/${id}`, {
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

  const [id, setId] = useState("");
  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        {user?.role === "ADMIN" ? (
          <>
            <AiFillEye onClick={open} className="cursor-pointer" />

            <AiFillEdit onClick={openEditModal} className="cursor-pointer" />

            <MdDeleteForever
              onClick={() => {
                setId(row._id);
                openDeleteModal();
              }}
              className="cursor-pointer"
            />
          </>
        ) : (
          <AiFillEye onClick={open} />
        )}
      </div>
      <ViewFieldModal
        open={open}
        opened={opened}
        close={close}
        title="FIELD INFORMATION"
        clientData={row}
      />
      <AddClientFieldModal
        open={openEditModal}
        opened={openedEditModal}
        close={onCloseEdit}
        title="EDIT CLIENT INFORMATION"
        clientData={row}
        isEdit
      />
      <DeleteModal
        open={openDeleteModal}
        opened={openedDeleteModal}
        close={onCloseDelete}
        text="Are you sure you want to delete this field"
        id={id}
        onDelete={() => handleDelete(id)}
      />
    </>
  );
};
