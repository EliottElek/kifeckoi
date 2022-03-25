import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LATEST_ACTIONS } from "../../../graphql/queries";
import RecentActionsItem from "./RecentActionsItem";
import "./RecentActions.css";
const RecentActions = () => {
  const [recentActions, setRecentActions] = React.useState([]);
  const dataActions = useQuery(GET_LATEST_ACTIONS);
  React.useEffect(() => {
    if (dataActions?.data) {
      setRecentActions([...dataActions?.data?.getLatestActions]);
    }
  }, [setRecentActions, dataActions?.data]);
  return (
    <div className={"home__container actions_con"}>
      <div className={"home__project__container"}>
        <div className={"home__project__container__titlecontainer"}>
          <h1 className={"home__project__container__title"}>
            Actions récentes
          </h1>
        </div>
        <div className={"home__project__container__spacer"} />
        {recentActions.map((action, i) => (
          <RecentActionsItem key={i} action={action} />
        ))}
      </div>
    </div>
  );
};

export default RecentActions;
