import React, { useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import Avatar from "./materials/Avatar/Avatar";
import Menu from "./materials/Menu/Menu";
import MenuItem from "./materials/Menu/MenuItem";
import Popup from "./materials/Popup/Popup";
import { CgMenuGridO } from "react-icons/cg";
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
  const { dark } = useContext(Context);
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
      <ToastContainer theme={dark ? "dark" : "light"} />
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
    toggleTheme,
    dark,
    setDark,
    defaultDark,
    setOpenDrawer,
    openDrawer,
    setCurrentProject,
    setCurrentClient,
  } = useContext(Context);
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const navigate = useNavigate();
  let urlElement = window.location.href.split("/")[5];
  return (
    <div className={"App"}>
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
            {urlElement && ` - ${urlElement}`}
          </h2>
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
            <Avatar src={user.avatarUrl} name={user.firstname} />
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
