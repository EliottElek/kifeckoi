import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LATEST_EVENTS } from "../../../graphql/queries";
import "./LatestEvents.scss";
import { Context } from "../../Context/Context";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import shortString from "../../../assets/functions/shortString";
import RenderHtml from "../../../assets/RenderHtml";
import { Link } from "react-router-dom";
const LatestEvents = () => {
  const { user } = React.useContext(Context);
  const { data } = useQuery(GET_LATEST_EVENTS, { variables: { id: user.id } });
  return (
    <div className={"latest__events__container"}>
      <h3 className={"latest__events__container__title"}>Évènements récents</h3>
      <div className={"latest__events__container__list"}>
        {data?.getLatestEvents?.slice(0, 5).map((event, i) => (
          <Link
            to={`/project/${event.project.id}/${event.type.toLowerCase()}/${event.id}`}
            className={"latest__events__container__list__item"}
            key={i}
            event={event}
          >
            <span>
              <span
                className={"latest__events__container__list__item__project"}
              >
                {event?.project?.name}
              </span>
              <RenderHtml>{shortString(event.description, 50)}</RenderHtml>
            </span>
            <span className={"latest__events__container__list__item__chevron"}>
              {event?.type}
              <ChevronRightIcon />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestEvents;
