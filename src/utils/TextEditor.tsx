import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import parse from "html-react-parser";
import { useState } from "react";
import Button from "../components/buttons/Button";
import { Group } from "@mantine/core";
//import jsPDF from "jspdf";

const TextEditor = () => {
  const [text, setText] = useState("");

  // const generatePDF = () => {
  //   const jspdf = new jsPDF("p", "px", "a4");
  //   //@ts-ignore
  //   jspdf.html(document.querySelector("#content"), {
  //     callback: function (pdf) {
  //       pdf.save("test.pdf");
  //     },
  //   });
  // };

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
        <Button children="Submit" className="w-24" onClick={() => null} />
      </Group>
    </div>
  );
};

export default TextEditor;
