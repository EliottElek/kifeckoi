import React from "react";
import "./RecentEvents.css";
import { useNavigate } from "react-router";
import shortString from "../../../assets/functions/shortString";
const RecenteventsItem = ({ event }) => {
  const [status, setStatus] = React.useState("");
  const navigate = useNavigate();
  React.useEffect(() => {
    if (event.status === "Réalisé") setStatus("event__green");
    else if (event.status === "En cours") setStatus("event__marron");
    else if (event.status === "Nouveau") setStatus("event__blue");
    else if (event.status === "À planifier") setStatus("event__orange");
  }, [event.status, setStatus]);
  return (
    <div
      className="event_item"
      onClick={() => {
        navigate(`/project/${event?.project?.id}`);
      }}
    >
      <div className={"event__item__name__container"}>
        <p>
          {shortString(event?.project.name + " - " + event?.description, 110)}
        </p>
        <span className={status}>{event?.status}</span>
      </div>
      <i className="gg-chevron-right"></i>
    </div>
  );
};

export default RecenteventsItem;
