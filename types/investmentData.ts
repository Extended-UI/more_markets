import { type GetBalanceReturnType } from "@wagmi/core";

export interface InvestmentData {
  vaultName: string;
  tokenSymbol: string;
  netAPY: number;
  totalDeposits: number;
  totalValueUSD: number;
  curator: string;
  collateral: string[];
  unsecured: number;
  tokenBalance: GetBalanceReturnType;
}
