import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import AutoTextArea from "../../../../materials/AutoSizeTextArea/AutoSizeTextArea";
import { toast } from "react-toastify";
import { CREATE_COMMENT } from "../../../../graphql/mutations";
import { Context } from "../../../Context/Context";
import Button from "../../../../materials/Button/Button";
const CommentForm = ({ setComments, comments, event }) => {
  const [createComment] = useMutation(CREATE_COMMENT);
  const [content, setContent] = useState("");
  const { user } = React.useContext(Context);
  const onSumbitComment = async () => {
    if (content === "") return;
    try {
      console.log(content);
      const newComment = await createComment({
        variables: {
          eventId: event.id,
          authorId: user.id,
          content: content,
        },
      });
      setComments([...comments, newComment.data.createComment]);
      setContent("");
    } catch (e) {
      toast.error("Impossible de créer le commentaire.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      console.log(e);
    }
  };
  return (
    <div className={"form__comment__container"}>
      <AutoTextArea
        className={"form__comment__container__textarea"}
        value={content}
        placeholder={`${user.firstname}, un commentaire ?...`}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={onSumbitComment}>Envoyer</Button>
    </div>
  );
};

export default CommentForm;
