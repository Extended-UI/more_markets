import { ZeroAddress } from "ethers";
import { DocumentNode } from "graphql";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getTokenPrices } from "./contract";
import { toAssetsUp, formatTokenValue } from "./utils";
import { MORE_SUBGRAPH, zeroBigInt, initLeaderInfo } from "./const";
import {
  GraphMarket,
  GraphVault,
  GraphPosition,
  ILBUser,
  ILBPositionItem,
  ILeaderUser,
} from "@/types";
import {
  positionQuery,
  marketsQuery,
  vaultsQuery,
  vaultFilterQuery,
  marketFilterQuery,
  leaderboardQuery,
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

export const getLBUsers = async (): Promise<ILeaderUser[]> => {
  const positions = await apolloFetcher(leaderboardQuery());
  const accounts: ILBUser[] = positions.data.accounts;

  const tokenPrices = await getTokenPrices();

  return accounts.map((account) => {
    const { positions } = account;

    let marketPositions: ILBPositionItem[] = [];
    for (let ii = 0; ii < positions.length; ii++) {
      const position = positions[ii];
      const marketId = position.id.split("-")[1];
      const itemIndex = marketPositions.findIndex(
        (marketPosition) => marketPosition.market == marketId
      );

      const repaySum = position.repays.reduce(
        (memo, repayItem) => (memo += BigInt(repayItem.amount)),
        zeroBigInt
      );
      const borrowSum = position.borrows.reduce(
        (memo, borrowItem) => (memo += BigInt(borrowItem.amount)),
        zeroBigInt
      );

      const supplyAssets = toAssetsUp(
        BigInt(position.shares ? position.shares : "0"),
        BigInt(position.market.totalSupply),
        BigInt(position.market.totalSupplyShares)
      );

      if (itemIndex >= 0) {
        marketPositions[itemIndex].supply += supplyAssets;
        marketPositions[itemIndex].borrow += borrowSum;
        marketPositions[itemIndex].repay += repaySum;
        marketPositions[itemIndex].collateral += BigInt(position.balance);
      } else {
        marketPositions.push({
          market: marketId,
          supplyToken: position.market.inputToken.id,
          borrowToken: position.market.borrowedToken.id,
          supply: supplyAssets,
          borrow: borrowSum,
          repay: repaySum,
          collateral: BigInt(position.balance),
        });
      }
    }

    return marketPositions.reduce(
      (memo, marketPosition) => {
        const selSupplyToken = tokenPrices.find(
          (tokenPrice) =>
            tokenPrice.token.toLowerCase() ==
            marketPosition.supplyToken.toLowerCase()
        );
        const selBorrowToken = tokenPrices.find(
          (tokenPrice) =>
            tokenPrice.token.toLowerCase() ==
            marketPosition.borrowToken.toLowerCase()
        );

        const borrowPrice = selBorrowToken ? selBorrowToken.price : 0;
        const supplyPrice = selSupplyToken ? selSupplyToken.price : 0;

        return {
          user: account.id,
          supplyUSD:
            memo.supplyUSD +
            formatTokenValue(
              marketPosition.supply,
              marketPosition.borrowToken
            ) *
              borrowPrice,
          borrowUSD:
            memo.borrowUSD +
            (marketPosition.borrow >= marketPosition.repay
              ? formatTokenValue(
                  marketPosition.borrow - marketPosition.repay,
                  marketPosition.borrowToken
                ) * borrowPrice
              : 0),
          collateralUSD:
            memo.collateralUSD +
            formatTokenValue(
              marketPosition.collateral,
              marketPosition.supplyToken
            ) *
              supplyPrice,
        };
      },
      { user: account.id, ...initLeaderInfo }
    );
  });
};
