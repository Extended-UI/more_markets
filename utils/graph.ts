import { ZeroAddress } from "ethers";
import ApolloClient, { ApolloQueryResult } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { DocumentNode } from "graphql";
import { MORE_SUBGRAPH } from "./const";
import { GraphMarket, GraphVault } from "@/types/graph";
import { positionQuery, marketsQuery, vaultsQuery } from "./query";

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

export const fetchMarkets = async (): Promise<GraphMarket[]> => {
  const marketsInfo = await apolloFetcher(marketsQuery);
  const { markets } = marketsInfo.data;
  const validMarkets = (markets as GraphMarket[]).filter(
    (item) => item.id !== ZeroAddress
  );

  return validMarkets;
};

export const fetchVaults = async (): Promise<GraphVault[]> => {
  const vaultsInfo = await apolloFetcher(vaultsQuery);
  const { metaMorphos } = vaultsInfo.data;
  const validVaults = (metaMorphos as GraphVault[]).filter(
    (item) => item.id !== ZeroAddress
  );

  return validVaults;
};
