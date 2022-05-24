import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";
import Switch from "../../materials/Switch/Switch";
import Avatar from "../../materials/Avatar/Avatar";
import Menu from "../../materials/Menu/Menu";
import MenuItem from "../../materials/Menu/MenuItem";
import Popup from "../../materials/Popup/Popup";
import { CgMenuGridO } from "react-icons/cg";
import StickyNavbar from "../../components/StickyNavbar/StickyNavbar";
import logo from "../../assets/images/logo.png";
import getPeriod from "../../assets/functions/getPeriod";
import ReactTooltip from "react-tooltip";
const StickyNavDefault = ({ account }) => {
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
  } = useContext(Context);
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const navigate = useNavigate();
  let urlElement = window.location.href.split("/")[5];
  let period = getPeriod();
  return (
    <StickyNavbar>
      {!account && (
        <button
          className={"toggle__drawer__button"}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <CgMenuGridO />
        </button>
      )}

      <div className="name__container">
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
        {!account && (
          <h2
            className="name__container__title"
            onClick={() => navigate(`/project/${currentProject?.id}/global`)}
          >
            {currentProject?.name}
            {urlElement && ` - ${urlElement} `}
          </h2>
        )}
        {!account && (
          <span className="period__span" data-tip data-for="weekTooltip">
            {period}
          </span>
        )}
      </div>
      <div className="events__container">
        <button className="settings__button" onClick={() => setOpenPopUp(true)}>
          <Avatar src={user?.avatarUrl} name={user?.firstname} />
          <Popup
            style={{ transform: "translate(-40%, 65%)" }}
            open={openPopUp}
            setOpen={setOpenPopUp}
            bottom
          >
            <Menu>
              <MenuItem
                onClick={(e) => {
                  setOpenPopUp(false);
                  navigate("/account");
                }}
              >
                <p>Mon compte</p>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                }}
              >
                <p>Déconnexion</p>
              </MenuItem>
              <span className={"divider"} />
              <li className={"menu-item-no-hover"}>
                <span>
                  Passer en mode
                  {dark ? " jour ☀️" : " nuit 🌙"}
                </span>
                <Switch
                  onChange={(e) => {
                    toggleTheme(e);
                    setDark(!dark);
                  }}
                  defaultChecked={defaultDark}
                />
              </li>
            </Menu>
          </Popup>
        </button>
      </div>
      <ReactTooltip delayShow={500} id="weekTooltip" effect="solid">
        <span>Semaine actuelle</span>
      </ReactTooltip>
    </StickyNavbar>
  );
};
export default StickyNavDefault;
