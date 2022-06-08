import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";
import Switch from "../../materials/Switch/Switch";
import Avatar from "../../materials/Avatar/Avatar";
import StickyNavbar from "./StickyNavbar";
import { Menu, Typography } from "@mui/material";
import { MenuItem } from "@mui/material";
import "./StickyNavbar.scss";
import getPeriod from "../../assets/functions/getPeriod";
import ReactTooltip from "react-tooltip";
import ToggleButtonActions from "./ToggleButtonsActions";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchBar from "./SearchBar";
const StickyNavAdvanced = ({ advanced }) => {
  const {
    user,
    toggleTheme,
    dark,
    setDark,
    defaultDark,
    handleLogout,
    setListStyle,
    setAddCard,
    setOpenDrawer,
    openDrawer,
    currentProject,
  } = useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  let period = getPeriod();
  return (
    <StickyNavbar>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={{
            display: { xs: "flex", sm: "none" },
            color: "var(--font-color)",
          }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
        <div className="name__container">
          <span className="period__span" data-tip data-for="weekTooltip">
            {period}
          </span>
          {advanced && (
            <ToggleButtonActions
              setListStyle={setListStyle}
              setAddCard={setAddCard}
            />
          )}
        </div>
      </div>
      <div className="events__container">
        {currentProject && <SearchBar />}
        <IconButton>
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                color: "lightgreen",
                backgroundColor: "var(--main-color)",
              },
            }}
            variant="dot"
            overlap="circular"
          >
            <NotificationsIcon
              sx={{ color: "var(--font-color)", opacity: "0.7" }}
            />
          </Badge>
        </IconButton>
        <span className="events__container__divider" />
        <Typography
          variant="paragraph"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {user?.firstname} {user?.lastname}
        </Typography>
        <button className="settings__button" onClick={handleClick}>
          <Avatar src={user?.avatarUrl} name={user?.firstname} />
        </button>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            setAnchorEl(null);
            navigate("/account");
          }}
        >
          <p>Mon compte</p>
        </MenuItem>
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={() => {
            handleLogout();
          }}
        >
          <p>Déconnexion</p>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            toggleTheme(e);
            setDark(!dark);
          }}
        >
          <p style={{ marginRight: "8px", fontSize: "0.9rem" }}>
            Passer en mode
            {dark ? " jour " : " nuit "}
          </p>
          <Switch
            onChange={(e) => {
              toggleTheme(e);
              setDark(!dark);
            }}
            defaultChecked={defaultDark}
          />
        </MenuItem>
      </Menu>
      <ReactTooltip delayShow={500} id="weekTooltip" effect="solid">
        <span>Semaine actuelle</span>
      </ReactTooltip>
    </StickyNavbar>
  );
};
export default StickyNavAdvanced;
