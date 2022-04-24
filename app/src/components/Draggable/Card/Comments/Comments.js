import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./Comments.css";

const Comments = ({ comments, event, commentsData }) => {
  return (
    <div className="comments__container">
      <h3>Commentaires ({comments?.length})</h3>
      {comments.map((comment, i) => (
        <Comment key={i} comment={comment} commentsData={commentsData} />
      ))}
      <CommentForm commentsData={commentsData} event={event} />
    </div>
  );
};

export default Comments;
