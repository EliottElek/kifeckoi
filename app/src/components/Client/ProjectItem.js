import "./Client.scss";
import { useNavigate } from "react-router";
import GridItem from "../Grid/GridItem";
import logo from "../../assets/images/logo.png";
import formatDate from "../../assets/functions/formatDate";
import Avatars from "../Draggable/Card/Avatars";
const ProjectItem = ({ project }) => {
  const navigate = useNavigate();
  return (
    <GridItem
      onClick={() => {
        navigate(`/project/${project?.id}/global`);
      }}
      className={"project__item"}
    >
      <div className={"client__card__header"}>
        <img src={project.avatarUrl ? project.avatarUrl : logo} alt="" />
      </div>
      <img
        className="middle__image"
        alt=""
        src={
          "https://www.comundi.fr/mag-des-competences/wp-content/uploads/2021/09/La-relation-client.jpg"
        }
      />
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
