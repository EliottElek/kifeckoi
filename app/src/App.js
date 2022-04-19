import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Project from "./components/Project/Project";
import Home from "./components/Home/Home";
import { Context } from "./components/Context/Context";
import Client from "./components/Client/Client";
import AccountPage from "./components/AccountPage/AccountPage";
import ActionsWide from "./components/DndWide/DndWide";
import GlobalInfos from "./components/GlobalInfos/GlobalInfos";
import icon from "../src/assets/images/icon.png";
import { ToastContainer } from "react-toastify";
import Drawer from "./materials/Drawer/Drawer";
import "react-toastify/dist/ReactToastify.css";
import Switch from "./materials/Switch/Switch";
import { FiSettings } from "react-icons/fi";
import Avatar from "./materials/Avatar/Avatar";
import Menu from "./materials/Menu/Menu";
import MenuItem from "./materials/Menu/MenuItem";
import Popup from "./materials/Popup/Popup";
import { BsListTask } from "react-icons/bs";
import { CgFormatUppercase } from "react-icons/cg";
import StickyNavbar from "./components/StickyNavbar/StickyNavbar";
import Button from "./materials/Button/Button";
import NoInternetConnection from "./components/NoInternetConnectionWrapper/NoInternetConnectionWrapper";
import SidePanel from "./components/DashBoard/SidePanel";
import logo from "./assets/images/logo.png";

var link = document.querySelector("link[rel~='icon']");
if (!link) {
  link = document.createElement("link");
  link.rel = "icon";
  document.getElementsByTagName("head")[0].appendChild(link);
}
link.href = icon;

const MainContent = () => {
  return (
    <div className={"main__content"}>
      <NoInternetConnection>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <SecureRoute margin>
                <Home />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/project/:id/"
            element={
              <SecureRoute margin>
                <Project />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/project/:id/global"
            element={
              <SecureRoute>
                <GlobalInfos />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/project/:id/actions"
            element={
              <SecureRoute>
                <ActionsWide type={"Action"} />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/project/:id/infos"
            element={
              <SecureRoute>
                <ActionsWide type={"Info"} />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/project/:id/decisions"
            element={
              <SecureRoute>
                <ActionsWide type={"Decision"} />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/project/:id/risks"
            element={
              <SecureRoute>
                <ActionsWide type={"Risk"} />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/project/:id/problems"
            element={
              <SecureRoute>
                <ActionsWide type={"Problems"} />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/project/:id/deliverables"
            element={
              <SecureRoute>
                <ActionsWide type={"Deliverables"} />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/client/:id"
            element={
              <SecureRoute>
                <Client />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/account"
            element={
              <SecureRoute>
                <AccountPage />
              </SecureRoute>
            }
          />
        </Routes>
      </NoInternetConnection>
      <ToastContainer theme="dark" />
    </div>
  );
};
const SecondaryContent = () => {
  return <SidePanel />;
};
const App = () => {
  const {
    currentProject,
    user,
    listStyle,
    setListStyle,
    setEvents,
    setMarkdown,
    markdown,
    toggleTheme,
    dark,
    setDark,
    defaultDark,
  } = useContext(Context);
  const [openPopUp, setOpenPopUp] = React.useState(false);

  return (
    <div className={"App"}>
      <StickyNavbar>
        <div className="name__container">
          <img src={logo} alt="" className="logo__kifekoi" />
          <h2 className="name__container__title">{currentProject?.name}</h2>
          <button
            data-tip
            onClick={(e) => {
              e.stopPropagation();
              setEvents(null);
              setListStyle(!listStyle);
            }}
            data-for="ListTooltip"
            className={`list__style__button ${
              listStyle && " active__list__style"
            }`}
          >
            <BsListTask />
          </button>
          <button
            data-tip
            onClick={(e) => {
              e.stopPropagation();
              setMarkdown(!markdown);
            }}
            data-for="MarkdownTooltip"
            className={`list__style__button markdown__btn ${
              markdown && " active__list__style"
            }`}
          >
            <CgFormatUppercase />
          </button>
        </div>
        <div className="events__container">
          <Button>Sauvegarder</Button>
          <Button reversed>Valider</Button>
          <Button reversed>Libérer</Button>
          <Button reversed>Annuler</Button>
          <button
            className="settings__button"
            onClick={() => setOpenPopUp(true)}
          >
            <FiSettings />
            <Popup
              style={{ transform: "translate(-40%, 60%)" }}
              open={openPopUp}
              setOpen={setOpenPopUp}
              bottom
            >
              <Menu>
                <MenuItem
                  onClick={(e) => {
                    setOpenPopUp(false);
                  }}
                >
                  <p>Mon compte</p>
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    setOpenPopUp(false);
                  }}
                >
                  <p>Paramètres</p>
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    setOpenPopUp(false);
                  }}
                >
                  <p>Déconnexion</p>
                </MenuItem>
                <span className={"divider"} />
                <li className={"menu-item-no-hover"}>
                  <span>
                    Passer en mode
                    {!dark ? " jour ☀️" : " nuit 🌙"}
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
          <button className="settings__button">
            <Avatar src={user.avatarUrl} name={user.firstname} />
          </button>
        </div>
      </StickyNavbar>
      <Drawer
        mainContent={<MainContent />}
        secondaryContent={<SecondaryContent />}
        drawerWidth={240}
        breakPoint={800}
      />
    </div>
  );
};
const SecureRoute = ({ children }) => {
  const auth = true;
  if (!auth) {
    return <Navigate to="/" />;
  }
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};
export default App;
