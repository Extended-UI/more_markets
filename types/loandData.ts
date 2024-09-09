import { Market } from "./market";

export interface LoanData {
  token: string;
  amountCollateral: number;
  amountLoan: number;
  valueUSD: number;
  liquidationLTV: number;
  liquidationLTV2: number;
  borrowAPY: number;
  market: Market | null;
}
