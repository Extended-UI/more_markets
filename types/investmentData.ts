import { type GetBalanceReturnType } from "@wagmi/core";
import { MarketConfig } from "./marketConfig";
import { MarketParams } from "./marketParams";
import { Markets } from "./markets";

export interface Market {
  config: MarketConfig;
  params: MarketParams;
  info: Markets;
}

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
  supplyQueues: string[];
  markets: Market[];
}
