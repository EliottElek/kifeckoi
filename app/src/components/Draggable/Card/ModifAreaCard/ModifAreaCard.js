import React from "react";
import RenderHtml from "../../../../assets/RenderHtml";
import "../../../GlobalInfos/ModifTextArea/ModifTextArea.scss";
import TextEditor from "../../../TextEditor/TextEditor";
const ModifAreaCard = ({ event, handleModifyDescription, large }) => {
  const [modifMode, setModifMode] = React.useState(false);

  if (modifMode)
    return (
      <div style={{ width: "100%" }}>
        <TextEditor
          large={large}
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
        style={{ fontSize: large ? "1.8rem" : "1rem" }}
      >
        <RenderHtml>{event?.description}</RenderHtml>
      </div>
    );
};

export default ModifAreaCard;
