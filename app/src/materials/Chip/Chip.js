import React from "react";
import "./Chip.scss";
import defaultAvatar from "../../assets/images/defaultAvatar.webp";
import ReactTooltip from "react-tooltip";
const Chip = ({ text, src }) => {
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

  return (
    <>
      <div data-tip className="chip__container" data-for={`ChipTip${text}`}>
        <span className="chip__container__name">{text}</span>
        <img
          alt=""
          className="chip__container__image"
          src={isOnline ? src : defaultAvatar}
        />
      </div>
      <ReactTooltip delayShow={500} id={`ChipTip${text}`} effect="solid">
        <span>{text}</span>
      </ReactTooltip>
    </>
  );
};

export default Chip;
