import "./Projects.scss";
import GridItem from "../Grid/GridItem";
import logo from "../../assets/images/logo.png";
import formatDate from "../../assets/functions/formatDate";
import AvatarFromLetter from "../../utils/AvatarFromLetter";
const ProjectItem = ({ project }) => {
  return (
    <GridItem to={`/project/${project.id}`} className={"project__item"}>
      <div className={"project__card__header"}>
        <img src={project.avatarUrl ? project.avatarUrl : logo} alt="" />
      </div>
      <div className="middle__image">
        {project.avatarUrl ? (
          <img alt="" src={project.avatarUrl} />
        ) : (
          <AvatarFromLetter text={project.name} />
        )}
      </div>
      <div className="project__card__avatars__container">
        <div className="project__card__avatars__container__title">
          <h3>{project.name}</h3>
          <p>{formatDate(project.creation, true)}</p>
        </div>
      </div>
    </GridItem>
  );
};

export default ProjectItem;
