import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./components/Context/Context";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "apollo-boost";
import { ApolloProvider, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
process.env["KIFEKOI_ENV"] = "dev";
const token = localStorage.getItem("token");

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3002/graphql",
    connectionParams: {
      authorization: `Bearer ${token}`,
    },
  })
);
const httpLink = new HttpLink({
  uri:
    // process.env["KIFEKOI_ENV"] === "dev"
    "http://localhost:3002/graphql",
  // : "https://kifekoi-api.herokuapp.com/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "Bearer r",
    },
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  link: authLink.concat(splitLink), // Chain it with the HttpLink
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
