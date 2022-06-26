import React from "react";
import { useMutation } from "@apollo/client";
import { READ_NOTIFICATION } from "../../../graphql/mutations";

import "../LatestEvents/LatestEvents.scss";
import { Context } from "../../Context/Context";
import { Avatar, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
const LatestNotifications = () => {
  const { user, seen, notifications, notifQuery } = React.useContext(Context);
  const [readNotification] = useMutation(READ_NOTIFICATION);
  const handleReadNotification = async (notifId) => {
    try {
      await readNotification({
        variables: {
          userId: user?.id,
          notificationId: notifId,
        },
      });
      notifQuery.refetch();
    } catch (err) {}
  };
  return (
    <div className={"latest__events__container"}>
      <h3 className={"latest__events__container__title"}>
        Dernières notifications ({seen} {seen <= 1 ? "nouvelle" : "nouvelles"})
      </h3>
      <div className={"latest__events__container__list"}>
        {notifications.slice(0, 5).map((notif, i) => (
          <Link
            onClick={() => handleReadNotification(notif.id)}
            to={notif.redirect}
            className={"latest__events__container__list__item"}
            key={i}
          >
            <span
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Avatar src={notif?.emitter?.avatarUrl} />
              <span
                className={
                  "latest__events__container__list__item__project__container"
                }
              >
                <span
                  className={"latest__events__container__list__item__project"}
                >
                  <Typography noWrap>{notif.message}</Typography>
                </span>
                <Typography
                  noWrap
                  sx={{ color: "var(--font-color)", fontStyle: "italic" }}
                >
                  "{notif.content}"
                </Typography>
              </span>
            </span>
            <span className={"latest__events__container__list__item__chevron"}>
              {!notif.seen && (
                <span
                  className={"latest__events__container__list__item__unseen"}
                >
                  NEW
                </span>
              )}{" "}
              <ChevronRightIcon />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestNotifications;
