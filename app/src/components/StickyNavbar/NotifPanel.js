import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Badge,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListItem,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import { GET_NOTIFICATIONS_BY_USER_ID } from "../../graphql/subscriptions";
import { Context } from "../Context/Context";
import { toast } from "react-toastify";
import { RETURN_NOTIFICATIONS_BY_USER_ID } from "../../graphql/queries";
import { READ_NOTIFICATION } from "../../graphql/mutations";
import shortString from "../../assets/functions/shortString";
import formatDate from "../../assets/functions/formatDate";
const NotifItem = ({ notif, onClick }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItemButton component={Link} to={notif.redirect} onClick={onClick}>
        <ListItemAvatar>
          <Avatar src={notif.emitter.avatarUrl}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography noWrap>{notif.message}</Typography>}
          secondary={
            <Typography sx={{ fontSize: "0.8rem", opacity: 0.5 }} noWrap>
              {formatDate(notif.creation, true)}
            </Typography>
          }
          noWrap
        />
      </ListItemButton>
    </List>
  );
};
const NotifToast = ({ notif }) => {
  return (
    <ListItem>
      <ListItemAvatar sx={{ height: "24px", width: "24px" }}>
        <Avatar alt={notif.emitter?.firstname} src={notif.emitter?.avatarUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography sx={{ fontSize: "0.9rem" }}>{notif?.message}</Typography>
        }
        secondary={
          <Typography sx={{ fontSize: "0.8rem", display: "flex" }} noWrap>
            "{shortString(notif?.content, 120)}"
          </Typography>
        }
      />
    </ListItem>
  );
};
export default function NotifPanel() {
  const { user } = React.useContext(Context);
  const navigate = useNavigate();
  const [readNotification] = useMutation(READ_NOTIFICATION);
  const [seen, setSeen] = React.useState(0);
  const [notifications, setNotifications] = React.useState([]);
  const { refetch, loading } = useQuery(RETURN_NOTIFICATIONS_BY_USER_ID, {
    variables: {
      userId: user?.id,
    },
    onCompleted: (data) => {
      let sorted = data.returnNotificationsByUserId.sort(
        (a, b) => Date.parse(a.creation) - Date.parse(b.creation)
      );
      sorted = sorted.reverse().slice(0, 4);
      setNotifications(sorted);
      const seenNotifications = sorted.filter((d) => d.seen === false);
      console.log(seenNotifications);
      setSeen(seenNotifications.length);
    },
  });

  useSubscription(GET_NOTIFICATIONS_BY_USER_ID, {
    variables: {
      userId: user?.id,
    },
    onSubscriptionData: (data) => {
      refetch();

      toast.info(
        <NotifToast
          notif={data?.subscriptionData?.data?.getNotificationsByUserId}
        />,
        {
          onClick: () => {
            navigate(
              data?.subscriptionData?.data?.getNotificationsByUserId.redirect
            );
          },
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          icon: false,
          toastId: data?.subscriptionData?.data?.getNotificationsByUserId.id,
        }
      );
      refetch();
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
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Impossible de lire la notification.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
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
      <IconButton onClick={handleClick}>
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
          padding: "0px!important",
          maxHeight: "400px",
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
            width: { xs: "100%", sm: "360px" },
            "& .MuiList-root": {
              paddingTop: "0px",
            },
          },
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {loading && <CircularProgress />}
        {!loading && notifications.length === 0 ? (
          <MenuItem style={{ padding: "4px", textAlign: "center" }}>
            Aucune notification.
          </MenuItem>
        ) : (
          !loading &&
          notifications.map((notif) => (
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
