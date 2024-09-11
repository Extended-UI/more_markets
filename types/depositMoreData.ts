import { Market } from "./market";

export interface DepositMoreData {
  tokenName: string;
  apy: number;
  depositAmount: number;
  curator: string;
  depositValueUSD: number;
  collaterals: string[];
  market: Market;
}
