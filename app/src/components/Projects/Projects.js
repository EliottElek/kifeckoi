import { useContext } from "react";
import { Context } from "../Context/Context";
import "./Projects.scss";
import ProjectItem from "./ProjectItem";
import Progress from "../../materials/Progress/Progress";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Grid from "../Grid/Grid";
const Projects = () => {
  const { user } = useContext(Context);
  const title = document.getElementById("title");
  title.innerHTML = `Projets | Kifekoi`;
  if (!user)
    return (
      <Backdrop>
        <Progress size="medium" />
      </Backdrop>
    );
  return (
    <div className="home">
      <div className="level__two__header">
        <h1 className={"project__projects__container__title"}>Projets</h1>
      </div>
      <Grid>
        {user.projects?.length === 0 && (
          <h4 className={"home__projects__container__title"}>Aucun project.</h4>
        )}
        {user.projects?.length !== 0 &&
          user.projects?.map((project, i) => (
            <ProjectItem key={i} project={project} />
          ))}
      </Grid>
    </div>
  );
};

export default Projects;
