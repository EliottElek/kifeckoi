import React from "react";
import Table from "../../../materials/Table/Table";
import { Context } from "../../Context/Context";
import { useQuery } from "@apollo/client";
import "./TableEvents.css";
import {
  FIND_EVENTS_BY_PROJECT_ID,
  FIND_PROJECT_BY_PROJECT_ID,
} from "../../../graphql/queries";
import { useParams } from "react-router";
import Progress from "../../../materials/Progress/Progress";

const TableEvents = ({ type }) => {
  const { id } = useParams();
  const { events, setCurrentProject, setEvents } = React.useContext(Context);
  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id },
  });
  React.useEffect(() => {
    if (dataProject?.data) {
      setCurrentProject({ ...dataProject?.data?.findProjectByProjectId });
    }
  }, [setCurrentProject, dataProject?.data]);
  const dataevents = useQuery(FIND_EVENTS_BY_PROJECT_ID, {
    variables: { id: id, type: type },
  });
  React.useEffect(() => {
    if (dataevents?.data) {
      setEvents([...dataevents?.data?.findEventsByProjectId]);
    }
  }, [setEvents, dataevents?.data]);
  if (!events) return <Progress />;
  if (events.length === 0)
    return <h4 style={{ color: "white" }}>Aucun(e) {type}.</h4>;

  const theadData = Object.keys(events[0]).map(function (key) {
    if (key !== "__typename" && key !== "id" && key !== "name") return key;
    else {
      return null;
    }
  });
  return (
    <div>
      <Table
        customClass={"table__events"}
        theadData={theadData}
        data={events}
      />
    </div>
  );
};

export default TableEvents;
