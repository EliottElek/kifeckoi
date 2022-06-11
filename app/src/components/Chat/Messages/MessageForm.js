import React from "react";
import "quill-mention";
import "quill/dist/quill.snow.css";
import "./Messages.scss";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Context } from "../../Context/Context";
export default function MessageForm({ messages, setMessages }) {
  const { user } = React.useContext(Context);
  const messageRef = React.useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      { author: { id: user.id }, content: messageRef.current.value },
    ]);
    messageRef.current.value = "";
  };
  return (
    <form className="message__form__container" onSubmit={handleSubmit}>
      <div className="message__form__container__input">
        <input ref={messageRef} placeholder="Votre message..." />
      </div>
      <IconButton type={"submit"} onClick={handleSubmit}>
        <SendIcon />
      </IconButton>
    </form>
  );
}
