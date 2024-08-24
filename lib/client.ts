// lib/client.js
import { HttpLink, from, split } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { publicApi, publicApiWs } from "./secrets";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  // uri: `http://localhost:8000/api/graphql`,
  uri: `${publicApi}/graphql`,
  credentials: "include",
});

const wsLink =
  typeof window != "undefined"
    ? new GraphQLWsLink(
        createClient({
          // url: `ws://localhost:8000/api/subscription`,
          // url: `${publicApiWs}/subscription`,
          url: `${publicApiWs}/graphql`,
          shouldRetry(errOrCloseEvent) {
            return true;
          },
        })
      )
    : httpLink;

const splitLink =
  typeof window != "undefined"
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: from([errorLink, splitLink]),
  });
});
