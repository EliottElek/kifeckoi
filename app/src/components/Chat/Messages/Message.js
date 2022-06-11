import React from "react";
import { Context } from "../../Context/Context";
import { CircularProgress } from "@mui/material";
import "./Messages.scss";
const Message = ({ message }) => {
  const { user } = React.useContext(Context);

  if (!user) return <CircularProgress />;
  return (
    <div
      className="message__container"
      style={{
        justifyContent:
          message?.author?.id === user?.id ? "flex-end" : "flex-start",
        color: message?.author?.id === user?.id ? "white" : "var(--font-color)",
      }}
    >
      <div
        style={{
          background:
            message?.author?.id === user?.id
              ? "var(--main-color)"
              : "var(--background1)",
        }}
        className="message__container__item"
      >
        {message?.content}
      </div>
    </div>
  );
};

export default Message;
