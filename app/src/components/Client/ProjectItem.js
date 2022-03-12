import React from "react";
import "./Client.css";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";

const ProjectItem = ({ project }) => {
  const navigate = useNavigate();
  const { setCurrentProject } = React.useContext(Context);
  return (
    <div
      onClick={() => {
        setCurrentProject(project);
        navigate(`/project/${project[0].id}`);
      }}
      className={"project__item"}
    >
      <div className={"project__item__name__container"}>
        <p>{project[0]?.value}</p>
      </div>
      <i className="gg-chevron-right"></i>
    </div>
  );
};

export default ProjectItem;