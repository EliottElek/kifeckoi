import React from "react";
import Message from "./Message";
import MessageForm from "./MessageForm";
import "./Messages.scss";
const Messages = () => {
  const messagesD = {
    channelId: "2",
    name: "Paul Moquin",
    messages: [
      {
        id: "fbc32848-f0fb-40c4-9dsdsb8c-71dde10b9665",
        author: {
          id: "fbc32848-f0fb-40c4-9b8c-71dde10b9665",
          firstname: "Eliott",
          lastname: "Morcillo",
        },
        content: "Content of the message from Eliott.",
      },
      {
        id: "23E5",
        author: {
          id: "fbdsddfdfc32848-f0fb-40c4-9b8c-71dde10b9665",
          firstname: "Paul",
          lastname: "Moquin",
        },
        content: "Content of the message from Paul.",
      },
    ],
  };
  const [messages, setMessages] = React.useState(messagesD.messages);
  return (
    <div className="channel__container">
      <div className="channel__container__toolbar">{messagesD.name}</div>
      <div className="messages__container">
        {messages.map((message) => (
          <Message message={message} />
        ))}
      </div>
      <div>
        <MessageForm messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default Messages;
