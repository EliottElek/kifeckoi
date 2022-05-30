import React from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.scss";
import Button from "../../materials/Button/Button";

const atValues = [
  { id: 1, value: "Eliott" },
  { id: 2, value: "Clémence" },
  { id: 3, value: "Paul" },
  { id: 4, value: "Henri" },
];
const hashValues = [
  { id: 3, value: "Fredrik Sundqvist 2" },
  { id: 4, value: "Patrik Sjölin 2" },
];

const mentionModuleConfig = {
  allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  mentionDenotationChars: ["@", "#"],
  source: function (searchTerm, renderList, mentionChar) {
    let values;

    if (mentionChar === "@") {
      values = atValues;
    } else {
      values = hashValues;
    }

    if (searchTerm.length === 0) {
      renderList(values, searchTerm);
    } else {
      const matches = [];
      for (let i = 0; i < values.length; i++)
        if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) {
          matches.push(values[i]);
        }
      renderList(matches, searchTerm);
    }
  },
};

const modules = {
  mention: mentionModuleConfig,
};

function CommentBox({
  setModifMode,
  defaultValue,
  handleModifyDescription,
  placeholder,
}) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
  };
  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        placeholder={placeholder}
      />
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "12px",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setModifMode(false);
          }}
          reversed
          style={{
            height: "40px",
            width: "140px",
            border: "solid 2px var(--main-color)",
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={(e) => {
            handleModifyDescription(e, value);
            setModifMode(false);
          }}
          style={{
            height: "40px",
            width: "140px",
            border: "solid 2px var(--main-color)",
          }}
        >
          Valider
        </Button>
      </div>
    </>
  );
}

export default CommentBox;
