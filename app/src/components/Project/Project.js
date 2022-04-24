import React, { useContext } from "react";
import { Navigate, useParams } from "react-router";
import { Context } from "../Context/Context";
import "./Project.css";
import { FIND_PROJECT_BY_PROJECT_ID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
const Project = () => {
  const { currentProject, setCurrentProject, setTitle } = useContext(Context);

  const { id } = useParams();

  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id },
  });
  React.useEffect(() => {
    if (dataProject?.data) {
      setCurrentProject({ ...dataProject?.data?.findProjectByProjectId });
    }
  }, [setCurrentProject, dataProject?.data]);
  React.useEffect(() => {
    if (currentProject) {
      const title = document.getElementById("title");
      title.innerHTML = `${currentProject?.name} | Kifekoi`;
    }
  }, [currentProject?.name, currentProject]);
  React.useEffect(() => {
    if (currentProject) {
      setTitle(currentProject?.name);
    }
  }, [currentProject?.name, setTitle, currentProject]);

  return <Navigate to="global" />;
};
export default Project;
