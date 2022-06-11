import React from "react";
import { Context } from "../../Context/Context";
import ChannelItem from "./ChannelItem";
import "./Channels.scss";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

const SearchInput = styled(InputBase)(({ theme }) => ({
  width: "90%",
  margin: "auto",
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 12,
    display: "flex",
    flexGrow: 1,
    padding: "5px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "var(--main-color)",
    },
  },
}));
const Channels = () => {
  const { channels } = React.useContext(Context);
  return (
    <div className="channels__container">
      <div className="channels__container__search__input__container">
        <SearchInput placeholder="Rechercher..." />
      </div>
      <div className="channels__container__list">
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </div>
    </div>
  );
};

export default Channels;
