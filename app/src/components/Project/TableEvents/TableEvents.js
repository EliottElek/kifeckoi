import React from "react";
import Table from "../../../materials/Table/Table";
import { Context } from "../../Context/Context";
import { useQuery } from "@apollo/client";
import "./TableEvents.css";
import {
  FIND_ACTIONS_BY_PROJECT_ID,
  FIND_PROJECT_BY_PROJECT_ID,
} from "../../../graphql/queries";
import { useParams } from "react-router";
import Progress from "../../../materials/Progress/Progress";

const Example = () => {
  const { id } = useParams();
  const { actions, setCurrentProject, setActions } = React.useContext(Context);
  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id },
  });
  React.useEffect(() => {
    if (dataProject?.data) {
      setCurrentProject({ ...dataProject?.data?.findProjectByProjectId });
    }
  }, [setCurrentProject, dataProject?.data]);
  const dataActions = useQuery(FIND_ACTIONS_BY_PROJECT_ID, {
    variables: { id: id },
  });
  React.useEffect(() => {
    if (dataActions?.data) {
      setActions([...dataActions?.data?.findActionsByProjectId]);
    }
  }, [setActions, dataActions?.data]);
  if (!actions) return <Progress />;
  if (actions.length === 0)
    return <h4 style={{ color: "white" }}>Aucune action.</h4>;

  const theadData = Object.keys(actions[0]).map(function (key) {
    if (
      key !== "__typename" &&
      key !== "id" &&
      key !== "name"
    )
      return key;
    else {
      return null;
    }
  });
  return (
    <div>
      <Table
        customClass={"table__events"}
        theadData={theadData}
        data={actions}
      />
    </div>
  );
};

export default Example;
