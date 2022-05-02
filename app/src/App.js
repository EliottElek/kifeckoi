import React, { useContext, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Project from "./components/Project/Project";
import Home from "./components/Home/Home";
import { Context } from "./components/Context/Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Drawer from "./materials/Drawer/Drawer";
import Backdrop from "./materials/Backdrop/Backdrop";
import Progress from "./materials/Progress/Progress";
import StickyNavDefault from "./components/StickyNavbar/StickyNavBarDefault";
import NoInternetConnection from "./components/NoInternetConnectionWrapper/NoInternetConnectionWrapper";
const SidePanel = lazy(() => import("./components/DashBoard/SidePanel"));
const ErrorPage = lazy(() => import("./components/ErrorPage/ErrorPage"));
const Client = lazy(() => import("./components/Client/Client"));
const AccountPage = lazy(() => import("./components/AccountPage/AccountPage"));
const ActionsWide = lazy(() => import("./components/DndWide/DndWide"));
const GlobalInfos = lazy(() => import("./components/GlobalInfos/GlobalInfos"));
const Login = lazy(() => import("./components/Login/Login"));
const SignUp = lazy(() => import("./components/SignUp/SignUp"));
const icon = lazy(() => import("../src/assets/images/icon.png"));

var link = document.querySelector("link[rel~='icon']");
if (!link) {
  link = document.createElement("link");
  link.rel = "icon";
  document.getElementsByTagName("head")[0].appendChild(link);
}
link.href = icon;
const renderLoader = () => (
  <Backdrop>
    <Progress size="medium" reversed />
  </Backdrop>
);

const MainContent = () => {
  const { dark } = useContext(Context);
  return (
    <NoInternetConnection>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className={"dashboard"}>
              <Drawer
                mainContent={
                  <SecureRoute margin>
                    <Suspense fallback={renderLoader()}>
                      <Home />
                    </Suspense>
                  </SecureRoute>
                }
                secondaryContent={
                  <Suspense fallback={renderLoader()}>
                    <SecondaryContent />
                  </Suspense>
                }
                drawerWidth={240}
                breakPoint={800}
              />
            </div>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <Suspense fallback={renderLoader()}>
              <Login />
            </Suspense>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <Suspense fallback={renderLoader()}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          exact
          path="/404"
          element={
            <Suspense fallback={renderLoader()}>
              <ErrorPage />
            </Suspense>
          }
        />
        <Route
          exact
          path="/project/:id/"
          element={
            <div className={"dashboard"}>
              <Drawer
                mainContent={
                  <SecureRoute margin>
                    <Suspense fallback={renderLoader()}>
                      <Project />
                    </Suspense>
                  </SecureRoute>
                }
                secondaryContent={
                  <Suspense fallback={renderLoader()}>
                    <SecondaryContent />
                  </Suspense>
                }
                drawerWidth={240}
                breakPoint={800}
              />
            </div>
          }
        />
        <Route
          exact
          path="/project/:id/global"
          element={
            <div className={"dashboard"}>
              <Drawer
                mainContent={
                  <SecureRoute margin>
                    <Suspense fallback={renderLoader()}>
                      <GlobalInfos />
                    </Suspense>
                  </SecureRoute>
                }
                secondaryContent={
                  <Suspense fallback={renderLoader()}>
                    <SecondaryContent />
                  </Suspense>
                }
                drawerWidth={240}
                breakPoint={800}
              />
            </div>
          }
        />
        <Route
          exact
          path="/project/:id/actions"
          element={
            <div className={"dashboard"}>
              <Drawer
                advanced
                mainContent={
                  <SecureRoute margin>
                    <Suspense fallback={renderLoader()}>
                      <ActionsWide type="Action" />
                    </Suspense>
                  </SecureRoute>
                }
                secondaryContent={
                  <Suspense fallback={renderLoader()}>
                    <SecondaryContent />
                  </Suspense>
                }
                drawerWidth={240}
                breakPoint={800}
              />
            </div>
          }
        />
        <Route
          exact
          path="/project/:id"
          element={<Navigate to="/project/:id/global" />}
        />
        <Route exact path="/project" element={<Navigate to="/" />} />
        <Route exact path="/client" element={<Navigate to="/" />} />
        <Route
          exact
          path="/project/:id/infos"
          element={
            <div className={"dashboard"}>
              <Drawer
                advanced
                mainContent={
                  <SecureRoute margin>
                    <Suspense fallback={renderLoader()}>
                      <ActionsWide type="Info" />
                    </Suspense>
                  </SecureRoute>
                }
                secondaryContent={
                  <Suspense fallback={renderLoader()}>
                    <SecondaryContent />
                  </Suspense>
                }
                drawerWidth={240}
                breakPoint={800}
              />
            </div>
          }
        />
        <Route
          exact
          path="/project/:id/decisions"
          element={
            <div className={"dashboard"}>
              <Drawer
                advanced
                mainContent={
                  <SecureRoute margin>
                    <Suspense fallback={renderLoader()}>
                      <ActionsWide type="Decision" />
                    </Suspense>
                  </SecureRoute>
                }
                secondaryContent={
                  <Suspense fallback={renderLoader()}>
                    <SecondaryContent />
                  </Suspense>
                }
                drawerWidth={240}
                breakPoint={800}
              />
            </div>
          }
        />
        <Route
          exact
          path="/project/:id/risks"
          element={
            <div className={"dashboard"}>
              <Drawer
                advanced
                mainContent={
                  <SecureRoute margin>
                    <Suspense fallback={renderLoader()}>
                      <ActionsWide type="Risk" />
                    </Suspense>
                  </SecureRoute>
                }
                secondaryContent={
                  <Suspense fallback={renderLoader()}>
                    <SecondaryContent />
                  </Suspense>
                }
                drawerWidth={240}
                breakPoint={800}
              />
            </div>
          }
        />
        <Route
          exact
          path="/project/:id/problems"
          element={
            <div className={"dashboard"}>
              <Drawer
                advanced
                mainContent={
                  <SecureRoute margin>
                    <Suspense fallback={renderLoader()}>
                      <ActionsWide type="Problems" />
                    </Suspense>
                  </SecureRoute>
                }
                secondaryContent={
                  <Suspense fallback={renderLoader()}>
                    <SecondaryContent />
                  </Suspense>
                }
                drawerWidth={240}
                breakPoint={800}
              />
            </div>
          }
        />
        <Route
          exact
          path="/project/:id/deliverables"
          element={
            <div className={"dashboard"}>
              <Drawer
                advanced
                mainContent={
                  <SecureRoute margin>
                    <Suspense fallback={renderLoader()}>
                      <ActionsWide type="Deliverables" />
                    </Suspense>
                  </SecureRoute>
                }
                secondaryContent={
                  <Suspense fallback={renderLoader()}>
                    <SecondaryContent />
                  </Suspense>
                }
                drawerWidth={240}
                breakPoint={800}
              />
            </div>
          }
        />
        <Route
          exact
          path="/client/:id"
          element={
            <div className={"dashboard"}>
              <Drawer
                mainContent={
                  <SecureRoute margin>
                    <Suspense fallback={renderLoader()}>
                      <Client />
                    </Suspense>
                  </SecureRoute>
                }
                secondaryContent={
                  <Suspense fallback={renderLoader()}>
                    <SecondaryContent />
                  </Suspense>
                }
                drawerWidth={240}
                breakPoint={800}
              />
            </div>
          }
        />
        <Route
          exact
          path="/account"
          element={
            <SecureRoute margin>
              <Suspense fallback={renderLoader()}>
                <StickyNavDefault account />
                <AccountPage />
              </Suspense>
            </SecureRoute>
          }
        />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer theme={dark ? "dark" : "light"} />
    </NoInternetConnection>
  );
};
const SecondaryContent = () => {
  return <SidePanel />;
};
const App = () => {
  return (
    <div className="App">
      <Suspense fallback={renderLoader()}>
        <MainContent />
      </Suspense>
    </div>
  );
};
const SecureRoute = ({ children }) => {
  const { auth } = React.useContext(Context);
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default App;
