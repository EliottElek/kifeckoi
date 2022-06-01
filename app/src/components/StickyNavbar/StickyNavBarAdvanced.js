import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";
import Switch from "../../materials/Switch/Switch";
import Avatar from "../../materials/Avatar/Avatar";
import { CgMenuGridO } from "react-icons/cg";
import { HiOutlineFilter } from "react-icons/hi";
import { MdFormatListBulleted } from "react-icons/md";
import StickyNavbar from "./StickyNavbar";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import "./StickyNavbar.scss";
import logo from "../../assets/images/logo.png";
import getPeriod from "../../assets/functions/getPeriod";
import ReactTooltip from "react-tooltip";
const StickyNavAdvanced = () => {
  const {
    currentProject,
    user,
    toggleTheme,
    dark,
    setDark,
    defaultDark,
    setOpenDrawer,
    openDrawer,
    setCurrentProject,
    setCurrentClient,
    handleLogout,
    setListStyle,
    listStyle,
    setAddCard,
    selectedEvents,
  } = useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorElFilter, setAnchorElFilter] = React.useState(null);
  const openFilter = Boolean(anchorElFilter);
  const handleClickFilter = (event) => {
    setAnchorElFilter(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorElFilter(null);
  };
  const navigate = useNavigate();
  let urlElement = window.location.href.split("/")[5];

  let period = getPeriod();
  return (
    <StickyNavbar>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          className={"toggle__drawer__button"}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <CgMenuGridO />
        </button>
        <img
          onClick={() => {
            setCurrentProject(null);
            setCurrentClient(null);
            navigate(`/`);
          }}
          src={logo}
          alt=""
          className="logo__kifekoi"
        />
        <div className="name__container">
          <h2
            className="name__container__title"
            onClick={() => navigate(`/project/${currentProject?.id}/global`)}
          >
            {currentProject?.name}
            {urlElement && ` - ${urlElement} `}
          </h2>
          <span className="period__span" data-tip data-for="weekTooltip">
            {period}
          </span>
          <button
            onClick={() => {
              setAddCard(false);
              setListStyle(!listStyle);
            }}
            className={
              listStyle ? "list__style__btn__active" : "list__style__btn"
            }
          >
            <MdFormatListBulleted />
          </button>
          {listStyle && (
            <div className="top__nav__list__action__container">
              <span className="selected__number__span">
                {selectedEvents?.length} sélectionné(s)
              </span>
              <button onClick={handleClickFilter} className={"top__nav__btn"}>
                Filtrer <HiOutlineFilter />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="events__container">
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
      <Menu
        anchorEl={anchorElFilter}
        open={openFilter}
        onClose={handleCloseFilter}
        sx={{
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        <MenuItem style={{ fontSize: "0.9rem" }}>
          Afficher les évènements créés cette semaine
        </MenuItem>
        <MenuItem style={{ fontSize: "0.9rem" }}>
          Afficher les évènements créés la semaine dernière
        </MenuItem>
        <MenuItem style={{ fontSize: "0.9rem" }}>
          Afficher les évènements en status à vérifier
        </MenuItem>
        <MenuItem style={{ fontSize: "0.9rem" }}>
          Afficher les évènements en status vérifier
        </MenuItem>
      </Menu>
      <ReactTooltip delayShow={500} id="weekTooltip" effect="solid">
        <span>Semaine actuelle</span>
      </ReactTooltip>
    </StickyNavbar>
  );
};
export default StickyNavAdvanced;
