import React from "react";
import "./CommentForm.scss";
import {
  AiOutlineUnorderedList,
  AiOutlineItalic,
  AiOutlineLink,
} from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { BiItalic } from "react-icons/bi";
import { BsTypeBold } from "react-icons/bs";
import AutoTextArea from "../../../../../materials/AutoSizeTextArea/AutoSizeTextArea";
import Button from "../../../../../materials/Button/Button";
import { toast } from "react-toastify";
import { CREATE_COMMENT } from "../../../../../graphql/mutations";
import { Context } from "../../../../Context/Context";
import Avatar from "../../../../../materials/Avatar/Avatar";
import ReactTooltip from "react-tooltip";
import Progress from "../../../../../materials/Progress/Progress";
const CommentForm = ({ commentsData, dataEvents, event }) => {
  const [modifMode, setModifMode] = React.useState(false);
  const [createComment, { loading }] = useMutation(CREATE_COMMENT);
  const [content, setContent] = React.useState("");
  const { user } = React.useContext(Context);
  const handleInsertStyle = (style) => {
    if (style === "bold") {
      setContent((prev) => prev + " **bold** ");
    } else if (style === "italic") {
      setContent((prev) => prev + " *italic* ");
    } else if (style === "italic&bold") {
      setContent((prev) => prev + " ***italic and bold*** ");
    } else if (style === "h1") {
      setContent((prev) =>
        prev === "" ? "# title 1" : prev + "\n # title 1 "
      );
    } else if (style === "h2") {
      setContent((prev) =>
        prev === "" ? "## title 2" : prev + "\n ## title 2 "
      );
    } else if (style === "h3") {
      setContent((prev) =>
        prev === "" ? "### title 3" : prev + "\n ### title 3 "
      );
    } else if (style === "list") {
      setContent((prev) =>
        prev === ""
          ? "- item 1 \n - item 2 \n - item 3"
          : prev + "\n - item 1 \n - item 2 \n - item 3"
      );
    } else if (style === "link") {
      setContent((prev) => prev + " [text](url) ");
    }
  };

  const onSumbitComment = async (e) => {
    e.stopPropagation();
    if (content === "") return;
    try {
      await createComment({
        variables: {
          eventId: event.id,
          authorId: user.id,
          content: content,
        },
      });
      commentsData.refetch();
      setContent("");
    } catch (e) {
      toast.error("Impossible de créer le commentaire.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  if (loading) {
    return (
      <span style={{ display: "flex", alignItems: "center" }}>
        <Progress size="small" /> Envoi...
      </span>
    );
  } else if (commentsData.loading) {
    return (
      <span style={{ display: "flex", alignItems: "center" }}>
        <Progress size="small" /> Réception...
      </span>
    );
  } else if (dataEvents.loading) {
    return (
      <span style={{ display: "flex", alignItems: "center" }}>
        <Progress size="small" /> Réception...
      </span>
    );
  }
  if (modifMode)
    return (
      <div className={"edit__block__container__comment"}>
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
          value={content}
          placeholder={"Votre commentaire..."}
          onChange={(e) => setContent(e.target.value)}
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
              onSumbitComment(e);
              setModifMode(false);
            }}
            style={{ height: "30px" }}
          >
            Envoyer le commentaire
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
        className="paragraph__textarea__comment"
      >
        <Avatar
          style={{ margin: "12px" }}
          name="Vous"
          src={user.avatarUrl}
          mini
        />
        <span className="comment__cta__span">
          {user.firstname}, un commentaire ?...{" "}
        </span>
      </div>
    );
};

export default CommentForm;
