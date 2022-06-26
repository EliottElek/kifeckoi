import React from "react";
import "./CommentForm.scss";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useCreateNotification } from "../../../../../hooks/mutations/event";
import { CREATE_COMMENT } from "../../../../../graphql/mutations";
import { Context } from "../../../../Context/Context";
import Avatar from "../../../../../materials/Avatar/Avatar";
import Progress from "../../../../../materials/Progress/Progress";
import TextEditor from "../../../../TextEditor/TextEditor";
const CommentForm = ({ event, refetch }) => {
  const [modifMode, setModifMode] = React.useState(false);
  const [createComment, { loading }] = useMutation(CREATE_COMMENT);
  const createNotification = useCreateNotification();
  const { user, dataEvents, currentProject } = React.useContext(Context);

  const onSumbitComment = async (e, content) => {
    e.stopPropagation();
    if (content === "") return;
    try {
      await createComment({
        variables: {
          eventId: event.id,
          authorId: user.id,
          content: content.root.innerHTML,
        },
      });
      await createNotification({
        variables: {
          message: `${user?.firstname} a commenté dans ${currentProject.name}.`,
          redirect: `/project/${
            currentProject.id
          }/${event.type.toLowerCase()}/${event.id}`,
          projectId: currentProject.id,
          emitterId: user.id,
          content: content.getText().toString(),
          receivers: currentProject.contributors.map((contrib) => contrib.id),
        },
      });
      setModifMode(false);
      refetch();
      dataEvents.refetch();
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
  }
  if (modifMode)
    return (
      <div style={{ width: "100%" }}>
        <TextEditor
          defaultValue={""}
          setModifMode={setModifMode}
          handleModifyDescription={onSumbitComment}
          placeholder={`Votre commentaire...`}
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
        className="paragraph__textarea__comment"
      >
        <Avatar
          style={{ margin: "12px" }}
          name="Vous"
          src={user?.avatarUrl}
          mini
        />
        <span className="comment__cta__span">
          {user?.firstname}, un commentaire ?...{" "}
        </span>
      </div>
    );
};

export default CommentForm;
