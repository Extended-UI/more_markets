import { ZeroAddress } from "ethers";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { DocumentNode } from "graphql";
import { MORE_SUBGRAPH } from "./const";
import { GraphMarket, GraphVault, GraphPosition } from "@/types";
import {
  positionQuery,
  marketsQuery,
  vaultsQuery,
  vaultFilterQuery,
  marketFilterQuery,
} from "./query";

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

export const fetchPositions = async (
  account: string | undefined
): Promise<GraphPosition[]> => {
  if (account) {
    const positionsInfo = await apolloFetcher(positionQuery(account));
    const { positions } = positionsInfo.data;

    return positions as GraphPosition[];
  } else {
    return [];
  }
};

export const fetchVault = async (vault: string): Promise<GraphVault> => {
  const vaultInfo = await apolloFetcher(vaultFilterQuery(vault));
  return vaultInfo.data.metaMorpho as GraphVault;
};

export const fetchMarket = async (marketId: string): Promise<GraphMarket> => {
  const marketInfo = await apolloFetcher(marketFilterQuery(marketId));
  return marketInfo.data.market as GraphMarket;
};
