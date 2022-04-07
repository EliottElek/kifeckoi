import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./Comments.css";

const Comments = ({ comments, setComments, event }) => {
  return (
    <div className="comments__container">
      <h3>Commentaires</h3>
      {comments.map((comment, i) => (
        <Comment key={i} comment={comment} />
      ))}
      <CommentForm
        comments={comments}
        setComments={setComments}
        event={event}
      />
    </div>
  );
};

export default Comments;
