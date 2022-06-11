import "./Client.scss";
import GridItem from "../Grid/GridItem";
import logo from "../../assets/images/logo.png";
import formatDate from "../../assets/functions/formatDate";
import Avatars from "../Draggable/Card/Avatars";
const ProjectItem = ({ project }) => {
  return (
    <GridItem to={`/project/${project?.id}/global`} className={"project__item"}>
      <div className={"client__card__header"}>
        <img src={project.logoUrl ? project.logoUrl : logo} alt="" />
      </div>
      <div className="middle__image">
        <img alt="" src={project.logoUrl ? project.logoUrl : logo} />
      </div>
      <div className="client__card__avatars__container">
        <div className="client__card__avatars__container__title">
          <h3>{project.name}</h3>
          <p>{formatDate(project.creation, true)}</p>
        </div>
        <Avatars users={project?.contributors} />
      </div>
    </GridItem>
  );
};

export default ProjectItem;
