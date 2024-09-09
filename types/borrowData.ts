import { Market } from "./market";

export interface BorrowData {
  marketId: `0x${string}`;
  collateralToken: string;
  loanToken: string;
  liquidationLTV: number;
  liquidationLTV2: number;
  borrowAPY: number;
  utilization: number;
  totalDeposits: number;
  totalValueUSD: number;
  market: Market | null;
}
