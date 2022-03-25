import React from "react";
import "./RecentActions.css";
import { useNavigate } from "react-router";
import shortString from "../../../assets/functions/shortString";
const RecentActionsItem = ({ action }) => {
  const [status, setStatus] = React.useState("");
  const navigate = useNavigate();
  React.useEffect(() => {
    if (action.status === "Réalisé") setStatus("action__green");
    else if (action.status === "En cours") setStatus("action__marron");
    else if (action.status === "Nouveau") setStatus("action__blue");
    else if (action.status === "À planifier") setStatus("action__orange");
  }, [action.status, setStatus]);
  return (
    <div
      className="action_item"
      onClick={() => {
        navigate(`/project/${action?.project?.id}`);
      }}
    >
      <div className={"action__item__name__container"}>
        <p>{shortString(action?.project.name + " - " + action?.description, 110)}</p>
        <span className={status}>{action?.status}</span>
      </div>
      <i className="gg-chevron-right"></i>
    </div>
  );
};

export default RecentActionsItem;
