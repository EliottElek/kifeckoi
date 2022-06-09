import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LATEST_EVENTS } from "../../../graphql/queries";
import "./LatestEvents.scss";
import { Context } from "../../Context/Context";
import { useNavigate } from "react-router";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const LatestEvents = () => {
  const { user } = React.useContext(Context);
  const { data } = useQuery(GET_LATEST_EVENTS, { variables: { id: user.id } });
  const navigate = useNavigate();
  return (
    <div className={"latest__events__container"}>
      <h3 className={"latest__events__container__title"}>Évènements récents</h3>
      <div className={"latest__events__container__list"}>
        {data?.getLatestEvents?.map((event, i) => (
          <div
            onClick={() =>
              navigate(
                `/project/${event.project.id}/${event.type.toLowerCase()}s`
              )
            }
            className={"latest__events__container__list__item"}
            key={i}
            event={event}
          >
            <p>
              {event?.project?.name} - {event.description}
            </p>
            <span className={"latest__events__container__list__item__chevron"}>
              {event?.type}
              <ChevronRightIcon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestEvents;
