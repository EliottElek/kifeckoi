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
import ToggleButtonActions from "./ToggleButtonsActions";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "./SearchBar";
import NotifPanel from "./NotifPanel";
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
          <span className="period__span">{period}</span>
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
        <NotifPanel />
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
    </StickyNavbar>
  );
};
export default StickyNavAdvanced;
