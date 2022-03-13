import React from "react";
import "./Client.css";
import { useNavigate, useParams } from "react-router";

const ProjectItem = ({ project }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div
      onClick={() => {
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
