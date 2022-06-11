import React from "react";
import "./Avatar.scss";
import defaultAvatar from "../../assets/images/defaultAvatar.webp";
import ReactTooltip from "react-tooltip";
const Avatar = ({ src, mini, name, large, style }) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = React.useState(true);

  // On initization set the isOnline state.
  React.useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  if (large)
    return (
      <div className="avatar__outer" style={style}>
        <img
          data-tip
          data-for={`AvatarTip${name}`}
          className={"avatar_large"}
          src={isOnline ? src : defaultAvatar}
          alt=""
        />
        <ReactTooltip delayShow={500} id={`AvatarTip${name}`} effect="solid">
          <span>{name}</span>
        </ReactTooltip>
      </div>
    );
  return (
    <div className="avatar__outer" style={style}>
      <img
        data-tip
        data-for={`AvatarTip${name}`}
        className={mini ? "avatar_mini" : "avatar"}
        src={isOnline ? src : defaultAvatar}
        alt=""
      />
      <ReactTooltip delayShow={500} id={`AvatarTip${name}`} effect="solid">
        <span>{name}</span>
      </ReactTooltip>
    </div>
  );
};

export default Avatar;
