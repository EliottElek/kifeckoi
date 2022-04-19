import React from "react";
import "./Client.css";
import { useNavigate } from "react-router";

const ProjectItem = ({ project }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/project/${project?.id}/actions`);
      }}
      className={"project__item"}
    >
      <div className={"project__item__name__container"}>
        <p>{project?.name}</p>
      </div>
      <i className="gg-chevron-right"></i>
    </div>
  );
};

export default ProjectItem;
