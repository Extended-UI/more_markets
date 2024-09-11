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
    }`;
};
