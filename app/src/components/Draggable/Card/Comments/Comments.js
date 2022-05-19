import Progress from "../../../../materials/Progress/Progress";
import Comment from "./Comment";
import CommentForm from "./CommentForm/CommentForm";
import "./Comments.scss";

const Comments = ({ comments, event, commentsData, dataEvents }) => {
  return (
    <div className="comments__container">
      <h3>Commentaires ({comments?.length})</h3>
      {comments.map((comment, i) => (
        <Comment key={i} comment={comment} commentsData={commentsData} />
      ))}
      {commentsData.loading || dataEvents.loading ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          <Progress size="small" /> Réception...
        </span>
      ) : (
        <CommentForm
          commentsData={commentsData}
          dataEvents={dataEvents}
          event={event}
        />
      )}
    </div>
  );
};

export default Comments;
