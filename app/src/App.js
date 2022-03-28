import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Project from "./components/Project/Project";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Client from "./components/Client/Client";
import AccountPage from "./components/AccountPage/AccountPage";
import ActionsWide from "./components/DndWide/DndWide";
import icon from "../src/assets/images/icon.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var link = document.querySelector("link[rel~='icon']");
if (!link) {
  link = document.createElement("link");
  link.rel = "icon";
  document.getElementsByTagName("head")[0].appendChild(link);
}
link.href = icon;
const App = () => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#1c2128" }}>
      <Layout>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <SecureRoute>
                <Home />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/project/:id/"
            element={
              <SecureRoute>
                <Project />
              </SecureRoute>
            }
          />
          <Route
            exact
            path="/project/:id/actions"
            element={
              <SecureRoute>
                <ActionsWide />
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
      </Layout>
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
    <div style={{ height: "100%", width: "100%", marginTop: "60px" }}>
      {children}
    </div>
  );
};
export default App;
