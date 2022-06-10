import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Badge,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import { FaRegComment } from "react-icons/fa";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { IconButton, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
const notificationsData = [
  {
    id: 1,
    seen: false,
    user: {
      firstname: "Eliott",
      avatarUrl:
        "https://s.gravatar.com/avatar/26798973262739b17c44ec4963d88f70?s=100&r=x&d=retro",
    },
    type: "mention",
    message: "Nouvelle mention",
    project: {
      id: "9fee4b89-a824-416e-8361-99eabbc02197",
      name: "Alliage",
    },
    content: 'Eliott vous a mentionné dans Alliage : "@EliottElek bonne idée."',
    redirect: "/project/9fee4b89-a824-416e-8361-99eabbc02197/problems",
  },
  {
    id: 2,
    seen: true,
    user: {
      firstname: "Mark",
      avatarUrl:
        "https://www.gala.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2F8e7856b3-7f1e-4d09-b428-6d16c8a9f6f0.2Ejpeg/2216x1536/quality/80/mark-ruffalo.jpeg",
    },
    type: "comment",
    message: "Nouveau commentaire",
    project: {
      id: "9fee4b89-a824-416e-8361-99eabbc02197",
      name: "Alliage",
    },
    content:
      'Mark a commenté dans Alliage : "Je préfèrerais avoir un nouveau carnet."',
    redirect: "/project/9fee4b89-a824-416e-8361-99eabbc02197/infos",
  },
  {
    id: 3,
    seen: true,
    user: {
      firstname: "Alicia",
      avatarUrl:
        "https://fr.web.img6.acsta.net/c_310_420/pictures/16/07/13/11/18/135527.jpg",
    },
    type: "event",

    project: {
      id: "ab62f0d9-30e8-4d7c-8c60-15fc78648bd3",
      name: "Kifekoi",
    },
    message: "Nouvelle action",
    content: "Alicia a créé une nouvelle action dans Kifekoi.",
    redirect: "/project/ab62f0d9-30e8-4d7c-8c60-15fc78648bd3/actions",
  },
];
const NotifItem = ({ notif, seen, onClick }) => {
  const icons = [
    {
      type: "event",
      icon: (
        <ViewKanbanIcon
          sx={{
            color: "white",
            height: "14px",
            width: "14px",
          }}
        />
      ),
    },
    {
      type: "comment",
      icon: (
        <FaRegComment
          style={{
            color: "white",
            height: "14px",
            width: "14px",
          }}
        />
      ),
    },
    {
      type: "mention",
      icon: (
        <AlternateEmailIcon
          sx={{
            color: "white",
            height: "14px",
            width: "14px",
          }}
        />
      ),
    },
  ];
  const icon = icons.find((icon) => icon.type === notif.type);
  return (
    <ListItemButton
      alignItems="flex-start"
      component={Link}
      onClick={() => onClick(notif)}
      to={notif?.redirect}
    >
      <ListItemAvatar sx={{ height: "34px", width: "34px" }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "var(--main-color)",
              padding: "3px",
            },
          }}
          badgeContent={icon.icon}
        >
          <Avatar alt={notif.user.firstname} src={notif.user.avatarUrl} />
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            sx={{ fontSize: "0.9rem", fontWeight: seen ? "normal" : "bold" }}
          >
            {notif?.message}
          </Typography>
        }
        secondary={
          <Typography
            sx={{ fontSize: "0.8rem", fontWeight: seen ? "normal" : "bold" }}
            noWrap
          >
            {notif?.content}
          </Typography>
        }
      />
    </ListItemButton>
  );
};
export default function NotifPanel() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [seenNotifications, setSeenNotifications] = React.useState(
    notificationsData.filter((notif) => notif.seen === true)
  );
  const [unSeenNotifications, setUnseenNotifications] = React.useState(
    notificationsData.filter((notif) => notif.seen === false)
  );
  const handleSetNotifSeen = (notif) => {
    const newUnseedNotifs = unSeenNotifications.filter(
      (n) => n.id !== notif.id
    );
    setUnseenNotifications(newUnseedNotifs);
    setSeenNotifications([notif, ...seenNotifications]);
    handleClose();
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
          badgeContent={unSeenNotifications.length}
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
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
            maxWidth: "360px",
            "& .MuiList-root": {
              paddingTop: "0px",
            },
          },
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {unSeenNotifications.length !== 0 &&
          unSeenNotifications.map((notif) => (
            <NotifItem
              notif={notif}
              key={notif.id}
              onClick={handleSetNotifSeen}
            />
          ))}
        {seenNotifications.length !== 0 &&
          seenNotifications?.map((notif) => (
            <NotifItem
              notif={notif}
              key={notif.id}
              onClick={handleClose}
              seen
            />
          ))}
        <Divider />
        <MenuItem
          style={{
            textAlign: "center",
            color: "var(--main-color)",
            justifyContent: "center",
          }}
        >
          Voir toutes les notifications
        </MenuItem>
      </Menu>
    </div>
  );
}
