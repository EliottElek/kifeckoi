import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";
import Switch from "../../materials/Switch/Switch";
import Avatar from "../../materials/Avatar/Avatar";
import Menu from "../../materials/Menu/Menu";
import MenuItem from "../../materials/Menu/MenuItem";
import Popup from "../../materials/Popup/Popup";
import { CgMenuGridO } from "react-icons/cg";
import { MdFormatListBulleted } from "react-icons/md";
import StickyNavbar from "./StickyNavbar";
// import Button from "../../materials/Button/Button";
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
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const navigate = useNavigate();
  let urlElement = window.location.href.split("/")[5];

  let period = getPeriod();
  return (
    <StickyNavbar>
      <button
        className={"toggle__drawer__button"}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <CgMenuGridO />
      </button>
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
          <span className="selected__number__span">
            {selectedEvents?.length} sélectionné(s)
          </span>
        )}
      </div>
      <div className="events__container">
        {/* <div className="nav__actions">
          <Button style={{ height: "35px" }}>Sauvegarder</Button>
          <Button style={{ height: "35px" }} reversed>
            Valider
          </Button>
          <Button style={{ height: "35px" }} reversed>
            Libérer
          </Button>
          <Button style={{ height: "35px" }} reversed>
            Annuler
          </Button>
        </div> */}
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
export default StickyNavAdvanced;
