import { Routes, Route, Navigate } from "react-router-dom";
import Project from "./components/Project/Project";
import Home from "./components/Home/Home";
import Client from "./components/Client/Client";
import AccountPage from "./components/AccountPage/AccountPage";
import ActionsWide from "./components/DndWide/DndWide";
import icon from "../src/assets/images/icon.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoInternetConnection from "./components/NoInternetConnectionWrapper/NoInternetConnectionWrapper";
import DarkMode from "./components/DarkMode/DarkMode";
var link = document.querySelector("link[rel~='icon']");
if (!link) {
  link = document.createElement("link");
  link.rel = "icon";
  document.getElementsByTagName("head")[0].appendChild(link);
}
link.href = icon;
const App = () => {
  return (
    <div className={"App"}>
      <NoInternetConnection>
        <DarkMode>
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
        </DarkMode>
      </NoInternetConnection>
      <ToastContainer theme="dark" />
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
