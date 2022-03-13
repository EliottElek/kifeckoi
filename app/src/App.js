import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Project from "./components/Project/Project";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Client from "./components/Client/Client";
import Alert from "./materials/Alert/Alert";
import { Context } from "./components/Context/Context";
const App = () => {
  const { alertContent, openAlert, setOpenAlert } = React.useContext(Context);
  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
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
