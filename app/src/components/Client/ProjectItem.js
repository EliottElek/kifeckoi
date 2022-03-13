import React from "react";
import "./Client.css";
import { useNavigate, useParams } from "react-router";
import { Context } from "../Context/Context";

const ProjectItem = ({ project }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setCurrentProject } = React.useContext(Context);
  return (
    <div
      onClick={() => {
        setCurrentProject(project[0]);
        navigate(`/client/${id}/${project[0]?.value}`);
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
