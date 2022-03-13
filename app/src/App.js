import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Project from "./components/Project/Project";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Client from "./components/Client/Client";
import Alert from "./materials/Alert/Alert";
import { Context } from "./components/Context/Context";
import AccountPage from "./components/AccountPage/AccountPage";
const App = () => {
  const { alertContent, openAlert, setOpenAlert } = React.useContext(Context);

  return (
      <div
        style={{ width: "100%", height: "100%", backgroundColor: "#1c2128" }}
      >
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
              path="/client/:id/:name"
              element={
                <SecureRoute>
                  <Project />
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
        <Alert
          delay={2200}
          open={openAlert}
          setOpen={setOpenAlert}
          type={alertContent?.type}
        >
          {alertContent?.content}
        </Alert>
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
