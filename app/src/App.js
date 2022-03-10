import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Project from "./components/Project/Project";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Client from "./components/Client/Client";
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
            path="/project/:id"
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
        </Routes>
      </Layout>
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
