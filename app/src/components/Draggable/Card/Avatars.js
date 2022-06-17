import { AvatarGroup, Avatar } from "@mui/material";
const Avatars = ({ users }) => {
  return (
    <AvatarGroup
      max={3}
      sx={{
        "& .MuiAvatarGroup-avatar": {
          width: 24,
          height: 24,
          fontSize: "0.8rem",
        },
      }}
    >
      {users?.map((user) => (
        <Avatar alt={user.firstname} src={user.avatarUrl} />
      ))}
    </AvatarGroup>
  );
};

export default Avatars;
