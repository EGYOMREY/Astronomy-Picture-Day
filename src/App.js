import React from "react";
import { ApolloClient } from "apollo-client";
import { RestLink } from "apollo-link-rest";
import { InMemoryCache } from "apollo-cache-inmemory";
import Picture from "./components/Picture";
import { ApolloProvider } from "@apollo/react-hooks";

const restLink = new RestLink({
  uri: "https://api.nasa.gov/planetary/apod"
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache({
    addTypename: false
  })
});

const App = () => (
  <ApolloProvider client={client}>
    <Picture />
  </ApolloProvider>
);

export default App;
