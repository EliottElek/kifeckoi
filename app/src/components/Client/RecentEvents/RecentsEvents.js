import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LATEST_EVENTS } from "../../../graphql/queries";
import RecentEventsItem from "./RecentEvents";
import "./RecentEvents.css";
import { useParams } from "react-router";
const RecentEvents = () => {
  const { id } = useParams();
  const [recentEvents, setRecentEvents] = React.useState([]);
  const dataEvents = useQuery(GET_LATEST_EVENTS, { variables: { id: id } });

  React.useEffect(() => {
    if (dataEvents?.data) {
      setRecentEvents([...dataEvents?.data?.getLatestEvents]);
    }
  }, [setRecentEvents, dataEvents?.data]);
  return (
    <div className={"home__container events_con"}>
      <div className={"home__project__container"}>
        <div className={"home__project__container__titlecontainer"}>
          <h1 className={"home__project__container__title"}>
            Évènements récentes
          </h1>
        </div>
        <div className={"home__project__container__spacer"} />
        {recentEvents.map((event, i) => (
          <RecentEventsItem key={i} event={event} />
        ))}
      </div>
    </div>
  );
};

export default RecentEvents;
