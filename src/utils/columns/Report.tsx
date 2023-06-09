import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { reportRoutes } from "../constants/api";
import useAuth from "../auth";
import { useDisclosure } from "@mantine/hooks";
import DeleteModal from "../../components/modals/DeleteModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { imageUrlChecker } from "../../pages/Client";
import FileDownloadLink from "../FileDownloadLink";
import reportImage from "../../assets/images/reportImage.png";

export const reportColumn: MRT_ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: "Image",
    size: 200,
    Cell: () => <img src={reportImage} height={50} width={50} />,
  },
  {
    accessorKey: "name",
    header: "Report Name",
    size: 120,
  },
  {
    accessorKey: "author",
    header: "Author",
    size: 120,
  },
  {
    accessorKey: "clientId",
    header: "Client Id",
    size: 120,
  },
  {
    accessorKey: "projectId",
    header: "Project Id",
    size: 120,
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
  const [openedDeleteModal, { open: openDeleteModal, close: onCloseDelete }] =
    useDisclosure(false);
  const { user, token } = useAuth((state) => state);

  const handleDelete = async (id: string) => {
    await axios
      .delete(reportRoutes + `/${id}`, {
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
        {user?.role === "ADMIN" || user?.role === "USER" ? (
          <>
            <FileDownloadLink
              fileName={`${row.name}.pdf`}
              fileUrl={imageUrlChecker(row.image)}
            >
              <AiFillEye />
            </FileDownloadLink>
            <MdDeleteForever
              onClick={() => {
                openDeleteModal();
                setId(id);
              }}
            />
          </>
        ) : (
          <AiFillEye onClick={open} />
        )}
      </div>
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
