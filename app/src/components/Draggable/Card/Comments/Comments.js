import { CircularProgress } from "@mui/material";
import Comment from "./Comment";
import CommentForm from "./CommentForm/CommentForm";
import "./Comments.scss";

const Comments = ({ comments, event, refetch }) => {
  if (!comments) return <CircularProgress />;
  return (
    <div className="comments__container">
      <h3>Commentaires ({comments?.length})</h3>
      {comments?.map((comment, i) => (
        <Comment key={i} comment={comment} refetch={refetch} />
      ))}
      <CommentForm event={event} refetch={refetch} />
    </div>
  );
};

export default Comments;
