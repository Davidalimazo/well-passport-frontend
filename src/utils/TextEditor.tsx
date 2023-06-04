import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import parse from "html-react-parser";
import { useState } from "react";
import Button from "../components/buttons/Button";
import { Group } from "@mantine/core";

const TextEditor = () => {
  const [text, setText] = useState("");

  return (
    <div className="">
      <div className="editor mb-2">
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
        <Button children="Submit" className="w-24" />
      </Group>

      <div>{/* <p>{parse(text)}</p> */}</div>
    </div>
  );
};

export default TextEditor;
