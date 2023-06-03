import { Link } from "react-router-dom";

interface Prop {
  fileUrl: string;
  fileName: string;
  children: React.ReactNode;
}

const FileDownloadLink = ({ fileUrl, fileName, children }: Prop) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <Link to="#" onClick={handleDownload} target="_blank">
      {children}
    </Link>
  );
};

export default FileDownloadLink;
