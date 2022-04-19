import React, { useContext } from "react";
import { Context } from "../Context/Context";
import { useQuery } from "@apollo/client";
import { FIND_PROJECT_BY_PROJECT_ID } from "../../graphql/queries";
import { useNavigate, useParams } from "react-router";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Progress from "../../materials/Progress/Progress";
import "./GlobalInfos.scss";
const GlobalInfos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProject, setCurrentProject } = useContext(Context);
  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id },
  });
  React.useEffect(() => {
    if (dataProject?.data) {
      setCurrentProject({ ...dataProject?.data?.findProjectByProjectId });
    }
  }, [setCurrentProject, dataProject?.data]);
  console.log(currentProject);
  if (!currentProject)
    return (
      <Backdrop>
        <Progress size="medium" reversed />
      </Backdrop>
    );
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <div style={{ margin: "80px 60px" }}>
        <h1>{currentProject?.name}</h1>
        <h4
          className={"client__link"}
          onClick={() => navigate(`/client/${currentProject?.client?.id}`)}
        >
          {currentProject?.client.name}
        </h4>
        <h3 style={{ marginTop: "30px" }}>
          {currentProject?.events.length} Évènement(s)
        </h3>
      </div>
    </div>
  );
};

export default GlobalInfos;
