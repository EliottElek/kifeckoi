import Channels from "./Channels/Channels";
import "./Chat.scss";
import Messages from "./Messages/Messages";
const Chat = () => {
  return (
    <div className="chat">
      <div className="level__two__header">
        <h1 className={"client__projects__container__title"}>Conversations</h1>
      </div>
      <div className="chat__container">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default Chat;
