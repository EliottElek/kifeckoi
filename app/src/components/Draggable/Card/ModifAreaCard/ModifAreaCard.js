import React from "react";
import "../../../GlobalInfos/ModifTextArea/ModifTextArea.scss";
import TextEditor from "../../../TextEditor/TextEditor";
import ReactMarkdownSnippet from "../../../../assets/ReactMarkdown";
const ModifAreaCard = ({ event, handleModifyDescription }) => {
  const [modifMode, setModifMode] = React.useState(false);

  if (modifMode)
    return (
      <div style={{ width: "100%" }}>
        <TextEditor
          defaultValue={event.description}
          setModifMode={setModifMode}
          handleModifyDescription={handleModifyDescription}
          placeholder={`Description de l'évènement...`}
        />
      </div>
    );
  else
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setModifMode(true);
        }}
        className="modif__textarea__paragraph"
      >
        <ReactMarkdownSnippet>{event.description}</ReactMarkdownSnippet>
      </div>
    );
};

export default ModifAreaCard;
