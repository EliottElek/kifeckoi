import React, { useContext } from "react";
import { Navigate, useParams } from "react-router";
import { Context } from "../Context/Context";
import "./Project.scss";
import { useFindProjectByProjectId } from "../../hooks/queries/project";
const Project = () => {
  const { currentProject, setCurrentProject, setTitle } = useContext(Context);

  const { id } = useParams();

  useFindProjectByProjectId({
    variables: { id: id },
    onCompleted: (data) => {
      setCurrentProject(data.useFindProjectByProjectId);
    },
  });
  React.useEffect(() => {
    if (currentProject) {
      const title = document.getElementById("title");
      title.innerHTML = `${currentProject?.name} | Kifekoi`;
    }
  }, [currentProject?.name, currentProject]);
  React.useEffect(() => {
    if (currentProject && setTitle) {
      setTitle(currentProject?.name);
    }
  }, [currentProject?.name, setTitle, currentProject]);

  return <Navigate to="global" />;
};
export default Project;
