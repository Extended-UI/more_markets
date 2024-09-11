import ApolloClient, { ApolloQueryResult } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { DocumentNode } from "graphql";
import { positionQuery } from "./query";
import { MORE_SUBGRAPH } from "./const";

const apolloFetcher = async (query: DocumentNode) => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: MORE_SUBGRAPH,
    }),
    cache: new InMemoryCache(),
  });
  return client.query({
    query: query,
    fetchPolicy: "cache-first",
  });
};

const fetchUserPositions = async (account: string) => {
  const positionInfos = await apolloFetcher(positionQuery(account));
};
