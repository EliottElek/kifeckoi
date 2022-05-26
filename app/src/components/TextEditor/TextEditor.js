import { useCallback, useState } from "react";
import "quill/dist/quill.snow.css";
import "./TextEditor.scss";
import Button from "../../materials/Button/Button";
import Quill from "quill";
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = ({
  setModifMode,
  defaultValue,
  handleModifyDescription,
  placeholder,
}) => {
  const [quill, setQuill] = useState();
  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;

      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      if (defaultValue) {
        const delta = q.clipboard.convert(defaultValue);
        q.setContents(delta, "silent");
      }
      if (placeholder) q.root.dataset.placeholder = placeholder;
      setQuill(q);
    },
    [defaultValue, placeholder]
  );
  return (
    <>
      <div className={"text-editor"} ref={wrapperRef} />
      <div
        style={{
          display: "flex",
          gap: "4px",
          margin: "4px",
          marginTop: "8px",
        }}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setModifMode(false);
          }}
          reversed
          style={{ height: "30px" }}
        >
          Annuler
        </Button>
        <Button
          onClick={(e) => {
            handleModifyDescription(e, quill.root.innerHTML);
            setModifMode(false);
          }}
          style={{ height: "30px" }}
        >
          Valider
        </Button>
      </div>
    </>
  );
};

export default TextEditor;
