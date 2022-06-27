import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Badge,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton, Typography } from "@mui/material";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import { GET_NOTIFICATIONS_BY_USER_ID } from "../../graphql/subscriptions";
import { Context } from "../Context/Context";
import { RETURN_NOTIFICATIONS_BY_USER_ID } from "../../graphql/queries";
import { READ_NOTIFICATION } from "../../graphql/mutations";
import { NavLink } from "react-router-dom";
const NotifItem = ({ notif, onClick }) => {
  return (
    <MenuItem
      disableRipple
      onClick={onClick}
      component={NavLink}
      to={notif?.redirect}
      style={{ textDecoration: "none", display: "flex" }}
    >
      <ListItemAvatar>
        {notif.seen ? (
          <Avatar src={notif.emitter.avatarUrl}></Avatar>
        ) : (
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                color: "white",
                height: "12px",
                width: "12px",
                top: "24px",
                left: "24px",
                borderRadius: "50%",
                backgroundColor: "var(--main-color)",
              },
            }}
            variant="dot"
          >
            <Avatar src={notif.emitter.avatarUrl}></Avatar>
          </Badge>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            noWrap
            sx={{
              maxWidth: notif.seen ? "90%" : "85%",
              fontWeight: notif.seen ? "normal" : "bold",
            }}
          >
            {notif.message}
          </Typography>
        }
        secondary={
          <Typography
            sx={{
              fontSize: "0.8rem",
              opacity: notif.seen ? 0.5 : "0.8",
              fontWeight: notif.seen ? "normal" : "bold",
            }}
            noWrap
          >
            {
              <Typography
                noWrap
                sx={{
                  maxWidth: notif.seen ? "90%" : "85%",
                  fontWeight: notif.seen ? "normal" : "bold",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                }}
              >
                "{notif.content}"
              </Typography>
            }
          </Typography>
        }
        noWrap
      />
    </MenuItem>
  );
};
export default function NotifPanel() {
  const {
    user,
    seen,
    setSeen,
    notifications,
    setNotifications,
    setNotifQuery,
    notifQuery,
  } = React.useContext(Context);
  const [readNotification] = useMutation(READ_NOTIFICATION);
  const notifQueryData = useQuery(RETURN_NOTIFICATIONS_BY_USER_ID, {
    variables: {
      userId: user?.id,
    },
    onCompleted: (data) => {
      const sorted = data.returnNotificationsByUserId;
      let copy = [...sorted];
      copy = copy.sort(
        (a, b) => Date.parse(a.creation) - Date.parse(b.creation)
      );
      setNotifications(copy.reverse());
      const unseenNotifs = copy.filter((d) => d.seen === false);
      unseenNotifs.length > 5 ? setSeen(`5+`) : setSeen(unseenNotifs.length);
    },
  });

  React.useEffect(() => {
    if (notifQueryData) setNotifQuery(notifQueryData);
  }, [notifQueryData, setNotifQuery]);

  useSubscription(GET_NOTIFICATIONS_BY_USER_ID, {
    variables: {
      userId: user?.id,
    },
    onSubscriptionData: () => {
      notifQuery.refetch();
    },
  });

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton onClick={handleClick} disableRipple>
        <Badge
          sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "var(--main-color)",
            },
          }}
          badgeContent={seen}
          overlap="circular"
        >
          <NotificationsIcon
            sx={{ color: "var(--font-color)", opacity: "0.7" }}
          />
        </Badge>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          maxHeight: "400px",
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
            width: { xs: "100%", sm: "360px" },
          },
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {notifQuery?.loading && <CircularProgress />}
        {!notifQuery?.loading && notifications.length === 0 ? (
          <Typography style={{ padding: "4px", textAlign: "center" }}>
            Aucune notification.
          </Typography>
        ) : (
          !notifQuery?.loading &&
          notifications.slice(0, 5).map((notif) => (
            <NotifItem
              notif={notif}
              key={notif.id}
              onClick={() => {
                handleClose();
                handleReadNotification(notif.id);
              }}
            />
          ))
        )}
      </Menu>
    </div>
  );
}
