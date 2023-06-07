import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import parse from "html-react-parser";
import { useRef, useState } from "react";
import Button from "../components/buttons/Button";
import { Group } from "@mantine/core";
//import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";

const TextEditor = () => {
  const [text, setText] = useState("");
  const componentPDF = useRef(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current!,
    documentTitle: "report",
    onAfterPrint: () => alert("printed successfully"),
  });

  return (
    <div className="">
      <div className="editor mb-2 px-4 pt-4">
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(_, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
      </div>
      <Group position="center">
        <Button children="Submit" className="w-24" onClick={generatePDF} />
      </Group>

      <div
        className=""
        dangerouslySetInnerHTML={{ __html: true }}
        ref={componentPDF}
      />
    </div>
  );
};

export default TextEditor;
