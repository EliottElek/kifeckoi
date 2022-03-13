import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./components/Context/Context";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ContextProvider>
        <Router>
          <App />
        </Router>
      </ContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
