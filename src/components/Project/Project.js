import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { Context } from "../Context/Context";
import Button from "../../materials/Button/Button";
import StickyNavbar from "../StickyNavbar/StickyNavbar";
import "./Project.css";
import Form from "./Form";
const Project = () => {
  const navigate = useNavigate();
  const { projects } = useContext(Context);
  const { id } = useParams();
  const project = projects.find((project) => project.id === id);
  return (
    <div>
      <StickyNavbar>
        <div className="name__container">
          <Button onClick={() => navigate("/")}>
            <i class="gg-chevron-left"></i>Back
          </Button>
          <h2> {project?.name}</h2>
        </div>
        <div className="actions__container">
          <Button reversed>Enregistrer</Button>
          <Button reversed>Valider</Button>
          <Button reversed>Libérer</Button>
          <Button reversed>Annuler</Button>
        </div>
      </StickyNavbar>
      <Form project={project} />
    </div>
  );
};

export default Project;
