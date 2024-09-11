import { type GetBalanceReturnType } from "@wagmi/core";
import { Market } from "./market";

export interface InvestmentData {
  vaultName: string;
  tokenSymbol: string;
  assetAddress: string;
  netAPY: number;
  totalDeposits: number;
  totalValueUSD: number;
  curator: string;
  collateral: string[];
  unsecured: number;
  tokenBalance: GetBalanceReturnType;
  supplyQueue: string;
  market: Market | null;
}
