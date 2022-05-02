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
import { ApolloProvider } from "@apollo/client";
const httpLink = new HttpLink({ uri: "http://localhost:3001/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("token");

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "Bearer r",
    },
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
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
