"use client";
import { ApolloLink, HttpLink, from, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

import { onError } from "@apollo/client/link/error";

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { publicApi, publicApiWs } from "./secrets";
// import { publicApi, publicApiWs } from "./secrets";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${publicApi}/graphql`,
    credentials: "include",
  });

  const wsLink =
    typeof window != "undefined"
      ? new GraphQLWsLink(
          createClient({
            url: `${publicApiWs}/subscription`,
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

  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            from([errorLink, splitLink]),
          ])
        : from([errorLink, splitLink]),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
