import React from "react";
import Avatar from "../../../../materials/Avatar/Avatar";
import "./Comments.scss";
import { FiMoreHorizontal } from "react-icons/fi";
import { Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import AutoTextArea from "../../../../materials/AutoSizeTextArea/AutoSizeTextArea";
import {
  CHANGE_COMMENT__CONTENT,
  DELETE_COMMENT,
} from "../../../../graphql/mutations";
import formatDate from "../../../../assets/functions/formatDate";
import { Context } from "../../../Context/Context";
import RenderHtml from "../../../../assets/RenderHtml";
const Comment = ({ comment, commentsData }) => {
  const { user } = React.useContext(Context);
  const [changeCommentContent] = useMutation(CHANGE_COMMENT__CONTENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [editMode, setEditMode] = React.useState(false);
  const [content, setContent] = React.useState(comment.content);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopUp = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUpdateCommentContent = async () => {
    try {
      await changeCommentContent({
        variables: {
          commentId: comment.id,
          newContent: content,
        },
      });
      commentsData.refetch();
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
    }
  };
  const handleDeleteComment = async () => {
    try {
      await deleteComment({
        variables: {
          commentId: comment.id,
        },
      });
      commentsData.refetch();
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
    }
  };
  return (
    <div className={editMode ? "comment__item__edit__mode" : "comment__item"}>
      <Avatar
        name={comment?.author?.firstname}
        mini
        src={comment?.author?.avatarUrl}
      />
      <div className={"comment__item__div"}>
        <div className={"comment__item__name__content"}>
          {comment?.author?.firstname} {comment?.author?.lastname}
          <span className={"comment__item__name__date"}>
            {formatDate(comment?.creation, true)}
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
            <RenderHtml>{comment?.content}</RenderHtml>
          )}
        </span>
      </div>
      {user.id === comment.author.id && (
        <>
          <button
            className="more__button__comment"
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
          >
            <FiMoreHorizontal />
          </button>
        </>
      )}
      <Menu
        anchorEl={anchorEl}
        open={openPopUp}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            e.stopPropagation();
            setEditMode(true);
            setAnchorEl(null);
          }}
        >
          <p>Modifier...</p>
        </MenuItem>
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteComment();
            setAnchorEl(null);
          }}
        >
          <p>Supprimer...</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Comment;
