import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LATEST_EVENTS } from "../../../graphql/queries";
import "./LatestEvents.scss";
import { Context } from "../../Context/Context";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RenderHtml from "../../../assets/RenderHtml";
const LatestEvents = () => {
  const { user } = React.useContext(Context);
  const { data } = useQuery(GET_LATEST_EVENTS, { variables: { id: user.id } });
  return (
    <div className={"latest__events__container"}>
      <h3 className={"latest__events__container__title"}>Évènements récents</h3>
      <div className={"latest__events__container__list"}>
        {data?.getLatestEvents?.slice(0, 5).map((event, i) => (
          <Link
            to={`/project/${event.project.id}/${event.type.toLowerCase()}/${
              event.id
            }?display=kanban`}
            className={"latest__events__container__list__item"}
            key={i}
            event={event}
          >
            <span
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Avatar src={event.creator.avatarUrl} />
              <span
                className={
                  "latest__events__container__list__item__project__container"
                }
              >
                <span
                  className={"latest__events__container__list__item__project"}
                >
                  <Typography noWrap>{event.project.name}</Typography>
                </span>
                <Typography noWrap sx={{ maxWidth: "100%" }}>
                  <RenderHtml style={{ display: "flex" }}>
                    {event.description}
                  </RenderHtml>
                </Typography>
              </span>
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
