import { FC, useEffect } from "react";
// import { ReportDataProp } from "./Report";
import useSetReport from "../hooks/useSetReport";

// interface ViewReportProps {
//   reportData: ReportDataProp;
// }

const ViewReportComponent: FC = ({}) => {
  const { reportId } = useSetReport((state) => state);

  useEffect(() => {
    //const getReport
  }, []);

  return <div>{reportId && reportId}</div>;
};

export default ViewReportComponent;

export const ViewReport: FC = ({}) => {
  return <div>ViewReport</div>;
};
