import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";

interface IUpload {
  name: string;
  subText?: string;
  setFile: React.Dispatch<any>;
  file?: any;
}

export default function UploadDocs({ name, subText, file, setFile }: IUpload) {
  const onDrop = useCallback((acceptedFile: any) => {
    const thefile = {
      path: acceptedFile.map((item: any) => URL.createObjectURL(item)),
      file: acceptedFile[0],
    };
    setFile(thefile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png", ".pdf", ".jpg"],
    },
    onDrop,
    multiple: false,
  });

  return (
    <div className=" rounded-md p-4 min-w-[300px] min-h-[150px] space-y-3">
      <div className="">
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="">
            <div className="text-center font-bold font-urbanist text-xl">
              {name}
            </div>
            {subText && <div className="subtext">{subText}</div>}
          </div>
          <div
            {...getRootProps({
              className: "flex flex-col items-center justify-center gap-4",
            })}
          >
            {!file && <FaCloudUploadAlt className="text-[50px]" />}
            <input className="upload_btn" {...getInputProps()} />
            <button className={`text-black ${file ? "text-green-500" : null}`}>
              {file ? (
                <span className="flex flex-col items-center justify-center gap-3">
                  <FcCheckmark />{" "}
                  <span className="text-md font-jarkata font-semibold">
                    File Uploaded
                  </span>
                </span>
              ) : (
                <span className="text-sm font-urbanist font-semibold">
                  Select File or Drag file here
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      {file && (
        <div className="flex flex-row items-center justify-center gap-2 font-semibold">
          <span className="text-sm font-jarkata">
            {file?.file?.name} -{Math.floor(Number(file?.file?.size) / 10000)}kb
          </span>
          <FaTimes onClick={() => setFile(null)} />
        </div>
      )}
    </div>
  );
}
