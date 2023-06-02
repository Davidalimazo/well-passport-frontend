import { FC } from "react";
// import { ReportDataProp } from "./Report";
import useSetReport from "../hooks/useSetReport";

// interface ViewReportProps {
//   reportData: ReportDataProp;
// }

const ViewReportComponent: FC = ({}) => {
  const { reportId } = useSetReport((state) => state);

  return <div>{reportId && reportId}</div>;
};

export default ViewReportComponent;

export const ViewReport: FC = ({}) => {
  return <div>ViewReport</div>;
};
