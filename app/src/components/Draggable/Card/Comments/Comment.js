import React from "react";
import ReactMarkdownSnippet from "../../../../assets/ReactMarkdown";
import Avatar from "../../../../materials/Avatar/Avatar";
import "./Comments.css";
import { FiMoreHorizontal } from "react-icons/fi";
import Popup from "../../../../materials/Popup/Popup";
import MenuItem from "../../../../materials/Menu/MenuItem";
import Menu from "../../../../materials/Menu/Menu";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import AutoTextArea from "../../../../materials/AutoSizeTextArea/AutoSizeTextArea";
import {
  CHANGE_COMMENT__CONTENT,
  DELETE_COMMENT,
} from "../../../../graphql/mutations";
const Comment = ({ comment, comments, setComments }) => {
  const [changeCommentContent] = useMutation(CHANGE_COMMENT__CONTENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);

  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [content, setContent] = React.useState(comment.content);

  const handleUpdateCommentContent = async () => {
    try {
      await changeCommentContent({
        variables: {
          commentId: comment.id,
          newContent: content,
        },
      });
      var newComments = [...comments];
      const index = newComments.findIndex((com) => com.id === comment.id);
      const item = { ...newComments[index] };
      item.content = content;
      newComments[index] = item;
      setComments(newComments);
      toast.success("Commentaire modifié avec succès.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (err) {
      toast.error("Impossible de modifier le commentaire.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      console.log(err);
    }
  };
  const handleDeleteComment = async () => {
    try {
      await deleteComment({
        variables: {
          commentId: comment.id,
        },
      });
      var newComments = comments.filter((com) => com.id !== comment.id);
      setComments(newComments);
      toast.success("Commentaire supprimé avec succès.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (err) {
      toast.error("Impossible de supprimer le commentaire.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      console.log(err);
    }
  };
  return (
    <div className={editMode ? "comment__item__edit__mode" : "comment__item"}>
      <Avatar
        name={comment.author.firstname}
        mini
        src={comment.author.avatarUrl}
      />
      <div className={"comment__item__div"}>
        <div className={"comment__item__name__content"}>
          {comment.author.firstname} {comment.author.lastname}
          <span className={"comment__item__name__date"}>
            {new Date(comment.creation).getDate()}
            {"/"}
            {new Date(comment.creation).getMonth()}
            {"/"}
            {new Date(comment.creation).getFullYear()}
            {" à "}
            {new Date(comment.creation).getHours()}
            {":"}
            {new Date(comment.creation).getMinutes()}
          </span>
        </div>
        <span className={"span__content"}>
          {editMode ? (
            <>
              <AutoTextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                className={"edit__comment__textarea"}
              />
              <div className={"edit__comment__action__container"}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateCommentContent();
                    setEditMode(false);
                  }}
                  className={"edit__comment__action__submit"}
                >
                  Valider
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditMode(false);
                  }}
                  className={"edit__comment__action__cancel"}
                >
                  Annuler
                </button>
              </div>
            </>
          ) : (
            <ReactMarkdownSnippet>{comment.content}</ReactMarkdownSnippet>
          )}
        </span>
      </div>
      <button
        className="more__button__comment"
        onClick={(e) => {
          e.stopPropagation();
          setOpenPopUp(true);
        }}
      >
        <FiMoreHorizontal />
      </button>
      <Popup open={openPopUp} setOpen={setOpenPopUp}>
        <Menu>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(true);
              setOpenPopUp(false);
            }}
          >
            <p>Modifier...</p>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteComment();
              setOpenPopUp(false);
            }}
          >
            <p>Supprimer...</p>
          </MenuItem>
        </Menu>
      </Popup>
    </div>
  );
};

export default Comment;
