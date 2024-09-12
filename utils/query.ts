import { DocumentNode } from "graphql";
import gql from "graphql-tag";

export const positionQuery = (account: string): DocumentNode => {
  return gql`{
    positions(
      first: 1000,
      where: {
        account_: {
          id: "${account.toLowerCase()}"
        }
      }
    ) {
      id
      asset {
        id
      }
      balance
      market
    }
  }`;
};

export const marketsQuery = gql`
  {
    markets(first: 100) {
      id
      inputToken {
        id
      }
      borrowedToken {
        id
      }
      lltv
      totalSupply
      totalBorrow
    }
  }
`;

export const vaultsQuery = gql`
  {
    metaMorphos(first: 100) {
      id
      supplyQueue(first: 100) {
        market {
          id
        }
      }
      name
      curator {
        id
      }
      asset {
        id
      }
      lastTotalAssets
      totalShares
    }
  }
`;
