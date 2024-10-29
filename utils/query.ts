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
      borrows {
        amount
      }
      repays {
        amount
      }
      market {
        id
      }
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

export const vaultFilterQuery = (vaultAddress: string): DocumentNode => {
  return gql`
    {
      metaMorpho(
        id: "${vaultAddress.toLowerCase()}"
      ) {
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
        guardian {
          id
        }
      }
    }
  `;
};

export const marketFilterQuery = (marketId: string): DocumentNode => {
  return gql`
    {
      market(
        id: "${marketId.toLowerCase()}"
      ) {
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
};
