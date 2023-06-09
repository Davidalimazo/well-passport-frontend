import { MantineReactTable, MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import { Box, Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
import useAuth from "../utils/auth";

interface Prop {
  data: Array<any>;
  columns: MRT_ColumnDef<any>[];
  showExport?: boolean;
}

const Table = ({ data, columns, showExport }: Prop) => {
  //const { token, user } = useAuth((state) => state);
  //defining columns outside of the component is fine, is stable

  const { user } = useAuth((state) => state);

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(csvOptions);
  const handleExportRows = (rows: MRT_Row<any>[]) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableRowSelection
      positionToolbarAlertBanner="bottom"
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            padding: "8px",
            flexWrap: "wrap",
          }}
        >
          {(user?.role === "ADMIN" && showExport) ||
          (user?.role === "USER" && showExport) ? (
            <>
              <Button
                color="lightblue"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={handleExportData}
                leftIcon={<IconDownload />}
                variant="filled"
                className="bg-red-500"
              >
                Export All Data
              </Button>
              <Button
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                //only export selected rows
                onClick={() =>
                  handleExportRows(table.getSelectedRowModel().rows)
                }
                leftIcon={<IconDownload />}
                variant="filled"
                className="bg-red-500"
              >
                Export Selected Rows
              </Button>
            </>
          ) : null}
        </Box>
      )}
    />
  );
};

export default Table;
