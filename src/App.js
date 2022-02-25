import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Project from "./components/Project/Project";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
const App = () => {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "white" }}>
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
  return <div style={{ marginTop: "60px" }}>{children}</div>;
};
export default App;
