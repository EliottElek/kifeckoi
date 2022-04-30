import React from "react";
import { Context } from "../../Context/Context";
import "./ModifTextArea.scss";
import { MODIFY_PROJECT_GLOBAL_INFOS } from "../../../graphql/mutations";
import { toast } from "react-toastify";
import {
  AiOutlineUnorderedList,
  AiOutlineItalic,
  AiOutlineLink,
} from "react-icons/ai";
import { BiItalic } from "react-icons/bi";
import { BsTypeBold } from "react-icons/bs";
import { useMutation } from "@apollo/client";
import AutoTextArea from "../../../materials/AutoSizeTextArea/AutoSizeTextArea";
import Button from "../../../materials/Button/Button";
import ReactMarkdownSnippet from "../../../assets/ReactMarkdown";
import ReactTooltip from "react-tooltip";
const ModifTextArea = ({ type, dataProject }) => {
  const { currentProject } = React.useContext(Context);
  const [modifMode, setModifMode] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [modifyProjectInfos] = useMutation(MODIFY_PROJECT_GLOBAL_INFOS);

  React.useEffect(() => {
    if (type === "global") setInput(currentProject.globalDescription);
    else if (type === "planning") setInput(currentProject.planningDescription);
    else setInput(currentProject.perimeterDescription);
  }, [
    type,
    setInput,
    currentProject.globalDescription,
    currentProject.planningDescription,
    currentProject.perimeterDescription,
  ]);

  const handleModifyDescription = async () => {
    try {
      console.log(currentProject);
      await modifyProjectInfos({
        variables: {
          projectId: currentProject.id,
          globalStatus: currentProject.globalStatus,
          perimeterStatus: currentProject.perimeterStatus,
          planningStatus: currentProject.planningStatus,
          goLiveDate: currentProject.goLiveDate,
          goCopyDate: currentProject.goCopyDate,
          logoUrl: currentProject.logoUrl,
          globalDescription:
            type === "global" ? input : currentProject.globalDescription,
          perimeterDescription:
            type === "perimètre" ? input : currentProject.perimeterDescription,
          planningDescription:
            type === "planning" ? input : currentProject.planningDescription,
        },
      });
      dataProject.refetch();
      toast.success(`description du status ${type} modifiée avec succès.`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
      setModifMode(false);
    } catch (err) {
      toast.error(`impossible de modifier la description du status ${type}`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  const handleInsertStyle = (style) => {
    if (style === "bold") {
      setInput((prev) => prev + " **bold** ");
    } else if (style === "italic") {
      setInput((prev) => prev + " *italic* ");
    } else if (style === "italic&bold") {
      setInput((prev) => prev + " ***italic and bold*** ");
    } else if (style === "h1") {
      setInput((prev) => (prev === "" ? "# title 1" : prev + "\n # title 1 "));
    } else if (style === "h2") {
      setInput((prev) =>
        prev === "" ? "## title 2" : prev + "\n ## title 2 "
      );
    } else if (style === "h3") {
      setInput((prev) =>
        prev === "" ? "### title 3" : prev + "\n ### title 3 "
      );
    } else if (style === "list") {
      setInput((prev) =>
        prev === ""
          ? "- item 1 \n - item 2 \n - item 3"
          : prev + "\n - item 1 \n - item 2 \n - item 3"
      );
    } else if (style === "link") {
      setInput((prev) => prev + " [text](url) ");
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
          className="modif__textarea"
          value={input}
          placeholder={`Ajoutez une description au status ${type}...`}
          onChange={(e) => setInput(e.target.value)}
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
            onClick={() => setModifMode(false)}
            reversed
            style={{ height: "30px" }}
          >
            Annuler
          </Button>
          <Button onClick={handleModifyDescription} style={{ height: "30px" }}>
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
      <>
        {input !== "" ? (
          <div
            onClick={() => setModifMode(true)}
            className="modif__textarea__paragraph"
          >
            {type === "global" && (
              <ReactMarkdownSnippet>
                {currentProject.globalDescription}
              </ReactMarkdownSnippet>
            )}
            {type === "planning" && (
              <ReactMarkdownSnippet>
                {currentProject.planningDescription}
              </ReactMarkdownSnippet>
            )}
            {type === "perimètre" && (
              <ReactMarkdownSnippet>
                {currentProject.perimeterDescription}
              </ReactMarkdownSnippet>
            )}
          </div>
        ) : (
          <p style={{ fontStyle: "italic" }}>
            Vous pouvez ajouter une description au status {type}.{" "}
            <Button
              reversed
              onClick={() => setModifMode(true)}
              style={{ height: "30px" }}
            >
              Ajouter une description
            </Button>
          </p>
        )}
      </>
    );
};

export default ModifTextArea;
