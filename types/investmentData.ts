import { Market } from "./market";

export interface InvestmentData {
  vaultId: string;
  vaultName: string;
  assetAddress: string;
  netAPY: number;
  userDeposits: number;
  userShares: bigint;
  totalDeposits: number;
  totalValueUSD: number;
  curator: string;
  collateral: string[];
  guardian: string;
  // tokenBalance: GetBalanceReturnType;
  // unsecured: number;
  // market: Market | null;
}
