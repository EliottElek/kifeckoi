import React from "react";
import {
  Avatar,
  Badge,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Context } from "../../Context/Context";
import { NavLink } from "react-router-dom";
import "./Channels.scss";
const ChannelItem = ({ channel }) => {
  const { user } = React.useContext(Context);

  const otherUser = channel.users.find((u) => u.id !== user?.id);
  return (
    <ListItemButton
      alignItems="flex-start"
      component={NavLink}
      to={`/chat/${channel.id}`}
    >
      <ListItemAvatar sx={{ height: "24px", width: "24px" }}>
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
          variant={"dot"}
        >
          <Avatar alt={otherUser?.firstname} src={otherUser?.avatarUrl} />
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            sx={{
              fontSize: "0.9rem",
              fontWeight: channel?.seen ? "normal" : "bold",
            }}
          >
            {otherUser?.firstname} {otherUser?.lastname}
          </Typography>
        }
        secondary={
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: channel?.seen ? "normal" : "bold",
            }}
            noWrap
          >
            {channel.lastmessage.content}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default ChannelItem;
