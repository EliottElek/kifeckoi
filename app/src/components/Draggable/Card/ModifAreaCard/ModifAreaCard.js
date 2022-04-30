import React from "react";
import "./ModifAreaCard.scss";
import {
  AiOutlineUnorderedList,
  AiOutlineItalic,
  AiOutlineLink,
} from "react-icons/ai";
import { BiItalic } from "react-icons/bi";
import { BsTypeBold } from "react-icons/bs";
import AutoTextArea from "../../../../materials/AutoSizeTextArea/AutoSizeTextArea";
import Button from "../../../../materials/Button/Button";
import ReactMarkdownSnippet from "../../../../assets/ReactMarkdown";
import ReactTooltip from "react-tooltip";
const ModifAreaCard = ({
  event,
  value,
  setValue,
  handleModifyDescription,
  placeholder,
}) => {
  const [modifMode, setModifMode] = React.useState(false);

  const handleInsertStyle = (style) => {
    if (style === "bold") {
      setValue((prev) => prev + " **bold** ");
    } else if (style === "italic") {
      setValue((prev) => prev + " *italic* ");
    } else if (style === "italic&bold") {
      setValue((prev) => prev + " ***italic and bold*** ");
    } else if (style === "h1") {
      setValue((prev) => (prev === "" ? "# title 1" : prev + "\n # title 1 "));
    } else if (style === "h2") {
      setValue((prev) =>
        prev === "" ? "## title 2" : prev + "\n ## title 2 "
      );
    } else if (style === "h3") {
      setValue((prev) =>
        prev === "" ? "### title 3" : prev + "\n ### title 3 "
      );
    } else if (style === "list") {
      setValue((prev) =>
        prev === ""
          ? "- item 1 \n - item 2 \n - item 3"
          : prev + "\n - item 1 \n - item 2 \n - item 3"
      );
    } else if (style === "link") {
      setValue((prev) => prev + " [text](url) ");
    }
  };
  if (modifMode)
    return (
      <div className={"edit__block__container"}>
        <div className="edit__block__actions__container">
          <button
            data-tip
            data-for="h1Tooltip"
            className="edit__button"
            onClick={() => handleInsertStyle("h1")}
          >
            <h1>h1</h1>
          </button>
          <button
            data-tip
            data-for="h2Tooltip"
            className="edit__button"
            onClick={() => handleInsertStyle("h2")}
          >
            <h2>h2</h2>
          </button>
          <button
            data-tip
            data-for="h3Tooltip"
            className="edit__button"
            onClick={() => handleInsertStyle("h3")}
          >
            <h3>h3</h3>
          </button>
          <button
            data-tip
            data-for="boldTooltip"
            className="edit__button"
            onClick={() => handleInsertStyle("bold")}
          >
            <BsTypeBold />
          </button>
          <button
            data-tip
            data-for="italicTooltip"
            className="edit__button"
            onClick={() => handleInsertStyle("italic")}
          >
            <AiOutlineItalic />
          </button>
          <button
            data-tip
            data-for="bolditalicTooltip"
            className="edit__button"
            onClick={() => handleInsertStyle("italic&bold")}
          >
            <BiItalic />
          </button>
          <button
            data-tip
            data-for="listTooltip"
            className="edit__button"
            onClick={() => handleInsertStyle("list")}
          >
            <AiOutlineUnorderedList />
          </button>
          <button
            data-tip
            data-for="linkTooltip"
            className="edit__button"
            onClick={() => handleInsertStyle("link")}
          >
            <AiOutlineLink />
          </button>
        </div>
        <AutoTextArea
          autoFocus
          style={{ fontSize: "1rem" }}
          className="modif__textarea"
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
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
              handleModifyDescription(e);
              setModifMode(false);
            }}
            style={{ height: "30px" }}
          >
            Valider
          </Button>
        </div>
        <ReactTooltip delayShow={500} id="h1Tooltip" effect="solid">
          <span>Grand titre</span>
        </ReactTooltip>
        <ReactTooltip delayShow={500} id="h2Tooltip" effect="solid">
          <span>Moyen titre</span>
        </ReactTooltip>
        <ReactTooltip delayShow={500} id="h3Tooltip" effect="solid">
          <span>Petit titre</span>
        </ReactTooltip>
        <ReactTooltip delayShow={500} id="boldTooltip" effect="solid">
          <span>Gras</span>
        </ReactTooltip>
        <ReactTooltip delayShow={500} id="italicTooltip" effect="solid">
          <span>Italique</span>
        </ReactTooltip>
        <ReactTooltip delayShow={500} id="bolditalicTooltip" effect="solid">
          <span>Gras + italique</span>
        </ReactTooltip>
        <ReactTooltip delayShow={500} id="listTooltip" effect="solid">
          <span>Liste</span>
        </ReactTooltip>
        <ReactTooltip delayShow={500} id="linkTooltip" effect="solid">
          <span>Lien</span>
        </ReactTooltip>
      </div>
    );
  else
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setModifMode(true);
        }}
        className="modif__textarea__paragraph__modal"
      >
        <ReactMarkdownSnippet>{event.description}</ReactMarkdownSnippet>
      </div>
    );
};

export default ModifAreaCard;
