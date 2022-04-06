import React from "react";
import ReactMarkdownSnippet from "../../../../assets/ReactMarkdown";
import Avatar from "../../../../materials/Avatar/Avatar";
import "./Comments.css";
const Comment = ({ comment }) => {
  return (
    <div className={"comment__item"}>
      <Avatar mini src={comment.author.avatarUrl} />
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
          <ReactMarkdownSnippet>{comment.content}</ReactMarkdownSnippet>
        </span>
      </div>
    </div>
  );
};

export default Comment;
